"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

interface Sermon {
  title: string;
  preacher: string;
  date: string;
  description: string;
  youtubeId: string;
  category: string;
}

export default function SermonsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  useEffect(() => {
    // Set initial styles directly to avoid flash of invisible content
    gsap.set([".page-header", ".filter-buttons", ".sermon-card"], { 
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

    tl.fromTo(".filter-buttons", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
    );

    tl.fromTo(".sermon-card", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const sermons: Sermon[] = [
    {
      title: "El Amor de Dios (The Love of God)",
      preacher: "Pastor Roberto Martinez",
      date: "May 7, 2023",
      description: "Exploring the depth and dimensions of God's love for us and how it transforms our lives.",
      youtubeId: "dQw4w9WgXcQ", // Placeholder ID
      category: "Sunday Message"
    },
    {
      title: "Fe en Tiempos Difíciles (Faith in Difficult Times)",
      preacher: "Pastor Roberto Martinez",
      date: "April 30, 2023",
      description: "Finding strength in our faith during life's challenges and hardships.",
      youtubeId: "dQw4w9WgXcQ", // Placeholder ID
      category: "Sunday Message"
    },
    {
      title: "El Poder de la Oración (The Power of Prayer)",
      preacher: "Pastor Carlos Jimenez",
      date: "April 23, 2023",
      description: "Understanding how prayer connects us to God and unleashes His power in our lives.",
      youtubeId: "dQw4w9WgXcQ", // Placeholder ID
      category: "Prayer Night"
    },
    {
      title: "Viviendo en Victoria (Living in Victory)",
      preacher: "Pastor Roberto Martinez",
      date: "April 16, 2023",
      description: "How to live victorious Christian lives despite the challenges we face.",
      youtubeId: "dQw4w9WgXcQ", // Placeholder ID
      category: "Sunday Message"
    },
    {
      title: "Resurrección: Nuestro Mensaje de Esperanza (Resurrection: Our Message of Hope)",
      preacher: "Pastor Roberto Martinez",
      date: "April 9, 2023",
      description: "Easter Sunday message on the power and promise of Christ's resurrection.",
      youtubeId: "dQw4w9WgXcQ", // Placeholder ID
      category: "Special Service"
    },
    {
      title: "Discipulado en la Era Digital (Discipleship in the Digital Age)",
      preacher: "Minister Ana Garcia",
      date: "April 2, 2023",
      description: "How to maintain and grow our faith in an increasingly digital and distracted world.",
      youtubeId: "dQw4w9WgXcQ", // Placeholder ID
      category: "Bible Study"
    }
  ];
  
  // Filter sermons based on the selected category
  const filteredSermons = selectedCategory === "all" 
    ? sermons 
    : sermons.filter(sermon => sermon.category === selectedCategory);
    
  // Get unique categories for filter buttons
  const categories = ["all", ...new Set(sermons.map(sermon => sermon.category))];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 page-header">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
            Sermon Archive
          </h1>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
            Watch and listen to recent messages from our church services and special events.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-12 filter-buttons">
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary-brown text-white" 
                  : "bg-primary-brown/10 text-primary-brown hover:bg-primary-brown/20"
              }`}
            >
              {category === "all" ? "All Sermons" : category}
            </button>
          ))}
        </div>

        {/* Sermon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredSermons.map((sermon, index) => (
            <div 
              key={index} 
              className="sermon-card bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-video bg-black">
                <a 
                  href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img 
                    src={`https://img.youtube.com/vi/${sermon.youtubeId}/maxresdefault.jpg`} 
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute flex items-center justify-center w-16 h-16 rounded-full bg-primary-brown/90 group-hover:bg-primary-brown transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
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
                  <span className="text-xs text-text-dark/60 ml-2">
                    {sermon.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-primary-brown group-hover:text-primary-gold transition-colors">
                  <a 
                    href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {sermon.title}
                  </a>
                </h3>
                
                <p className="text-sm text-primary-gold/80 mt-1 mb-3">
                  {sermon.preacher}
                </p>
                
                <p className="text-sm text-text-dark/80 line-clamp-2 mb-4">
                  {sermon.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <a 
                    href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary-gold hover:text-primary-brown transition-colors flex items-center"
                  >
                    Watch Now
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  
                  <button 
                    className="text-sm font-medium text-text-dark/60 hover:text-primary-brown transition-colors flex items-center"
                    aria-label="Download sermon"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Audio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscription Call-to-Action */}
        <div className="bg-accent-cream/20 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-brown mb-4">
            Don&apos;t Miss Any Sermons
          </h2>
          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto mb-8">
            Subscribe to our YouTube channel to get notified when new sermons are available.
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
            Subscribe to Our Channel
          </a>
        </div>
      </div>
    </div>
  );
} 