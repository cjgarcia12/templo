"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ServicesTranslatedContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Header Section */}
      <header className="text-center mb-16 page-header">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
          {t('our_services')}
        </h1>
        <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
          {t('join_us')}
        </p>
      </header>

      {/* What to Expect Section */}
      <section className="bg-accent-cream/20 rounded-xl p-8 md:p-12 mb-16">
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
      </section>

      {/* Location Section */}
      <section className="text-center" itemScope itemType="https://schema.org/Place">
        <h2 className="text-3xl font-bold text-primary-brown mb-6">
          {t('join_us_at')}
        </h2>
        <address className="not-italic text-lg text-text-dark/80 mb-4" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">209 S 7th Street</span><br />
          <span itemProp="addressLocality">Wilmington</span>, <span itemProp="addressRegion">NC</span>
        </address>
        <p className="text-primary-gold font-medium">
          {t('welcome_you')}
        </p>
      </section>
    </>
  );
} 