import { Router } from 'express';
import videoRoutes from './videoRoutes';
import eventRoutes from './eventRoutes';
import youthCampRoutes from './youthCampRoutes';

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
      health: '/api/health'
    },
    documentation: 'Contact the church for API documentation',
    timestamp: new Date().toISOString()
  });
});

export default router; 