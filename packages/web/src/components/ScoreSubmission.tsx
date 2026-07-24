import React, { useState } from 'react';
import { submitScore } from '../services/api';
import type { ScoreSubmission, ScoreResponse, ErrorResponse, Difficulty } from '../contracts/types';
import ErrorDisplay from './ErrorDisplay';

interface Props {
  /** Difficulty of the puzzle that was solved */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle in milliseconds */
  timeToSolve: number;
  /** Callback invoked after a successful score submission */
  onScoreSubmitted: (response: ScoreResponse) => void;
}

const ScoreSubmission: React.FC<Props> = ({ difficulty, timeToSolve, onScoreSubmitted }) => {
  const [playerName, setPlayerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Player name is required');
      return;
    }
    setSubmitting(true);
    setError(null);
    const payload: ScoreSubmission = {
      playerName: playerName.trim(),
      difficulty,
      timeToSolve,
    };
    try {
      const resp: ScoreResponse = await submitScore(payload);
      onScoreSubmitted(resp);
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.message ?? 'Failed to submit score');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="score-submission">
      <h2>Submit Your Score</h2>
      <form onSubmit={handleSubmit} className="score-form">
        <input
          type="text"
          placeholder="Your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          disabled={submitting}
          className="score-input"
        />
        <button type="submit" disabled={submitting} className="score-button">
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <ErrorDisplay message={error} />}
    </div>
  );
};

export default ScoreSubmission;
