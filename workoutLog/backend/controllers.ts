var client = require('./db');

const getActivities = async (req: any, res: any) => {
  const queryString = `SELECT * FROM activityName`;

  const results = await client.query(queryString);

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

