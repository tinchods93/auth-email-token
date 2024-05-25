import express from 'express';
import { userAuthorization } from '../../middlewares/authentication';
import userController from './controllers/userController';

const userRouter = express.Router();

userRouter.get('/profile', userAuthorization, userController.profile);

userRouter.post('/auth/register', userController.register);

userRouter.post('/auth/verify', userController.register);

userRouter.post('/auth/login', userController.login);

export default userRouter;
