import { Request, Response } from 'express';
var client = require('./db');

const getActivities = async (req: Request, res: Response) => {
  const username = req.query.usernameParam;

  const queryString = `SELECT an.activityName,
                        ai.activityInfo AS activityInfo,
                        an.day,
                        an.month,
                        an.year,
                        an.id AS activityId
                      FROM activityName AS an
                      LEFT JOIN activityInfo AS ai ON an.id = ai.activityName_id
                      JOIN usernames AS u ON an.username_id = u.id
                      WHERE u.username = $1`;

  const results = await client.query(queryString, [username]);

  try {
    const activities = results.rows.map((row: any) => ({
      activityName: row.activityname,
      activityInfo: row.activityinfo,
      day: row.day,
      month: row.month,
      year: row.year,
      activityId: row.activityid
    }));

    res.status(200).send(activities);
  } catch (err) {
    console.log('Error in grabbing activities from backend');
    res.sendStatus(400);
  }
};

const postActivityName = async (req: Request, res: Response) => {
  try {
    const { username, dateInfo, activityName } = req.body;
    const { day, month, year } = dateInfo;

    const queryString = `
      INSERT INTO activityName (activityName, day, month, year, username_id)
      VALUES ($1, $2, $3, $4, (SELECT id FROM usernames WHERE username = $5))

      RETURNING id, activityName, day, month, year
    `;
    const insertActivityNameParams = [activityName, day, month, year, username];
    const results = await client.query(queryString, insertActivityNameParams);

    const insertedActivity = results.rows[0]; // Assuming only one row is returned
    res.status(200).send(insertedActivity);
  } catch (err) {
    console.error('Error adding activityName from Backend', err);
    res.sendStatus(500);
  };
};

const postNote = async (req: Request, res: Response) => {

  try {
    const { noteContent, id } = req.body;

    if (!noteContent || !id) {
      return res.status(400).send('Missing noteContent or id');
    };

    const queryString = `
      INSERT INTO activityInfo (activityInfo, activityName_id)
      VALUES ($1, $2)
    `;
    const insertActivityInfoParams = [noteContent, id];
    await client.query(queryString, insertActivityInfoParams);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error saving new Note from backend', err);
    res.sendStatus(500);
  };
};

const updateNote = async (req: Request, res: Response) => {
  // try {
  //   const { noteContent, activityName } = req.body

  // }
  return null;
};

module.exports = {
  getActivities,
  postActivityName,
  postNote,
  updateNote
};
