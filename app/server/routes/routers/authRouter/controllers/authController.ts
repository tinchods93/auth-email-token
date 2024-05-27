import passwordlessLoginHandler from './handlers/passwordlessLoginHandler';
import verifyTokenHandler from './handlers/verifyDomainHandler';

const authController = {
  login: passwordlessLoginHandler,
  verify: verifyTokenHandler,
};

export default authController;
