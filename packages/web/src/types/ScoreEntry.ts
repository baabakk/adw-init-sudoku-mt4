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
