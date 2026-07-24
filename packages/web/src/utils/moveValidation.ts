import type { MoveValidation, Board } from '../contracts/types';

/**
 * Validate a single Sudoku move according to classic Sudoku rules.
 * Returns true if placing `value` at (`row`, `col`) does not violate any
 * constraints on the provided board.
 */
export function isMoveValid(move: MoveValidation): boolean {
  const { board, row, col, value } = move;
  if (value < 1 || value > 9) return false;
  // Ensure the cell is currently empty (0) before the move – the client
  // may allow overwriting, but validation should treat the new board as final.
  // The board already includes the attempted move, so we need to ignore the
  // current cell when checking for duplicates.

  // Row check
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c] === value) return false;
  }
  // Column check
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col] === value) return false;
  }
  // Subgrid check
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (r === row && c === col) continue;
      if (board[r][c] === value) return false;
    }
  }
  return true;
}
