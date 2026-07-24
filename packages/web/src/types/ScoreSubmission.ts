/**
 * Score submission payload sent to the Scores Service.
 * Mirrors the shared contract defined in `packages/contracts/src/index.ts`.
 */
export interface ScoreSubmission {
  /** Player's display name */
  playerName: string;
  /** Difficulty level of the puzzle solved */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Time taken to solve the puzzle, in milliseconds */
  timeToSolve: number;
}
