import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates API key from request headers
 */
export function validateApiKey(request: NextRequest): boolean {
  // Check for API key in multiple header formats
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '') ||
                 request.headers.get('api-key');
  
  const validApiKey = process.env.API_SECRET_KEY;
  
  if (!validApiKey) {
    console.error('API_SECRET_KEY environment variable not set');
    return false;
  }
  
  return apiKey === validApiKey;
}

/**
 * Middleware function to require API key authentication
 */
export function requireApiKey(request: NextRequest): NextResponse | null {
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid or missing API key. Please provide a valid API key in the x-api-key header.' 
      },
      { status: 401 }
    );
  }
  return null; // Allow request to continue
}

/**
 * Optional: Rate limiting per API key (basic implementation)
 */
const apiKeyUsage = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(request: NextRequest, maxRequests: number = 100, windowMs: number = 60000): NextResponse | null {
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '') ||
                 'anonymous';
  
  const now = Date.now();
  const usage = apiKeyUsage.get(apiKey) || { count: 0, resetTime: now + windowMs };
  
  // Reset if window expired
  if (now > usage.resetTime) {
    usage.count = 0;
    usage.resetTime = now + windowMs;
  }
  
  usage.count++;
  apiKeyUsage.set(apiKey, usage);
  
  if (usage.count > maxRequests) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Rate limit exceeded. Please try again later.' 
      },
      { status: 429 }
    );
  }
  
  return null;
} 