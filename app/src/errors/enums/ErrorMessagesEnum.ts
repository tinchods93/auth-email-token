enum ErrorMessagesEnum {
  USER_NOT_FOUND = 'User not found',
  USER_ALREADY_EXISTS = 'User already exists',
  EMAIL_IS_REQUIRED = 'Email is required',
  PASSWORD_IS_REQUIRED = 'Password is required',
  PASSWORD_INVALID_LENGTH = 'Password must be at least 8 characters long',

  JWT_TOKEN_ERROR = 'JWT token error',

  INVALID_VERIFICATION_CODE = 'Invalid verification code',

  AUTH_CODE_NOT_FOUND = 'Auth code not found',

  TABLE_IS_EMPTY = 'Table is empty',
}

export default ErrorMessagesEnum;
