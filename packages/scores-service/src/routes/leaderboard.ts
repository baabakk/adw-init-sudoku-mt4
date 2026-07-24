// src/routes/leaderboard.ts
import { Router, Request, Response } from "express";
import { Difficulty, LeaderboardResponse, ScoreEntry } from "@init-sudoku-mt4/contracts";
import { getTopScores } from "../store";

const router = Router();

function isValidDifficulty(d: string): d is Difficulty {
  return d === "easy" || d === "medium" || d === "hard";
}

router.get("/leaderboard", (req: Request, res: Response) => {
  const difficultyParam = req.query.difficulty as string | undefined;
  if (!difficultyParam || !isValidDifficulty(difficultyParam)) {
    return res.status(400).json({ entries: [] } as LeaderboardResponse);
  }

  const entries: ScoreEntry[] = getTopScores(difficultyParam);
  const response: LeaderboardResponse = { entries };
  res.json(response);
});

export default router;
