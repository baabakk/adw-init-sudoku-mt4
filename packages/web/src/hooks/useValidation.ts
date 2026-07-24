import { useState, useCallback } from 'react';
import { validateBoard } from '../services/api';
import type { Board, ValidateResponse, ErrorResponse } from '../contracts/types';

/**
 * Hook to submit a Sudoku board for server‑side validation.
 * Returns the validation result, loading flag, and any error message.
 */
export function useValidation() {
  const [result, setResult] = useState<ValidateResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (board: Board) => {
    setLoading(true);
    setError(null);
    try {
      const res: ValidateResponse = await validateBoard(board);
      setResult(res);
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.error ?? 'Validation failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, submit };
}
