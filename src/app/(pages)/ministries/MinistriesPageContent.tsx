"use client";

import Link from "next/link";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Ministry {
  title: string;
  description: string;
  leader: string;
  icon: React.ReactNode;
}

interface MinistriesPageContentProps {
  ministries: Ministry[];
}

export default function MinistriesPageContent({ ministries }: MinistriesPageContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16 page-header">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
            {t('our_ministries')}
          </h1>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
            {t('ministries_description')}
          </p>
        </header>

        {/* Ministries Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ministries.map((ministry, index) => (
            <article
              key={index}
              className="ministry-card bg-white rounded-xl shadow-lg overflow-hidden group"
              itemScope 
              itemType="https://schema.org/Organization"
            >
              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-primary-gold group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {ministry.icon}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary-brown/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary-brown" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary-brown mb-2 group-hover:text-primary-gold transition-colors duration-300" itemProp="name">
                  {index === 0 ? t('worship_team') :
                   index === 1 ? t('prayer_ministry') :
                   index === 2 ? t('youth_ministry') :
                   index === 3 ? t('children_ministry') :
                   index === 4 ? t('outreach_missions') :
                   t('hospitality_team')}
                </h3>
                <p className="text-text-dark/80 mb-6 flex-grow" itemProp="description">
                  {index === 0 ? t('worship_team_desc') :
                   index === 1 ? t('prayer_ministry_desc') :
                   index === 2 ? t('youth_ministry_desc') :
                   index === 3 ? t('children_ministry_desc') :
                   index === 4 ? t('outreach_missions_desc') :
                   t('hospitality_team_desc')}
                </p>
                <div className="text-sm font-medium text-primary-gold border-t border-primary-gold/20 pt-4">
                  {ministry.leader}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Get Involved Section */}
        <section className="bg-accent-cream/20 rounded-xl p-8 md:p-12 text-center cta-section">
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
        </section>
      </div>
    </div>
  );
} 