enum ErrorNamesEnum {
  GET_USERS = 'GetUsersException',
  GET_USER_BY_EMAIL = 'GetUsersByEmailException',
  GET_USER_PROFILE = 'GetUserProfileException',
  GET_AUTH_CODE_BY_EMAIL = 'GetAuthCodeByEmailException',
  TOKEN_VERIFICATION = 'TokenVerificationException',
  USER_REPO_ERROR = 'UserRepoException',
  USER_REGISTRATION = 'UserRegistrationException',
  UPDATE_USER = 'UpdateUserException',
  SCHEMA_VALIDATION = 'SchemaValidationException',
  LOGIN = 'LoginException',
  JWT_TOKEN_ERROR = 'JwtTokenErrorException',
}

export default ErrorNamesEnum;
