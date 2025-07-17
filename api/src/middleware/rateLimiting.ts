import rateLimit from 'express-rate-limit';
import { Request } from 'express';
import getConfig from '@/config';

const config = getConfig();
const { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } = config;

/**
 * General rate limiter for all API endpoints
 */
export const generalLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS, // 15 minutes by default
  max: RATE_LIMIT_MAX_REQUESTS, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000 / 60) // minutes
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req: Request) => {
    // Use API key if available, otherwise fall back to IP
    const apiKey = req.headers['x-api-key'] as string || 
                   req.headers['authorization']?.toString().replace('Bearer ', '') ||
                   req.headers['api-key'] as string;
    
    return apiKey || req.ip || 'unknown';
  }
});

/**
 * Stricter rate limiter for sync operations (more resource intensive)
 */
export const syncLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each API key to 10 sync requests per hour
  message: {
    success: false,
    error: 'Too many sync requests, please try again later. Sync operations are limited to preserve server resources.',
    retryAfter: 60 // minutes
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const apiKey = req.headers['x-api-key'] as string || 
                   req.headers['authorization']?.toString().replace('Bearer ', '') ||
                   req.headers['api-key'] as string;
    
    return `sync_${apiKey || req.ip || 'unknown'}`;
  }
});

/**
 * Rate limiter for registration endpoints (prevents spam)
 */
export const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 registration attempts per 15 minutes
  message: {
    success: false,
    error: 'Too many registration attempts from this IP, please try again later.',
    retryAfter: 15 // minutes
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

export default {
  general: generalLimiter,
  sync: syncLimiter,
  registration: registrationLimiter
}; 