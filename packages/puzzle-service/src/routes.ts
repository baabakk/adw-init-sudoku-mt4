import { Router, Request, Response, NextFunction } from 'express';
import { generatePuzzle, validatePuzzle } from './service';
import { GetPuzzleResponse, ValidateRequest, ValidateResponse, ErrorResponse } from './types';

const router = Router();

// GET /puzzle?difficulty=easy|medium|hard
router.get('/puzzle', (req: Request, res: Response<GetPuzzleResponse | ErrorResponse>, next: NextFunction) => {
  const difficulty = req.query.difficulty as string;
  if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
    const err: any = new Error('Invalid difficulty');
    err.status = 400;
    return next(err);
  }
  try {
    const puzzle = generatePuzzle(difficulty);
    res.json(puzzle);
  } catch (e) {
    return next(e);
  }
});

// POST /validate
router.post('/validate', (req: Request<{}, ValidateResponse | ErrorResponse, ValidateRequest>, res: Response<ValidateResponse | ErrorResponse>, next: NextFunction) => {
  const { board } = req.body;
  if (!board || !Array.isArray(board) || board.length !== 9) {
    const err: any = new Error('Invalid board payload');
    err.status = 400;
    return next(err);
  }
  try {
    const result = validatePuzzle(board);
    res.json(result);
  } catch (e) {
    return next(e);
  }
});

export default router;
