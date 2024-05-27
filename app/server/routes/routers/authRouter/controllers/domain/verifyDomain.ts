import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import routerErrorHandler from '../../../../../errors/routerErrorHandler';
import { verifyUserEmail } from '../../../../../../src/authentication/authentication';

export default async function verifyEmailDomain(
  request: Request,
  response: Response
) {
  try {
    await verifyUserEmail(
      request.query.email as string,
      request.query.code as string
    );

    response.status(StatusCodes.OK).send({
      message: 'User verified',
    });
  } catch (errorObj) {
    console.log(errorObj);
    routerErrorHandler(errorObj, response);
  }
}
