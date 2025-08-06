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

  // Hero section
  hero_subtitle: string;
  
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
  dance_ministry: string;
  dance_ministry_desc: string;
  worship_team: string;
  worship_team_desc: string;
  youth_ministry: string;
  youth_ministry_desc: string;
  children_ministry: string;
  children_ministry_desc: string;
  ushers_prayer: string;
  ushers_prayer_desc: string;
  men_women_ministry: string;
  men_women_ministry_desc: string;
  get_involved: string;
  get_involved_desc: string;
  contact_learn_more: string;

  // Youth Camp Form
  youth_camp_registration: string;
  youth_camp_dates: string;
  youth_camp_description: string;
  
  // Form Sections
  personal_information: string;
  contact_information: string;
  emergency_contact: string;
  special_requirements_medical: string;
  liability_waiver_agreement: string;
  
  // Form Fields
  participant_name: string;
  participant_name_placeholder: string;
  parent_guardian_name: string;
  parent_guardian_name_placeholder: string;
  sex: string;
  select_sex: string;
  male: string;
  female: string;
  age: string;
  age_placeholder: string;
  contact_phone: string;
  contact_phone_placeholder: string;
  contact_email: string;
  contact_email_placeholder: string;
  emergency_contact_name: string;
  emergency_contact_name_placeholder: string;
  emergency_contact_phone: string;
  emergency_contact_phone_placeholder: string;
  relationship: string;
  relationship_placeholder: string;
  special_accommodations: string;
  special_accommodations_placeholder: string;
  medical_conditions: string;
  medical_conditions_placeholder: string;
  allergies: string;
  allergies_placeholder: string;
  dietary_restrictions: string;
  dietary_restrictions_placeholder: string;
  digital_signature: string;
  parent_guardian_digital_signature: string;
  digital_signature_placeholder: string;
  parent_digital_signature_placeholder: string;
  
  // Validation Messages
  participant_name_required: string;
  parent_guardian_name_required: string;
  sex_required: string;
  age_required: string;
  age_must_be_13_older: string;
  contact_phone_required: string;
  valid_phone_number: string;
  contact_email_required: string;
  valid_email_address: string;
  emergency_contact_name_required: string;
  emergency_contact_phone_required: string;
  emergency_contact_relation_required: string;
  parent_signature_required: string;
  waiver_must_be_accepted: string;
  
  // Waiver Section
  waiver_agreement_accepted: string;
  waiver_acceptance_required: string;
  view_full_waiver: string;
  click_read_complete_waiver: string;
  waiver_summary: string;
  digital_signature_agreement: string;
  adult_signature_agreement: string;
  
  // Buttons and Actions
  submit_registration: string;
  submitting_registration: string;
  submit_another_registration: string;
  return_to_home: string;
  
  // Success Modal
  registration_successful: string;
  registration_submitted_successfully: string;
  camp_dates: string;
  registration_id: string;
  whats_next: string;
  review_registration_2_3_days: string;
  receive_confirmation_email: string;
  contact_us_questions: string;
  contact_us_modal: string;
  address: string;
  phone: string;
  questions: string;
  
  // Error Messages
  registration_failed: string;
  network_error: string;
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
    
          // Hero section
      'hero_subtitle': 'A welcoming community of faith in Wilmington, NC where everyone can experience God\'s love and grace.',
    
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
    'dance_ministry': 'Dance Ministry',
    'dance_ministry_desc': 'Join our passionate dance ministry as we express worship and praise through movement and artistic expression.',
    'worship_team': 'Worship Team (Music)',
    'worship_team_desc': 'Our worship team leads the congregation in praise and worship during our services through music and song, creating an atmosphere where people can encounter God\'s presence.',
    'youth_ministry': 'Youth Ministry',
    'youth_ministry_desc': 'Our youth ministry provides a safe and fun environment for young people to grow in their faith, build lasting friendships, and discover their purpose in God.',
    'children_ministry': 'Children\'s Ministry',
    'children_ministry_desc': 'Our children\'s ministry provides age-appropriate biblical teaching and fun activities to help children develop a strong foundation in faith from an early age.',
    'ushers_prayer': 'Ushers and Prayer',
    'ushers_prayer_desc': 'Experience the power of prayer through our dedicated prayer ministry and welcoming ushers who serve with love and compassion.',
    'men_women_ministry': 'Men/Women\'s Ministry',
    'men_women_ministry_desc': 'Building strong relationships and spiritual growth through fellowship and study groups for both men and women.',
    'get_involved': 'Want to Get Involved?',
    'get_involved_desc': 'We believe everyone has unique gifts and talents that can contribute to the church body. We\'d love to help you find your place to serve!',
    'contact_learn_more': 'Contact Us to Learn More',

    // Youth Camp Form
    'youth_camp_registration': 'Youth Camp Registration 2025',
    'youth_camp_dates': 'August 6-9, 2025',
    'youth_camp_description': 'Ages 13+ • A fun-filled Christian camp experience',
    
    // Form Sections
    'personal_information': 'Personal Information',
    'contact_information': 'Contact Information',
    'emergency_contact': 'Emergency Contact',
    'special_requirements_medical': 'Special Requirements & Medical Information',
    'liability_waiver_agreement': 'Liability Waiver & Agreement',
    
    // Form Fields
    'participant_name': 'Participant Name',
    'participant_name_placeholder': 'Enter participant\'s full name',
    'parent_guardian_name': 'Parent/Guardian Name',
    'parent_guardian_name_placeholder': 'Enter parent/guardian\'s full name',
    'sex': 'Sex',
    'select_sex': 'Select sex',
    'male': 'Male',
    'female': 'Female',
    'age': 'Age',
    'age_placeholder': 'Age (13+)',
    'contact_phone': 'Contact Phone',
    'contact_phone_placeholder': '(XXX) XXX-XXXX',
    'contact_email': 'Contact Email',
    'contact_email_placeholder': 'Enter email address',
    'emergency_contact_name': 'Emergency Contact Name',
    'emergency_contact_name_placeholder': 'Emergency contact full name',
    'emergency_contact_phone': 'Emergency Contact Phone',
    'emergency_contact_phone_placeholder': '(XXX) XXX-XXXX',
    'relationship': 'Relationship',
    'relationship_placeholder': 'e.g., Grandparent, Aunt, etc.',
    'special_accommodations': 'Special Accommodations',
    'special_accommodations_placeholder': 'Any special accommodations needed...',
    'medical_conditions': 'Medical Conditions',
    'medical_conditions_placeholder': 'Any medical conditions we should know about...',
    'allergies': 'Allergies',
    'allergies_placeholder': 'Any allergies (food, medication, environmental)...',
    'dietary_restrictions': 'Dietary Restrictions',
    'dietary_restrictions_placeholder': 'Any dietary restrictions or preferences...',
    'digital_signature': 'Digital Signature',
    'parent_guardian_digital_signature': 'Parent/Guardian Digital Signature',
    'digital_signature_placeholder': 'Type your full name as digital signature',
    'parent_digital_signature_placeholder': 'Type parent/guardian full name as digital signature',
    
    // Validation Messages
    'participant_name_required': 'Participant name is required',
    'parent_guardian_name_required': 'Parent/Guardian name is required',
    'sex_required': 'Sex is required',
    'age_required': 'Age is required',
    'age_must_be_13_older': 'Age must be 13 or older',
    'contact_phone_required': 'Contact phone is required',
    'valid_phone_number': 'Please enter a valid phone number',
    'contact_email_required': 'Contact email is required',
    'valid_email_address': 'Please enter a valid email address',
    'emergency_contact_name_required': 'Emergency contact name is required',
    'emergency_contact_phone_required': 'Emergency contact phone is required',
    'emergency_contact_relation_required': 'Emergency contact relation is required',
    'parent_signature_required': 'Parent/Guardian signature is required',
    'waiver_must_be_accepted': 'You must accept the waiver to complete registration.',
    
    // Waiver Section
    'waiver_agreement_accepted': 'I have read, understood, and agree to the terms of the comprehensive liability waiver above.',
    'waiver_acceptance_required': 'Required: You must accept this waiver to complete registration.',
    'view_full_waiver': 'View Full Waiver (English/Spanish)',
    'click_read_complete_waiver': 'Click here to read the complete waiver in English or Spanish',
    'waiver_summary': 'By participating in the Youth Camp program organized by Templo Adoracion Y Alabanza, you acknowledge and assume all risks, release the church from liability, and agree to indemnify the church. This includes risks of injury, property damage, or death from camp activities, transportation, and facilities.',
    'digital_signature_agreement': 'By typing your name above, you are providing a digital signature and agreeing to all terms as an adult participant.',
    'adult_signature_agreement': 'By typing your name above as parent/guardian, you are providing a digital signature and agreeing to all terms on behalf of your minor child.',
    
    // Buttons and Actions
    'submit_registration': 'Submit Registration',
    'submitting_registration': 'Submitting Registration...',
    'submit_another_registration': 'Submit Another Registration',
    'return_to_home': 'Return to Home',
    
    // Success Modal
    'registration_successful': 'Registration Successful!',
    'registration_submitted_successfully': 'registration for Youth Camp 2025 has been submitted successfully!',
    'camp_dates': 'Camp Dates',
    'registration_id': 'Registration ID',
    'whats_next': 'What\'s Next?',
    'review_registration_2_3_days': '• We will review your registration within 2-3 business days',
    'receive_confirmation_email': '• You\'ll receive a confirmation email with payment details',
    'contact_us_questions': '• Feel free to contact us with any questions',
    'contact_us_modal': 'Contact Us',
    'address': 'Address',
    'phone': 'Phone',
    'questions': 'Questions?',
    
    // Error Messages
    'registration_failed': 'Registration failed. Please try again.',
    'network_error': 'Network error. Please check your connection and try again.'
  },
  es: {
    // Navbar
    'home': 'Inicio',
    'services': 'Servicios',
    'ministries': 'Ministerios',
    'events': 'Eventos',
    'sermons': 'Sermones',
    
          // Hero section
      'hero_subtitle': 'Una comunidad acogedora de fe en Wilmington, NC donde todos pueden experimentar el amor y la gracia de Dios.',
    
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
    'dance_ministry': 'Ministerio de Danza',
    'dance_ministry_desc': 'Únase a nuestro apasionado ministerio de danza mientras expresamos adoración y alabanza a través del movimiento y la expresión artística.',
    'worship_team': 'Equipo de Adoración (Música)',
    'worship_team_desc': 'Nuestro equipo de adoración guía a la congregación en alabanza y adoración durante nuestros servicios a través de música y canción, creando una atmósfera donde las personas pueden encontrar la presencia de Dios.',
    'youth_ministry': 'Ministerio de Jóvenes',
    'youth_ministry_desc': 'Nuestro ministerio juvenil proporciona un ambiente seguro y divertido para que los jóvenes crezcan en su fe, construyan amistades duraderas y descubran su propósito en Dios.',
    'children_ministry': 'Ministerio de Niños',
    'children_ministry_desc': 'Nuestro ministerio infantil proporciona enseñanza bíblica apropiada para su edad y actividades divertidas para ayudar a los niños a desarrollar una base sólida en la fe desde una edad temprana.',
    'ushers_prayer': 'Ujieres y Oración',
    'ushers_prayer_desc': 'Experimente el poder de la oración a través de nuestro ministerio de oración dedicado y ujieres acogedores que sirven con amor y compasión.',
    'men_women_ministry': 'Ministerio de Hombres/Mujeres',
    'men_women_ministry_desc': 'Construyendo relaciones sólidas y crecimiento espiritual a través de grupos de compañerismo y estudio para hombres y mujeres.',
    'get_involved': '¿Quiere Involucrarse?',
    'get_involved_desc': 'Creemos que todos tienen dones y talentos únicos que pueden contribuir al cuerpo de la iglesia. ¡Nos encantaría ayudarle a encontrar su lugar para servir!',
    'contact_learn_more': 'Contáctenos para Obtener Más Información',

    // Youth Camp Form
    'youth_camp_registration': 'Inscripción al Campamento Juvenil 2025',
    'youth_camp_dates': '6-9 de Agosto, 2025',
    'youth_camp_description': 'Edades 13+ • Una experiencia cristiana llena de diversión',
    
    // Form Sections
    'personal_information': 'Información Personal',
    'contact_information': 'Información de Contacto',
    'emergency_contact': 'Contacto de Emergencia',
    'special_requirements_medical': 'Requisitos Especiales e Información Médica',
    'liability_waiver_agreement': 'Exención de Responsabilidad y Acuerdo',
    
    // Form Fields
    'participant_name': 'Nombre del Participante',
    'participant_name_placeholder': 'Ingrese el nombre completo del participante',
    'parent_guardian_name': 'Nombre del Padre/Tutor',
    'parent_guardian_name_placeholder': 'Ingrese el nombre completo del padre/tutor',
    'sex': 'Sexo',
    'select_sex': 'Seleccionar sexo',
    'male': 'Masculino',
    'female': 'Femenino',
    'age': 'Edad',
    'age_placeholder': 'Edad (13+)',
    'contact_phone': 'Teléfono de Contacto',
    'contact_phone_placeholder': '(XXX) XXX-XXXX',
    'contact_email': 'Correo de Contacto',
    'contact_email_placeholder': 'Ingrese dirección de correo',
    'emergency_contact_name': 'Nombre del Contacto de Emergencia',
    'emergency_contact_name_placeholder': 'Nombre completo del contacto de emergencia',
    'emergency_contact_phone': 'Teléfono del Contacto de Emergencia',
    'emergency_contact_phone_placeholder': '(XXX) XXX-XXXX',
    'relationship': 'Parentesco',
    'relationship_placeholder': 'ej., Abuelo, Tía, etc.',
    'special_accommodations': 'Adaptaciones Especiales',
    'special_accommodations_placeholder': 'Cualquier adaptación especial necesaria...',
    'medical_conditions': 'Condiciones Médicas',
    'medical_conditions_placeholder': 'Cualquier condición médica que debamos saber...',
    'allergies': 'Alergias',
    'allergies_placeholder': 'Cualquier alergia (alimentaria, medicamentos, ambiental)...',
    'dietary_restrictions': 'Restricciones Dietéticas',
    'dietary_restrictions_placeholder': 'Cualquier restricción o preferencia dietética...',
    'digital_signature': 'Firma Digital',
    'parent_guardian_digital_signature': 'Firma Digital del Padre/Tutor',
    'digital_signature_placeholder': 'Escriba su nombre completo como firma digital',
    'parent_digital_signature_placeholder': 'Escriba el nombre completo del padre/tutor como firma digital',
    
    // Validation Messages
    'participant_name_required': 'El nombre del participante es requerido',
    'parent_guardian_name_required': 'El nombre del padre/tutor es requerido',
    'sex_required': 'El sexo es requerido',
    'age_required': 'La edad es requerida',
    'age_must_be_13_older': 'La edad debe ser 13 años o mayor',
    'contact_phone_required': 'El teléfono de contacto es requerido',
    'valid_phone_number': 'Por favor ingrese un número telefónico válido',
    'contact_email_required': 'El correo de contacto es requerido',
    'valid_email_address': 'Por favor ingrese una dirección de correo válida',
    'emergency_contact_name_required': 'El nombre del contacto de emergencia es requerido',
    'emergency_contact_phone_required': 'El teléfono del contacto de emergencia es requerido',
    'emergency_contact_relation_required': 'El parentesco del contacto de emergencia es requerido',
    'parent_signature_required': 'La firma del padre/tutor es requerida',
    'waiver_must_be_accepted': 'Debe aceptar la exención para completar la inscripción.',
    
    // Waiver Section
    'waiver_agreement_accepted': 'He leído, entendido y acepto los términos de la exención integral de responsabilidad arriba.',
    'waiver_acceptance_required': 'Requerido: Debe aceptar esta exención para completar la inscripción.',
    'view_full_waiver': 'Ver Exención Completa (Inglés/Español)',
    'click_read_complete_waiver': 'Haga clic aquí para leer la exención completa en inglés o español',
    'waiver_summary': 'Al participar en el programa del Campamento Juvenil organizado por Templo Adoración Y Alabanza, usted reconoce y asume todos los riesgos, libera a la iglesia de responsabilidad, y acepta indemnizar a la iglesia. Esto incluye riesgos de lesiones, daños a la propiedad, o muerte por actividades del campamento, transporte, e instalaciones.',
    'digital_signature_agreement': 'Al escribir su nombre arriba, está proporcionando una firma digital y aceptando todos los términos como participante adulto.',
    'adult_signature_agreement': 'Al escribir su nombre arriba como padre/tutor, está proporcionando una firma digital y aceptando todos los términos en nombre de su hijo menor.',
    
    // Buttons and Actions
    'submit_registration': 'Enviar Inscripción',
    'submitting_registration': 'Enviando Inscripción...',
    'submit_another_registration': 'Enviar Otra Inscripción',
    'return_to_home': 'Regresar al Inicio',
    
    // Success Modal
    'registration_successful': '¡Inscripción Exitosa!',
    'registration_submitted_successfully': 'inscripción para el Campamento Juvenil 2025 ha sido enviada exitosamente!',
    'camp_dates': 'Fechas del Campamento',
    'registration_id': 'ID de Inscripción',
    'whats_next': '¿Qué Sigue?',
    'review_registration_2_3_days': '• Revisaremos su inscripción dentro de 2-3 días hábiles',
    'receive_confirmation_email': '• Recibirá un correo de confirmación con detalles de pago',
    'contact_us_questions': '• No dude en contactarnos con cualquier pregunta',
    'contact_us_modal': 'Contáctenos',
    'address': 'Dirección',
    'phone': 'Teléfono',
    'questions': '¿Preguntas?',
    
    // Error Messages
    'registration_failed': 'La inscripción falló. Por favor intente de nuevo.',
    'network_error': 'Error de red. Por favor verifique su conexión e intente de nuevo.'
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