import loginDomain from './domain/loginDomain';
import profileDomain from './domain/profileDomain';
import registerDomain from './domain/registerDomain';

const userController = {
  login: loginDomain,
  register: registerDomain,
  profile: profileDomain,
};

export default userController;
