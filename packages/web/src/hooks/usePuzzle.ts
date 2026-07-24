import { useState, useEffect, useCallback } from 'react';
import { getPuzzle } from '../services/api';
import type { Difficulty, GetPuzzleResponse, ErrorResponse, Board } from '../contracts/types';

/**
 * Custom hook to fetch a Sudoku puzzle for a given difficulty.
 * Returns the board, loading state, and any error message.
 */
export function usePuzzle(initialDifficulty: Difficulty = 'easy') {
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPuzzle = useCallback(async (diff: Difficulty) => {
    setLoading(true);
    setError(null);
    try {
      const data: GetPuzzleResponse = await getPuzzle(diff);
      setBoard(data.board);
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.error ?? 'Failed to fetch puzzle');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPuzzle(difficulty);
  }, [difficulty, fetchPuzzle]);

  return { difficulty, setDifficulty, board, loading, error, refetch: fetchPuzzle };
}
