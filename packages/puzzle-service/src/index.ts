import express, { Request, Response, NextFunction } from 'express';
import puzzleRouter from './routes/puzzleRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the puzzle router at the root path
app.use('/', puzzleRouter);

// 404 handler for unknown routes
app.use((req: Request, _res: Response, next: NextFunction) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Central error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Puzzle Service listening on port ${PORT}`);
  });
}

export default app;
