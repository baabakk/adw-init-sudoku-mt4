// Re-export shared contract types for the web client.
// This file provides a convenient import path for components within the web
// package while ensuring the exact shapes defined in the shared contracts are
// used.

export type {
  Board,
  Difficulty,
  GetPuzzleResponse,
  ValidateResponse,
  ErrorResponse,
  MoveValidation,
  ScoreSubmission,
  ScoreResponse,
  LeaderboardResponse,
  ScoreEntry,
} from "../../contracts/src/index";
