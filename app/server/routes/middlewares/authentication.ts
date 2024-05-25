import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestWithSession } from '../../interfaces/requestInterface';
import { userRolesConfig } from '../../../src/users/config/UserRolesConfig';
import checkSessionRole from '../utils/checkSessionRole';

export function userAuthorization(
  req: RequestWithSession,
  res: Response,
  next: any
) {
  const baseRole = userRolesConfig.user;
  if (!req.session.authenticated || !req.session.user_data?.role) {
    return res.status(401).send({ message: StatusCodes.UNAUTHORIZED });
  }
  const userRole = req.session.user_data.role;
  console.log('MARTIN_LOG=>userAuthorization=>userRole', userRole);
  if (!checkSessionRole(userRole, baseRole)) {
    return res.status(403).send({ message: StatusCodes.FORBIDDEN });
  }

  next();
}

export function adminAuthorization(
  req: RequestWithSession,
  res: Response,
  next: any
) {
  const baseRole = userRolesConfig.admin;
  if (!req.session.authenticated || !req.session.user_data?.role) {
    return res.status(401).send({ message: StatusCodes.UNAUTHORIZED });
  }
  const userRole = req.session.user_data.role;

  if (!checkSessionRole(userRole, baseRole)) {
    return res.status(403).send({ message: StatusCodes.FORBIDDEN });
  }

  next();
}
