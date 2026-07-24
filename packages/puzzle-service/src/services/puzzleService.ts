import { Difficulty, GetPuzzleResponse, ValidateResponse } from '../types';
import { getPuzzle as serviceGetPuzzle, validateSolution as serviceValidateSolution } from '../service';

/**
 * Wrapper around the service layer to match the expected controller imports.
 * Generates a puzzle for the given difficulty.
 */
export function generatePuzzle(difficulty: Difficulty): GetPuzzleResponse {
  return serviceGetPuzzle(difficulty);
}

/**
 * Wrapper around the service layer to validate a Sudoku board.
 */
export function validateBoard(board: number[][]): ValidateResponse {
  return serviceValidateSolution(board);
}
