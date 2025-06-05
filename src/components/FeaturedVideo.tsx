"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface SermonData {
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
}

export default function FeaturedVideo() {
  const { t } = useLanguage();
  const [featuredVideo, setFeaturedVideo] = useState<SermonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured video data from API endpoint
    const fetchFeaturedVideo = async () => {
      try {
        const response = await fetch('/api/featured-video');
        if (response.ok) {
          const data = await response.json();
          // Check if the response has a video property
          if (data.success && data.video) {
            setFeaturedVideo(data.video);
          } else if (data.video) {
            setFeaturedVideo(data.video);
          }
        } else {
          console.warn('Featured video API returned non-OK status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching featured video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVideo();
  }, []);

  // Fallback data if no featured video is available
  const fallbackVideo: SermonData = {
    title: "El Amor de Dios (The Love of God)",
    preacher: "Pastor Roberto Martinez",
    date: "May 7, 2023",
    description: "Exploring the depth and boundless nature of God's love for humanity through scripture and personal testimony.",
    youtubeId: "dQw4w9WgXcQ",
    category: "Sermon",
    publishedAt: "2023-05-07T11:00:00Z",
    duration: "45:30",
    viewCount: "1,234",
    likeCount: "89"
  };

  const videoToShow = featuredVideo || fallbackVideo;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center sermon-section">
      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-xl relative">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-primary-brown/10">
            <div className="text-primary-brown">
              <svg className="animate-spin h-8 w-8" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoToShow.youtubeId}`}
            title={videoToShow.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium bg-primary-gold/10 text-primary-gold rounded-full px-2 py-1">
            {videoToShow.category}
          </span>
          {videoToShow.duration && (
            <span className="text-xs text-text-dark/60 ml-2">
              {videoToShow.duration}
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-primary-brown mb-2">
          {videoToShow.title}
        </h3>
        
        <p className="text-primary-gold mb-4">
          {videoToShow.preacher} | {videoToShow.date}
        </p>
        
        <p className="text-text-dark/80 mb-6">
          {videoToShow.description}
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Link
              href={`https://www.youtube.com/watch?v=${videoToShow.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>{t('watch_now')}</span>
            </Link>
            
            <Link
              href="/sermons"
              className="inline-flex items-center text-primary-gold hover:text-primary-brown transition-colors"
            >
              <span className="mr-2">{t('watch_more_sermons')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {(videoToShow.viewCount !== '0' || videoToShow.likeCount !== '0') && (
            <div className="flex items-center space-x-4 text-sm text-text-dark/60">
              {videoToShow.viewCount !== '0' && !isNaN(Number(videoToShow.viewCount)) && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {Number(videoToShow.viewCount).toLocaleString()} views
                </span>
              )}
              {videoToShow.likeCount !== '0' && !isNaN(Number(videoToShow.likeCount)) && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {Number(videoToShow.likeCount).toLocaleString()} likes
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 