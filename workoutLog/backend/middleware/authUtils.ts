var jwt = require('jsonwebtoken');
var client = require('../db');

const verifyEmail = async (email: string) => {
  // Check if the email address does not exist in database
  const checkExistingQuery = `
  SELECT email_address FROM users
  WHERE email_address = $1
`;

  const existingUser = await client.query(checkExistingQuery, [email]);

  if (existingUser.rows.length === 0) {
    // User email address does not exist
    console.log('Error from client side with logging in, User email address not found.', existingUser.rows);
    return true
  };
  return false
};

module.exports = {
  verifyEmail
}