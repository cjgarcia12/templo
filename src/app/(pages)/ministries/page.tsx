import React from "react";
import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import MinistriesClient from "./MinistriesClient";
import MinistriesPageContent from "./MinistriesPageContent";

// SEO metadata - this runs on the server
export const metadata = generateSEO({
  title: 'Our Ministries',
  description: 'Discover the various ministries at our church in Wilmington, NC. From worship and prayer to youth programs and community outreach, find your place to serve.',
  keywords: 'church ministries, worship team, youth ministry, prayer ministry, community outreach, children ministry, Wilmington NC, Spanish church',
  path: '/ministries',
});

interface Ministry {
  title: string;
  description: string;
  leader: string;
  icon: React.ReactNode;
}

// Static ministries data for SEO
const ministriesData: Ministry[] = [
  {
    title: "Dance Ministry",
    description: "Join our passionate dance ministry as we express worship and praise through movement and artistic expression.",
    leader: "Leader: Pastora Mary Garcia",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: "Worship Team (Music)",
    description: "Join our passionate worship team as we lead the congregation in heartfelt praise and worship through music and song.",
    leader: "Leaders: Roberto Jimenez, Dalia Erazo",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    )
  },
  {
    title: "Youth Ministry",
    description: "Empowering the next generation through engaging programs, mentorship, and spiritual growth opportunities for teenagers.",
    leader: "Leader: Christian Garcia",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Children's Ministry",
    description: "Creating a fun and safe environment where children can learn about God's love through age-appropriate activities and lessons.",
    leader: "Leader: Sister Ana",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Ushers and Prayer",
    description: "Experience the power of prayer through our dedicated prayer ministry and welcoming ushers who serve with love and compassion.",
    leader: "Leaders: Elsa and Roberto Cruz",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: "Men/Women's Ministry",
    description: "Building strong relationships and spiritual growth through fellowship and study groups for both men and women.",
    leader: "Leaders: Pastors Leon and Mary Garcia",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

export default function MinistriesPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData 
        type="Organization" 
        data={{}} 
      />
      
      {/* Client component handles all translated content */}
      <MinistriesPageContent ministries={ministriesData} />

      {/* Client component for animations */}
      <MinistriesClient />
    </>
  );
} 