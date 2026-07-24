// Shared contracts for the Sudoku platform
// This file contains ONLY type definitions that are shared across the Web client,
// Puzzle Service, and Scores Service. It is compiled with "strict": true.

/**
 * The difficulty level of a Sudoku puzzle.
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * A 9×9 Sudoku board. Each inner array represents a row. The value `0` denotes an
 * empty cell, while `1`‑`9` denote filled cells.
 */
export type Board = ReadonlyArray<ReadonlyArray<number>>;

/**
 * Core domain entity representing a generated puzzle. It is produced by the
 * Puzzle Service and consumed by the Web client. The `solution` is included so
 * that the Puzzle Service can validate a submitted board without needing to
 * recompute the solution.
 */
export interface Puzzle {
  readonly board: Board; // initial board with zeros for empty cells
  readonly solution: Board; // fully solved board
  readonly difficulty: Difficulty;
}

/**
 * Core domain entity representing a recorded score. It is produced by the Web
 * client (via the Scores Service) and stored by the Scores Service.
 */
export interface Score {
  readonly playerName: string;
  readonly difficulty: Difficulty;
  /**
   * Time taken to solve the puzzle, expressed in milliseconds.
   */
  readonly timeToSolve: number;
  /**
   * ISO‑8601 timestamp of when the score was recorded.
   */
  readonly timestamp: string;
}

/**
 * A single entry in a leaderboard response. The `rank` is 1‑based and reflects
 * the position of the entry when the leaderboard is sorted by `timeToSolve`
 * ascending.
 */
export interface ScoreEntry {
  readonly playerName: string;
  readonly difficulty: Difficulty;
  readonly timeToSolve: number; // milliseconds
  readonly rank: number;
}

/**
 * Request payload for GET /puzzle. The difficulty is supplied as a query
 * parameter, but we model it as a request object for symmetry with other
 * endpoints.
 */
export interface GetPuzzleRequest {
  readonly difficulty: Difficulty;
}

/**
 * Response payload for GET /puzzle.
 */
export interface GetPuzzleResponse {
  /**
   * The initial board presented to the player. Empty cells are represented by
   * `0`.
   */
  readonly board: Board;
  readonly difficulty: Difficulty;
}

/**
 * Request payload for POST /validate.
 */
export interface ValidateRequest {
  /**
   * The full 9×9 board submitted by the client for validation. Empty cells are
   * represented by `0`. The service will compare this board against the stored
   * solution.
   */
  readonly board: Board;
}

/**
 * Response payload for POST /validate.
 */
export interface ValidateResponse {
  /**
   * `true` when the submitted board matches the stored solution and the puzzle
   * has a unique solution; otherwise `false`.
   */
  readonly isCorrect: boolean;
}

/**
 * Request payload for POST /scores.
 */
export interface ScoreSubmission {
  readonly playerName: string;
  readonly difficulty: Difficulty;
  /**
   * Time taken to solve the puzzle, expressed in milliseconds.
   */
  readonly timeToSolve: number;
}

/**
 * Response payload for POST /scores.
 */
export interface ScoreResponse {
  /**
   * Simple status indicator. Typical values are "ok" or "error".
   */
  readonly status: string;
}

/**
 * Response payload for GET /leaderboard.
 */
export interface LeaderboardResponse {
  /**
   * Up to ten entries sorted by fastest `timeToSolve` first.
   */
  readonly entries: ReadonlyArray<ScoreEntry>;
}

/**
 * Generic error response used by any service.
 */
export interface ErrorResponse {
  readonly errorCode: string;
  readonly message: string;
}

/* -------------------------------------------------------------------------- */
/* UI event contracts – these are consumed only by the Web client but are kept */
/* in the shared contracts package so that the client and any future tooling */
/* share a single source of truth. */
/* -------------------------------------------------------------------------- */

/** Event emitted to render a board. */
export interface RenderBoardEvent {
  readonly board: Board;
}

/** Event emitted when the player selects a difficulty. */
export interface SelectDifficultyEvent {
  readonly difficulty: Difficulty;
}

/** Event emitted to validate a single move entered by the player. */
export interface ValidateMoveEvent {
  readonly row: number; // 0‑8
  readonly col: number; // 0‑8
  readonly value: number; // 1‑9
}

/** Event emitted to display an error message to the user. */
export interface ShowErrorEvent {
  readonly message: string;
}
