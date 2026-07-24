/**
 * Response from the Scores Service after submitting a score.
 * Mirrors the shared contract defined in `packages/contracts/src/index.ts`.
 */
export interface ScoreResponse {
  /** Simple status indicator, e.g., "ok" or "error" */
  status: string;
}
