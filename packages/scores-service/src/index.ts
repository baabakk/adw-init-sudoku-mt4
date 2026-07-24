import express, { Request, Response, NextFunction } from "express";
import scoresRouter from "./routes/scores";
import leaderboardRouter from "./routes/leaderboard";

const app = express();
app.use(express.json());

// Mount routers
app.use(scoresRouter);
app.use(leaderboardRouter);

// Simple health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Global error handler (fallback)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ errorCode: "INTERNAL_ERROR", message: "An unexpected error occurred" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Scores Service listening on port ${PORT}`);
});

export default app;
