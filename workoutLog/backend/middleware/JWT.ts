import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
var client = require('../db');
var jwt = require('jsonwebtoken');


const generateJwtToken = async (email: string) => {

  try {
    const queryString = `
    SELECT id FROM users
    WHERE email_address = $1;
    `;

    const result = await client.query(queryString, [email]);
    const userId = result.rows[0].id;

    const payload = {
      userId,
      emailAddress: email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    console.log('this is the new generated token when logging in', token)
    return token
  } catch (err) {
    console.error('[generateJwtToken] Error in gathering user id for generating jwt Token from server side', err)
  }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    // Token not present, skip verification
    next();
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.body.user = decoded;
    next();

  } catch(err) {
    console.error('error here verify token', err)
    res.status(477).send('[verifyToken] Error in verifying token')
  }
};

module.exports = {
  generateJwtToken,
  verifyToken
}