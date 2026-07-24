import React, { useState } from 'react';
import { submitScore } from '../api/scoresService';
import type { ScoreSubmission, ScoreResponse, ErrorResponse, Difficulty } from '../../../contracts';
import ErrorDisplay from './ErrorDisplay';
import './styles/ScoreSubmission.css';

interface Props {
  difficulty: Difficulty;
  timeToSolve: number; // seconds
  onScoreSubmitted: (response: ScoreResponse) => void;
}

const ScoreSubmission: React.FC<Props> = ({ difficulty, timeToSolve, onScoreSubmitted }) => {
  const [playerName, setPlayerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName) return;
    setSubmitting(true);
    setError(null);
    const payload: ScoreSubmission = {
      playerName,
      difficulty,
      timeToSolve: timeToSolve * 1000,
    };
    try {
      const resp: ScoreResponse = await submitScore(payload);
      setSuccess(true);
      onScoreSubmitted(resp);
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.message ?? 'Failed to submit score');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <p className="score-success">Score submitted! 🎉</p>;
  }

  return (
    <form className="score-submission" onSubmit={handleSubmit}>
      <h3>Submit Your Score</h3>
      <label>
        Name:
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          disabled={submitting}
          required
        />
      </label>
      <button type="submit" disabled={submitting} className="submit-score-button">
        {submitting ? 'Submitting...' : 'Submit Score'}
      </button>
      {error && <ErrorDisplay message={error} />}
    </form>
  );
};

export default ScoreSubmission;
