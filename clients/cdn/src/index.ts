import 'dotenv/config';

import express from 'express';

import { Logger } from '@packages/logger';

const app = express();

const { PORT } = process.env;

app.get('/', (_request, response) => {
  return response.json({ message: 'Hello! You are on the CDN.' });
});

app.listen(PORT, () =>
  Logger.info(`CDN running on url http://localhost:${PORT}`, { label: 'HTTP' }),
);
