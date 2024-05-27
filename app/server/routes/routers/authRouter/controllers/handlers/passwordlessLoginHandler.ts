import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import routerErrorHandler from '../../../../../errors/routerErrorHandler';
import { passwordlessLogin } from '../../../../../../src/authentication/authentication';
import LoginException from '../errors/LoginException';

export default async function passwordlessLoginDomain(
  request: Request,
  response: Response
) {
  try {
    const { email } = request.body;
    if (!email) {
      throw new LoginException().handle();
    }

    await passwordlessLogin(email).catch((error) => {
      console.log('MARTIN_LOG=> sendVerificationEmail -> error', error);
    });

    response.status(StatusCodes.OK).send({
      message: 'Check your email to complete the loggin process.',
    });
  } catch (errorObj) {
    console.log(errorObj);
    routerErrorHandler(errorObj, response);
  }
}
