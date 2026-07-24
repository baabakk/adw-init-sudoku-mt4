import { Request, Response, NextFunction } from 'express';
import { Difficulty, GetPuzzleResponse, ValidateRequest, ValidateResponse, ErrorResponse } from '@init-sudoku-mt4/contracts';
import { generatePuzzle, validateBoard } from '../services/puzzleService';

/**
 * Handles GET /puzzle requests.
 */
export function getPuzzle(req: Request, res: Response, next: NextFunction) {
  try {
    const difficultyParam = req.query.difficulty as string | undefined;
    if (!difficultyParam) {
      const err: any = new Error('Missing difficulty query parameter');
      err.status = 400;
      err.errorCode = 'MISSING_PARAMETER';
      return next(err);
    }
    const allowed: Difficulty[] = ['easy', 'medium', 'hard'];
    if (!allowed.includes(difficultyParam as Difficulty)) {
      const err: any = new Error(`Unsupported difficulty '${difficultyParam}'.`);
      err.status = 400;
      err.errorCode = 'INVALID_PARAMETER';
      return next(err);
    }
    const difficulty = difficultyParam as Difficulty;
    const board = generatePuzzle(difficulty);
    const payload: GetPuzzleResponse = { board, difficulty };
    res.json(payload);
  } catch (e) {
    return next(e);
  }
}

/**
 * Handles POST /validate requests.
 */
export function postValidate(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as Partial<ValidateRequest>;
    if (!body || !Array.isArray(body.board)) {
      const err: any = new Error('Invalid request payload: board is required');
      err.status = 400;
      err.errorCode = 'INVALID_PAYLOAD';
      return next(err);
    }
    const board = body.board as any;
    const isCorrect = validateBoard(board);
    const payload: ValidateResponse = { isCorrect };
    res.json(payload);
  } catch (e) {
    return next(e);
  }
}
