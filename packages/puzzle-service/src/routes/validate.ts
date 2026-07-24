import { Router, Request, Response, NextFunction } from 'express';
import { ValidateRequest, ValidateResponse, ErrorResponse } from '@init-sudoku-mt4/contracts';
import { validateBoard } from '../services/validator';

const router = Router();

/**
 * POST /validate
 * Accepts a completed Sudoku board and returns whether it is correct.
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as Partial<ValidateRequest>;
  if (!body || !Array.isArray(body.board)) {
    const err: any = new Error('Invalid request payload: board is required');
    err.status = 400;
    return next(err);
  }
  // The contract defines Board as a tuple of rows; runtime we accept any 9x9 array.
  const board = body.board as any;
  const isCorrect = validateBoard(board);
  const payload: ValidateResponse = { isCorrect };
  res.json(payload);
});

export default router;
