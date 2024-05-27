import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import routerErrorHandler from '../../../../../errors/routerErrorHandler';
import { sendPasswordlessEmail } from '../../../../../../src/authentication/authentication';
import CustomException from '../../../../../../src/errors/CustomException';

export default async function passwordlessLoginDomain(
  request: Request,
  response: Response
) {
  try {
    const { email } = request.body;
    if (!email) {
      throw new CustomException(
        'email is required',
        StatusCodes.BAD_REQUEST,
        'sendVerifyDomain'
      ).handle();
    }

    await sendPasswordlessEmail(email).catch((error) => {
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
