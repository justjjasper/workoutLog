var client = require('./db');

const getActivities = async (req: any, res: any) => {
  const username = req.query.usernameParam;

  const queryString = `SELECT an.activityName,
                        ai.activityInfo AS activityInfo,
                        an.day,
                        an.month,
                        an.year,
                        an.id AS activityId
                      FROM activityName AS an
                      JOIN activityInfo AS ai ON an.id = ai.activityName_id
                      JOIN usernames AS u ON an.username_id = u.id
                      WHERE u.username = $1`;

  const results = await client.query(queryString, [username]);

  try {
    const activities = results.rows.map((row: any) => ({
      activityname: row.activityname,
      activityinfo: row.activityinfo,
      day: row.day,
      month: row.month,
      year: row.year,
      activityid: row.activityid
    }));

    res.status(200).send(activities);
  } catch (err) {
    console.log('Error in grabbing activities from backend');
    res.sendStatus(400);
  }
};

module.exports = {
  getActivities: getActivities
};
