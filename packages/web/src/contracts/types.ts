// Re-export shared contract types for internal use within the web client.
// This file intentionally does NOT import any non‑existent members such as MoveValidation.

export type {
  Difficulty,
  Board,
  GetPuzzleResponse,
  ValidateResponse,
  ErrorResponse,
  ScoreSubmission,
  ScoreResponse,
  LeaderboardResponse,
  ScoreEntry,
} from '../../contracts';
