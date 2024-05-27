import express from 'express';
import { adminAuthorization } from '../../middlewares/authentication';
import routerErrorHandler from '../../../errors/routerErrorHandler';
import UserRepository from '../../../../src/users/userRepository';

const adminRouter = express.Router();

adminRouter.get('/users', adminAuthorization, async (request, response) => {
  try {
    const users = await UserRepository.getAllUsers();
    response.status(200).send(users);
  } catch (errorObj) {
    routerErrorHandler(errorObj, response);
  }
});

export default adminRouter;
