import { ErrorResponse } from './types';

/**
 * Utility to create a standardized ErrorResponse object.
 */
export function createErrorResponse(errorCode: string, message: string): ErrorResponse {
  return { errorCode, message };
}

/**
 * Central Express error handling middleware.
 * It expects errors to have optional `status` and `errorCode` properties.
 */
import { Request, Response, NextFunction } from 'express';
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
