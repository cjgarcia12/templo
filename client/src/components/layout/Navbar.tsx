"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const navLinks = [
    { name: t('home'), href: "/" },
    { name: t('services'), href: "/services" },
    { name: t('ministries'), href: "/ministries" },
    { name: t('events'), href: "/events" },
    { name: t('sermons'), href: "/sermons" }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center bg-primary-brown rounded-full">
              <div className="text-text-light font-bold text-xl">T</div>
            </div>
            <div className="ml-3">
              <h1 className="text-sm font-semibold leading-tight text-primary-brown md:text-base">
                Templo Adoracion <br className="hidden md:block" /> 
                <span className="text-primary-gold">Y Alabanza</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-gold ${
                    pathname === link.href ? "text-primary-gold border-b-2 border-primary-gold" : "text-text-dark"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Language Toggle Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-full bg-primary-gold text-text-light hover:bg-primary-gold/90 transition-colors"
                aria-label="Toggle language"
              >
                <span className="font-medium">
                  {language === 'en' ? 'Español' : 'English'}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Language Toggle Button (Mobile) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-primary-gold text-text-light hover:bg-primary-gold/90 transition-colors"
              aria-label="Toggle language"
            >
              <span className="font-medium">
                {language === 'en' ? 'ES' : 'EN'}
              </span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="text-text-dark"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href ? "text-primary-gold bg-accent-cream/30" : "text-text-dark hover:bg-accent-cream/20"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}