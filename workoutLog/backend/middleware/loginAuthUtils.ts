var jwt = require('jsonwebtoken');
var client = require('../db');
var bcrypt = require('./passwordUtils');

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

const authHashPassword = async (email: string, password: string ) => {
  const { compare } = bcrypt;

  const hashPasswordQuery = `
    SELECT password_hash FROM auth
    WHERE user_id = (
      SELECT id FROM users
      WHERE email_address = $1
    );
  `;

  const hashPassword = await client.query(hashPasswordQuery, [email]);

  if (!(await compare(password, hashPassword.rows[0].password_hash))) {
    console.log('Incorrect password when logging in from serverside');
    return true
  };

  return false
};

module.exports = {
  verifyEmail,
  authHashPassword
}