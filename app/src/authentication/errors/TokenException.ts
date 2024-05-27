import { StatusCodes } from 'http-status-codes';
import { ErrorHandlerInterface } from '../../errors/interfaces/ErrorHandlerInterface';
import ErrorNamesEnum from '../../errors/enums/ErrorNamesEnum';
import { ErrorMessageType } from '../../errors/types/ErrorMessageType';
import ErrorMessagesEnum from '../../errors/enums/ErrorMessagesEnum';

/**
 * Represents a `TokenException`.
 * @class
 * @implements {ErrorHandlerInterface}
 */
export default class TokenException
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
    message = ErrorMessagesEnum.TOKEN_VERIFICATION_FAILED,
    status = StatusCodes.UNAUTHORIZED
  ) {
    super(message);
    this.name = ErrorNamesEnum.TOKEN_VERIFICATION;
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
