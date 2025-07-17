import { Router } from 'express';
import videoRoutes from './videoRoutes';
import eventRoutes from './eventRoutes';
import youthCampRoutes from './youthCampRoutes';
import { getCronStatus } from '@/services/cronService';
import { requireApiKey } from '@/middleware/auth';
import { catchAsync } from '@/middleware/errorHandler';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Templo API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API status endpoint (requires API key)
router.get('/status', requireApiKey, catchAsync(async (req, res) => {
  const cronStatus = getCronStatus();
  
  res.json({
    success: true,
    message: 'API Status',
    server: {
      environment: process.env.NODE_ENV,
      version: '1.0.0',
      uptime: process.uptime(),
      memory: process.memoryUsage()
    },
    cron: cronStatus,
    endpoints: {
      videos: '/api/videos',
      events: '/api/events',
      youthCamp: '/api/youth-camp',
      health: '/api/health'
    },
    timestamp: new Date().toISOString()
  });
}));

// Mount route modules
router.use('/videos', videoRoutes);
router.use('/events', eventRoutes);
router.use('/youth-camp', youthCampRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Templo Church API',
    version: '1.0.0',
    endpoints: {
      videos: '/api/videos',
      events: '/api/events',
      youthCamp: '/api/youth-camp',
      health: '/api/health',
      status: '/api/status (requires API key)'
    },
    documentation: 'Contact the church for API documentation',
    timestamp: new Date().toISOString()
  });
});

export default router; 