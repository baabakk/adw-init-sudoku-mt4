/**
 * Leaderboard response containing top entries.
 * Mirrors the shared contract defined in `packages/contracts/src/index.ts`.
 */
export interface LeaderboardResponse {
  /** Up to ten entries sorted by fastest time first */
  entries: ScoreEntry[];
}

/**
 * Individual leaderboard entry.
 */
export interface ScoreEntry {
  /** Player's name */
  playerName: string;
  /** Difficulty level */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Time to solve in milliseconds */
  timeToSolve: number;
  /** Rank (1‑based) */
  rank: number;
}
