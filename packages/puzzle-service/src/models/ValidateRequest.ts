import { Board } from '@init-sudoku-mt4/contracts';

/**
 * Request payload for POST /validate.
 */
export interface ValidateRequest {
  /** The full 9×9 board submitted by the client for validation. */
  board: Board;
}
