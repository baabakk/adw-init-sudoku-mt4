import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/api';
import type { LeaderboardResponse, ScoreEntry, Difficulty, ErrorResponse } from '../contracts/types';
import ErrorDisplay from './ErrorDisplay';

interface Props {
  /** Difficulty for which to show the leaderboard */
  difficulty: Difficulty;
  /** Optional pre-fetched entries; if not provided, component will fetch */
  entries?: ScoreEntry[];
}

const Leaderboard: React.FC<Props> = ({ difficulty, entries: propEntries }) => {
  const [entries, setEntries] = useState<ScoreEntry[]>(propEntries ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (propEntries) return; // already have entries
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: LeaderboardResponse = await getLeaderboard(difficulty);
        setEntries(data.entries);
      } catch (e) {
        const err = e as ErrorResponse;
        setError(err.message ?? 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [difficulty, propEntries]);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="leaderboard">
      <h2>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No scores yet.</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.rank}>
                <td>{entry.rank}</td>
                <td>{entry.playerName}</td>
                <td>{(entry.timeToSolve / 1000).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
