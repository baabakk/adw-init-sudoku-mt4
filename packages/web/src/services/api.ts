import type { Difficulty, GetPuzzleResponse, ValidateResponse, Board, ScoreSubmission, ScoreResponse, LeaderboardResponse, ErrorResponse } from '../contracts/types';
import { getPuzzle as fetchPuzzle, validateBoard as fetchValidateBoard } from '../api';
import { submitScore as postScore, getLeaderboard as fetchLeaderboard } from '../api/scoresService';

/**
 * Wrapper around puzzle service GET /puzzle.
 */
export async function getPuzzle(difficulty: Difficulty): Promise<GetPuzzleResponse> {
  return fetchPuzzle(difficulty);
}

/**
 * Wrapper around puzzle service POST /validate.
 */
export async function validateBoard(board: Board): Promise<ValidateResponse> {
  return fetchValidateBoard(board);
}

/**
 * Wrapper around scores service POST /scores.
 */
export async function submitScore(submission: ScoreSubmission): Promise<ScoreResponse> {
  return postScore(submission);
}

/**
 * Wrapper around scores service GET /leaderboard.
 */
export async function getLeaderboard(difficulty: Difficulty): Promise<LeaderboardResponse> {
  return fetchLeaderboard(difficulty);
}
