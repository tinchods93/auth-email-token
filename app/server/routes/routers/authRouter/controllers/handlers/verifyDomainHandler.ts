import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import routerErrorHandler from '../../../../../errors/routerErrorHandler';
import { verifyTokenDomain } from '../../../../../../src/authentication/authentication';
import { RequestWithSession } from '../../../../../interfaces/requestInterface';
import LoginException from '../errors/LoginException';

export default async function verifyTokenHandler(
  request: RequestWithSession,
  response: Response
) {
  try {
    if (!request.query.token) {
      throw new LoginException('Token is required').handle();
    }

    const userData = await verifyTokenDomain(request.query.token as string);

    request.session.access_token = request.query.token;
    request.session.user_data = userData;

    response.status(StatusCodes.OK).send({
      message: 'User logged in successfully!',
    });
  } catch (errorObj) {
    console.log(errorObj);
    routerErrorHandler(errorObj, response);
  }
}
