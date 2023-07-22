import { Request, Response } from 'express';
var client = require('./db');

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
  JOIN email_address AS u ON an.email_address_id = u.id
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
    console.log('Error in grabbing activities from backend');
    res.sendStatus(400);
  }
};

const postActivityName = async (req: Request, res: Response) => {
  try {
    const { emailAddress, dateInfo, activityName } = req.body;
    const { day, month, year } = dateInfo;

    const queryString = `
      INSERT INTO activity_name (activity_name, day, month, year, email_address_id)
      VALUES ($1, $2, $3, $4, (SELECT id FROM email_address WHERE email_address = $5))
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

    if (!noteContent || !id) {
      return res.status(400).send('Missing activity_info or id');
    };

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
    console.log('success updating database from backend. this is response', insertedActivity);
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
    console.log('success in deleting from backend')
    res.sendStatus(200);
  } catch (err) {
    console.error('Error deleting activities from backend', err);
    res.sendStatus(500);
  }
};

module.exports = {
  getActivities,
  postActivityName,
  postNote,
  updateNote,
  deleteActivity
};
