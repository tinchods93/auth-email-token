import { Request } from 'express';
import session from 'express-session';
import { UserProfileType } from '../../src/users/entities/types/userTypes';

export interface RequestWithSession extends Request {
  session?: session.Session &
    Partial<session.SessionData> & {
      access_token?: string;
      user_data?: UserProfileType;
    };
}
