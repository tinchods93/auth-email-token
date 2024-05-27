import { StatusCodes } from 'http-status-codes';
import { ErrorHandlerInterface } from './interfaces/ErrorHandlerInterface';
import ErrorMessagesEnum from './enums/ErrorMessagesEnum';
import ErrorNamesEnum from './enums/ErrorNamesEnum';
import { ErrorMessageType } from './types/ErrorMessageType';

/**
 * Represents a `TokenException`.
 * @class
 * @implements {ErrorHandlerInterface}
 */
export default class UserRepoException
  extends Error
  implements ErrorHandlerInterface
{
  status: number;

  /**
   * Constructs a new `TokenException`.
   * @param message - An optional error message.
   * @param status - An optional HTTP status code.
   */
  constructor(
    message = ErrorMessagesEnum.USER_NOT_FOUND,
    status = StatusCodes.UNAUTHORIZED,
    name = ErrorNamesEnum.USER_REPO_ERROR
  ) {
    super(message);
    this.name = name;
    this.status = status;
  }

  /**
   * Handles the `TokenException` by building and returning an error payload.
   * @returns An `Error` object with the error payload.
   */
  handle() {
    return new Error(this.buildErrorPayload());
  }

  /**
   * Builds the error payload.
   * @returns A stringified JSON object containing the error payload and status.
   */
  private buildErrorPayload() {
    const finalMessage: ErrorMessageType = {
      payload: {
        message: this.message,
        exception_name: this.name,
      },
      status: this.status,
    };

    return JSON.stringify(finalMessage);
  }
}
