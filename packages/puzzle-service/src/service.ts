import { Board, Difficulty, GetPuzzleResponse, ValidateResponse } from '@init-sudoku-mt4/contracts';
import { validateBoard } from './services/validator';

/**
 * Generate a fully solved Sudoku board using backtracking.
 * This is a deterministic algorithm suitable for our stateless service.
 */
function generateSolvedBoard(): Board {
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const shuffle = (arr: number[]) => arr.sort(() => Math.random() - 0.5);

  const isSafe = (row: number, col: number, num: number): boolean => {
    // Row
    for (let c = 0; c < 9; c++) if (board[row][c] === num) return false;
    // Column
    for (let r = 0; r < 9; r++) if (board[r][col] === num) return false;
    // 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[startRow + r][startCol + c] === num) return false;
      }
    }
    return true;
  };

  const fillCell = (index: number): boolean => {
    if (index === 81) return true; // all cells filled
    const row = Math.floor(index / 9);
    const col = index % 9;
    if (board[row][col] !== 0) return fillCell(index + 1);
    const shuffled = shuffle([...numbers]);
    for (const num of shuffled) {
      if (isSafe(row, col, num)) {
        board[row][col] = num;
        if (fillCell(index + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  };

  // Start filling; if it fails (extremely unlikely) retry.
  while (!fillCell(0)) {
    // reset board and try again
    for (let r = 0; r < 9; r++) board[r].fill(0);
  }

  // Cast to Board (readonly) – the service returns mutable board for client.
  return board as unknown as Board;
}

/**
 * Remove cells from a solved board to create a puzzle of the requested difficulty.
 * The number of clues is based on common difficulty heuristics.
 */
function maskBoard(solved: Board, difficulty: Difficulty): Board {
  const cluesMap: Record<Difficulty, number> = {
    easy: 36, // 36 clues => 45 empty cells
    medium: 32,
    hard: 28,
  };
  const totalCells = 81;
  const clues = cluesMap[difficulty];
  const empties = totalCells - clues;

  // Create a mutable copy
  const puzzle = (solved as unknown as number[][]).map(row => [...row]);

  let removed = 0;
  while (removed < empties) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }
  return puzzle as unknown as Board;
}

/**
 * Public API: generate a puzzle for the given difficulty.
 */
export function getPuzzle(difficulty: Difficulty = 'easy'): GetPuzzleResponse {
  const solved = generateSolvedBoard();
  const puzzleBoard = maskBoard(solved, difficulty);
  return {
    board: puzzleBoard,
    difficulty,
  };
}

/**
 * Public API: validate a submitted board.
 * Returns true if the board is a valid Sudoku solution.
 */
export function validatePuzzle(board: Board): ValidateResponse {
  const isCorrect = validateBoard(board);
  return { isCorrect };
}
