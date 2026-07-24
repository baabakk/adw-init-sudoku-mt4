import { useState } from 'react';
import { submitScore } from '../api/scoresService';
import type { ScoreSubmission, ScoreResponse, ErrorResponse, Difficulty } from '../../contracts';

/**
 * Hook to manage score submission state and API call.
 */
export function useScoreSubmission(difficulty: Difficulty, timeToSolve: number) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (playerName: string): Promise<ScoreResponse | null> => {
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
      return resp;
    } catch (e) {
      const err = e as ErrorResponse;
      setError(err.message ?? 'Failed to submit score');
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, error, success, submit };
}
