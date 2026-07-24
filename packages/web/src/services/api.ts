import type { Difficulty, GetPuzzleResponse, ValidateResponse, ErrorResponse } from '../../../contracts';

/**
 * Fetch a new puzzle from the Puzzle Service.
 */
export async function getPuzzle(difficulty: Difficulty): Promise<GetPuzzleResponse> {
  const url = new URL('/puzzle', window.location.origin);
  url.searchParams.append('difficulty', difficulty);
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    const err: ErrorResponse = await response.json();
    throw err;
  }
  const data: GetPuzzleResponse = await response.json();
  return data;
}

/**
 * Validate the completed board via the Puzzle Service.
 */
export async function validateBoard(board: number[][]): Promise<ValidateResponse> {
  const response = await fetch('/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ board }),
  });
  if (!response.ok) {
    const err: ErrorResponse = await response.json();
    throw err;
  }
  const data: ValidateResponse = await response.json();
  return data;
}
