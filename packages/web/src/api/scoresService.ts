import type { Difficulty, ScoreSubmission, ScoreResponse, LeaderboardResponse, ErrorResponse } from '../types';

/**
 * Submit a completed game score to the Scores Service.
 *
 * @param submission - The score payload to send.
 * @returns The parsed ScoreResponse from the service.
 * @throws An ErrorResponse if the request fails.
 */
export async function submitScore(submission: ScoreSubmission): Promise<ScoreResponse> {
  const response = await fetch('/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    // Attempt to parse error response
    const err: ErrorResponse = await response.json();
    throw err;
  }

  const data: ScoreResponse = await response.json();
  return data;
}

/**
 * Retrieve the top‑10 leaderboard for a given difficulty.
 *
 * @param difficulty - The difficulty level to query.
 * @returns The parsed LeaderboardResponse.
 * @throws An ErrorResponse if the request fails.
 */
export async function getLeaderboard(difficulty: Difficulty): Promise<LeaderboardResponse> {
  const url = new URL('/leaderboard', window.location.origin);
  url.searchParams.append('difficulty', difficulty);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const err: ErrorResponse = await response.json();
    throw err;
  }

  const data: LeaderboardResponse = await response.json();
  return data;
}
