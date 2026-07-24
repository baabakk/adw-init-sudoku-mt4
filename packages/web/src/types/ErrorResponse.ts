/**
 * Error response returned by services.
 * Mirrors the shared contract defined in `packages/contracts/src/index.ts`.
 */
export interface ErrorResponse {
  /** Machine‑readable error code */
  errorCode: string;
  /** Human‑readable message */
  message: string;
}
