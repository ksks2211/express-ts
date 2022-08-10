import { HttpError } from "http-errors";
import HttpStatusCodes from "http-status-codes";

export abstract class CustomBadRequestError extends HttpError {
  public readonly status = HttpStatusCodes.BAD_REQUEST;

  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }
}

export class ParamMissingError extends CustomBadRequestError {
  public static readonly Msg =
    "One or more of the required parameters was missing.";
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
  }
}

// export class UserNotFoundError extends CustomBadRequestError {
//   public static readonly Msg =
//     "A user with the given id does not exists in the database.";
//   public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

//   constructor() {
//     super(UserNotFoundError.Msg, UserNotFoundError.HttpStatus);
//   }
// }
