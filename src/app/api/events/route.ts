import { NextResponse } from 'next/server';
import { EventController } from '@/controllers/EventController';

export async function GET() {
  try {
    const eventController = new EventController();
    const events = await eventController.getAllEvents();
    
    // If no events in database, use fallback events
    const finalEvents = events.length > 0 ? events : eventController.getFallbackEvents();
    
    return NextResponse.json({
      success: true,
      events: finalEvents,
      count: finalEvents.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    
    // Return fallback events if there's an error
    const eventController = new EventController();
    const fallbackEvents = eventController.getFallbackEvents();
    
    return NextResponse.json({
      success: false,
      events: fallbackEvents,
      count: fallbackEvents.length,
      error: 'Failed to fetch events from database, using fallback data',
      lastUpdated: new Date().toISOString()
    });
  }
} 