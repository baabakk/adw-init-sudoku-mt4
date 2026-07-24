// src/routes/scores.ts
import { Router, Request, Response } from "express";
import { ScoreSubmission, ScoreResponse, Difficulty } from "@init-sudoku-mt4/contracts";
import { addScore } from "../store";

const router = Router();

/**
 * Validate the shape of a ScoreSubmission payload.
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

function isValidDifficulty(d: string): d is Difficulty {
  return d === "easy" || d === "medium" || d === "hard";
}

router.post("/scores", (req: Request, res: Response) => {
  const body = req.body;
  if (!isValidSubmission(body) || !isValidDifficulty(body.difficulty)) {
    const error: ScoreResponse = { status: "error" };
    return res.status(400).json(error);
  }

  // At this point body is a valid ScoreSubmission with difficulty narrowed.
  const entry: ScoreSubmission = {
    playerName: body.playerName,
    difficulty: body.difficulty,
    timeToSolve: body.timeToSolve,
  };

  try {
    addScore(entry);
    const success: ScoreResponse = { status: "ok" };
    res.json(success);
  } catch (e) {
    const error: ScoreResponse = { status: "error" };
    res.status(500).json(error);
  }
});

export default router;
