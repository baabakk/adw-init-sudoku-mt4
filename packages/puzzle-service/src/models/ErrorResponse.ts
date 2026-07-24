/**
 * Standard error response format matching the shared contracts.
 */
export interface ErrorResponse {
  /** Machine‑readable error code */
  errorCode: string;
  /** Human‑readable error message */
  message: string;
}
