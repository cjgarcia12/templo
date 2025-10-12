import { google, calendar_v3 } from 'googleapis';
import Event, { IEvent } from '../models/Event';
import connectDB from '../db/connection';
import getConfig from '../config';

const config = getConfig();
const { GOOGLE_API_KEY, GOOGLE_CALENDAR_ID } = config;

export class EventController {
  private calendar: calendar_v3.Calendar | null;
  private calendarId: string;

  constructor() {
    this.calendarId = GOOGLE_CALENDAR_ID || '';
    this.calendar = null;
    this.initializeCalendar();
  }

  private initializeCalendar() {
    if (GOOGLE_API_KEY) {
      this.calendar = google.calendar({
        version: 'v3',
        auth: GOOGLE_API_KEY
      });
    } else {
      throw new Error('GOOGLE_API_KEY is required');
    }
  }

  /**
   * Fetch events from Google Calendar API
   */
  async fetchFromGoogleCalendar(): Promise<calendar_v3.Schema$Event[]> {
    if (!this.calendar || !this.calendarId) {
      console.warn('Calendar not configured, returning empty events');
      return [];
    }

    try {
      const now = new Date();
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: now.toISOString(),
        timeMax: oneWeekFromNow.toISOString(),
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }

  /**
   * Convert Google Calendar event to our format
   */
  private convertGoogleEvent(googleEvent: calendar_v3.Schema$Event): Partial<IEvent> {
    const title = googleEvent.summary || 'Untitled Event';
    const location = googleEvent.location || 'Location TBD';
    const description = googleEvent.description || 'More details to be announced. Contact us for information.';

    // Extract date and time
    const { date, time } = this.extractDateAndTime(googleEvent);
    
    // Determine category
    const category = this.determineCategory(googleEvent);

    return {
      title,
      date,
      time,
      location,
      description,
      category,
      googleEventId: googleEvent.id ?? undefined,
    };
  }

  /**
   * Extract date and time from Google Calendar event
   */
  private extractDateAndTime(googleEvent: calendar_v3.Schema$Event): { date: string; time: string } {
    if (!googleEvent.start) {
      return { date: 'Date TBD', time: 'Time TBD' };
    }

    const startDateTime = googleEvent.start.dateTime || googleEvent.start.date;
    if (!startDateTime) {
      return { date: 'Date TBD', time: 'Time TBD' };
    }

    const startDate = new Date(startDateTime);
    
    // Check if it's an all-day event
    const isAllDay = !!googleEvent.start.date;
    
    const date = startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const time = isAllDay ? 'All Day' : startDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return { date, time };
  }

  /**
   * Determine event category based on content
   */
  private determineCategory(googleEvent: calendar_v3.Schema$Event): 'Worship' | 'Community' | 'Youth' | 'Special' {
    const title = (googleEvent.summary || '').toLowerCase();
    const description = (googleEvent.description || '').toLowerCase();
    const content = `${title} ${description}`;

    if (this.containsKeywords(content, ['worship', 'service', 'sunday', 'prayer', 'mass'])) {
      return 'Worship';
    }
    
    if (this.containsKeywords(content, ['youth', 'teen', 'young', 'student'])) {
      return 'Youth';
    }
    
    if (this.containsKeywords(content, ['community', 'outreach', 'volunteer', 'food', 'service project', 'study'])) {
      return 'Community';
    }
    
    if (this.containsKeywords(content, ['special', 'celebration', 'anniversary', 'holiday', 'easter', 'christmas'])) {
      return 'Special';
    }

    return 'Community';
  }

  /**
   * Check if text contains keywords
   */
  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  /**
   * Sync events from Google Calendar to database
   */
  async syncEvents(): Promise<{ success: boolean; message: string; count: number }> {
    try {
      await connectDB();

      // Fetch events from Google Calendar
      const googleEvents = await this.fetchFromGoogleCalendar();
      
      if (googleEvents.length === 0) {
        return {
          success: true,
          message: 'No events found in Google Calendar',
          count: 0
        };
      }

      // Convert to our format
      const convertedEvents = googleEvents.map(event => this.convertGoogleEvent(event));

      // Clear existing events and insert new ones
      await Event.deleteMany({});
      const insertedEvents = await Event.insertMany(convertedEvents);

      return {
        success: true,
        message: `Successfully synced ${insertedEvents.length} events`,
        count: insertedEvents.length
      };
    } catch (error) {
      console.error('Error syncing events:', error);
      throw error;
    }
  }

  /**
   * Get all events from database
   */
  async getAllEvents(): Promise<IEvent[]> {
    try {
      await connectDB();
      return await Event.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error fetching events from database:', error);
      throw error;
    }
  }

  /**
   * Get fallback events
   */
  getFallbackEvents(): Partial<IEvent>[] {
    return [
      {
        title: 'Sunday Worship Service',
        date: 'Every Sunday',
        time: '10:00 AM',
        location: 'Main Sanctuary',
        description: 'Join us for worship, prayer, and fellowship every Sunday morning.',
        category: 'Worship'
      },
      {
        title: 'Bible Study',
        date: 'Every Wednesday',
        time: '7:00 PM',
        location: 'Fellowship Hall',
        description: 'Dive deeper into God\'s Word through interactive Bible study.',
        category: 'Community'
      },
      {
        title: 'Youth Group',
        date: 'Every Friday',
        time: '7:00 PM',
        location: 'Youth Room',
        description: 'Fun activities, games, and spiritual growth for teens.',
        category: 'Youth'
      }
    ];
  }

  /**
   * Get events by category
   */
  async getEventsByCategory(category: 'Worship' | 'Community' | 'Youth' | 'Special'): Promise<IEvent[]> {
    try {
      await connectDB();
      return await Event.find({ category }).sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error fetching events by category:', error);
      throw error;
    }
  }

  /**
   * Get upcoming events (within next 30 days)
   */
  async getUpcomingEvents(): Promise<IEvent[]> {
    try {
      await connectDB();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      return await Event.find({
        createdAt: { $lte: thirtyDaysFromNow }
      }).sort({ createdAt: 1 });
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  }
} 