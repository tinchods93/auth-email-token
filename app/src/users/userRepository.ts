import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import NewUserEntity from './entities/newUserEntity';
import UserProfileEntity from './entities/userProfileEntity';
import ErrorMessagesEnum from '../errors/enums/ErrorMessagesEnum';
import ErrorNamesEnum from '../errors/enums/ErrorNamesEnum';
import UserModel from './entities/models/userModel';
import { UserModelItem } from './entities/types/userTypes';
import UserRepoException from '../errors/UserRepoException';

dotenv.config();

export default class UserRepository {
  static async getAllUsers() {
    const users = await UserModel.find();

    return users.map((user) => new UserProfileEntity(user.toJSON()).get());
  }

  static async getUserProfile(payload: { id: string }) {
    const userModel = await UserModel.findById(payload.id);

    if (!userModel) {
      throw new UserRepoException(
        ErrorMessagesEnum.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        ErrorNamesEnum.GET_USER_PROFILE
      ).handle();
    }

    const userProfile = new UserProfileEntity(userModel.toJSON()).get();

    return userProfile;
  }

  static async getUserByEmail(payload: { email: string }) {
    console.log('MARTIN_LOG=> getUserByEmail -> payload', payload);
    const userModel = await UserModel.findOne({ email: payload.email });

    if (!userModel) {
      throw new UserRepoException(
        ErrorMessagesEnum.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        ErrorNamesEnum.GET_USER_BY_EMAIL
      ).handle();
    }

    return userModel.toJSON() as UserModelItem;
  }

  static async createUser(userData: { email: string }) {
    const userEntity = new NewUserEntity(userData.email).get();

    const existingUser = await this.getUserByEmail(userEntity).catch(
      () => undefined
    );

    if (existingUser) {
      return existingUser;
    }

    const userModel = new UserModel(userEntity);
    const response = await userModel.save();

    return response.toJSON() as UserModelItem;
  }

  static async updateUser(id: string, payload) {
    const User = await UserModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!User) {
      throw new UserRepoException(
        ErrorMessagesEnum.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
        ErrorNamesEnum.UPDATE_USER
      ).handle();
    }

    return new UserProfileEntity(User.toJSON()).get();
  }
}
