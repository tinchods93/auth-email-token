import { Request } from 'express';
import session from 'express-session';
import { UserProfile } from '../../src/users/entities/types/userTypes';

export interface RequestWithSession extends Request {
  session?: session.Session &
    Partial<session.SessionData> & {
      authenticated?: boolean;
      user_data?: UserProfile;
    };
}
