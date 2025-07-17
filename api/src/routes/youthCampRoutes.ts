import { Router, Request, Response } from 'express';
import { YouthCampController } from '@/controllers/YouthCampController';
import { requireApiKey, optionalApiKey } from '@/middleware/auth';
import { catchAsync, AppError } from '@/middleware/errorHandler';
import { registrationLimiter, generalLimiter } from '@/middleware/rateLimiting';

const router = Router();
const youthCampController = new YouthCampController();

/**
 * GET /api/youth-camp/info
 * Get registration information
 */
router.get(
  '/info',
  generalLimiter,
  catchAsync(async (req: Request, res: Response) => {
    const registrationInfo = youthCampController.getRegistrationInfo();
    
    res.json({
      success: true,
      ...registrationInfo,
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * POST /api/youth-camp/register
 * Create a new youth camp registration
 */
router.post(
  '/register',
  registrationLimiter,
  catchAsync(async (req: Request, res: Response) => {
    // Check if registration is still open
    if (!youthCampController.isRegistrationOpen()) {
      throw new AppError('Registration is closed for this year', 400);
    }

    const registration = await youthCampController.createRegistration(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Youth camp registration submitted successfully!',
      registrationId: (registration as any)._id,
      data: {
        participantName: registration.participantName,
        campDates: registration.campDates,
        registrationDate: registration.registrationDate,
        status: registration.status
      }
    });
  })
);

/**
 * GET /api/youth-camp/registrations
 * Get all registrations (requires API key for admin access)
 */
router.get(
  '/registrations',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const { status, year, limit, offset } = req.query;
    
    const filters = {
      status: status as 'pending' | 'approved' | 'cancelled' | undefined,
      year: year ? parseInt(year as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined
    };

    const result = await youthCampController.getAllRegistrations(filters);
    
    res.json({
      success: true,
      count: result.registrations.length,
      total: result.total,
      data: result.registrations,
      filters
    });
  })
);

/**
 * GET /api/youth-camp/registrations/:id
 * Get registration by ID (requires API key)
 */
router.get(
  '/registrations/:id',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const registration = await youthCampController.getRegistrationById(id);
    
    res.json({
      success: true,
      data: registration
    });
  })
);

/**
 * PATCH /api/youth-camp/registrations/:id/status
 * Update registration status (requires API key)
 */
router.patch(
  '/registrations/:id/status',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'approved', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new AppError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400);
    }
    
    const registration = await youthCampController.updateRegistrationStatus(id, status);
    
    res.json({
      success: true,
      message: `Registration status updated to ${status}`,
      data: registration
    });
  })
);

/**
 * DELETE /api/youth-camp/registrations/:id
 * Delete registration (requires API key)
 */
router.delete(
  '/registrations/:id',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await youthCampController.deleteRegistration(id);
    
    res.json({
      success: true,
      message: 'Registration deleted successfully'
    });
  })
);

/**
 * GET /api/youth-camp/stats
 * Get registration statistics (requires API key)
 */
router.get(
  '/stats',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const { year } = req.query;
    const yearFilter = year ? parseInt(year as string) : undefined;
    
    const stats = await youthCampController.getRegistrationStats(yearFilter);
    
    res.json({
      success: true,
      year: yearFilter || new Date().getFullYear(),
      stats,
      timestamp: new Date().toISOString()
    });
  })
);

export default router; 