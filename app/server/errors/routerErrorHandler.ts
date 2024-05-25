import { Response } from 'express';

export default function routerErrorHandler(err: Error, res: Response) {
  console.log('MARTIN_LOG=> routerErrorHandler', err.message);
  const responseError: any = JSON.parse(err.message);
  res.status(responseError.status).send(responseError.payload);
}
