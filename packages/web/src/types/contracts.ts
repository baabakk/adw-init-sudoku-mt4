// Re-export shared contract types for the web client.
// This file provides local aliases to avoid deep import paths throughout the codebase.

import type {
  Board,
  Difficulty,
  GetPuzzleResponse,
  ValidateResponse,
  ErrorResponse,
  Score,
  ScoreEntry,
  ScoreResponse,
  ScoreSubmission,
  LeaderboardResponse,
} from '../../contracts';

export type {
  Board,
  Difficulty,
  GetPuzzleResponse,
  ValidateResponse,
  ErrorResponse,
  Score,
  ScoreEntry,
  ScoreResponse,
  ScoreSubmission,
  LeaderboardResponse,
};
