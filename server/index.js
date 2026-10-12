import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import dbAdapter from './database/dbAdapter.js';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Serve built frontend assets if production dist exists
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing (Express 5 compatible)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      res.status(200).send('Zenith GymSoft API Server is running. Frontend dev server is on http://localhost:5173');
    }
  });
});

// Boot database & server
async function startServer() {
  try {
    const dbType = await dbAdapter.connect();
    app.listen(PORT, () => {
      console.log(`===================================================`);
      console.log(`  🚀 Zenith GymSoft Multi-DB Server Online!`);
      console.log(`  📍 Port: http://localhost:${PORT}`);
      console.log(`  💾 Active DB Engine: ${dbType.toUpperCase()}`);
      console.log(`  🩺 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`===================================================`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

export default app;
