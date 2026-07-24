/**
 * Error response model adhering to the shared contract.
 */
export interface ErrorResponse {
  /**
   * Machine‑readable error code, e.g., "BAD_REQUEST" or "INTERNAL_ERROR".
   */
  errorCode: string;
  /**
   * Human‑readable message describing the error.
   */
  message: string;
}
