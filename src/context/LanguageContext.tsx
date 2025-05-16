"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'es';

interface TranslationKeys {
  // Navbar
  home: string;
  services: string;
  ministries: string;
  events: string;
  sermons: string;
  
  // Services page
  our_services: string;
  join_us: string;
  sunday_worship: string;
  sunday_desc: string;
  prayer_night: string;
  prayer_desc: string;
  bible_study: string;
  bible_desc: string;
  what_to_expect: string;
  warm_welcome: string;
  welcome_desc: string;
  vibrant_worship: string;
  worship_desc: string;
  relevant_teaching: string;
  teaching_desc: string;
  community_connection: string;
  connection_desc: string;
  join_us_at: string;
  welcome_you: string;
}

type TranslationsType = {
  [key in Language]: TranslationKeys;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English and Spanish translations
const translations: TranslationsType = {
  en: {
    // Navbar
    'home': 'Home',
    'services': 'Services',
    'ministries': 'Ministries',
    'events': 'Events',
    'sermons': 'Sermons',
    
    // Services page
    'our_services': 'Our Services',
    'join_us': 'Join us in worship, prayer, and study as we grow together in faith. All are welcome!',
    'sunday_worship': 'Sunday Worship Service',
    'sunday_desc': 'Join us for praise, worship, and an inspiring message from God\'s Word every Sunday morning.',
    'prayer_night': 'Prayer Night',
    'prayer_desc': 'A powerful time of corporate prayer where we intercede for our community, church, and personal needs.',
    'bible_study': 'Bible Study & Youth Night',
    'bible_desc': 'Dive deeper into God\'s Word with our Bible study while youth enjoy a dedicated program focused on spiritual growth.',
    'what_to_expect': 'What to Expect',
    'warm_welcome': 'Warm Welcome',
    'welcome_desc': 'You\'ll be greeted by our friendly welcome team who will help you get oriented and answer any questions you might have.',
    'vibrant_worship': 'Vibrant Worship',
    'worship_desc': 'Experience lively praise and worship as we lift our voices to honor God through a blend of contemporary and traditional music.',
    'relevant_teaching': 'Relevant Teaching',
    'teaching_desc': 'Our messages are Bible-based and applicable to your daily life, with practical insights to help you grow in your faith.',
    'community_connection': 'Community Connection',
    'connection_desc': 'We value building relationships and provide opportunities before and after services to connect with others.',
    'join_us_at': 'Join Us at',
    'welcome_you': 'We look forward to welcoming you!',
  },
  es: {
    // Navbar
    'home': 'Inicio',
    'services': 'Servicios',
    'ministries': 'Ministerios',
    'events': 'Eventos',
    'sermons': 'Sermones',
    
    // Services page
    'our_services': 'Nuestros Servicios',
    'join_us': '¡Únase a nosotros en adoración, oración y estudio mientras crecemos juntos en la fe. Todos son bienvenidos!',
    'sunday_worship': 'Servicio de Adoración Dominical',
    'sunday_desc': 'Únase a nosotros para alabanza, adoración y un mensaje inspirador de la Palabra de Dios cada domingo por la mañana.',
    'prayer_night': 'Noche de Oración',
    'prayer_desc': 'Un tiempo poderoso de oración corporativa donde intercedemos por nuestra comunidad, iglesia y necesidades personales.',
    'bible_study': 'Estudio Bíblico y Noche Juvenil',
    'bible_desc': 'Sumérjase más profundamente en la Palabra de Dios con nuestro estudio bíblico mientras los jóvenes disfrutan de un programa dedicado enfocado en el crecimiento espiritual.',
    'what_to_expect': 'Qué Esperar',
    'warm_welcome': 'Bienvenida Cálida',
    'welcome_desc': 'Será recibido por nuestro amable equipo de bienvenida que le ayudará a orientarse y responderá cualquier pregunta que pueda tener.',
    'vibrant_worship': 'Adoración Vibrante',
    'worship_desc': 'Experimente alabanza y adoración animada mientras elevamos nuestras voces para honrar a Dios a través de una mezcla de música contemporánea y tradicional.',
    'relevant_teaching': 'Enseñanza Relevante',
    'teaching_desc': 'Nuestros mensajes están basados en la Biblia y son aplicables a su vida diaria, con ideas prácticas para ayudarlo a crecer en su fe.',
    'community_connection': 'Conexión Comunitaria',
    'connection_desc': 'Valoramos la construcción de relaciones y brindamos oportunidades antes y después de los servicios para conectarse con otros.',
    'join_us_at': 'Únase a Nosotros en',
    'welcome_you': '¡Esperamos darle la bienvenida!',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Check local storage for saved language preference or default to English
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Only access localStorage in the browser environment
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  // Save language preference to local storage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Translation function
  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key] || key.toString();
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 