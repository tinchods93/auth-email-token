import { Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { RequestWithSession } from '../../interfaces/requestInterface';
import { userRolesConfig } from '../../../src/users/config/UserRolesConfig';
import checkSessionRole from '../utils/checkSessionRole';
import AuthTokenRepository from '../../../src/authentication/authCode/authTokenRepository';
import { UserProfileType } from '../../../src/users/entities/types/userTypes';

export async function userAuthorization(
  req: RequestWithSession,
  res: Response,
  next: any
) {
  const baseRole = userRolesConfig.user;
  const authTokenRepository = new AuthTokenRepository();
  if (!req.session.access_token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: ReasonPhrases.UNAUTHORIZED });
  }
  const tokenValid = await authTokenRepository.verify(req.session.access_token);
  if (!tokenValid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: ReasonPhrases.UNAUTHORIZED });
  }
  const { role: userRole } = tokenValid as UserProfileType;

  console.log('MARTIN_LOG=>userAuthorization=>userRole', userRole);
  if (!checkSessionRole(userRole, baseRole)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: ReasonPhrases.UNAUTHORIZED });
  }

  req.session.user_data = tokenValid;

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
