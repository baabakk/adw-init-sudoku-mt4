import express, { Request, Response, NextFunction } from 'express';
import puzzleRouter from './routes/puzzle';
import validateRouter from './routes/validate';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/puzzle', puzzleRouter);
app.use('/validate', validateRouter);

// 404 handler for unknown routes
app.use((req: Request, _res: Response, next: NextFunction) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Puzzle Service listening on port ${PORT}`);
  });
}

export default app;
