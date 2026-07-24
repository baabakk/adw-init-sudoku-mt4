import { Router, Request, Response, NextFunction } from 'express';
import { getPuzzle, postValidate } from '../controllers/puzzleController';

const router = Router();

// GET /puzzle?difficulty={easy|medium|hard}
router.get('/puzzle', (req: Request, res: Response, next: NextFunction) => {
  getPuzzle(req, res, next);
});

// POST /validate
router.post('/validate', (req: Request, res: Response, next: NextFunction) => {
  postValidate(req, res, next);
});

export default router;
