import express, { Request, Response } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/errorHandler';
import taskRoutes from './routes/taskRoutes';

// Builds the Express app. Kept separate from server.ts so it can be tested without starting a server.
const app = express();

app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
