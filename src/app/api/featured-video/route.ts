import { NextResponse } from 'next/server';
import { VideoController } from '@/controllers/VideoController';

export async function GET() {
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