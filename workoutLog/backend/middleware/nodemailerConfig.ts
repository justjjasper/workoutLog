var nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendConfirmationEmail = async (userEmail: string, confirmationLink: string)  => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: userEmail,
      subject: 'Verify your account',
      text: `Please click on the following link to confirm your account: ${confirmationLink}`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('email sent', info.response);
  } catch (err) {
    console.error('Error sending mail: ', err);
    console.log('what are info', process.env.EMAIL_SERVICE, process.env.EMAIL_USERNAME, typeof process.env.EMAIL_PASSWORD)
  }
};

module.exports = {
  sendConfirmationEmail
};