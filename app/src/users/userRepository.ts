import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import NewUserEntity from './entities/newUserEntity';
import ExistingUserEntity from './entities/existingUserEntity';
import CustomException from '../errors/CustomException';
import ErrorMessagesEnum from '../errors/enums/ErrorMessagesEnum';
import { UserItem } from './entities/types/userTypes';
import emailSender from '../emailSender/emailSender';
import ErrorNamesEnum from '../errors/enums/ErrorNamesEnum';
import UserModel from './entities/models/UserModel';

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
  // const Table = database.getTable(usersTable ?? '');
  // const User = await Table.getItem(payload.id);
  // if (!User) {
  //   throw new CustomException(
  //     ErrorMessagesEnum.USER_NOT_FOUND,
  //     StatusCodes.NOT_FOUND,
  //     ErrorNamesEnum.GET_USER_PROFILE
  //   ).handle();
  // }
  // const userProfile = new ExistingUserEntity(User).get();
  // return userProfile;
}

export async function getUserByEmail(payload: { email: string }): Promise<any> {
  // const Table = database.getTable(usersTable ?? '');
  // const User = await Table.findItems({ email: payload.email });
  // return User?.[0];
}

export async function createUser(userData) {
  const User = new NewUserEntity(userData.email, userData.password).get();

  // if (await getUserByEmail(User)) {
  //   throw new CustomException(
  //     ErrorMessagesEnum.USER_ALREADY_EXISTS,
  //     StatusCodes.CONFLICT,
  //     ErrorNamesEnum.USER_REGISTRATION
  //   ).handle();
  // }
  const userModel = new UserModel(User);
  await userModel.save();
  // await Table.addItem(User.id, User);
  const userProfile = new ExistingUserEntity(User).get();
  await emailSender(userProfile);

  return userProfile;
}
