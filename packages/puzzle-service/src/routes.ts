import { Router, Request, Response, NextFunction } from 'express';
import { getPuzzle, validatePuzzle } from './service';
import { GetPuzzleResponse, ValidateRequest, ValidateResponse } from './types';

const router = Router();

/**
 * GET /puzzle?difficulty=easy|medium|hard
 * Returns a generated puzzle.
 */
router.get('/puzzle', (req: Request, res: Response, next: NextFunction) => {
  try {
    const difficulty = (req.query.difficulty as string) ?? 'easy';
    const puzzle: GetPuzzleResponse = getPuzzle(difficulty);
    res.json(puzzle);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /validate
 * Body: { board: number[][] }
 */
router.post('/validate', (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as ValidateRequest;
    const result: ValidateResponse = validatePuzzle(body.board);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
