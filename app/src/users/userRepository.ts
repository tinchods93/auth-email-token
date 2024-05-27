import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import NewUserEntity from './entities/newUserEntity';
import UserProfile from './entities/userProfile';
import CustomException from '../errors/CustomException';
import ErrorMessagesEnum from '../errors/enums/ErrorMessagesEnum';
import ErrorNamesEnum from '../errors/enums/ErrorNamesEnum';
import UserModel from './entities/models/userModel';
import sendRegistrationEmail from '../emailSender/registration/sendRegistrationEmail';
import { createJwtToken } from '../authentication/authCode/authCodeRepository';
import { UserModelItem } from './entities/types/userTypes';

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
  const userModel = await UserModel.findById(payload.id);

  if (!userModel) {
    throw new CustomException(
      ErrorMessagesEnum.USER_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.GET_USER_PROFILE
    ).handle();
  }

  const userProfile = new UserProfile(userModel.toJSON()).get();

  return userProfile;
}

export async function getUserByEmail(payload: {
  email: string;
}): Promise<UserModelItem> {
  console.log('MARTIN_LOG=> getUserByEmail -> payload', payload);
  const userModel = await UserModel.findOne({ email: payload.email });

  if (!userModel) {
    throw new CustomException(
      ErrorMessagesEnum.USER_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.GET_USER_BY_EMAIL
    ).handle();
  }

  return userModel.toJSON() as UserModelItem;
}

export async function createUser(userData: {
  email: string;
  password: string;
}) {
  const userEntity = new NewUserEntity(userData.email, userData.password).get();

  const existingUser = await getUserByEmail(userEntity).catch(() => undefined);

  if (existingUser) {
    throw new CustomException(
      ErrorMessagesEnum.USER_ALREADY_EXISTS,
      StatusCodes.CONFLICT,
      ErrorNamesEnum.USER_REGISTRATION
    ).handle();
  }
  const userModel = new UserModel(userEntity);
  const response = await userModel.save();

  const userProfile = new UserProfile(response.toJSON()).get();

  const authCode = await createJwtToken({ email: userEntity.email });

  await sendRegistrationEmail(userProfile, authCode.auth_code);

  return userProfile;
}

export async function updateUser(id: string, payload) {
  const User = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!User) {
    throw new CustomException(
      ErrorMessagesEnum.USER_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.UPDATE_USER
    ).handle();
  }

  return new UserProfile(User.toJSON()).get();
}
