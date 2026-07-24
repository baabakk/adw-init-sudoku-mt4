import { Router, Request, Response, NextFunction } from 'express';
import { Difficulty, GetPuzzleResponse, ErrorResponse } from '@init-sudoku-mt4/contracts';
import { generatePuzzle } from '../services/puzzleGenerator';

const router = Router();

/**
 * GET /puzzle?difficulty={easy|medium|hard}
 * Returns a Sudoku puzzle board for the requested difficulty.
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const difficultyParam = req.query.difficulty as string | undefined;
  if (!difficultyParam) {
    const err: any = new Error('Missing difficulty query parameter');
    err.status = 400;
    return next(err);
  }

  // Validate difficulty against the contract's union type.
  const allowed: Difficulty[] = ['easy', 'medium', 'hard'];
  if (!allowed.includes(difficultyParam as Difficulty)) {
    const err: any = new Error(`Unsupported difficulty '${difficultyParam}'. Allowed values are easy, medium, hard.`);
    err.status = 400;
    return next(err);
  }

  const difficulty = difficultyParam as Difficulty;
  const board = generatePuzzle(difficulty);
  const payload: GetPuzzleResponse = { board, difficulty };
  res.json(payload);
});

export default router;
