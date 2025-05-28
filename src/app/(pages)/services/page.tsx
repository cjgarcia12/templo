import React from "react";
import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import ServicesClient from "./ServicesClient";

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
      
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section - Server rendered for SEO */}
          <header className="text-center mb-16 page-header">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-brown mb-4">
              Our Services
            </h1>
            <p className="text-lg text-text-dark/80 max-w-2xl mx-auto">
              Join us for worship, prayer, and fellowship. Everyone is welcome to experience God&apos;s love and grow in faith together.
            </p>
          </header>

          {/* Services Section - Server rendered for SEO */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {servicesData.map((service, index) => (
              <article 
                key={index}
                className="service-card bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                itemScope 
                itemType="https://schema.org/Event"
              >
                <div className="text-primary-gold mb-6" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-brown mb-2" itemProp="name">
                  {service.title}
                </h3>
                <div className="flex items-center mb-4">
                  <time className="text-sm font-semibold bg-primary-brown/10 text-primary-brown rounded-full px-3 py-1" itemProp="startTime">
                    {service.day}s at {service.time}
                  </time>
                </div>
                <p className="text-text-dark/80 mb-4" itemProp="description">
                  {service.description}
                </p>
              </article>
            ))}
          </section>

          {/* What to Expect Section - Server rendered for SEO */}
          <section className="bg-accent-cream/20 rounded-xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-primary-brown mb-6">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary-gold mb-3">
                  Warm Welcome
                </h3>
                <p className="text-text-dark/80 mb-6">
                  From the moment you arrive, you&apos;ll be greeted with genuine smiles and open hearts. Our hospitality team is here to help you feel at home and answer any questions you might have.
                </p>
                
                <h3 className="text-xl font-bold text-primary-gold mb-3">
                  Vibrant Worship
                </h3>
                <p className="text-text-dark/80">
                  Experience heartfelt worship through contemporary and traditional music that lifts your spirit and draws you closer to God. Our worship team leads with passion and authenticity.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-gold mb-3">
                  Relevant Teaching
                </h3>
                <p className="text-text-dark/80 mb-6">
                  Our messages are grounded in biblical truth and applied to everyday life. You&apos;ll leave with practical insights and encouragement for your spiritual journey.
                </p>
                
                <h3 className="text-xl font-bold text-primary-gold mb-3">
                  Community Connection
                </h3>
                <p className="text-text-dark/80">
                  Connect with others who share your faith and values. Our church family is diverse, welcoming, and committed to supporting one another through life&apos;s journey.
                </p>
              </div>
            </div>
          </section>

          {/* Location Section - Server rendered for SEO */}
          <section className="text-center" itemScope itemType="https://schema.org/Place">
            <h2 className="text-3xl font-bold text-primary-brown mb-6">
              Join Us At
            </h2>
            <address className="not-italic text-lg text-text-dark/80 mb-4" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">209 S 7th Street</span><br />
              <span itemProp="addressLocality">Wilmington</span>, <span itemProp="addressRegion">NC</span>
            </address>
            <p className="text-primary-gold font-medium">
              We can&apos;t wait to welcome you into our church family!
            </p>
          </section>
        </div>
      </div>

      {/* Client component for animations */}
      <ServicesClient />
    </>
  );
} 