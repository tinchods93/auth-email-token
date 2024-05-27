import { StatusCodes } from 'http-status-codes';
import dayjs from 'dayjs';
import { UserItem } from './types/userTypes';
import { UserRolesEnum } from '../enums/UserRolesEnum';
import ErrorMessagesEnum from '../../errors/enums/ErrorMessagesEnum';
import ErrorNamesEnum from '../../errors/enums/ErrorNamesEnum';
import UserRepoException from '../../errors/UserRepoException';

export default class NewUserEntity {
  private email: string;

  private creation_date: number;

  private role: string;

  private email_verified: boolean;

  constructor(email: string) {
    this.email = email?.trim().toLowerCase();
    this.creation_date = dayjs().unix();
    this.role = UserRolesEnum.USER;
    this.email_verified = false;
    this.validate();
  }

  get(): UserItem {
    return {
      email: this.email,
      role: this.role,
      creation_date: this.creation_date,
      email_verified: this.email_verified,
    };
  }

  private validate() {
    // Validate email
    if (!this.email) {
      throw new UserRepoException(
        ErrorMessagesEnum.EMAIL_IS_REQUIRED,
        StatusCodes.BAD_REQUEST,
        ErrorNamesEnum.USER_REGISTRATION
      ).handle();
    }
  }
}
