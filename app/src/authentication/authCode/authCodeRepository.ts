import { StatusCodes } from 'http-status-codes';
import { AuthCodeModelItemType } from './types/authCodeType';
import AuthCodeModel from './models/authCodeModel';
import ErrorMessagesEnum from '../../errors/enums/ErrorMessagesEnum';
import CustomException from '../../errors/CustomException';
import ErrorNamesEnum from '../../errors/enums/ErrorNamesEnum';

export const getAuthCodeByEmail = async (
  email: string
): Promise<AuthCodeModelItemType | null> => {
  const authCode = await AuthCodeModel.findOne({ email });

  if (!authCode) {
    throw new CustomException(
      ErrorMessagesEnum.AUTH_CODE_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.GET_AUTH_CODE_BY_EMAIL
    ).handle();
  }

  return authCode.toJSON();
};

export const createAuthCode = async (input: {
  email: string;
}): Promise<AuthCodeModelItemType> => {
  const authModel = new AuthCodeModel({
    email: input.email,
    auth_code: `${Math.floor(100000 + Math.random() * 900000)}`,
  });

  const response = await authModel.save();

  return response.toJSON();
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
  const authCode = await getAuthCodeByEmail(input.email);

  if (authCode?.auth_code === input.authCode) {
    await updateAuthCode(authCode._id, { used: true });
    return true;
  }

  return false;
};
