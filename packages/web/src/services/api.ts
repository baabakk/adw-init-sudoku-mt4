import type { Difficulty, GetPuzzleResponse, ValidateResponse, ErrorResponse } from '../types';

/**
 * Fetch a new Sudoku puzzle from the Puzzle Service.
 *
 * @param difficulty - Desired difficulty level.
 * @returns The puzzle response containing the board and difficulty.
 * @throws ErrorResponse if the request fails.
 */
export async function getPuzzle(difficulty: Difficulty): Promise<GetPuzzleResponse> {
  const url = new URL('/puzzle', window.location.origin);
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

  const data: GetPuzzleResponse = await response.json();
  return data;
}

/**
 * Validate the current board with the Puzzle Service.
 *
 * @param board - The 9×9 board to validate.
 * @returns Validation result indicating correctness.
 * @throws ErrorResponse if the request fails.
 */
export async function validateBoard(board: number[][]): Promise<ValidateResponse> {
  const response = await fetch('/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ board }),
  });

  if (!response.ok) {
    const err: ErrorResponse = await response.json();
    throw err;
  }

  const data: ValidateResponse = await response.json();
  return data;
}
