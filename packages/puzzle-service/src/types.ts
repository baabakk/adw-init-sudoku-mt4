/**
 * Difficulty levels for Sudoku puzzles.
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Response payload for GET /puzzle.
 */
export interface GetPuzzleResponse {
  /** 9x9 Sudoku board where 0 represents an empty cell */
  board: number[][];
  /** Difficulty level of the generated puzzle */
  difficulty: Difficulty;
}

/**
 * Request payload for POST /validate.
 */
export interface ValidateRequest {
  /** 9x9 Sudoku board submitted for validation */
  board: number[][];
}

/**
 * Response payload for POST /validate.
 */
export interface ValidateResponse {
  /** Whether the submitted board is a correct solution */
  isCorrect: boolean;
}

/**
 * Standard error response format.
 */
export interface ErrorResponse {
  /** Machine‑readable error code */
  errorCode: string;
  /** Human‑readable error message */
  message: string;
}
