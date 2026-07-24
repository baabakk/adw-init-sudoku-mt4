// src/routes.ts
// Consolidates all route modules for the Scores Service.
import { Router } from "express";
import scoresRouter from "./routes/scores";
import leaderboardRouter from "./routes/leaderboard";

const router = Router();
router.use(scoresRouter);
router.use(leaderboardRouter);

export default router;
