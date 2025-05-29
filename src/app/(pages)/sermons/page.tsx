import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import SermonsClient from "./SermonsClient";
import SermonsPageContent from "./SermonsPageContent";
import { loadSermonData } from '@/lib/videoData';

// SEO metadata - this runs on the server
export const metadata = generateSEO({
  title: 'Sermon Archive',
  description: 'Watch and listen to inspiring sermons from our church in Wilmington, NC. Biblical teachings in Spanish and English covering faith, hope, love, and Christian living.',
  keywords: 'sermons, church messages, biblical teachings, Spanish sermons, Wilmington NC, Christian preaching, faith messages, Bible study',
  path: '/sermons',
});

export default function SermonsPage() {
  // Load sermons from the data file (updated by cron job)
  const sermons = loadSermonData();

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData 
        type="Organization" 
        data={{}} 
      />
      
      {/* Client component handles all translated content */}
      <SermonsPageContent sermons={sermons} />

      {/* Client component for animations */}
      <SermonsClient />
    </>
  );
} 