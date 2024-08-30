import jsonWebToken from 'jsonwebtoken';
import envsConfig from '../config/envs.config.js';

export const createToken = data => {
  const { email, cart, _id, first_name, last_name } = data;
  const token = jsonWebToken.sign({ email, cart, _id, first_name, last_name }, envsConfig.JWT_SECRETCODE, {
    expiresIn: '5m',
  });
  return token;
};

export const validToken = token => {
  const decodeToken = jsonWebToken.decode(token, envsConfig.JWT_SECRETCODE);
  return decodeToken;
};
