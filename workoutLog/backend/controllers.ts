import { Request, Response } from 'express';
import { LOCALTUNNEL } from '../config';
var client = require('./db');
var bcrypt = require('../middleware/passwordUtils');
var confirmationUtils = require('../middleware/confirmationUtils');
var nodemailer = require('../middleware/nodemailerConfig');

const getActivities = async (req: Request, res: Response) => {
  const emailAddress = req.query.emailAddressParam;

  const queryString = `SELECT an.activity_name,
  ai.activity_info AS activity_info,
  an.day,
  an.month,
  an.year,
  an.id AS activity_id
  FROM activity_name AS an
  LEFT JOIN activity_info AS ai ON an.id = ai.activity_name_id
  JOIN users AS u ON an.user_id = u.id
  WHERE u.email_address = $1`;

  const results = await client.query(queryString, [emailAddress]);

  try {
    const activities = results.rows.map((row: any) => ({
      activityName: row.activity_name,
      activityInfo: row.activity_info,
      day: row.day,
      month: row.month,
      year: row.year,
      activityId: row.activity_id
    }));

    res.status(200).send(activities);
  } catch (err) {
    console.error('Error in grabbing activities from backend', err);
    res.sendStatus(400);
  }
};

const postActivityName = async (req: Request, res: Response) => {
  try {
    const { emailAddress, dateInfo, activityName } = req.body;
    const { day, month, year } = dateInfo;

    const queryString = `
      INSERT INTO activity_name (activity_name, day, month, year, user_id)
      VALUES ($1, $2, $3, $4, (SELECT id FROM users WHERE email_address = $5))
      RETURNING id, activity_name, day, month, year
    `;
    const insertActivityNameParams = [activityName, day, month, year, emailAddress];
    const results = await client.query(queryString, insertActivityNameParams);

    const insertedActivity = results.rows[0]; // Assuming only one row is returned

    res.status(200).send(insertedActivity);
  } catch (err) {
    console.error('Error adding activity_name from Backend', err);
    res.sendStatus(500);
  };
};

const postNote = async (req: Request, res: Response) => {

  try {
    const { noteContent, id } = req.body;

    // if (!noteContent || !id) {
    //   return res.status(400).send('Missing activity_info or id');
    // };
    // is this edge case needed? Patch already handles this logic error

    const queryString = `
      INSERT INTO activity_info (activity_info, activity_name_id)
      VALUES ($1, $2)
      RETURNING activity_info;
    `;

    const insertActivityInfoParams = [noteContent, id];
    const results = await client.query(queryString, insertActivityInfoParams);

    const insertedActivity = results.rows[0];

    res.status(200).send(insertedActivity);
  } catch (err) {
    console.error('Error saving new Note from backend', err);
    res.sendStatus(500);
  };
};

const updateNote = async (req: Request, res: Response) => {
  try {
    const { noteContent, id } = req.body

    const queryString = `
      UPDATE activity_info
        SET activity_info = $1
        WHERE activity_name_id = $2
      RETURNING activity_info;
    `;

    const insertedActivityInfoParams = [noteContent, id];
    const results = await client.query(queryString, insertedActivityInfoParams);

    const insertedActivity = results.rows[0];
    res.status(200).send(insertedActivity);
  } catch(err) {
    console.error('Failed updating activity_info from backend', err)
  }
};

