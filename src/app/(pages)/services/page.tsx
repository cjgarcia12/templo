"use client";

import { useEffect } from "react";
import gsap from "gsap";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceInfo {
  day: string;
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServicesPage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Set initial styles directly to avoid flash of invisible content
    gsap.set([".page-header", ".service-card"], { 
      opacity: 0,
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
    
    tl.fromTo(".service-card", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.7 },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const services: ServiceInfo[] = [
    {
      day: "Sunday",
      time: "11:00 AM",
      title: t('sunday_worship'),
      description: t('sunday_desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      day: "Tuesday",
      time: "7:00 PM",
      title: t('prayer_night'),
      description: t('prayer_desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      day: "Friday",
      time: "7:00 PM",
      title: t('bible_study'),
      description: t('bible_desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
            {t('our_services')}
          </h1>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
            {t('join_us')}
          </p>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="text-primary-gold mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-primary-brown mb-2">
                {service.title}
              </h3>
              <div className="flex items-center mb-4">
                <span className="text-sm font-semibold bg-primary-brown/10 text-primary-brown rounded-full px-3 py-1">
                  {service.day}s at {service.time}
                </span>
              </div>
              <p className="text-text-dark/80 mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* What to Expect Section */}
        <div className="bg-accent-cream/20 rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-primary-brown mb-6">
            {t('what_to_expect')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary-gold mb-3">
                {t('warm_welcome')}
              </h3>
              <p className="text-text-dark/80 mb-6">
                {t('welcome_desc')}
              </p>
              
              <h3 className="text-xl font-bold text-primary-gold mb-3">
                {t('vibrant_worship')}
              </h3>
              <p className="text-text-dark/80">
                {t('worship_desc')}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-gold mb-3">
                {t('relevant_teaching')}
              </h3>
              <p className="text-text-dark/80 mb-6">
                {t('teaching_desc')}
              </p>
              
              <h3 className="text-xl font-bold text-primary-gold mb-3">
                {t('community_connection')}
              </h3>
              <p className="text-text-dark/80">
                {t('connection_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-brown mb-6">
            {t('join_us_at')}
          </h2>
          <address className="not-italic text-lg text-text-dark/80 mb-4">
            209 S 7th Street<br />
            Wilmington, NC
          </address>
          <p className="text-primary-gold font-medium">
            {t('welcome_you')}
          </p>
        </div>
      </div>
    </div>
  );
} 