export class MpesaResponseError extends Error {
  statusCode: number;
  data: any;
  constructor(message: string, statusCode: number, data: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}
