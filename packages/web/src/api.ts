import type { Difficulty, GetPuzzleResponse, ValidateResponse, ErrorResponse, Board } from '../../contracts/src';

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

/** Validate the completed board via Puzzle Service. */
export async function validateBoard(board: Board): Promise<ValidateResponse> {
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
