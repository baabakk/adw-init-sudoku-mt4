// Re-export shared contract types for internal imports
// Adjusted import path to correctly reference the contracts package
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
} from '../../contracts/src';
