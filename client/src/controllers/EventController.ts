import { google, calendar_v3 } from 'googleapis';
import Event, { IEvent } from '@/models/Event';
import connectDB from '@/lib/database';

export class EventController {
  private calendar: calendar_v3.Calendar | null;
  private calendarId: string;

  constructor() {
    this.calendarId = process.env.GOOGLE_CALENDAR_ID || '';
    this.calendar = null;
    this.initializeCalendar();
  }

  private initializeCalendar() {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (apiKey) {
      this.calendar = google.calendar({
        version: 'v3',
        auth: apiKey
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
      await Event.insertMany(convertedEvents);

      return {
        success: true,
        message: `Successfully synced ${convertedEvents.length} events`,
        count: convertedEvents.length
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
        title: "Sunday Worship Service",
        date: "Every Sunday",
        time: "11:00 AM",
        location: "Main Sanctuary",
        description: "Join us for our weekly Sunday worship service where we come together to praise God and hear His Word.",
        category: "Worship"
      },
      {
        title: "Tuesday Prayer Night",
        date: "Every Tuesday",
        time: "7:00 PM",
        location: "Prayer Room",
        description: "A powerful time of corporate prayer for our church, community, and personal needs.",
        category: "Worship"
      },
      {
        title: "Friday Bible Study",
        date: "Every Friday",
        time: "7:00 PM",
        location: "Fellowship Hall",
        description: "Adults gather for in-depth Bible study and fellowship.",
        category: "Community"
      },
      {
        title: "Friday Youth Night",
        date: "Every Friday",
        time: "7:00 PM",
        location: "Youth Room",
        description: "Youth gather for a dedicated program focused on spiritual growth and community.",
        category: "Youth"
      }
    ];
  }
} 