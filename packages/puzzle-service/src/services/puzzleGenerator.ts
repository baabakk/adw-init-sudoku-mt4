import { Difficulty, Board } from '@init-sudoku-mt4/contracts';

/**
 * Generates a fully solved Sudoku board using backtracking.
 * Returns a 9x9 array of numbers (1‑9).
 */
function generateSolvedBoard(): number[][] {
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function shuffle(arr: number[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function isSafe(row: number, col: number, num: number): boolean {
    // Row
    for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
    // Column
    for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
    // 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  }

  function fillCell(idx: number): boolean {
    if (idx === 81) return true; // all cells filled
    const row = Math.floor(idx / 9);
    const col = idx % 9;
    if (board[row][col] !== 0) return fillCell(idx + 1);
    const shuffled = shuffle([...numbers]);
    for (const num of shuffled) {
      if (isSafe(row, col, num)) {
        board[row][col] = num;
        if (fillCell(idx + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  fillCell(0);
  return board;
}

/**
 * Removes numbers from a solved board to create a puzzle.
 * The number of clues left depends on difficulty.
 */
function createPuzzleFromSolved(solved: number[][], difficulty: Difficulty): number[][] {
  // Number of clues to keep for each difficulty (typical ranges).
  const cluesMap: Record<Difficulty, number> = {
    easy: 36,
    medium: 30,
    hard: 24,
  };
  const clues = cluesMap[difficulty];
  const totalCells = 81;
  const cellsToRemove = totalCells - clues;

  const puzzle = solved.map(row => row.slice());
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  return puzzle;
}

/**
 * Public API: generate a Sudoku puzzle board for the given difficulty.
 */
export function generatePuzzle(difficulty: Difficulty): Board {
  const solved = generateSolvedBoard();
  const puzzle = createPuzzleFromSolved(solved, difficulty);
  // Cast to Board (tuple) – runtime shape matches.
  return puzzle as unknown as Board;
}
