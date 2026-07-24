import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from './types';

/**
 * Custom error class for service errors.
 */
export class ServiceError extends Error {
  public status: number;
  public errorCode: string;
  constructor(message: string, status = 500, errorCode = String(status)) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}

/**
 * Central error handling middleware.
 * It converts thrown errors or passed error objects into a JSON response
 * adhering to the shared `ErrorResponse` contract.
 */
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  const status = err.status ?? 500;
  const payload: ErrorResponse = {
    errorCode: err.errorCode ?? String(status),
    message: err.message ?? 'Internal Server Error',
  };
  res.status(status).json(payload);
}
