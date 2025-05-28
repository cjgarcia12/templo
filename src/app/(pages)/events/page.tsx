import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import EventsClient from "./EventsClient";
import EventsFilter from "./EventsFilter";

// SEO metadata - this runs on the server
export const metadata = generateSEO({
  title: 'Upcoming Events',
  description: 'Stay connected with upcoming events and activities at our church in Wilmington, NC. Join us for worship, community events, youth activities, and special services.',
  keywords: 'church events, Wilmington NC, worship services, community events, Spanish church, youth activities, prayer night, bible study',
  path: '/events',
});

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: "Worship" | "Community" | "Youth" | "Special";
}

// Static events data for SEO
const eventsData: Event[] = [
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
  },
  {
    title: "Community Outreach: Food Distribution",
    date: "May 28, 2023",
    time: "9:00 AM - 12:00 PM",
    location: "Church Parking Lot",
    description: "Serving our community by distributing food packages to families in need. Volunteers needed!",
    category: "Community"
  },
  {
    title: "Youth Summer Camp",
    date: "June 15-19, 2023",
    time: "All Day",
    location: "Camp Wildwood",
    description: "A life-changing week of fun, fellowship, and spiritual growth for teenagers grades 7-12.",
    category: "Youth"
  },
  {
    title: "Vacation Bible School",
    date: "July 10-14, 2023",
    time: "9:00 AM - 12:00 PM",
    location: "Church Campus",
    description: "A fun-filled week for children ages 4-12 with Bible stories, crafts, games, and more!",
    category: "Community"
  },
  {
    title: "Church Anniversary Celebration",
    date: "August 5, 2023",
    time: "4:00 PM",
    location: "Main Sanctuary & Fellowship Hall",
    description: "Join us as we celebrate another year of God's faithfulness with special worship, testimonies, and a community dinner.",
    category: "Special"
  }
];

export default function EventsPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData 
        type="Organization" 
        data={{}} 
      />
      
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section - Server rendered for SEO */}
          <header className="text-center mb-12 page-header">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
              Stay connected and get involved with these upcoming events and activities at our church.
            </p>
          </header>

          {/* Interactive Filter Component */}
          <EventsFilter events={eventsData} />

          {/* Calendar Subscription - Server rendered for SEO */}
          <section className="bg-accent-cream/20 rounded-xl p-8 md:p-12 text-center" id="calendar">
            <h2 className="text-3xl font-bold text-primary-brown mb-4">
              Never Miss an Event
            </h2>
            <p className="text-lg text-text-dark/80 max-w-2xl mx-auto mb-8">
              Subscribe to our church calendar to stay up-to-date with all our events and activities.
            </p>
            <Link
              href="#subscribe"
              className="inline-block bg-primary-brown hover:bg-primary-brown/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Subscribe to Calendar
            </Link>
          </section>
        </div>
      </div>

      {/* Client component for animations */}
      <EventsClient />
    </>
  );
} 