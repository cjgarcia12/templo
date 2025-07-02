import { NextRequest, NextResponse } from 'next/server';
import { VideoController } from '@/controllers/VideoController';
import { requireApiKey } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  // Require API key for sync operations
  const authError = requireApiKey(request);
  if (authError) return authError;
  
  try {
    const videoController = new VideoController();
    const featuredVideo = await videoController.getFeaturedVideo();
    
    if (!featuredVideo) {
      return NextResponse.json(
        { error: 'No featured video available' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      video: featuredVideo,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error loading featured video:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to load featured video from database' 
      },
      { status: 500 }
    );
  }
} 