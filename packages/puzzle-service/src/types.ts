// src/types.ts
// Re-export shared contract types for local convenience and future extension.

import {
  GetPuzzleRequest,
  GetPuzzleResponse,
  ValidateRequest,
  ValidateResponse,
  ErrorResponse,
  MoveValidation,
} from "@init-sudoku-mt4/contracts";

export type { GetPuzzleRequest, GetPuzzleResponse, ValidateRequest, ValidateResponse, ErrorResponse, MoveValidation };
