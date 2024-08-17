import { ErrorResponse } from "./types";

export class MpesaResponseError extends Error {
  statusCode: number;
  data: ErrorResponse;
  constructor(message: string, statusCode: number, data: ErrorResponse) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}
