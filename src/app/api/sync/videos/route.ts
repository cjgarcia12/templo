import { NextRequest, NextResponse } from 'next/server';
import { VideoController } from '@/controllers/VideoController';
import { requireApiKey } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    // Require API key for sync operations
    const authError = requireApiKey(request);
    if (authError) return authError;
    
    console.log('🎬 Starting video sync...');
    
    const videoController = new VideoController();
    const result = await videoController.syncVideos();
    
    console.log(`✅ Video sync completed: ${result.message}`);
    
    return NextResponse.json({
      success: result.success,
      message: result.message,
      count: result.count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Video sync failed:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method for manual testing
export async function GET() {
  return NextResponse.json({
    message: 'Video sync endpoint is ready. Use POST to trigger sync.',
    timestamp: new Date().toISOString()
  });
} 