import { NextResponse } from 'next/server';
import { EventController } from '@/controllers/EventController';

export async function POST() {
  try {
    console.log('🗓️ Starting event sync...');
    
    const eventController = new EventController();
    const result = await eventController.syncEvents();
    
    console.log(`✅ Event sync completed: ${result.message}`);
    
    return NextResponse.json({
      success: result.success,
      message: result.message,
      count: result.count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Event sync failed:', error);
    
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
    message: 'Event sync endpoint is ready. Use POST to trigger sync.',
    timestamp: new Date().toISOString()
  });
} 