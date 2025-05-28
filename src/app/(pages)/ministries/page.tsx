"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Ministry {
  title: string;
  description: string;
  leader: string;
  icon: React.ReactNode;
}

export default function MinistriesPage() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Set initial styles directly to avoid flash of invisible content
    gsap.set([".page-header", ".ministry-card"], { 
      opacity: 1,
      y: 0
    });

    const tl = gsap.timeline({ 
      defaults: { 
        ease: "power3.out",
        clearProps: "all" 
      } 
    });

    tl.fromTo(".page-header", 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1 }
    );

    tl.fromTo(".ministry-card", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.7 },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const ministries: Ministry[] = [
    {
      title: t('worship_team'),
      description: t('worship_team_desc'),
      leader: "Worship Leader: María Hernández",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      title: t('prayer_ministry'),
      description: t('prayer_ministry_desc'),
      leader: "Prayer Coordinator: Juan Mendez",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: t('youth_ministry'),
      description: t('youth_ministry_desc'),
      leader: "Youth Pastor: Carlos Rodriguez",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: t('children_ministry'),
      description: t('children_ministry_desc'),
      leader: "Children's Director: Luisa Martinez",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t('outreach_missions'),
      description: t('outreach_missions_desc'),
      leader: "Outreach Coordinator: Ana Gomez",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t('hospitality_team'),
      description: t('hospitality_team_desc'),
      leader: "Hospitality Coordinator: Roberto Diaz",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 page-header">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
            {t('our_ministries')}
          </h1>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
            {t('ministries_description')}
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ministries.map((ministry, index) => (
            <div
              key={index}
              className="ministry-card bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-primary-gold group-hover:scale-110 transition-transform duration-300">
                    {ministry.icon}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary-brown/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary-brown">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary-brown mb-2 group-hover:text-primary-gold transition-colors duration-300">
                  {ministry.title}
                </h3>
                <p className="text-text-dark/80 mb-6 flex-grow">
                  {ministry.description}
                </p>
                <div className="text-sm font-medium text-primary-gold border-t border-primary-gold/20 pt-4">
                  {ministry.leader}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Get Involved Section */}
        <div className="bg-accent-cream/20 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-brown mb-4">
            {t('get_involved')}
          </h2>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto mb-8">
            {t('get_involved_desc')}
          </p>
          <Link
            href="#contact"
            className="inline-block bg-primary-brown hover:bg-primary-brown/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            {t('contact_learn_more')}
          </Link>
        </div>
      </div>
    </div>
  );
} 