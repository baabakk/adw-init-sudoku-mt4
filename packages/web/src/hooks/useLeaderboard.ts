import { useEffect, useState } from 'react';
import { getLeaderboard } from '../api/scoresService';
import type { Difficulty, LeaderboardResponse, ScoreEntry, ErrorResponse } from '../../contracts';

/**
 * Hook to fetch and cache leaderboard data for a given difficulty.
 * Returns the entries, loading flag and any error message.
 */
export function useLeaderboard(difficulty: Difficulty) {
  const [entries, setEntries] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: LeaderboardResponse = await getLeaderboard(difficulty);
        if (!cancelled) setEntries([...data.entries]);
      } catch (e) {
        const err = e as ErrorResponse;
        if (!cancelled) setError(err.message ?? 'Failed to load leaderboard');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [difficulty]);

  return { entries, loading, error };
}
