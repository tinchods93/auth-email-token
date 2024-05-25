import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { UserItem } from './types/userTypes';
import { UserRolesEnum } from '../enums/UserRolesEnum';
import ErrorMessagesEnum from '../../errors/enums/ErrorMessagesEnum';
import ErrorNamesEnum from '../../errors/enums/ErrorNamesEnum';
import CustomException from '../../errors/CustomException';

export default class NewUserEntity {
  private email: string;

  private password: string;

  private creation_date: number;

  private role: string;

  private email_verified: boolean;

  constructor(email: string, password: string) {
    this.email = email?.trim().toLowerCase();
    this.password = password;
    this.creation_date = dayjs().unix();
    this.role = UserRolesEnum.USER;
    this.email_verified = false;
    this.validate();
    this.buildPassword();
  }

  get(): UserItem {
    return {
      email: this.email,
      role: this.role,
      password: this.password,
      creation_date: this.creation_date,
      email_verified: this.email_verified,
    };
  }

  private validate() {
    // Validate email
    if (!this.email) {
      throw new CustomException(
        ErrorMessagesEnum.EMAIL_IS_REQUIRED,
        StatusCodes.BAD_REQUEST,
        ErrorNamesEnum.USER_REGISTRATION
      ).handle();
    }
    // Validate password
    if (!this.password) {
      throw new CustomException(
        ErrorMessagesEnum.PASSWORD_IS_REQUIRED,
        StatusCodes.BAD_REQUEST,
        ErrorNamesEnum.USER_REGISTRATION
      ).handle();
    }

    if (this.password.length < 8) {
      throw new CustomException(
        ErrorMessagesEnum.PASSWORD_INVALID_LENGTH,
        StatusCodes.BAD_REQUEST,
        ErrorNamesEnum.USER_REGISTRATION
      ).handle();
    }
  }

  private buildPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
