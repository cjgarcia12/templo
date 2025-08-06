"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import FeaturedVideo from "@/components/FeaturedVideo";

// Register the ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const sermonRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial styles to prevent flash/jump of content
    gsap.set(".hero-title span", { opacity: 1, y: 0 });
    gsap.set(".hero-subtitle", { opacity: 1, y: 0 });
    gsap.set(".hero-shape", { opacity: 1, scale: 1 });
    gsap.set(".hero-cta", { opacity: 1, y: 0 });
    gsap.set(".about-content", { opacity: 1, y: 0 });
    gsap.set(".service-card", { opacity: 1, y: 0 });
    gsap.set(".sermon-section", { opacity: 1, y: 0 });
    
    // Hero section animations
    const heroTl = gsap.timeline();
    
    heroTl.fromTo(".hero-title span", {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    });
    
    heroTl.fromTo(".hero-subtitle", {
      opacity: 0, 
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.2");
    
    heroTl.fromTo(".hero-shape", {
      opacity: 0,
      scale: 0.8,
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5");
    
    heroTl.fromTo(".hero-cta", {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.7");
    
    // About section animations with ScrollTrigger
    gsap.fromTo(".about-content", 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    );
    
    // Services section animations with ScrollTrigger
    gsap.fromTo(".service-card", 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out"
      }
    );

    // Sermon section animations with ScrollTrigger
    gsap.fromTo(".sermon-section", 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: sermonRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    );
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background shapes inspired by the church logo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-shape absolute -right-20 -top-20 w-96 h-96 bg-primary-gold/20 rounded-full blur-3xl"></div>
          <div className="hero-shape absolute -left-20 top-1/2 w-72 h-72 bg-primary-brown/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-primary-brown mb-4">
              <span className="inline-block">Templo</span>{" "}
              <span className="inline-block text-primary-gold">Adoracion</span>{" "}
              <span className="inline-block">Y</span>{" "}
              <span className="inline-block text-primary-gold">Alabanza</span>
            </h1>
            
            <p className="hero-subtitle text-lg md:text-xl text-text-dark/80 max-w-2xl mx-auto mb-8">
              {t('hero_subtitle')}
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/services"
                className="w-full sm:w-auto text-center bg-primary-brown hover:bg-primary-brown/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                {t('our_services')}
              </Link>
              <Link
                href="/sermons"
                className="w-full sm:w-auto text-center bg-transparent border-2 border-primary-gold hover:bg-primary-gold/10 text-primary-gold font-medium py-3 px-6 rounded-md transition-colors"
              >
                {t('watch_more_sermons')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome/About Section */}
      <section
        ref={aboutRef}
        className="py-16 md:py-24 bg-accent-cream/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="about-content">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-brown mb-6">
                {t('welcome_to_church')}
              </h2>
              
              <p className="text-text-dark/80 mb-6">
                {t('church_description')}
              </p>
              
              <p className="text-text-dark/80 mb-6">
                {t('mission_description')}
              </p>
              
              <Link
                href="/ministries"
                className="inline-block font-medium text-primary-gold hover:text-primary-brown transition-colors"
              >
                {t('discover_ministries')} →
              </Link>
            </div>
            
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/ourChurch.jpg"
                alt="Our Church building"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section
        ref={servicesRef}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-brown mb-4">
              {t('join_for_worship')}
            </h2>
            <p className="text-text-dark/80 max-w-2xl mx-auto">
              {t('worship_invite')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="service-card bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-primary-gold text-5xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-brown mb-2">{t('sunday_worship_home')}</h3>
              <p className="text-text-dark/80 mb-1">Every Sunday</p>
              <p className="text-primary-gold font-medium">11:00 AM</p>
            </div>
            
            <div className="service-card bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-primary-gold text-5xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-brown mb-2">{t('prayer_night_home')}</h3>
              <p className="text-text-dark/80 mb-1">Every Tuesday</p>
              <p className="text-primary-gold font-medium">7:00 PM</p>
            </div>
            
            <div className="service-card bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-primary-gold text-5xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-brown mb-2">{t('bible_study_youth_night')}</h3>
              <p className="text-text-dark/80 mb-1">Every Friday</p>
              <p className="text-primary-gold font-medium">7:00 PM</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-primary-brown hover:bg-primary-brown/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              {t('learn_more_services')}
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Sermon Section */}
      <section
        ref={sermonRef}
        className="py-16 md:py-24 bg-primary-brown/5"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sermon-section">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-brown mb-4">
              {t('latest_sermon')}
            </h2>
            <p className="text-text-dark/80 max-w-2xl mx-auto">
              {t('watch_sermon')}
            </p>
          </div>
          
          <FeaturedVideo />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-accent-cream/30 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-brown mb-6">
              {t('join_sunday')}
            </h2>
                          <p className="text-lg text-text-dark/80 max-w-2xl mx-auto mb-8">
                {t('welcome_community')}
              </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/services"
                className="w-full sm:w-auto text-center bg-primary-brown hover:bg-primary-brown/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                {t('plan_visit')}
              </Link>
              <Link
                href="#contact"
                className="w-full sm:w-auto text-center bg-transparent border-2 border-primary-gold hover:bg-primary-gold/10 text-primary-gold font-medium py-3 px-6 rounded-md transition-colors"
              >
                {t('contact_us')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
