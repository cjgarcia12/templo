"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

// Video interface matching our API response
interface Video {
  title: string;
  preacher: string;
  date: string;
  description: string;
  youtubeId: string;
  category: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  isFeatured?: boolean;
}

interface SermonsPageContentProps {
  sermons: Video[];
}

export default function SermonsPageContent({ sermons }: SermonsPageContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12 page-header">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
            {t('sermon_archive')}
          </h1>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
            {t('sermons_description')}
          </p>
        </header>

        {/* Sermon Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sermons.map((sermon, index) => (
            <article 
              key={index} 
              className="sermon-card bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
              itemScope 
              itemType="https://schema.org/VideoObject"
            >
              <div className="relative aspect-video bg-black">
                <a 
                  href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={`Watch ${sermon.title}`}
                >
                  <Image 
                    src={`https://img.youtube.com/vi/${sermon.youtubeId}/maxresdefault.jpg`} 
                    alt={sermon.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute flex items-center justify-center w-16 h-16 rounded-full bg-primary-brown/90 group-hover:bg-primary-brown transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </a>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium bg-primary-gold/10 text-primary-gold rounded-full px-2 py-1">
                    {sermon.category}
                  </span>
                  <time className="text-xs text-text-dark/60 ml-2" dateTime={sermon.publishedAt}>
                    {sermon.date}
                  </time>
                  {sermon.duration && (
                    <span className="text-xs text-text-dark/60 ml-2">
                      {sermon.duration}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-primary-brown group-hover:text-primary-gold transition-colors" itemProp="name">
                  <a 
                    href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {sermon.title}
                  </a>
                </h3>
                
                <p className="text-sm text-primary-gold/80 mt-1 mb-3" itemProp="author">
                  {sermon.preacher}
                </p>
                
                
                <div className="flex items-center justify-between">
                  <a 
                    href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary-gold hover:text-primary-brown transition-colors flex items-center"
                  >
                    {t('watch_now')}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  
                  {(sermon.viewCount !== '0' || sermon.likeCount !== '0') && (
                    <div className="flex items-center space-x-2 text-xs text-text-dark/60">
                      {sermon.viewCount !== '0' && (
                        <span className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {parseInt(sermon.viewCount).toLocaleString()}
                        </span>
                      )}
                      {sermon.likeCount !== '0' && (
                        <span className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {parseInt(sermon.likeCount).toLocaleString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

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
      </div>
    </div>
  );
} 