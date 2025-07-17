import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import EventsClient from "./EventsClient";
import EventsPageContent from "./EventsPageContent";
import { apiGet } from "@/lib/api";

// Event interface matching our database model
interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  category: "Worship" | "Community" | "Youth" | "Special";
}

// SEO metadata - this runs on the server
export const metadata = generateSEO({
  title: 'Upcoming Events',
  description: 'Stay connected with upcoming events and activities at our church in Wilmington, NC. Join us for worship, community events, youth activities, and special services.',
  keywords: 'church events, Wilmington NC, worship services, community events, Spanish church, youth activities, prayer night, bible study',
  path: '/events',
});

// Static fallback events data for SEO (used when API is not available)
const fallbackEventsData: Event[] = [
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

/**
 * Fetch events from our API
 */
async function getEvents(): Promise<Event[]> {
  try {
    const data = await apiGet<{ success: boolean; events: Event[] }>('/events', {
      // Force no cache to get fresh data
      cache: 'no-store'
    });
    
    // Get database events
    const databaseEvents = data.events || [];
    
    // Only use fallback events if no database events exist
    if (databaseEvents.length === 0) {
      console.log('No database events found, using fallback events');
      return fallbackEventsData;
    }
    
    // Return only database events when they exist
    console.log(`Found ${databaseEvents.length} database events`);
    return databaseEvents;
  } catch (error) {
    console.error('Error fetching events from API:', error);
    return fallbackEventsData;
  }
}

export default async function EventsPage() {
  // Fetch events from our API (which reads from database)
  const eventsData = await getEvents();

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData 
        type="Organization" 
        data={{}} 
      />
      
      {/* Client component handles all translated content */}
      <EventsPageContent events={eventsData} />

      {/* Client component for animations */}
      <EventsClient />
    </>
  );
} 