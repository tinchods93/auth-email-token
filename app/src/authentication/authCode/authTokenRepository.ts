import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import ErrorMessagesEnum from '../../errors/enums/ErrorMessagesEnum';
import { UserProfileType } from '../../users/entities/types/userTypes';
import TokenException from '../errors/TokenException';

export default class AuthTokenRepository {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
  }

  public async create(input: UserProfileType): Promise<string> {
    try {
      const token = jwt.sign(input, this.secret, {
        expiresIn: '1h',
      });
      return token;
    } catch (error) {
      throw new TokenException(
        ErrorMessagesEnum.JWT_TOKEN_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      ).handle();
    }
  }

  public async verify(token: string) {
    try {
      console.log('MARTIN_LOG=> verifyUserEmail -> token', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log('MARTIN_LOG=> verifyToken -> decoded', decoded);

      return decoded;
    } catch (error) {
      console.log('MARTIN_LOG=> verifyToken -> error', error);
      return undefined;
    }
  }
}
