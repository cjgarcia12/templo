"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: "Worship" | "Community" | "Youth" | "Special";
}

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("all");
  const { t } = useLanguage();
  
  useEffect(() => {
    // First immediately set everything to invisible
    gsap.set([".page-header", ".filter-buttons", ".event-card"], { 
      opacity: 0,
      y: function(index, element) {
        if (element.classList.contains("page-header")) return -50;
        if (element.classList.contains("filter-buttons")) return 30;
        if (element.classList.contains("event-card")) return 50;
        return 0;
      }
    });
  
    // Then animate them in with the timeline
    const tl = gsap.timeline({ 
      defaults: { 
        ease: "power3.out",
        clearProps: "all" 
      } 
    });
  
    tl.to(".page-header", { opacity: 1, y: 0, duration: 1 });
    tl.to(".filter-buttons", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");
    tl.to(".event-card", { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, "-=0.5");
  
    return () => {
      tl.kill();
    };
  }, []);

  const events: Event[] = [
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
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 page-header">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
            {t('upcoming_events')}
          </h1>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
            {t('events_description')}
          </p>
        </div>

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
              <div 
                key={index}
                className="event-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
              >
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <div className={`bg-primary-gold/10 p-4 rounded-lg text-center ${
                      event.date.includes("Every") ? "border-l-4 border-primary-gold" : ""
                    }`}>
                      <div className="text-sm text-primary-gold font-medium mb-1">
                        {event.category}
                      </div>
                      <div className="text-xl font-bold text-primary-brown mb-2">
                        {event.date}
                      </div>
                      <div className="text-text-dark/70 text-sm">
                        {event.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-bold text-primary-brown mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-primary-gold/80 text-sm mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <p className="text-text-dark/80 mb-4">
                      {event.description}
                    </p>
                    {!event.date.includes("Every") && (
                      <Link 
                        href="#calendar"
                        className="inline-flex items-center text-sm font-medium text-primary-gold hover:text-primary-brown transition-colors"
                      >
                        <span>Add to Calendar</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-accent-cream/20 rounded-xl">
              <p className="text-text-dark/70">No events found matching your filter.</p>
            </div>
          )}
        </div>

        {/* Calendar Subscription */}
        <div className="bg-accent-cream/20 rounded-xl p-8 md:p-12 text-center" id="calendar">
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
        </div>
      </div>
    </div>
  );
} 