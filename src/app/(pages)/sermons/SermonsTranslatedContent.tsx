"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function SermonsTranslatedContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Header Section */}
      <header className="text-center mb-12 page-header">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
          {t('sermon_archive')}
        </h1>
        <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
          {t('sermons_description')}
        </p>
      </header>

      {/* YouTube Subscription CTA */}
      <section className="bg-accent-cream/20 rounded-xl p-8 md:p-12 text-center cta-section">
        <h2 className="text-3xl font-bold text-primary-brown mb-4">
          {t('dont_miss_sermons')}
        </h2>
        <p className="text-lg text-text-dark/80 max-w-2xl mx-auto mb-8">
          Subscribe to our YouTube channel to get notified when new sermons are uploaded. Stay connected with our weekly messages and special services.
        </p>
        <a 
          href="https://www.youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          {t('youtube_subscribe')}
        </a>
      </section>
    </>
  );
} 