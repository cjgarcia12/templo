import { NextResponse } from 'next/server';
import { loadFeaturedVideo } from '@/lib/videoData';

export async function GET() {
  try {
    const featuredVideo = loadFeaturedVideo();
    
    if (!featuredVideo) {
      return NextResponse.json(
        { error: 'No featured video available' },
        { status: 404 }
      );
    }

    return NextResponse.json(featuredVideo);
  } catch (error) {
    console.error('Error loading featured video:', error);
    return NextResponse.json(
      { error: 'Failed to load featured video' },
      { status: 500 }
    );
  }
} 