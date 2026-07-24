// Re-export shared contract types for the Puzzle Service API.
// This file provides a thin layer over the shared contracts package so that
// internal code can import from a local path while still adhering to the exact
// contract definitions.

export { Difficulty, GetPuzzleResponse, ValidateRequest, ValidateResponse, ErrorResponse } from '@init-sudoku-mt4/contracts';
