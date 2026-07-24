import { GetPuzzleResponse, ValidateResponse, Difficulty } from './types';

/**
 * Generate a Sudoku puzzle for the given difficulty.
 * For the purpose of this service we return an empty board (all zeros).
 * In a real implementation this would generate a uniquely solvable puzzle.
 */
export function generatePuzzle(difficulty: string): GetPuzzleResponse {
  const diff = difficulty as Difficulty;
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  return { board, difficulty: diff };
}

/**
 * Validate a submitted Sudoku board.
 * This placeholder implementation simply checks that the board is a 9x9 array
 * and returns true. Real validation would verify Sudoku rules.
 */
export function validatePuzzle(board: number[][]): ValidateResponse {
  // Basic shape validation
  if (!Array.isArray(board) || board.length !== 9) {
    return { isCorrect: false };
  }
  for (const row of board) {
    if (!Array.isArray(row) || row.length !== 9) {
      return { isCorrect: false };
    }
  }
  // Placeholder: assume correct
  return { isCorrect: true };
}
