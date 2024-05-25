import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import NewUserEntity from './entities/newUserEntity';
import ExistingUserEntity from './entities/userProfile';
import CustomException from '../errors/CustomException';
import ErrorMessagesEnum from '../errors/enums/ErrorMessagesEnum';
import ErrorNamesEnum from '../errors/enums/ErrorNamesEnum';
import UserModel from './entities/models/userModel';
import sendRegistrationEmail from '../emailSender/registration/sendRegistrationEmail';
import { createAuthCode } from '../authentication/authCode/authCodeRepository';

dotenv.config();

// const database = Database(process.env.DB_NAME);

// const usersTable = process.env.USER_TABLE_NAME;

export async function getUsers(): Promise<any> {
  // try {
  //   const Table = database.getTable(usersTable ?? '');
  //   const Users = (await Table.scan()) as UserItem[];
  //   if (!Users || !Users.length) {
  //     throw new CustomException(
  //       ErrorMessagesEnum.TABLE_IS_EMPTY,
  //       StatusCodes.CONFLICT,
  //       ErrorNamesEnum.GET_USERS
  //     ).handle();
  //   }
  //   return Users.map((User) => new ExistingUserEntity(User).get());
  // } catch (error) {
  //   if (error instanceof CustomException) {
  //     throw error;
  //   }
  //   throw new CustomException(
  //     error.message,
  //     StatusCodes.INTERNAL_SERVER_ERROR,
  //     ErrorNamesEnum.GET_USERS
  //   ).handle();
  // }
}

export async function getUserProfile(payload: { id: string }): Promise<any> {
  const User = await UserModel.findById(payload.id);
  // const Table = database.getTable(usersTable ?? '');
  // const User = await Table.getItem(payload.id);
  if (!User) {
    throw new CustomException(
      ErrorMessagesEnum.USER_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.GET_USER_PROFILE
    ).handle();
  }

  const userProfile = new ExistingUserEntity(User.toJSON()).get();

  return userProfile;
}

export async function getUserByEmail(payload: { email: string }): Promise<any> {
  const User = await UserModel.findOne({ email: payload.email });

  if (!User) {
    throw new CustomException(
      ErrorMessagesEnum.USER_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.GET_USER_BY_EMAIL
    ).handle();
  }

  const userProfile = new ExistingUserEntity(User.toJSON()).get();

  return userProfile;
}

export async function createUser(userData) {
  const User = new NewUserEntity(userData.email, userData.password).get();

  const existingUser = await getUserByEmail(User).catch(() => undefined);
  if (existingUser) {
    throw new CustomException(
      ErrorMessagesEnum.USER_ALREADY_EXISTS,
      StatusCodes.CONFLICT,
      ErrorNamesEnum.USER_REGISTRATION
    ).handle();
  }
  const userModel = new UserModel(User);
  const response = await userModel.save();

  const userProfile = new ExistingUserEntity(response.toJSON()).get();

  const authCode = await createAuthCode({ email: User.email });

  await sendRegistrationEmail(userProfile, authCode.auth_code);

  return userProfile;
}


export async function updateUser(payload) {
  const User = await UserModel.findByIdAndUpdate(payload.id, payload, {
    new: true,
  });

  if (!User) {
    throw new CustomException(
      ErrorMessagesEnum.USER_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.UPDATE_USER
    ).handle();
  }

  return new ExistingUserEntity(User.toJSON()).get();
}