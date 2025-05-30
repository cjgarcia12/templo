import { NextResponse } from 'next/server';
import { VideoController } from '@/controllers/VideoController';

export async function GET() {
  try {
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