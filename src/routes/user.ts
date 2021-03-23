import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';
import { Routes } from '../utils/routes';

const { validateToken, getAllUsers, register, login } = controller;

const router = express.Router();

router.get(Routes.validateToken, extractJWT, validateToken);
router.get(Routes.allUsers, getAllUsers);
router.post(Routes.register, register);
router.post(Routes.login, login);

export = router;
