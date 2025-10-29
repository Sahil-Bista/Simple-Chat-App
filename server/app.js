import express from 'express';
import { Router } from './routes/api/index.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.use('/api', Router);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found `);
  error.statusCode = 404;
  next(error);
});

app.use(globalErrorHandler);

export default app;
