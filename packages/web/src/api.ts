import type {
  Difficulty,
  GetPuzzleResponse,
  ValidateResponse,
  ScoreSubmission,
  ScoreResponse,
  LeaderboardResponse,
  ErrorResponse,
} from '../contracts/types';

const API_BASE = '';

/** Fetch a new puzzle from the Puzzle Service. */
export async function getPuzzle(difficulty: Difficulty): Promise<GetPuzzleResponse> {
  const url = `${API_BASE}/puzzle?difficulty=${encodeURIComponent(difficulty)}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    const err: ErrorResponse = await resp.json();
    throw err;
  }
  const data: GetPuzzleResponse = await resp.json();
  return data;
}

/** Submit the completed board for server‑side validation. */
export async function validateBoard(board: any): Promise<ValidateResponse> {
  const url = `${API_BASE}/validate`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ board }),
  });
  if (!resp.ok) {
    const err: ErrorResponse = await resp.json();
    throw err;
  }
  const data: ValidateResponse = await resp.json();
  return data;
}

/** Submit a completed game score to the Scores Service. */
export async function submitScore(payload: ScoreSubmission): Promise<ScoreResponse> {
  const url = `${API_BASE}/scores`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err: ErrorResponse = await resp.json();
    throw err;
  }
  const data: ScoreResponse = await resp.json();
  return data;
}

/** Retrieve the leaderboard for a given difficulty. */
export async function getLeaderboard(difficulty: Difficulty): Promise<LeaderboardResponse> {
  const url = `${API_BASE}/leaderboard?difficulty=${encodeURIComponent(difficulty)}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    const err: ErrorResponse = await resp.json();
    throw err;
  }
  const data: LeaderboardResponse = await resp.json();
  return data;
}
