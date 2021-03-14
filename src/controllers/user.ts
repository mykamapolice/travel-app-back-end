import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs, { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user';
import signJWT from '../utils/signJWT';
import { sign } from 'jsonwebtoken';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Token validated, user authorizated');

  return res.status(200).json({
    message: 'Authorizated',
  });
};

const register = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: hash,
    });

    return user
      .save()
      .then((user) =>
        res.status(201).json({
          user,
        })
      )
      .catch((error) =>
        res.status(500).json({
          message: error.message,
          error,
        })
      );
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  User.find({ username })
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      bcryptjs.compare(password, users[0].password, (error, result) => {
        if (error) {
          logging.error(NAMESPACE, error.message, error);

          return res.status(401).json({
            message: 'Unauthorized',
          });
        } else if (result) {
          signJWT(users[0], (error, token) => {
            if (error) {
              logging.error(NAMESPACE, 'Unable to sign token: ', error);

              return res.status(401).json({
                message: 'Unauthorized',
                error,
              });
            } else if (token) {
              return res.status(200).json({
                message: 'Auth Ssuccess',
                token,
                user: users[0],
              });
            }
          });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .select('-password')
    .exec()
    .then((users) =>
      res.status(200).json({
        count: users.length,
        users,
      })
    )
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { validateToken, register, login, getAllUsers };
