import jwt, { VerifyErrors } from 'jsonwebtoken';
import { config } from '../config';

export const create = (userId: any) => new Promise((resolve, reject) => {
  jwt.sign({
    userId,
  }, config.jwt.secret, {
    expiresIn: config.jwt.lifetime,
  }, (error, token) => {
    if (error) {
      return reject(error);
    }

    resolve(token);
  });
});

export const getDecodedToken = (token: string) => new Promise((resolve, reject) => {
  jwt.verify(token, config.jwt.secret, (error: any, decodedToken: any) => {
    if (error) {
      return reject(error);
    }

    if (!decodedToken.exp || !decodedToken.iat) {
      return reject(new Error('Token had no \'exp\' or \'iat\' payload'));
    }

    resolve(decodedToken);
  });
});
