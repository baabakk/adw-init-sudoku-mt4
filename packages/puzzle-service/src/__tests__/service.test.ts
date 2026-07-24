import { getPuzzle, validateSolution } from '../service';
import { Difficulty } from '../types';

describe('Puzzle Service - Service Layer', () => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  describe('getPuzzle', () => {
    it.each(difficulties)('should return a board for difficulty %s', (difficulty) => {
      const result = getPuzzle(difficulty);
      expect(result).toHaveProperty('board');
      expect(result).toHaveProperty('difficulty', difficulty);
      const board = result.board;
      expect(Array.isArray(board)).toBe(true);
      expect(board.length).toBe(9);
      board.forEach((row) => {
        expect(Array.isArray(row)).toBe(true);
        expect(row.length).toBe(9);
      });
    });
  });

  describe('validateSolution', () => {
    it('should return true for a valid 9x9 numeric board', () => {
      const board = Array.from({ length: 9 }, () => Array(9).fill(0));
      const result = validateSolution(board);
      expect(result).toHaveProperty('isCorrect', true);
    });

    it('should return false for an invalid board shape', () => {
      const board = [[1, 2, 3]]; // not 9x9
      const result = validateSolution(board as any);
      expect(result).toHaveProperty('isCorrect', false);
    });
  });
});
