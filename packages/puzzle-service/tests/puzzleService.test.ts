import { generatePuzzle, validateBoard } from '../src/services/puzzleService';
import { Difficulty } from '@init-sudoku-mt4/contracts';

describe('Puzzle Service', () => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  test.each(difficulties)('generatePuzzle returns a 9x9 board for %s difficulty', (difficulty) => {
    const board = generatePuzzle(difficulty);
    expect(Array.isArray(board)).toBe(true);
    expect(board).toHaveLength(9);
    board.forEach((row) => {
      expect(Array.isArray(row)).toBe(true);
      expect(row).toHaveLength(9);
    });
  });

  test('validateBoard returns false for incomplete board', () => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    expect(validateBoard(board)).toBe(false);
  });

  test('validateBoard returns false for out-of-range values', () => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(1));
    // introduce an invalid value
    (board[0][0] as any) = 10;
    expect(validateBoard(board)).toBe(false);
  });

  test('validateBoard returns true for a valid completed board', () => {
    // a known valid solved Sudoku board
    const board = [
      [5,3,4,6,7,8,9,1,2],
      [6,7,2,1,9,5,3,4,8],
      [1,9,8,3,4,2,5,6,7],
      [8,5,9,7,6,1,4,2,3],
      [4,2,6,8,5,3,7,9,1],
      [7,1,3,9,2,4,8,5,6],
      [9,6,1,5,3,7,2,8,4],
      [2,8,7,4,1,9,6,3,5],
      [3,4,5,2,8,6,1,7,9],
    ];
    expect(validateBoard(board)).toBe(true);
  });
});
