import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../models/ErrorResponse';

/**
 * Central error handling middleware.
 * It converts thrown errors or passed error objects into a JSON response
 * adhering to the local `ErrorResponse` model (which matches the shared contract).
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
