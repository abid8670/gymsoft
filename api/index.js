import express from 'express';
import cors from 'cors';
import dbAdapter from '../server/database/dbAdapter.js';
import apiRouter from '../server/routes/api.js';

const app = express();

app.use(cors());
app.use(express.json());

// Lazy database connection initialization for Serverless Cold Starts
let isDbReady = false;
app.use(async (req, res, next) => {
  if (!isDbReady) {
    try {
      await dbAdapter.connect();
      isDbReady = true;
    } catch (err) {
      console.error('[Vercel Serverless] DB connection error:', err);
    }
  }
  next();
});

// Mount API routes under /api and root (Vercel routes rewrite)
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
