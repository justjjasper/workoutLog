var client = require('./db');

const getActivities = async (req: any, res: any) => {
  const username = req.query.usernameParam

  const queryString = `SELECT a.activityName, ARRAY_AGG(ai.activityInfo) AS activityInfo
                        FROM activityName AS a
                        JOIN activityInfo AS ai ON a.id = ai.activityName_id
                        JOIN usernames AS u ON a.username_id = u.id
                        WHERE u.username = $1
                        GROUP BY a.id`;

  const results = await client.query(queryString, [username]);

  try {
    res.status(200).send(results.rows)
  }
  catch(err) {
    console.log('Error in grabbing activities from backend');
    res.sendStatus(400)
  }
};

module.exports = {
  getActivities: getActivities
};

