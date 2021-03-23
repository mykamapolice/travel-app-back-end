import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const NAMESPACE = 'Auth';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Validated token');

  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    const { secret } = config.server.token;

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error,
        });
      }

      res.locals.jwt = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default extractJWT;
