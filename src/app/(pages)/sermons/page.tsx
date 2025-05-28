import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import SermonsClient from "./SermonsClient";
import SermonsPageContent from "./SermonsPageContent";

// SEO metadata - this runs on the server
export const metadata = generateSEO({
  title: 'Sermon Archive',
  description: 'Watch and listen to inspiring sermons from our church in Wilmington, NC. Biblical teachings in Spanish and English covering faith, hope, love, and Christian living.',
  keywords: 'sermons, church messages, biblical teachings, Spanish sermons, Wilmington NC, Christian preaching, faith messages, Bible study',
  path: '/sermons',
});

interface Sermon {
  title: string;
  preacher: string;
  date: string;
  description: string;
  youtubeId: string;
  category: string;
}

// Static sermons data for SEO
const sermonsData: Sermon[] = [
  {
    title: "El Amor de Dios (The Love of God)",
    preacher: "Pastor Roberto Martinez",
    date: "May 7, 2023",
    description: "Exploring the depth and dimensions of God's love for us and how it transforms our lives.",
    youtubeId: "dQw4w9WgXcQ", // Placeholder ID
    category: "Sunday Message"
  },
  {
    title: "Fe en Tiempos Difíciles (Faith in Difficult Times)",
    preacher: "Pastor Roberto Martinez",
    date: "April 30, 2023",
    description: "Finding strength in our faith during life's challenges and hardships.",
    youtubeId: "dQw4w9WgXcQ", // Placeholder ID
    category: "Sunday Message"
  },
  {
    title: "El Poder de la Oración (The Power of Prayer)",
    preacher: "Pastor Carlos Jimenez",
    date: "April 23, 2023",
    description: "Understanding how prayer connects us to God and unleashes His power in our lives.",
    youtubeId: "dQw4w9WgXcQ", // Placeholder ID
    category: "Prayer Night"
  },
  {
    title: "Viviendo en Victoria (Living in Victory)",
    preacher: "Pastor Roberto Martinez",
    date: "April 16, 2023",
    description: "How to live victorious Christian lives despite the challenges we face.",
    youtubeId: "dQw4w9WgXcQ", // Placeholder ID
    category: "Sunday Message"
  },
  {
    title: "Resurrección: Nuestro Mensaje de Esperanza (Resurrection: Our Message of Hope)",
    preacher: "Pastor Roberto Martinez",
    date: "April 9, 2023",
    description: "Easter Sunday message on the power and promise of Christ's resurrection.",
    youtubeId: "dQw4w9WgXcQ", // Placeholder ID
    category: "Special Service"
  },
  {
    title: "Discipulado en la Era Digital (Discipleship in the Digital Age)",
    preacher: "Minister Ana Garcia",
    date: "April 2, 2023",
    description: "How to maintain and grow our faith in an increasingly digital and distracted world.",
    youtubeId: "dQw4w9WgXcQ", // Placeholder ID
    category: "Bible Study"
  }
];

export default function SermonsPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData 
        type="Organization" 
        data={{}} 
      />
      
      {/* Client component handles all translated content */}
      <SermonsPageContent sermons={sermonsData} />

      {/* Client component for animations */}
      <SermonsClient />
    </>
  );
} 