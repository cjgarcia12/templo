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

  // Home page
  welcome_to_church: string;
  church_description: string;
  mission_description: string;
  discover_ministries: string;
  join_for_worship: string;
  worship_invite: string;
  sunday_worship_home: string;
  prayer_night_home: string;
  bible_study_youth_night: string;
  learn_more_services: string;
  latest_sermon: string;
  watch_sermon: string;
  sermon_description: string;
  watch_more_sermons: string;
  join_sunday: string;
  plan_visit: string;
  welcome_community: string;
  contact_us: string;

  // Events page
  upcoming_events: string;
  events_description: string;
  all_events: string;
  worship_category: string;
  community_category: string;
  youth_category: string;
  special_events: string;
  never_miss_event: string;
  subscribe_calendar: string;
  calendar_description: string;
  
  // Sermons page
  sermon_archive: string;
  sermons_description: string;
  watch_now: string;
  download_audio: string;
  dont_miss_sermons: string;
  youtube_subscribe: string;
  
  // Ministries page
  our_ministries: string;
  ministries_description: string;
  worship_team: string;
  worship_team_desc: string;
  prayer_ministry: string;
  prayer_ministry_desc: string;
  youth_ministry: string;
  youth_ministry_desc: string;
  children_ministry: string;
  children_ministry_desc: string;
  outreach_missions: string;
  outreach_missions_desc: string;
  hospitality_team: string;
  hospitality_team_desc: string;
  get_involved: string;
  get_involved_desc: string;
  contact_learn_more: string;
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

    // Home page
    'welcome_to_church': 'Welcome to Our Church',
    'church_description': 'Templo Adoracion Y Alabanza is a vibrant, Spirit-filled church serving the Wilmington community. We are dedicated to sharing God\'s love through worship, discipleship, and community service.',
    'mission_description': 'Our mission is to create an inclusive environment where people from all walks of life can encounter God, build meaningful relationships, and grow in their faith journey.',
    'discover_ministries': 'Discover Our Ministries',
    'join_for_worship': 'Join Us For Worship',
    'worship_invite': 'We invite you to join us for our regular services and experience the presence of God in a welcoming community.',
    'sunday_worship_home': 'Sunday Worship',
    'prayer_night_home': 'Prayer Night',
    'bible_study_youth_night': 'Bible Study/Youth Night',
    'learn_more_services': 'Learn More About Our Services',
    'latest_sermon': 'Latest Sermon',
    'watch_sermon': 'Watch our most recent message and be encouraged in your faith journey.',
    'sermon_description': 'In this powerful message, Pastor Roberto explores the depth and dimensions of God\'s love for us and how it transforms our lives. Learn how God\'s love can heal wounds, restore relationships, and give you the courage to face any challenge.',
    'watch_more_sermons': 'Watch more sermons',
    'join_sunday': 'Join Us This Sunday',
    'welcome_community': 'We\'d love to welcome you to our church family. Experience heartfelt worship, relevant teaching, and warm community.',
    'plan_visit': 'Plan Your Visit',
    'contact_us': 'Contact Us',

    // Events page
    'upcoming_events': 'Upcoming Events',
    'events_description': 'Stay connected and get involved with these upcoming events and activities at our church.',
    'all_events': 'All Events',
    'worship_category': 'Worship',
    'community_category': 'Community',
    'youth_category': 'Youth',
    'special_events': 'Special Events',
    'never_miss_event': 'Never Miss an Event',
    'subscribe_calendar': 'Subscribe to Calendar',
    'calendar_description': 'Subscribe to our church calendar to stay up-to-date with all our events and activities.',
    
    // Sermons page
    'sermon_archive': 'Sermon Archive',
    'sermons_description': 'Watch and listen to recent messages from our church services and special events.',
    'watch_now': 'Watch Now',
    'download_audio': 'Audio',
    'dont_miss_sermons': 'Don\'t Miss Any Sermons',
    'youtube_subscribe': 'Subscribe to Our Channel',
    
    // Ministries page
    'our_ministries': 'Our Ministries',
    'ministries_description': 'Discover ways to get involved, serve, and grow in your faith journey with our various ministry opportunities.',
    'worship_team': 'Worship Team',
    'worship_team_desc': 'Our worship team leads the congregation in praise and worship during our services, creating an atmosphere where people can encounter God\'s presence.',
    'prayer_ministry': 'Prayer Ministry',
    'prayer_ministry_desc': 'Our prayer team is dedicated to interceding for the needs of the church, community, and world. We believe in the power of prayer to bring transformation.',
    'youth_ministry': 'Youth Ministry',
    'youth_ministry_desc': 'Our youth ministry provides a safe and fun environment for young people to grow in their faith, build lasting friendships, and discover their purpose in God.',
    'children_ministry': 'Children\'s Ministry',
    'children_ministry_desc': 'Our children\'s ministry provides age-appropriate biblical teaching and fun activities to help children develop a strong foundation in faith from an early age.',
    'outreach_missions': 'Outreach & Missions',
    'outreach_missions_desc': 'Our outreach team serves the local community through various initiatives and supports missionary work, sharing God\'s love through practical acts of service.',
    'hospitality_team': 'Hospitality Team',
    'hospitality_team_desc': 'Our hospitality team creates a warm, welcoming environment for everyone who enters our doors, ensuring that visitors feel at home in our church family.',
    'get_involved': 'Want to Get Involved?',
    'get_involved_desc': 'We believe everyone has unique gifts and talents that can contribute to the church body. We\'d love to help you find your place to serve!',
    'contact_learn_more': 'Contact Us to Learn More'
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

    // Home page
    'welcome_to_church': 'Bienvenido a Nuestra Iglesia',
    'church_description': 'Templo Adoración Y Alabanza es una iglesia vibrante, llena del Espíritu que sirve a la comunidad de Wilmington. Estamos dedicados a compartir el amor de Dios a través de la adoración, el discipulado y el servicio comunitario.',
    'mission_description': 'Nuestra misión es crear un ambiente inclusivo donde personas de todos los ámbitos de la vida puedan encontrarse con Dios, construir relaciones significativas y crecer en su camino de fe.',
    'discover_ministries': 'Descubra Nuestros Ministerios',
    'join_for_worship': 'Únase a Nosotros Para Adorar',
    'worship_invite': 'Le invitamos a unirse a nuestros servicios regulares y experimentar la presencia de Dios en una comunidad acogedora.',
    'sunday_worship_home': 'Adoración Dominical',
    'prayer_night_home': 'Noche de Oración',
    'bible_study_youth_night': 'Estudio Bíblico/Noche Juvenil',
    'learn_more_services': 'Más Información Sobre Nuestros Servicios',
    'latest_sermon': 'Último Sermón',
    'watch_sermon': 'Vea nuestro mensaje más reciente y sea alentado en su camino de fe.',
    'sermon_description': 'En este poderoso mensaje, el Pastor Roberto explora la profundidad y las dimensiones del amor de Dios por nosotros y cómo transforma nuestras vidas. Aprenda cómo el amor de Dios puede sanar heridas, restaurar relaciones y darle el valor para enfrentar cualquier desafío.',
    'watch_more_sermons': 'Ver más sermones',
    'join_sunday': 'Únase a Nosotros Este Domingo',
    'welcome_community': 'Nos encantaría darle la bienvenida a nuestra familia de la iglesia. Experimente una adoración sincera, enseñanza relevante y una comunidad cálida.',
    'plan_visit': 'Planifique Su Visita',
    'contact_us': 'Contáctenos',

    // Events page
    'upcoming_events': 'Próximos Eventos',
    'events_description': 'Manténgase conectado y participe en estos próximos eventos y actividades en nuestra iglesia.',
    'all_events': 'Todos los Eventos',
    'worship_category': 'Adoración',
    'community_category': 'Comunidad',
    'youth_category': 'Juventud',
    'special_events': 'Eventos Especiales',
    'never_miss_event': 'Nunca Se Pierda un Evento',
    'subscribe_calendar': 'Suscríbase al Calendario',
    'calendar_description': 'Suscríbase a nuestro calendario de la iglesia para mantenerse al día con todos nuestros eventos y actividades.',
    
    // Sermons page
    'sermon_archive': 'Archivo de Sermones',
    'sermons_description': 'Vea y escuche mensajes recientes de nuestros servicios de iglesia y eventos especiales.',
    'watch_now': 'Ver Ahora',
    'download_audio': 'Audio',
    'dont_miss_sermons': 'No Se Pierda Ningún Sermón',
    'youtube_subscribe': 'Suscríbase a Nuestro Canal',
    
    // Ministries page
    'our_ministries': 'Nuestros Ministerios',
    'ministries_description': 'Descubra formas de involucrarse, servir y crecer en su camino de fe con nuestras diversas oportunidades de ministerio.',
    'worship_team': 'Equipo de Adoración',
    'worship_team_desc': 'Nuestro equipo de adoración guía a la congregación en alabanza y adoración durante nuestros servicios, creando una atmósfera donde las personas pueden encontrar la presencia de Dios.',
    'prayer_ministry': 'Ministerio de Oración',
    'prayer_ministry_desc': 'Nuestro equipo de oración está dedicado a interceder por las necesidades de la iglesia, la comunidad y el mundo. Creemos en el poder de la oración para traer transformación.',
    'youth_ministry': 'Ministerio de Jóvenes',
    'youth_ministry_desc': 'Nuestro ministerio juvenil proporciona un ambiente seguro y divertido para que los jóvenes crezcan en su fe, construyan amistades duraderas y descubran su propósito en Dios.',
    'children_ministry': 'Ministerio de Niños',
    'children_ministry_desc': 'Nuestro ministerio infantil proporciona enseñanza bíblica apropiada para su edad y actividades divertidas para ayudar a los niños a desarrollar una base sólida en la fe desde una edad temprana.',
    'outreach_missions': 'Alcance y Misiones',
    'outreach_missions_desc': 'Nuestro equipo de alcance sirve a la comunidad local a través de varias iniciativas y apoya el trabajo misionero, compartiendo el amor de Dios a través de actos prácticos de servicio.',
    'hospitality_team': 'Equipo de Hospitalidad',
    'hospitality_team_desc': 'Nuestro equipo de hospitalidad crea un ambiente cálido y acogedor para todos los que entran por nuestras puertas, asegurando que los visitantes se sientan como en casa en nuestra familia de la iglesia.',
    'get_involved': '¿Quiere Involucrarse?',
    'get_involved_desc': 'Creemos que todos tienen dones y talentos únicos que pueden contribuir al cuerpo de la iglesia. ¡Nos encantaría ayudarle a encontrar su lugar para servir!',
    'contact_learn_more': 'Contáctenos para Obtener Más Información'
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