import { Board } from '@init-sudoku-mt4/contracts';

/**
 * Checks whether a completed Sudoku board is valid.
 * It verifies that each row, column, and 3×3 sub‑grid contains the numbers 1‑9 exactly once.
 */
export function validateBoard(board: Board): boolean {
  // Helper to check an array of 9 numbers contains 1-9 exactly once.
  const isValidGroup = (group: readonly number[]): boolean => {
    const seen = new Set<number>();
    for (const val of group) {
      if (val < 1 || val > 9) return false;
      if (seen.has(val)) return false;
      seen.add(val);
    }
    return seen.size === 9;
  };

  // Rows
  for (let r = 0; r < 9; r++) {
    if (!isValidGroup(board[r])) return false;
  }

  // Columns
  for (let c = 0; c < 9; c++) {
    const col: number[] = [];
    for (let r = 0; r < 9; r++) col.push(board[r][c]);
    if (!isValidGroup(col)) return false;
  }

  // 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const box: number[] = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          box.push(board[boxRow * 3 + r][boxCol * 3 + c]);
        }
      }
      if (!isValidGroup(box)) return false;
    }
  }

  return true;
}
