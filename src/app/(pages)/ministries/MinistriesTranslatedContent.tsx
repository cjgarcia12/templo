"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function MinistriesTranslatedContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Header Section */}
      <header className="text-center mb-16 page-header">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
          {t('our_ministries')}
        </h1>
        <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
          {t('ministries_description')}
        </p>
      </header>

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
    </>
  );
} 