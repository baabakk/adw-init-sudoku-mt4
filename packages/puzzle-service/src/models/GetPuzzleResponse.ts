import { Board, Difficulty } from '@init-sudoku-mt4/contracts';

/**
 * Response payload for GET /puzzle.
 */
export interface GetPuzzleResponse {
  /** The initial board presented to the player. Empty cells are represented by `0`. */
  board: Board;
  /** The difficulty level of the puzzle. */
  difficulty: Difficulty;
}
