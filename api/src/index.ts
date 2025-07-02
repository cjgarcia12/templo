import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import getConfig from './config';

const config = getConfig();
const { PORT, NODE_ENV, FRONTEND_URL } = config;
import connectDB from './db/connection';
import routes from './routes';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';
import { generalLimiter } from './middleware/rateLimiting';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: [
    FRONTEND_URL,
    'http://localhost:3000', // Development frontend
    'http://127.0.0.1:3000', // Alternative localhost
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Request parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Apply rate limiting to all routes
app.use(generalLimiter);

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Templo Church API Server',
    version: '1.0.0',
    environment: NODE_ENV,
    endpoints: {
      api: '/api',
      health: '/api/health',
      videos: '/api/videos',
      events: '/api/events',
      youthCamp: '/api/youth-camp'
    },
    timestamp: new Date().toISOString()
  });
});

// Handle 404 errors
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(globalErrorHandler);

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDB();
    console.log('📦 Database connected successfully');

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
      console.log(`🔗 API URL: http://localhost:${PORT}/api`);
      console.log(`🏠 Frontend URL: ${FRONTEND_URL}`);
      
      if (NODE_ENV === 'development') {
        console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
        console.log(`🎬 Videos: http://localhost:${PORT}/api/videos`);
        console.log(`📅 Events: http://localhost:${PORT}/api/events`);
        console.log(`🏕️ Youth Camp: http://localhost:${PORT}/api/youth-camp`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();

export default app;
