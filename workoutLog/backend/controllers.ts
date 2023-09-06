import { Request, Response } from 'express';
import { LOCALTUNNEL } from '../config';
var client = require('./db');
var bcrypt = require('./middleware/passwordUtils');
var emailConfirmationUtils = require('./middleware/emailConfirmationUtils');
var nodemailer = require('./middleware/nodemailerConfig');
var auth = require('./middleware/loginAuthUtils');
var jwt = require('./middleware/jwt');
var photoUtils = require('./middleware/photoDirUtils')
var zlib = require('zlib');
var axios = require('axios');
import {v2 as cloudinary} from 'cloudinary';

const getActivities = async (req: Request, res: Response) => {
  const { userId, emailAddress } = req.body.user

  // an.user_id = u.id
  const queryString = `SELECT an.activity_name,
  ai.activity_info AS activity_info,
  an.day,
  an.month,
  an.year,
  an.id AS activity_id
  FROM activity_name AS an
  LEFT JOIN activity_info AS ai ON an.id = ai.activity_name_id
  JOIN users AS u ON an.user_id = $2
  WHERE u.email_address = $1`;

  const results = await client.query(queryString, [emailAddress, userId]);

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
    const { user, dateInfo, activityName } = req.body;
    const { userId, emailAddress } = user;
    const { day, month, year } = dateInfo;
    console.log('[postActivityName] what is user', user)
    const queryString = `
      INSERT INTO activity_name (activity_name, day, month, year, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, activity_name, day, month, year
    `;
    const insertActivityNameParams = [activityName, day, month, year, userId];
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
    const { generateConfirmationToken } = emailConfirmationUtils;
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

const login = async (req: Request, res: Response) => {
  try {
    const { emailAddress, password } = req.body;

    if (await auth.verifyEmail(emailAddress)){
      return res.status(404).send('No Emaill Address Found');
    };

    if (await auth.authHashPassword(emailAddress, password)){
      return res.status(401).send('Incorrect Password')
    };

    const token = await jwt.generateJwtToken(emailAddress);
    // *Future Note* may possibly remove constraint
    // if (!token) {
    //   return res.status(407).send('Error in generating jwt Token from login controller function')
    // }
    res.status(200).send(token);
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

  const queryString = `
    SELECT u.full_name, p.photo_uri, p.weight, p.height
    FROM users AS u
    INNER JOIN profile AS p ON u.id = p.user_id
    WHERE u.email_address = $1
  `;

  const results = await client.query(queryString, [email]);

  try {
    let userInfo = results.rows[0];

    res.status(200).send(userInfo);
  }  catch (err) {
    console.error('Error retrieving user info from the database', err);
    res.sendStatus(500);
  };
};

const saveProfileEdits = async (req: Request, res: Response) => {


  const handleCloudinary = async (image: string) => {
    cloudinary.config({
      cloud_name: 'jasjasper',
      api_key: '416973851316696',
      api_secret: 'FiXTrjgwcmvQzehA5VZ45xffXIU'
    });

    cloudinary.uploader.unsigned_upload(image, 'workoutLog')
    .then((response:any) => {
      console.log('backend cloud upload show respose', response)
    })
    .catch((err:any) => {
      console.error('loser:', err)
    })

  }


  let { full_name, weight, height, email_address, photo_uri, file } = req.body;

  try {

    if (!weight) weight = null;
    if (!height[0] || !height[1]) height = null;

    if (weight) weight = parseInt(weight);
    if (height) {
      height[0] = parseInt(height[0]);
      height[1] = parseInt(height[1]);
    };
    // Update the user's full_name in the users table
    const updateUserQuery = `
    UPDATE users
    SET full_name = $1
    WHERE email_address = $2;
    `;
    await client.query(updateUserQuery, [full_name, email_address]);

    // Update the user's weight, height, and photo_uri in the profile table
    const updateProfileQuery = `
      UPDATE profile
      SET weight = $1,
          height = $2,
          photo_uri = $3
      WHERE user_id = (SELECT id FROM users WHERE email_address = $4);
    `;
    await client.query(updateProfileQuery, [weight, height, photo_uri, email_address]);
    console.log('Successfully updated users profile info')
    res.sendStatus(201);
  } catch (err) {
    console.error('Error in updating profile:', err);
    res.sendStatus(500);
  }
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
  getUserInfo,
  saveProfileEdits
};