const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activityIds: number[] = req.body;

    // Delete activity_info records
    const deleteActivityInfoQuery = `
      DELETE FROM activity_info
      WHERE activity_name_id = ANY($1::integer[])
    `;
    await client.query(deleteActivityInfoQuery, [activityIds]);

    // Delete activity_name records
    const deleteActivityNameQuery = `
      DELETE FROM activity_name
      WHERE id = ANY($1::integer[])
    `;
    await client.query(deleteActivityNameQuery, [activityIds]);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error deleting activities from backend', err);
    res.sendStatus(500);
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { name, emailAddress, password1 } = req.body;
    const { generateSalt, hashPassword } = bcrypt;
    const { generateConfirmationToken } = confirmationUtils;
    const { sendConfirmationEmail } = nodemailer
    // Check if the email address or full name already exist in the database
    const checkExistingQuery = `
      SELECT email_address FROM users
      WHERE email_address = $1
    `;
    const existingUser = await client.query(checkExistingQuery, [emailAddress]);

    if (existingUser.rows.length > 0) {
      // User with the same email address or full name already exists
      console.log('Error from client side with signing up, User with the same email address already exists.');
      return res.status(500).send(existingUser.rows);
    };

    const queryUserString = `
      INSERT INTO users (email_address, full_name)
      VALUES ($1, $2);
    `;
    const insertUsersParam = [emailAddress, name];
    await client.query(queryUserString, insertUsersParam);

    // Generate salt and hash the password
    const salt = await generateSalt(10);
    const hashedPassword = await hashPassword(password1, salt);

    const queryAuthString = `
      INSERT INTO auth (salt, password_hash, user_id, confirmation_token)
      VALUES ($1, $2, (SELECT id from users WHERE email_address = $3), $4);
    `;
    const confirmationToken = generateConfirmationToken()
    const insertAuthParam = [salt, hashedPassword, emailAddress, confirmationToken];
    await client.query(queryAuthString, insertAuthParam);

    const confirmationLink = `${LOCALTUNNEL}/confirm?token=${confirmationToken}`;
    // await sendConfirmationEmail(emailAddress, confirmationLink)

    const queryProfileString = `
      INSERT INTO profile (user_id)
      VALUES (
        (SELECT id FROM users
          WHERE email_address = $1
        )
      );
    `;
    await client.query(queryProfileString, [emailAddress])

    console.log('Successfully inserted users Info/Sign up from backend');
    res.sendStatus(200);
  } catch (err) {
    console.error('Error in signing up from server side', err);
    res.status(500).send(err);
  }
};

// check if email address or password is valid
const login = async (req: Request, res: Response) => {
  try {
    const { emailAddress, password } = req.body;
    const { compare } = bcrypt;

    // Check if the email address does not exist in database
    const checkExistingQuery = `
      SELECT email_address FROM users
      WHERE email_address = $1
    `;
    const existingUser = await client.query(checkExistingQuery, [emailAddress]);
    if (existingUser.rows.length === 0) {
      // User email address does not exist
      console.log('Error from client side with logging in, User email address not found.', existingUser.rows);
      return res.status(404).send('No Emaill Address Found');
    };

    const hashPasswordQuery = `
      SELECT password_hash FROM auth
      WHERE user_id = (
        SELECT id FROM users
        WHERE email_address = $1
      );
    `;

    const hashPassword = await client.query(hashPasswordQuery, [emailAddress]);

    if (!(await compare(password, hashPassword.rows[0].password_hash))) {
      console.log('Incorrect password when logging in from serverside');
      return res.status(401).send('Incorrect Password')
    }

    res.sendStatus(200)
  } catch(err) {
    console.error('Error in logging in from client side', err);
    res.status(500).send(err);
  }
};

const confirmAccount = async (req: Request, res: Response) => {
  const token = req.query.token;

  console.log('what are the tokens:', token)
  res.sendStatus(200);
};

const getUserInfo = async (req: Request, res: Response) => {
  const email = req.query.userEmail;

  // full name
  // photo URI
  // weight
  // height

  const queryString = `
    SELECT u.full_name, p.photo_uri, p.weight, p.height
    FROM users AS u
    INNER JOIN profile AS p ON u.id = p.user_id
    WHERE u.email_address = $1
  `;

  const results = await client.query(queryString, [email]);

  try {
    const userInfo = results.rows[0];
    res.status(200).send(userInfo);
  }  catch (err) {
    console.error('Error retrieving user info from the database', err);
    res.sendStatus(500);
  };
};

module.exports = {
  getActivities,
  postActivityName,
  postNote,
  updateNote,
  deleteActivity,
  signUp,
  login,
  confirmAccount,
  getUserInfo
};
