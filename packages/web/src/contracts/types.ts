// Re-export shared contract types for convenience within the web client.
// Excludes any non-existent types such as MoveValidation.
export type {
  Difficulty,
  Board,
  GetPuzzleResponse,
  ValidateResponse,
  ScoreSubmission,
  ScoreResponse,
  LeaderboardResponse,
  ScoreEntry,
  ErrorResponse,
} from '../../../contracts/src/index';
