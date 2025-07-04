import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import SermonsClient from "./SermonsClient";
import SermonsPageContent from "./SermonsPageContent";
import { apiGet } from "@/lib/api";

// Video interface from our database model
interface Video {
  title: string;
  preacher: string;
  date: string;
  description: string;
  youtubeId: string;
  category: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  isFeatured?: boolean;
}

// SEO metadata - this runs on the server
export const metadata = generateSEO({
  title: 'Sermon Archive',
  description: 'Watch and listen to inspiring sermons from our church in Wilmington, NC. Biblical teachings in Spanish and English covering faith, hope, love, and Christian living.',
  keywords: 'sermons, church messages, biblical teachings, Spanish sermons, Wilmington NC, Christian preaching, faith messages, Bible study',
  path: '/sermons',
});

// Static fallback sermons data for SEO (used when API is not available)
const fallbackSermonsData: Video[] = [
  {
    title: "El Amor de Dios (The Love of God)",
    preacher: "Pastor Leon Garcia",
    date: "May 7, 2024",
    description: "Exploring the depth and boundless nature of God's love for humanity through scripture and personal testimony.",
    youtubeId: "dQw4w9WgXcQ",
    category: "Sunday Service",
    publishedAt: "2024-05-07T11:00:00Z",
    duration: "45:30",
    viewCount: "1,234",
    likeCount: "89"
  },
  {
    title: "La Fe que Mueve Montañas (Faith That Moves Mountains)",
    preacher: "Pastor Leon Garcia",
    date: "April 30, 2024",
    description: "Understanding the power of faith and how it can transform our lives and circumstances.",
    youtubeId: "dQw4w9WgXcQ",
    category: "Sunday Service",
    publishedAt: "2024-04-30T11:00:00Z",
    duration: "38:15",
    viewCount: "987",
    likeCount: "76"
  },
  {
    title: "Noche de Alabanza y Adoración (Night of Praise and Worship)",
    preacher: "Pastor Leon Garcia",
    date: "April 23, 2024",
    description: "A special evening service dedicated to worship, praise, and celebrating God's goodness.",
    youtubeId: "dQw4w9WgXcQ",
    category: "Worship",
    publishedAt: "2024-04-23T19:00:00Z",
    duration: "52:45",
    viewCount: "1,456",
    likeCount: "112"
  }
];

/**
 * Fetch videos from our API
 */
async function getVideos(): Promise<Video[]> {
  try {
    const data = await apiGet<{ success: boolean; videos: Video[] }>('/videos', {
      // Revalidate every 10 minutes in production
      next: { revalidate: 600 }
    });
    return data.videos || fallbackSermonsData;
  } catch (error) {
    console.error('Error fetching videos from API:', error);
    return fallbackSermonsData;
  }
}

export default async function SermonsPage() {
  // Fetch videos from our API (which reads from database)
  const sermons = await getVideos();

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