// src/index.ts
// Entry point for the Scores Service.
// Sets up an Express application, registers the unified router, and starts the server.

import express, { Request, Response, NextFunction } from "express";
import router from "./routes";

const app = express();

// Middleware to parse JSON bodies.
app.use(express.json());

// Register the unified router handling /scores and /leaderboard.
app.use(router);

// Simple health check endpoint.
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Global error handler.
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, () => {
  console.log(`Scores Service listening on port ${PORT}`);
});

export default app;
