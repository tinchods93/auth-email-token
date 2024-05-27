import express from 'express';
import authController from './controllers/authController';

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.get('/verify', authController.verify);

export default authRouter;
