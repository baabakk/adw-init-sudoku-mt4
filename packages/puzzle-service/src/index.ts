import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import routes from './routes';
import { errorHandler } from './errors';

const app = express();
app.use(json());
app.use('/api', routes);
// Fallback route for health check or root
app.get('/', (_req: Request, res: Response) => {
  res.send('Puzzle Service is running');
});
// Error handling middleware (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Puzzle Service listening on port ${PORT}`);
  });
}

export default app;
