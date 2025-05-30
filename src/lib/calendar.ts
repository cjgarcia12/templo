import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { calendar_v3 } from 'googleapis';

// Event interface matching your existing structure
export interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: "Worship" | "Community" | "Youth" | "Special";
}

// Google Calendar event structure (simplified from calendar_v3.Schema$Event)
type GoogleCalendarEvent = calendar_v3.Schema$Event;

class CalendarService {
  private calendar: calendar_v3.Calendar | null = null;
  private calendarId: string;

  constructor() {
    // Initialize with service account or API key
    this.calendarId = process.env.GOOGLE_CALENDAR_ID || '';
    this.initializeCalendar();
  }

  private initializeCalendar() {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (apiKey) {
      // Using API key for read-only access (simpler setup)
      this.calendar = google.calendar({
        version: 'v3',
        auth: apiKey
      });
    } else {
      // For service account authentication (more secure)
      try {
        const serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;
        if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
          const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
          const auth = new google.auth.GoogleAuth({
            credentials: serviceAccount,
            scopes: ['https://www.googleapis.com/auth/calendar.readonly']
          });
          
          this.calendar = google.calendar({
            version: 'v3',
            auth
          });
        }
      } catch (error) {
        console.error('Error setting up service account authentication:', error);
      }
    }
  }

  /**
   * Fetch events from Google Calendar
   */
  async fetchEvents(maxResults: number = 50): Promise<Event[]> {
    if (!this.calendar || !this.calendarId) {
      console.warn('Calendar not configured, returning empty events');
      return [];
    }

    try {
      const now = new Date();
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: now.toISOString(),
        timeMax: threeMonthsFromNow.toISOString(),
        maxResults,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items || [];
      return this.convertGoogleEventsToEvents(events);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [];
    }
  }

  /**
   * Convert Google Calendar events to our Event interface
   */
  private convertGoogleEventsToEvents(googleEvents: GoogleCalendarEvent[]): Event[] {
    return googleEvents.map(event => this.mapGoogleEventToEvent(event));
  }

  /**
   * Map a single Google Calendar event to our Event interface
   */
  private mapGoogleEventToEvent(googleEvent: GoogleCalendarEvent): Event {
    const title = googleEvent.summary || 'Untitled Event';
    const location = googleEvent.location || 'Location TBD';
    const description = googleEvent.description || '';

    // Extract date and time
    const { date, time } = this.extractDateAndTime(googleEvent);
    
    // Determine category based on event properties
    const category = this.determineCategory(googleEvent);

    return {
      title,
      date,
      time,
      location,
      description,
      category
    };
  }

  /**
   * Extract date and time from Google Calendar event
   */
  private extractDateAndTime(googleEvent: GoogleCalendarEvent): { date: string; time: string } {
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
   * Determine event category based on Google Calendar event properties
   */
  private determineCategory(googleEvent: GoogleCalendarEvent): "Worship" | "Community" | "Youth" | "Special" {
    const title = (googleEvent.summary || '').toLowerCase();
    const description = (googleEvent.description || '').toLowerCase();
    
    // Check for explicit category in extended properties
    const explicitCategory = googleEvent.extendedProperties?.private?.category;
    if (explicitCategory && this.isValidCategory(explicitCategory)) {
      return explicitCategory as "Worship" | "Community" | "Youth" | "Special";
    }

    // Categorize based on keywords in title and description
    const content = `${title} ${description}`;

    if (this.containsKeywords(content, ['worship', 'service', 'sunday', 'prayer', 'mass'])) {
      return 'Worship';
    }
    
    if (this.containsKeywords(content, ['youth', 'teen', 'young', 'student'])) {
      return 'Youth';
    }
    
    if (this.containsKeywords(content, ['community', 'outreach', 'volunteer', 'food', 'service project', 'study', 'study group'])) {
      return 'Community';
    }
    
    if (this.containsKeywords(content, ['special', 'celebration', 'anniversary', 'holiday', 'easter', 'christmas'])) {
      return 'Special';
    }

    // Default to Community for uncategorized events
    return 'Community';
  }

  /**
   * Check if a string contains any of the given keywords
   */
  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  /**
   * Validate category string
   */
  private isValidCategory(category: string): boolean {
    return ['Worship', 'Community', 'Youth', 'Special'].includes(category);
  }

  /**
   * Get fallback events (your existing static events) for when calendar is unavailable
   */
  getFallbackEvents(): Event[] {
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
        title: "Friday Bible Study & Youth Night",
        date: "Every Friday",
        time: "7:00 PM",
        location: "Fellowship Hall & Youth Room",
        description: "Adults gather for Bible study while youth enjoy a dedicated program focused on spiritual growth.",
        category: "Youth"
      }
    ];
  }
}

// Export singleton instance
export const calendarService = new CalendarService();

// Export helper functions for external use
export async function getEvents(): Promise<Event[]> {
  try {
    const calendarEvents = await calendarService.fetchEvents();
    const fallbackEvents = calendarService.getFallbackEvents();
    
    // Combine calendar events with recurring events
    return [...calendarEvents, ...fallbackEvents];
  } catch (error) {
    console.error('Error getting events:', error);
    return calendarService.getFallbackEvents();
  }
}

/**
 * Save events to cache file for static generation
 */
export async function saveEventsToCache(events: Event[]): Promise<void> {
  try {
    const cacheDir = path.join(process.cwd(), 'data');
    const cacheFile = path.join(cacheDir, 'events.json');
    
    // Ensure directory exists
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    
    const cacheData = {
      lastUpdated: new Date().toISOString(),
      events
    };
    
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
    console.log(`Events cached to ${cacheFile}`);
  } catch (error) {
    console.error('Error saving events to cache:', error);
  }
}

/**
 * Load events from cache file
 */
export function loadEventsFromCache(): Event[] {
  try {
    const cacheFile = path.join(process.cwd(), 'data', 'events.json');
    
    if (!fs.existsSync(cacheFile)) {
      return calendarService.getFallbackEvents();
    }
    
    const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    return cacheData.events || calendarService.getFallbackEvents();
  } catch (error) {
    console.error('Error loading events from cache:', error);
    return calendarService.getFallbackEvents();
  }
} 