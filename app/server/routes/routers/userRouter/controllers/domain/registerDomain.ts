import { Request, Response } from 'express';
import { createUser } from '../../../../../../src/users/userRepository';
import routerErrorHandler from '../../../../../errors/routerErrorHandler';

export default async function registerDomain(
  request: Request,
  response: Response
) {
  try {
    const newUser = await createUser(request.body);
    response.status(201).send({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (errorObj) {
    console.log(errorObj);
    routerErrorHandler(errorObj, response);
  }
}
