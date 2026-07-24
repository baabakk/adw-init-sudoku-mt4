// Re-export shared contract types for internal imports
import type * as Contracts from '../../contracts/src';
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
