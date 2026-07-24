import { Difficulty, GetPuzzleResponse, ValidateResponse } from './types';

/**
 * Generates a Sudoku puzzle board for the given difficulty.
 * This is a stub implementation that returns an empty 9x9 board.
 * In a real implementation, a puzzle generator would create a uniquely solvable board.
 */
export function getPuzzle(difficulty: Difficulty): GetPuzzleResponse {
  // Create a 9x9 board filled with zeros (empty cells)
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  return { board, difficulty };
}

/**
 * Validates a submitted Sudoku board.
 * This stub simply checks that the board is a 9x9 array of numbers and returns true.
 */
export function validateSolution(board: number[][]): ValidateResponse {
  const isCorrect = Array.isArray(board) && board.length === 9 && board.every(row => Array.isArray(row) && row.length === 9 && row.every(cell => typeof cell === 'number'));
  return { isCorrect };
}
