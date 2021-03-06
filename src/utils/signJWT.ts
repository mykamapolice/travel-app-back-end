import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../interfaces/user';

const NAMESPACE = 'Auth';

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const { username } = user;
  const { expireTime, secret, issuer } = config.server.token;

  const timeSinchEpoch: number = new Date().getTime();
  const expirationTime = timeSinchEpoch + Number(expireTime) * 100000;
  const expiresIn = Math.floor(expirationTime / 1000);

  const message = `Attempting to sign token for ${username}`;

  logging.info(NAMESPACE, message);

  try {
    const user: object = { username };
    const options: SignOptions = {
      issuer,
      expiresIn,
      algorithm: 'HS256',
    };

    jwt.sign(user, secret, options, (error, token) => {
      if (error) {
        callback(error, null);
      } else if (token) {
        callback(null, token);
      }
    });
  } catch (error) {
    logging.error(NAMESPACE, error.message, error);
    callback(error, null);
  }
};

export default signJWT;
