import { Response } from 'express';
import routerErrorHandler from '../../../../../errors/routerErrorHandler';
import { RequestWithSession } from '../../../../../interfaces/requestInterface';
import UserRepository from '../../../../../../src/users/userRepository';

export default async function profileDomain(
  request: RequestWithSession,
  response: Response
) {
  try {
    const user = await UserRepository.getUserProfile({
      id: request.session.user_data._id,
    });
    response.status(200).send(user);
  } catch (errorObj) {
    routerErrorHandler(errorObj, response);
  }
}
