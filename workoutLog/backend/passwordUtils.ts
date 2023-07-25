var bcrypt = require('bcrypt');

const generateSalt = async (saltRounds: number) => {
  return await bcrypt.genSalt(saltRounds);
};

const hashPassword = async (plainTextPassword: string, salt: string) => {
  return await bcrypt.hash(plainTextPassword, salt);
};

module.exports = {
  generateSalt,
  hashPassword
}