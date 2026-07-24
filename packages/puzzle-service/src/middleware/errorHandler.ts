import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '@init-sudoku-mt4/contracts';

/**
 * Central error handling middleware.
 * Converts thrown errors into a JSON response adhering to the shared ErrorResponse contract.
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
