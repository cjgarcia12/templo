import { Request, Response, NextFunction } from 'express';
import getConfig from '@/config';

const config = getConfig();
const { API_SECRET_KEY } = config;

export interface AuthenticatedRequest extends Request {
  apiKey?: string;
}

/**
 * Validates API key from request headers
 */
export function validateApiKey(req: Request): boolean {
  // Check for API key in multiple header formats
  const apiKey = req.headers['x-api-key'] as string || 
                 req.headers['authorization']?.toString().replace('Bearer ', '') ||
                 req.headers['api-key'] as string;
  
  if (!API_SECRET_KEY) {
    console.error('API_SECRET_KEY environment variable not set');
    return false;
  }
  
  return apiKey === API_SECRET_KEY;
}

/**
 * Middleware function to require API key authentication
 */
export function requireApiKey(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!validateApiKey(req)) {
    res.status(401).json({ 
      success: false, 
      error: 'Invalid or missing API key. Please provide a valid API key in the x-api-key header.' 
    });
    return;
  }
  
  // Store API key in request for potential use
  req.apiKey = req.headers['x-api-key'] as string || 
              req.headers['authorization']?.toString().replace('Bearer ', '') ||
              req.headers['api-key'] as string;
  
  next();
}

/**
 * Optional middleware for API key validation (doesn't block if invalid)
 */
export function optionalApiKey(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (validateApiKey(req)) {
    req.apiKey = req.headers['x-api-key'] as string || 
                req.headers['authorization']?.toString().replace('Bearer ', '') ||
                req.headers['api-key'] as string;
  }
  
  next();
} 