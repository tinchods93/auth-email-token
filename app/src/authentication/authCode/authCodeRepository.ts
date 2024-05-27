import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { AuthCodeModelItemType } from './types/authCodeType';
import AuthCodeModel from './models/authCodeModel';
import ErrorMessagesEnum from '../../errors/enums/ErrorMessagesEnum';
import CustomException from '../../errors/CustomException';
import ErrorNamesEnum from '../../errors/enums/ErrorNamesEnum';
import { UserModelItem } from '../../users/entities/types/userTypes';
import UserProfile from '../../users/entities/userProfile';

export const queryAuthCode = async ({
  email,
  authCode,
}: {
  email: string;
  authCode: string;
}): Promise<AuthCodeModelItemType | null> => {
  const authCodeItem = await AuthCodeModel.findOne({
    email,
    auth_code: authCode,
  });

  if (!authCodeItem) {
    throw new CustomException(
      ErrorMessagesEnum.AUTH_CODE_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.GET_AUTH_CODE_BY_EMAIL
    ).handle();
  }

  return authCodeItem.toJSON();
};

export const createJwtToken = async (
  input: UserModelItem
): Promise<AuthCodeModelItemType> => {
  try {
    const userProfile = new UserProfile(input).get();
    const token = jwt.sign(userProfile, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  } catch (error) {
    throw new CustomException(
      ErrorMessagesEnum.JWT_TOKEN_ERROR,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorNamesEnum.JWT_TOKEN_ERROR
    ).handle();
  }
};

export const updateAuthCode = async (
  id: string,
  payload: { used: boolean }
): Promise<void> => {
  await AuthCodeModel.updateOne({ _id: id }, payload);
};

export const verifyAuthCode = async (input: {
  email: string;
  authCode: string;
}): Promise<boolean> => {
  const authCode = await queryAuthCode(input);

  if (!authCode || authCode.used || authCode.auth_code !== input.authCode) {
    return false;
  }

  await updateAuthCode(authCode._id, { used: true });
  return true;
};
