import { Response } from 'express';
import { RequestWithSession } from '../../../../../interfaces/requestInterface';
import { Login } from '../../../../../../src/authentication/authentication';
import routerErrorHandler from '../../../../../errors/routerErrorHandler';

export default async function loginDomain(
  request: RequestWithSession,
  response: Response
) {
  try {
    const user = await Login(request.body);
    request.session.authenticated = true;
    request.session.user_data = user;
    response.status(200).send({
      message: 'User Logged',
      user,
    });
  } catch (errorObj) {
    console.log(errorObj.message);
    routerErrorHandler(errorObj, response);
  }
}
