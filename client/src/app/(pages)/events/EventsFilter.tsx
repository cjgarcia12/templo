"use client";

import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";

// Event interface matching the database model
interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  category: "Worship" | "Community" | "Youth" | "Special";
}

interface EventsFilterProps {
  events: Event[];
}

export default function EventsFilter({ events }: EventsFilterProps) {
  const [filter, setFilter] = useState<string>("all");
  const { t } = useLanguage();

  // Filter events based on the selected category
  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(event => event.category.toLowerCase() === filter);
    
  // Sort events with non-repeating ones coming first, sorted by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const aIsRepeating = a.date.includes("Every");
    const bIsRepeating = b.date.includes("Every");
    
    if (aIsRepeating && !bIsRepeating) return 1;
    if (!aIsRepeating && bIsRepeating) return -1;
    return 0;
  });

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center mb-12 filter-buttons">
        <button 
          onClick={() => setFilter("all")}
          className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
            filter === "all" 
              ? "bg-primary-brown text-white" 
              : "bg-primary-brown/10 text-primary-brown hover:bg-primary-brown/20"
          }`}
        >
          {t('all_events')}
        </button>
        <button 
          onClick={() => setFilter("worship")}
          className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
            filter === "worship" 
              ? "bg-primary-brown text-white" 
              : "bg-primary-brown/10 text-primary-brown hover:bg-primary-brown/20"
          }`}
        >
          {t('worship_category')}
        </button>
        <button 
          onClick={() => setFilter("community")}
          className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
            filter === "community" 
              ? "bg-primary-brown text-white" 
              : "bg-primary-brown/10 text-primary-brown hover:bg-primary-brown/20"
          }`}
        >
          {t('community_category')}
        </button>
        <button 
          onClick={() => setFilter("youth")}
          className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
            filter === "youth" 
              ? "bg-primary-brown text-white" 
              : "bg-primary-brown/10 text-primary-brown hover:bg-primary-brown/20"
          }`}
        >
          {t('youth_category')}
        </button>
        <button 
          onClick={() => setFilter("special")}
          className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
            filter === "special" 
              ? "bg-primary-brown text-white" 
              : "bg-primary-brown/10 text-primary-brown hover:bg-primary-brown/20"
          }`}
        >
          {t('special_events')}
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-6 mb-16">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) => (
            <article 
              key={index}
              className="event-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
              itemScope 
              itemType="https://schema.org/Event"
            >
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <div className={`bg-primary-gold/10 p-4 rounded-lg text-center ${
                    event.date.includes("Every") ? "border-l-4 border-primary-gold" : ""
                  }`}>
                    <div className="text-sm text-primary-gold font-medium mb-1">
                      {event.category}
                    </div>
                    <div className="text-xl font-bold text-primary-brown mb-2" itemProp="startDate">
                      {event.date}
                    </div>
                    <div className="text-text-dark/70 text-sm">
                      {event.time}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3">
                  <h3 className="text-xl font-bold text-primary-brown mb-2" itemProp="name">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-primary-gold/80 text-sm mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span itemProp="location" itemScope itemType="https://schema.org/Place">
                      <span itemProp="name">{event.location}</span>
                    </span>
                  </div>
                  <p className="text-text-dark/80 mb-4" itemProp="description">
                    {event.description || 'More details to be announced. Contact us for information.'}
                  </p>
                  {!event.date.includes("Every") && (
                    <a 
                      href="#calendar"
                      className="inline-flex items-center text-sm font-medium text-primary-gold hover:text-primary-brown transition-colors"
                    >
                      <span>Add to Calendar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-10 bg-accent-cream/20 rounded-xl">
            <p className="text-text-dark/70">No events found matching your filter.</p>
          </div>
        )}
      </div>
    </>
  );
} 