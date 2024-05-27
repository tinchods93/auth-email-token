import passwordlessLoginDomain from './domain/passwordlessLoginDomain';
import verifyEmailDomain from './domain/verifyDomain';

const authController = {
  login: passwordlessLoginDomain,
  verify: verifyEmailDomain,
};

export default authController;
