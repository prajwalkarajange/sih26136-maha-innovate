import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { initDb } from './db/init.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import challengeRoutes from './routes/challenges.routes.js';
import startupRoutes from './routes/startups.routes.js';
import proposalRoutes from './routes/proposals.routes.js';
import pilotRoutes from './routes/pilots.routes.js';
import procurementRoutes from './routes/procurements.routes.js';
import scalingRoutes from './routes/scaling.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import adminRoutes from './routes/admin.routes.js';
import aiRoutes from './routes/ai.routes.js';
import uploadRoutes from './routes/upload.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
const uploadsDir = path.resolve(process.cwd(), './uploads');
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/pilots', pilotRoutes);
app.use('/api/procurements', procurementRoutes);
app.use('/api/scaling', scalingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'MahaInnovate',
    version: '1.0.0',
    problemStatementId: 26136,
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend dist if built
const clientDist = path.resolve(process.cwd(), '../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('MahaInnovate API Server is running. Client is built in client/dist.');
    }
  });
});

// Start server
async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`  MAHAINNOVATE SERVER RUNNING ON PORT ${PORT}`);
      console.log(`  Government Problem Statement ID 26136`);
      console.log(`  API Health: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
