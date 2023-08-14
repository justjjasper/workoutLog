import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
var client = require('../db');
var jwt = require('jsonwebtoken');


const generateJwtToken = async (email: string) => {
  const queryString = `
    SELECT id FROM users
    WHERE email_address = $1
  `;

  const userId = await client.query(queryString, [email]);

  const payload = {
    userId,
    email
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

  return token
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;


};

module.exports = {
  generateJwtToken,
  verifyToken
}