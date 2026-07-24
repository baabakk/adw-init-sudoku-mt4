// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import scoresRouter from "./routes/scores";
import leaderboardRouter from "./routes/leaderboard";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(scoresRouter);
app.use(leaderboardRouter);

// Simple health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Error handling – catch‑all
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, () => {
  console.log(`Scores Service listening on port ${PORT}`);
});

export default app;
