import fs from 'fs';
import path from 'path';
import { SermonData } from './youtube';

const DATA_DIR = path.join(process.cwd(), 'data');
const SERMONS_FILE = path.join(DATA_DIR, 'sermons.json');
const FEATURED_VIDEO_FILE = path.join(DATA_DIR, 'featured-video.json');

/**
 * Ensure data directory exists
 */
function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Save sermon data to file
 */
export function saveSermonData(sermons: SermonData[]): void {
  try {
    ensureDataDirectory();
    fs.writeFileSync(SERMONS_FILE, JSON.stringify(sermons, null, 2));
    console.log(`Saved ${sermons.length} sermons to ${SERMONS_FILE}`);
  } catch (error) {
    console.error('Error saving sermon data:', error);
    throw error;
  }
}

/**
 * Load sermon data from file
 */
export function loadSermonData(): SermonData[] {
  try {
    if (!fs.existsSync(SERMONS_FILE)) {
      console.warn('Sermons file not found, returning sample data');
      return getSampleSermonData();
    }

    const data = fs.readFileSync(SERMONS_FILE, 'utf-8');
    const sermons = JSON.parse(data) as SermonData[];
    return sermons;
  } catch (error) {
    console.error('Error loading sermon data:', error);
    return getSampleSermonData();
  }
}

/**
 * Save featured video data to file
 */
export function saveFeaturedVideo(video: SermonData): void {
  try {
    ensureDataDirectory();
    fs.writeFileSync(FEATURED_VIDEO_FILE, JSON.stringify(video, null, 2));
    console.log(`Saved featured video: ${video.title}`);
  } catch (error) {
    console.error('Error saving featured video:', error);
    throw error;
  }
}

/**
 * Load featured video data from file
 */
export function loadFeaturedVideo(): SermonData | null {
  try {
    if (!fs.existsSync(FEATURED_VIDEO_FILE)) {
      console.warn('Featured video file not found');
      return null;
    }

    const data = fs.readFileSync(FEATURED_VIDEO_FILE, 'utf-8');
    const video = JSON.parse(data) as SermonData;
    return video;
  } catch (error) {
    console.error('Error loading featured video:', error);
    return null;
  }
}

/**
 * Get sample sermon data for fallback
 */
function getSampleSermonData(): SermonData[] {
  return [
    {
      title: "El Amor de Dios (The Love of God)",
      preacher: "Pastor Roberto Martinez",
      date: "May 7, 2023",
      description: "Exploring the depth and boundless nature of God's love for humanity through scripture and personal testimony.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Sermon",
      publishedAt: "2023-05-07T11:00:00Z",
      duration: "45:30",
      viewCount: "1,234",
      likeCount: "89"
    },
    {
      title: "La Fe que Mueve Montañas (Faith That Moves Mountains)",
      preacher: "Pastor Maria Gonzalez",
      date: "April 30, 2023",
      description: "Understanding the power of faith and how it can transform our lives and circumstances.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Sermon",
      publishedAt: "2023-04-30T11:00:00Z",
      duration: "38:15",
      viewCount: "987",
      likeCount: "76"
    },
    {
      title: "Noche de Alabanza y Adoración (Night of Praise and Worship)",
      preacher: "Equipo de Adoración",
      date: "April 23, 2023",
      description: "A special evening service dedicated to worship, praise, and celebrating God's goodness.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Worship",
      publishedAt: "2023-04-23T19:00:00Z",
      duration: "52:45",
      viewCount: "1,456",
      likeCount: "112"
    },
    {
      title: "Estudio Bíblico: El Fruto del Espíritu (Bible Study: Fruit of the Spirit)",
      preacher: "Pastor Carlos Rivera",
      date: "April 16, 2023",
      description: "Deep dive into Galatians 5:22-23 exploring the nine fruits of the Spirit in our daily walk with Christ.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Bible Study",
      publishedAt: "2023-04-16T19:00:00Z",
      duration: "42:20",
      viewCount: "756",
      likeCount: "64"
    },
    {
      title: "Servicio de Pascua: La Resurrección (Easter Service: The Resurrection)",
      preacher: "Pastor Roberto Martinez",
      date: "April 9, 2023",
      description: "Celebrating the resurrection of Jesus Christ and its significance for believers today.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Sermon",
      publishedAt: "2023-04-09T11:00:00Z",
      duration: "48:30",
      viewCount: "2,134",
      likeCount: "156"
    },
    {
      title: "Jóvenes en Cristo: Viviendo con Propósito (Youth in Christ: Living with Purpose)",
      preacher: "Pastor David Mendez",
      date: "April 2, 2023",
      description: "Encouraging young people to discover and live out their God-given purpose with passion and dedication.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Youth",
      publishedAt: "2023-04-02T11:00:00Z",
      duration: "35:15",
      viewCount: "892",
      likeCount: "71"
    }
  ];
} 