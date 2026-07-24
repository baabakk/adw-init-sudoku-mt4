import type { ScoreSubmission, ScoreResponse, LeaderboardResponse, ErrorResponse, Difficulty } from '../types';

const API_BASE = '';

/**
 * Submit a completed game score.
 */
export async function submitScore(submission: ScoreSubmission): Promise<ScoreResponse> {
  const url = `${API_BASE}/scores`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });
  if (!resp.ok) {
    const err: ErrorResponse = await resp.json();
    throw err;
  }
  const data: ScoreResponse = await resp.json();
  return data;
}

/**
 * Retrieve the leaderboard for a given difficulty.
 */
export async function getLeaderboard(difficulty: Difficulty): Promise<LeaderboardResponse> {
  const url = `${API_BASE}/leaderboard?difficulty=${encodeURIComponent(difficulty)}`;
  const resp = await fetch(url, { method: 'GET' });
  if (!resp.ok) {
    const err: ErrorResponse = await resp.json();
    throw err;
  }
  const data: LeaderboardResponse = await resp.json();
  return data;
}
