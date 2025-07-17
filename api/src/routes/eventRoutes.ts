import { Router, Request, Response } from 'express';
import { EventController } from '@/controllers/EventController';
import { requireApiKey } from '@/middleware/auth';
import { catchAsync } from '@/middleware/errorHandler';
import { syncLimiter, generalLimiter } from '@/middleware/rateLimiting';

const router = Router();
const eventController = new EventController();

/**
 * GET /api/events
 * Get all events from database
 */
router.get(
  '/',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const events = await eventController.getAllEvents();
    
    // If no events in database, use fallback events
    const finalEvents = events.length > 0 ? events : eventController.getFallbackEvents();
    
    res.json({
      success: true,
      events: finalEvents,
      count: finalEvents.length,
      lastUpdated: new Date().toISOString()
    });
  })
);

/**
 * GET /api/events/upcoming
 * Get upcoming events (within next 30 days)
 */
router.get(
  '/upcoming',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const events = await eventController.getUpcomingEvents();
    
    res.json({
      success: true,
      events,
      count: events.length,
      lastUpdated: new Date().toISOString()
    });
  })
);

/**
 * GET /api/events/category/:category
 * Get events by category
 */
router.get(
  '/category/:category',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const { category } = req.params;
    
    // Validate category
    const validCategories = ['Worship', 'Community', 'Youth', 'Special'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: `Invalid category. Must be one of: ${validCategories.join(', ')}`
      });
    }
    
    const events = await eventController.getEventsByCategory(
      category as 'Worship' | 'Community' | 'Youth' | 'Special'
    );
    
    return res.json({
      success: true,
      events,
      count: events.length,
      category,
      lastUpdated: new Date().toISOString()
    });
  })
);

/**
 * GET /api/events/fallback
 * Get fallback events (for when calendar is not available)
 */
router.get(
  '/fallback',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const fallbackEvents = eventController.getFallbackEvents();
    
    res.json({
      success: true,
      events: fallbackEvents,
      count: fallbackEvents.length,
      message: 'These are default fallback events',
      lastUpdated: new Date().toISOString()
    });
  })
);

/**
 * POST /api/events/sync
 * Sync events from Google Calendar to database (requires API key)
 */
router.post(
  '/sync',
  syncLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    console.log('📅 Starting event sync...');
    
    const result = await eventController.syncEvents();
    
    console.log(`✅ Event sync completed: ${result.message}`);
    
    res.json({
      success: result.success,
      message: result.message,
      count: result.count,
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * GET /api/events/sync
 * Get sync endpoint info
 */
router.get(
  '/sync',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    res.json({
      message: 'Event sync endpoint is ready. Use POST to trigger sync.',
      timestamp: new Date().toISOString()
    });
  })
);

export default router; 