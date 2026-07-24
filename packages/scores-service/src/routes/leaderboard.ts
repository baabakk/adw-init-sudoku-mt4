// src/routes/leaderboard.ts
import { Router, Request, Response } from "express";
import { Difficulty, LeaderboardResponse } from "@init-sudoku-mt4/contracts";
import { getTopScores } from "../store";

const router = Router();

function parseDifficulty(value: any): Difficulty | undefined {
  if (typeof value !== "string") return undefined;
  if (value === "easy" || value === "medium" || value === "hard") return value as Difficulty;
  return undefined;
}

router.get("/leaderboard", (req: Request, res: Response) => {
  const difficulty = parseDifficulty(req.query.difficulty);
  if (!difficulty) {
    return res.status(400).json({ entries: [] } as LeaderboardResponse);
  }
  const top = getTopScores(difficulty);
  const response: LeaderboardResponse = { entries: top };
  res.json(response);
});

export default router;
