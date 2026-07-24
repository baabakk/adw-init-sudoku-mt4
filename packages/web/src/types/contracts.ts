// Internal type re-exports for the web client.
// Previously this file attempted to import a non‑existent `MoveValidation` contract,
// which caused compilation errors. The shared contracts package does not export
// such a type, so we only re‑export the types that actually exist.

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
