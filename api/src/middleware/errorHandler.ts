import { Request, Response, NextFunction } from 'express';
import getConfig from '../config';

const config = getConfig();
const { NODE_ENV } = config;

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Custom API Error class
 */
export class AppError extends Error implements ApiError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle Mongoose validation errors
 */
function handleValidationError(error: any): AppError {
  const errors = Object.values(error.errors).map((err: any) => err.message);
  const message = `Validation failed: ${errors.join(', ')}`;
  return new AppError(message, 400);
}

/**
 * Handle Mongoose duplicate key errors
 */
function handleDuplicateKeyError(error: any): AppError {
  const field = Object.keys(error.keyValue)[0];
  const value = error.keyValue[field];
  const message = `Duplicate value for field '${field}': ${value}. Please use a different value.`;
  return new AppError(message, 400);
}

/**
 * Handle Mongoose cast errors
 */
function handleCastError(error: any): AppError {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
}

/**
 * Send error response in development
 */
function sendErrorDev(error: ApiError, res: Response): void {
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message,
    stack: error.stack,
    details: error
  });
}

/**
 * Send error response in production
 */
function sendErrorProd(error: ApiError, res: Response): void {
  // Operational, trusted error: send message to client
  if (error.isOperational) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', error);
    
    res.status(500).json({
      success: false,
      error: 'Something went wrong! Please try again later.'
    });
  }
}

/**
 * Global error handling middleware
 */
export function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let err = { ...error };
  err.message = error.message;
  err.statusCode = error.statusCode || 500;

  // Log error
  console.error('Error caught by global handler:', error);

  // Handle specific error types
  if (error.name === 'ValidationError') {
    err = handleValidationError(error);
  } else if (error.code === 11000) {
    err = handleDuplicateKeyError(error);
  } else if (error.name === 'CastError') {
    err = handleCastError(error);
  } else if (error.name === 'JsonWebTokenError') {
    err = new AppError('Invalid token. Please log in again.', 401);
  } else if (error.name === 'TokenExpiredError') {
    err = new AppError('Your token has expired. Please log in again.', 401);
  }

  // Send appropriate error response
  if (NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
}

/**
 * Handle 404 errors for unknown routes
 */
export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  const error = new AppError(`Cannot find ${req.originalUrl} on this server`, 404);
  next(error);
}

/**
 * Async error wrapper for route handlers
 */
export function catchAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
} 