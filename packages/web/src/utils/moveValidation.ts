/**
 * Simple client‑side move validation for Sudoku.
 * Checks that the value is between 1 and 9, the coordinates are within bounds,
 * and the target cell is currently empty (0).
 */
export interface Move {
  board: number[][];
  row: number;
  col: number;
  value: number;
}

export function isMoveValid(move: Move): boolean {
  const { board, row, col, value } = move;
  if (row < 0 || row > 8 || col < 0 || col > 8) return false;
  if (value < 1 || value > 9) return false;
  // Ensure the cell is empty (0) before placing a value
  if (board[row][col] !== 0) return false;
  return true;
}
