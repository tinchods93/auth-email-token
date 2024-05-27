import sendRegistrationEmail from '../emailSender/login/sendRegistrationEmail';
import AuthTokenRepository from './authCode/authTokenRepository';
import UserProfileEntity from '../users/entities/userProfileEntity';
import { UserProfileType } from '../users/entities/types/userTypes';
import TokenException from './errors/TokenException';
import UserRepository from '../users/userRepository';

export async function verifyTokenDomain(token: string) {
  const authTokenRepository = new AuthTokenRepository();

  console.log('MARTIN_LOG=> verifyUserEmail -> token', token);
  const tokenData = await authTokenRepository.verify(token);

  if (!tokenData) {
    throw new TokenException().handle();
  }
  const userData = tokenData as UserProfileType;

  if (!userData.email_verified) {
    await UserRepository.updateUser(userData._id, { email_verified: true });
  }

  return userData;
}

export async function passwordlessLogin(email: string) {
  const authTokenRepository = new AuthTokenRepository();

  const user =
    (await UserRepository.getUserByEmail({ email }).catch(() => undefined)) ??
    (await UserRepository.createUser({ email }));

  const userProfile = new UserProfileEntity(user).get();

  const jwtToken = await authTokenRepository.create(userProfile);

  await sendRegistrationEmail(userProfile, jwtToken);
}
