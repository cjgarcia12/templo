import { NextRequest, NextResponse } from 'next/server';
import { VideoController } from '@/controllers/VideoController';
import { requireApiKey } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    // Require API key for sync operations
    const authError = requireApiKey(request);
    if (authError) return authError;
    
    const videoController = new VideoController();
    const videos = await videoController.getAllVideos();
    
    return NextResponse.json({
      success: true,
      videos,
      count: videos.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch videos from database',
        videos: [],
        count: 0,
        lastUpdated: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 