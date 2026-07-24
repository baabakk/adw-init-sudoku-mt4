// src/routes.ts
// Consolidated router for the Scores Service.
// Implements POST /scores and GET /leaderboard according to the contract specifications.

import { Router, Request, Response, NextFunction } from "express";
import {
  ScoreSubmission,
  ScoreResponse,
  Difficulty,
  LeaderboardResponse,
  ErrorResponse,
} from "@init-sudoku-mt4/contracts";
import { addScore, getTopScores } from "./store";

const router = Router();

/**
 * Type guard for ScoreSubmission payload.
 */
function isValidSubmission(body: any): body is ScoreSubmission {
  return (
    typeof body === "object" &&
    body !== null &&
    typeof body.playerName === "string" &&
    typeof body.difficulty === "string" &&
    typeof body.timeToSolve === "number"
  );
}

/**
 * Validate difficulty string.
 */
function parseDifficulty(value: any): Difficulty | undefined {
  if (typeof value !== "string") return undefined;
  if (value === "easy" || value === "medium" || value === "hard") return value as Difficulty;
  return undefined;
}

// POST /scores – record a new score.
router.post("/scores", (req: Request, res: Response) => {
  const body = req.body;
  if (!isValidSubmission(body) || !parseDifficulty(body.difficulty)) {
    const err: ErrorResponse = {
      errorCode: "InvalidPayload",
      message: "Score submission payload is invalid.",
    };
    return res.status(400).json(err);
  }

  // Convert to ScoreEntry (without rank) for storage.
  const entry = {
    playerName: body.playerName,
    difficulty: body.difficulty as Difficulty,
    timeToSolve: body.timeToSolve,
  };

  try {
    addScore(entry);
    const success: ScoreResponse = { status: "ok" };
    return res.json(success);
  } catch (e) {
    const err: ErrorResponse = {
      errorCode: "ServerError",
      message: (e as Error).message ?? "Failed to add score",
    };
    return res.status(500).json(err);
  }
});

// GET /leaderboard – retrieve top‑10 scores for a difficulty.
router.get("/leaderboard", (req: Request, res: Response) => {
  const difficulty = parseDifficulty(req.query.difficulty);
  if (!difficulty) {
    const err: ErrorResponse = {
      errorCode: "InvalidQuery",
      message: "Missing or invalid difficulty query parameter.",
    };
    return res.status(400).json(err);
  }

  const top = getTopScores(difficulty);
  const response: LeaderboardResponse = { entries: top };
  return res.json(response);
});

export default router;
