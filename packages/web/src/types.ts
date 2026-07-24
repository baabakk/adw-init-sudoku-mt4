// Local type definitions that re-export shared contract interfaces for convenience.
// This file ensures the web client can import the exact contract shapes without
// needing to know the internal path of the contracts package.

import type {
  ScoreSubmission,
  ScoreResponse,
  LeaderboardResponse,
  ScoreEntry,
  ErrorResponse,
} from "../contracts/types";

export type { ScoreSubmission, ScoreResponse, LeaderboardResponse, ScoreEntry, ErrorResponse };
