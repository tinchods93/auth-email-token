import { StatusCodes } from 'http-status-codes';
import ErrorNamesEnum from '../../../../../../src/errors/enums/ErrorNamesEnum';
import { ErrorHandlerInterface } from '../../../../../../src/errors/interfaces/ErrorHandlerInterface';
import { ErrorMessageType } from '../../../../../../src/errors/types/ErrorMessageType';

/**
 * Represents a `LoginException`.
 * @class
 * @implements {ErrorHandlerInterface}
 */
export default class LoginException
  extends Error
  implements ErrorHandlerInterface
{
  status: number;

  /**
   * Constructs a new `LoginException`.
   * @param message - An optional error message.
   * @param status - An optional HTTP status code.
   */
  constructor(message = 'Invalid email', status = StatusCodes.BAD_REQUEST) {
    super(message);
    this.name = ErrorNamesEnum.LOGIN;
    this.status = status;
  }

  /**
   * Handles the `LoginException` by building and returning an error payload.
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
