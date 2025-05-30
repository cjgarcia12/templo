"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import EventsFilter from "./EventsFilter";

// Event interface matching the database model
interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  category: "Worship" | "Community" | "Youth" | "Special";
}

interface EventsPageContentProps {
  events: Event[];
}

export default function EventsPageContent({ events }: EventsPageContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12 page-header">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
            {t('upcoming_events')}
          </h1>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
            {t('events_description')}
          </p>
        </header>

        {/* Interactive Filter Component */}
        <EventsFilter events={events} />

        {/* Calendar Subscription */}
        <section className="bg-accent-cream/20 rounded-xl p-8 md:p-12 text-center" id="calendar">
          <h2 className="text-3xl font-bold text-primary-brown mb-4">
            {t('never_miss_event')}
          </h2>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto mb-8">
            {t('calendar_description')}
          </p>
          <Link
            href="#subscribe"
            className="inline-block bg-primary-brown hover:bg-primary-brown/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            {t('subscribe_calendar')}
          </Link>
        </section>
      </div>
    </div>
  );
} 