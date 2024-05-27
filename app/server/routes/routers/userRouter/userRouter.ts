import express from 'express';
import { userAuthorization } from '../../middlewares/authentication';
import userController from './controllers/userController';

const userRouter = express.Router();

userRouter.get('/profile', userAuthorization, userController.profile);

export default userRouter;
