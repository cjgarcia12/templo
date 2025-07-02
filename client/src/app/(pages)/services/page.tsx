import React from "react";
import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import ServicesClient from "./ServicesClient";
import ServicesPageContent from "./ServicesPageContent";

// SEO metadata - this runs on the server
export const metadata = generateSEO({
  title: 'Our Services',
  description: 'Join us for worship services at our church in Wilmington, NC. Sunday worship, Tuesday prayer nights, and Friday Bible study. Everyone is welcome!',
  keywords: 'church services, worship times, prayer night, Bible study, Sunday service, Wilmington NC, Spanish church, service schedule',
  path: '/services',
});

interface ServiceInfo {
  day: string;
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Static services data for SEO
const servicesData: ServiceInfo[] = [
  {
    day: "Sunday",
    time: "11:00 AM",
    title: "Sunday Worship Service",
    description: "Join us for our main worship service featuring inspiring music, heartfelt prayer, and biblical teaching that encourages and challenges us to grow in our faith.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    day: "Tuesday",
    time: "7:00 PM",
    title: "Prayer Night",
    description: "A powerful time of corporate prayer where we come together to seek God&apos;s face, pray for our community, and experience the transforming power of prayer.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    day: "Friday",
    time: "7:00 PM",
    title: "Bible Study & Youth Night",
    description: "Dive deeper into God&apos;s Word through interactive Bible study for adults, while our youth enjoy their own engaging program focused on spiritual growth and fellowship.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData 
        type="Organization" 
        data={{}} 
      />
      
      {/* Client component handles all translated content */}
      <ServicesPageContent services={servicesData} />

      {/* Client component for animations */}
      <ServicesClient />
    </>
  );
} 