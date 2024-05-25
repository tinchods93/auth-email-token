import { Request, Response } from 'express';
import { getUserProfile } from '../../../../../../src/users/userRepository';
import routerErrorHandler from '../../../../../errors/routerErrorHandler';

export default async function profileDomain(
  request: Request,
  response: Response
) {
  try {
    const user = await getUserProfile({
      id: request.query.user_id as string,
    });
    response.status(200).send(user);
  } catch (errorObj) {
    routerErrorHandler(errorObj, response);
  }
}
