import { Router, Request, Response, NextFunction } from 'express';
import { Difficulty, GetPuzzleResponse, ValidateRequest, ValidateResponse, ErrorResponse } from '@init-sudoku-mt4/contracts';
import { getPuzzle, postValidate } from '../controllers/puzzleController';

const router = Router();

/**
 * GET /puzzle?difficulty={easy|medium|hard}
 * Delegates to the controller.
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getPuzzle(req, res, next);
});

/**
 * POST /validate
 * Delegates to the controller.
 */
router.post('/validate', (req: Request, res: Response, next: NextFunction) => {
  postValidate(req, res, next);
});

export default router;
