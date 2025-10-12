import { Router, Request, Response } from 'express';
import { VideoController } from '../controllers/VideoController';
import { requireApiKey } from '../middleware/auth';
import { catchAsync } from '../middleware/errorHandler';
import { syncLimiter, generalLimiter } from '../middleware/rateLimiting';

const router = Router();
const videoController = new VideoController();

/**
 * GET /api/videos
 * Get all videos from database
 */
router.get(
  '/',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const videos = await videoController.getAllVideos();
    
    res.json({
      success: true,
      videos,
      count: videos.length,
      lastUpdated: new Date().toISOString()
    });
  })
);

/**
 * GET /api/videos/featured
 * Get the featured video
 */
router.get(
  '/featured',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const featuredVideo = await videoController.getFeaturedVideo();
    
    if (!featuredVideo) {
      return res.status(404).json({
        success: false,
        error: 'No featured video available'
      });
    }

    return res.json({
      success: true,
      video: featuredVideo,
      lastUpdated: new Date().toISOString()
    });
  })
);

/**
 * GET /api/videos/category/:category
 * Get videos by category
 */
router.get(
  '/category/:category',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const { category } = req.params;
    const videos = await videoController.getVideosByCategory(category);
    
    res.json({
      success: true,
      videos,
      count: videos.length,
      category,
      lastUpdated: new Date().toISOString()
    });
  })
);

/**
 * GET /api/videos/youtube/:youtubeId
 * Get video by YouTube ID
 */
router.get(
  '/youtube/:youtubeId',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    const { youtubeId } = req.params;
    const video = await videoController.getVideoByYouTubeId(youtubeId);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    return res.json({
      success: true,
      video,
      lastUpdated: new Date().toISOString()
    });
  })
);

/**
 * POST /api/videos/sync
 * Sync videos from YouTube to database (requires API key)
 */
router.post(
  '/sync',
  syncLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    console.log('🎬 Starting video sync...');
    
    const result = await videoController.syncVideos();
    
    console.log(`✅ Video sync completed: ${result.message}`);
    
    res.json({
      success: result.success,
      message: result.message,
      count: result.count,
      timestamp: new Date().toISOString()
    });
  })
);

/**
 * GET /api/videos/sync
 * Get sync endpoint info
 */
router.get(
  '/sync',
  generalLimiter,
  requireApiKey,
  catchAsync(async (req: Request, res: Response) => {
    res.json({
      message: 'Video sync endpoint is ready. Use POST to trigger sync.',
      timestamp: new Date().toISOString()
    });
  })
);

export default router; 