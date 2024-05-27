import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { getUserByEmail, updateUser } from '../users/userRepository';
import UserProfile from '../users/entities/userProfile';
import { LoginInputType } from './types/authenticationTypes';
import LoginException from '../errors/LoginException';
import { LoginSchema } from '../models/schemas/LoginSchema';
import SchemaValidator from '../models/SchemaValidator';
import { createJwtToken, verifyAuthCode } from './authCode/authCodeRepository';
import CustomException from '../errors/CustomException';
import ErrorMessagesEnum from '../errors/enums/ErrorMessagesEnum';
import ErrorNamesEnum from '../errors/enums/ErrorNamesEnum';
import sendRegistrationEmail from '../emailSender/registration/sendRegistrationEmail';

export async function Login(input: LoginInputType) {
  const schemaValidation = new SchemaValidator(LoginSchema).validate(input);
  console.log('schemaValidation', schemaValidation);

  const user = await getUserByEmail({ email: input.email });

  if (!user) {
    throw new LoginException().handle();
  }

  const isPasswordCorrect = bcrypt.compareSync(input.password, user?.password);

  if (!isPasswordCorrect) {
    throw new LoginException().handle();
  }

  return new UserProfile(user).get();
}

export async function verifyUserEmail(email: string, code: string) {
  console.log('MARTIN_LOG=> verifyUserEmail -> email, code', email, code);
  const [verifyCode, user] = await Promise.all([
    verifyAuthCode({
      email,
      authCode: code,
    }),
    getUserByEmail({ email }),
  ]);

  if (!verifyCode) {
    throw new CustomException(
      ErrorMessagesEnum.INVALID_VERIFICATION_CODE,
      StatusCodes.BAD_REQUEST,
      ErrorNamesEnum.GET_AUTH_CODE
    ).handle();
  }

  await updateUser(user?._id.toString(), { email_verified: true });
}

export async function sendPasswordlessEmail(email: string) {
  const user = await getUserByEmail({ email });

  if (!user) {
    throw new CustomException(
      ErrorMessagesEnum.USER_NOT_FOUND,
      StatusCodes.NOT_FOUND,
      ErrorNamesEnum.GET_USER_BY_EMAIL
    ).handle();
  }

  const authCode = await createJwtToken(user);

  await sendRegistrationEmail(user, authCode.auth_code);
}
