import express, { type Express } from 'express';

import { errorMiddleware } from './middlewares/error.middleware';
import { requestInfoMeddleware } from './middlewares/info.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import apiRouter from './routes';

const app: Express = express();

app.use(express.json());

app.use(requestInfoMeddleware);

// routes
app.use('/api/v1', apiRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
