import axios from 'axios';
import crypto from 'crypto';

const handleConfirmationLink = (url: string) => {
  // After listening to a deep link event, retrieve the token from the url params
  const params = new URLSearchParams(url.split('?')[1]);
  const token = params.get('token');

  // Send the token to the backend to handle verification
};

const generateConfirmationToken = () => {
  return crypto.randomBytes(20).toString('hex');
}

module.exports = {
  handleConfirmationLink,
  generateConfirmationToken
}