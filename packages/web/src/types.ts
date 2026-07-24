// Types specific to the web client for score submission and leaderboard handling.
// These mirror the shared contracts but are defined locally for convenience.

export interface ScoreSubmission {
  readonly playerName: string;
  readonly difficulty: 'easy' | 'medium' | 'hard';
  /** Time to solve in milliseconds */
  readonly timeToSolve: number;
}

export interface ScoreResponse {
  /** Simple status indicator, e.g., "ok" or "error" */
  readonly status: string;
}

export interface ScoreEntry {
  readonly playerName: string;
  readonly difficulty: 'easy' | 'medium' | 'hard';
  /** Time to solve in milliseconds */
  readonly timeToSolve: number;
  readonly rank: number;
}

export interface LeaderboardResponse {
  /** Up to ten entries sorted by fastest time */
  readonly entries: ReadonlyArray<ScoreEntry>;
}

export interface ErrorResponse {
  readonly errorCode: string;
  readonly message: string;
}
