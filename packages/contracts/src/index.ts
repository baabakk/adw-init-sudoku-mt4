/**
 * Shared contracts for the Sudoku platform.
 * All teams import these types to ensure a single source of truth for request
 * and response payloads as well as domain entities.
 *
 * The file is compiled with "strict": true.
 */

/**
 * Core domain value types – the nouns that flow between subsystems.
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * A Sudoku board is a 9×9 grid. Cells contain numbers 1‑9; 0 represents an empty cell.
 */
export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type Board = [Row, Row, Row, Row, Row, Row, Row, Row, Row];

/**
 * The puzzle that the Puzzle Service generates.
 */
export interface Puzzle {
  /** The initial board presented to the player (0 = empty). */
  board: Board;
  /** Difficulty level of the puzzle. */
  difficulty: Difficulty;
}

/**
 * A completed game score recorded by the Scores Service.
 */
export interface Score {
  /** Player's display name. */
  playerName: string;
  /** Difficulty of the puzzle that was solved. */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle, in seconds. */
  timeToSolve: number;
  /** ISO‑8601 timestamp when the score was recorded. */
  recordedAt: string;
}

/**
 * An entry in a leaderboard – essentially a Score without the timestamp.
 */
export interface ScoreEntry {
  playerName: string;
  difficulty: Difficulty;
  timeToSolve: number;
}

/**
 * The leaderboard for a particular difficulty – up to ten entries sorted by the
 * fastest solve time.
 */
export interface Leaderboard {
  difficulty: Difficulty;
  entries: ScoreEntry[]; // length 0‑10
}

/**
 * Payload used by the client to validate a single move before sending it to the
 * server.
 */
export interface MoveValidation {
  /** Current board state (including the attempted move). */
  board: Board;
  /** Row index (0‑8) of the cell being changed. */
  row: number;
  /** Column index (0‑8) of the cell being changed. */
  col: number;
  /** Value the player wants to place (1‑9). */
  value: number;
}

/**
 * Request / response shapes for the Puzzle Service API.
 */
export interface GetPuzzleRequest {
  difficulty: Difficulty;
}

export interface GetPuzzleResponse {
  board: Board;
  difficulty: Difficulty;
}

export interface ValidateRequest {
  board: Board;
}

export interface ValidateResponse {
  isCorrect: boolean;
}

/**
 * Request / response shapes for the Scores Service API.
 */
export interface ScoreSubmission {
  playerName: string;
  difficulty: Difficulty;
  timeToSolve: number;
}

export interface ScoreResponse {
  /** Simple status string – e.g. "ok" or "error". */
  status: string;
}

export interface LeaderboardResponse {
  entries: ScoreEntry[]; // up to 10 entries
}

/**
 * Generic error payload used by any service.
 */
export interface ErrorResponse {
  /** Human‑readable error message. */
  error: string;
  /** Optional HTTP status code. */
  code?: number;
}

/**
 * UI event contracts that the Web Client may expose to other front‑end modules.
 * They are exported as function type aliases so that other packages can type‑
 * check callbacks.
 */
export type RenderBoard = (board: Board) => void;
export type SelectDifficulty = (difficulty: Difficulty) => void;
export type ValidateMove = (row: number, col: number, value: number) => boolean;
export type ShowError = (message: string) => void;

/**
 * Enumerations for fixed string literals used in responses.
 */
export enum ScoreStatus {
  OK = 'ok',
  ERROR = 'error',
}
