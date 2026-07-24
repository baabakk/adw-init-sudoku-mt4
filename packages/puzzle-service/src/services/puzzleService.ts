import { Difficulty, Board } from '@init-sudoku-mt4/contracts';

/**
 * Generates a Sudoku puzzle board for the given difficulty.
 *
 * For the purpose of this phase, the implementation returns a board filled with
 * zeros (empty cells). In a real implementation this would generate a uniquely
 * solvable puzzle with the appropriate number of clues.
 */
export function generatePuzzle(difficulty: Difficulty): Board {
  // Create a 9×9 board of zeros.
  const emptyRow = Array(9).fill(0);
  const board: number[][] = Array.from({ length: 9 }, () => [...emptyRow]);
  // The type `Board` is a readonly nested array, but returning a mutable array
  // is acceptable because it satisfies the structural shape.
  return board as Board;
}

/**
 * Validates a submitted Sudoku board.
 *
 * This stub checks that the board is a 9×9 array and that each cell contains a
 * number between 1 and 9 (inclusive). It does **not** verify Sudoku rules –
 * that logic will be added in a later phase.
 */
export function validateBoard(board: unknown): boolean {
  if (!Array.isArray(board) || board.length !== 9) return false;
  for (const row of board) {
    if (!Array.isArray(row) || row.length !== 9) return false;
    for (const cell of row) {
      if (typeof cell !== 'number' || cell < 1 || cell > 9) return false;
    }
  }
  return true;
}
