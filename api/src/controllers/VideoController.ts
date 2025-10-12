import { google } from 'googleapis';
import Video, { IVideo } from '../models/Video';
import connectDB from '../db/connection';
import getConfig from '../config';

const config = getConfig();
const { GOOGLE_API_KEY, YOUTUBE_CHANNEL_ID } = config;

interface YouTubeClient {
  search: {
    list: (params: {
      part: string[];
      channelId: string;
      order: string;
      type: string;
      maxResults: number;
    }) => Promise<{ data: { items?: YouTubeSearchItem[] } }>;
  };
  videos: {
    list: (params: {
      part: string[];
      id: string;
    }) => Promise<{ data: { items?: YouTubeVideo[] } }>;
  };
}

interface YouTubeSearchItem {
  id?: {
    videoId?: string;
  };
}

interface YouTubeVideo {
  id?: string;
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
  };
  contentDetails?: {
    duration?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
  };
}

export class VideoController {
  private youtube: YouTubeClient | null;
  private channelId: string;

  constructor() {
    this.channelId = YOUTUBE_CHANNEL_ID || '';
    this.youtube = null;
    this.initializeYouTube();
  }

  private initializeYouTube() {
    if (GOOGLE_API_KEY) {
      this.youtube = google.youtube({
        version: 'v3',
        auth: GOOGLE_API_KEY
      }) as unknown as YouTubeClient;
    } else {
      throw new Error('GOOGLE_API_KEY is required');
    }
  }

  /**
   * Fetch video IDs from YouTube channel
   */
  async fetchVideoIds(maxResults: number = 20): Promise<string[]> {
    if (!this.youtube || !this.channelId) {
      console.warn('YouTube not configured, returning empty videos');
      return [];
    }

    try {
      const response = await this.youtube.search.list({
        part: ['snippet'],
        channelId: this.channelId,
        order: 'date',
        type: 'video',
        maxResults,
      });

      return response.data.items?.map((item) => item.id?.videoId).filter((id): id is string => Boolean(id)) || [];
    } catch (error) {
      console.error('Error fetching video IDs:', error);
      throw error;
    }
  }

  /**
   * Fetch detailed video information
   */
  async fetchVideoDetails(videoIds: string[]): Promise<YouTubeVideo[]> {
    if (!this.youtube || videoIds.length === 0) {
      return [];
    }

    try {
      const response = await this.youtube.videos.list({
        part: ['snippet', 'contentDetails', 'statistics'],
        id: videoIds.join(','),
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching video details:', error);
      throw error;
    }
  }

  /**
   * Convert YouTube video to our format
   */
  private convertYouTubeVideo(youtubeVideo: YouTubeVideo): Partial<IVideo> {
    const title = youtubeVideo.snippet?.title || 'Untitled Video';
    const fullDescription = youtubeVideo.snippet?.description || '';
    const description = this.truncateDescription(fullDescription);
    const publishedAt = youtubeVideo.snippet?.publishedAt || new Date().toISOString();
    const duration = this.parseDuration(youtubeVideo.contentDetails?.duration || 'PT0M0S');
    const viewCount = youtubeVideo.statistics?.viewCount || '0';
    const likeCount = youtubeVideo.statistics?.likeCount || '0';

    const date = new Date(publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Parse preacher name from description
    const preacher = this.parsePreacherFromDescription(fullDescription) || 'Pastor Leon Garcia';

    // Validate required YouTube ID
    const youtubeId = youtubeVideo.id;
    if (!youtubeId || youtubeId.length !== 11) {
      throw new Error(`Invalid YouTube ID: ${youtubeId}`);
    }

    return {
      title,
      preacher,
      date,
      description,
      youtubeId,
      category: 'Sunday Service', // Default category
      publishedAt,
      duration,
      viewCount,
      likeCount,
      isFeatured: false, // Will be set separately for the latest video
    };
  }

  /**
   * Parse preacher name from video description
   */
  private parsePreacherFromDescription(description: string): string {
    if (!description) {
      return 'Pastor Leon Garcia'; // Default fallback
    }

    // Look for Pastor or Pastora followed by a name
    // Case-insensitive regex that captures Pastor/Pastora + the following name(s)
    const pastorRegex = /(?:^|\s)(pastor(?:a)?)\s+([a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?:\s+[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*)/i;
    
    const match = description.match(pastorRegex);
    
    if (match) {
      // match[1] contains "Pastor" or "Pastora"
      // match[2] contains the name(s) after Pastor/Pastora
      const title = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase(); // Capitalize first letter
      const name = match[2];
      
      return `${title} ${name}`;
    }

    // Fallback to default if no pastor name found
    return 'Pastor Leon Garcia';
  }

  /**
   * Truncate description
   */
  private truncateDescription(description: string): string {
    // Provide fallback if description is empty or undefined
    if (!description || description.trim().length === 0) {
      return 'No description available';
    }
    
    const maxLength = 150;
    if (description.length <= maxLength) return description;
    
    const truncated = description.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...';
  }

  /**
   * Parse YouTube duration format
   */
  private parseDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00'; // Fallback for invalid duration

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  /**
   * Sync videos from YouTube to database
   */
  async syncVideos(): Promise<{ success: boolean; message: string; count: number }> {
    try {
      await connectDB();

      console.log('🎬 Fetching video IDs from YouTube...');
      const videoIds = await this.fetchVideoIds(20);
      
      if (videoIds.length === 0) {
        return {
          success: true,
          message: 'No videos found on YouTube channel',
          count: 0
        };
      }

      console.log(`📹 Found ${videoIds.length} videos, fetching details...`);
      const youtubeVideos = await this.fetchVideoDetails(videoIds);
      
      if (youtubeVideos.length === 0) {
        return {
          success: true,
          message: 'No video details found',
          count: 0
        };
      }

      // Convert to our format, filtering out any that fail validation
      const convertedVideos: Partial<IVideo>[] = [];
      let skippedCount = 0;
      
      for (const video of youtubeVideos) {
        try {
          const convertedVideo = this.convertYouTubeVideo(video);
          convertedVideos.push(convertedVideo);
        } catch (error) {
          console.warn(`⚠️ Skipping video due to validation error:`, error instanceof Error ? error.message : error);
          skippedCount++;
        }
      }

      if (convertedVideos.length === 0) {
        return {
          success: false,
          message: 'No valid videos found after conversion',
          count: 0
        };
      }

      // Clear existing videos and insert new ones
      console.log('🗄️ Clearing existing videos...');
      await Video.deleteMany({});
      
      console.log(`💾 Inserting ${convertedVideos.length} valid videos${skippedCount > 0 ? ` (skipped ${skippedCount})` : ''}...`);
      const insertedVideos = await Video.insertMany(convertedVideos);

      // Set the most recent video as featured
      if (insertedVideos.length > 0) {
        const latestVideo = insertedVideos.sort((a: any, b: any) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )[0];
        
        await Video.findByIdAndUpdate(latestVideo._id, { isFeatured: true });
        console.log(`⭐ Set featured video: ${latestVideo.title}`);
      }

      const message = skippedCount > 0 
        ? `Successfully synced ${insertedVideos.length} videos (${skippedCount} skipped due to validation errors)`
        : `Successfully synced ${insertedVideos.length} videos`;

      return {
        success: true,
        message,
        count: insertedVideos.length
      };
    } catch (error) {
      console.error('Error syncing videos:', error);
      throw error;
    }
  }

  /**
   * Get all videos from database
   */
  async getAllVideos(): Promise<IVideo[]> {
    try {
      await connectDB();
      return await Video.find().sort({ publishedAt: -1 });
    } catch (error) {
      console.error('Error fetching videos from database:', error);
      throw error;
    }
  }

  /**
   * Get featured video from database
   */
  async getFeaturedVideo(): Promise<IVideo | null> {
    try {
      await connectDB();
      return await Video.findOne({ isFeatured: true });
    } catch (error) {
      console.error('Error fetching featured video from database:', error);
      throw error;
    }
  }

  /**
   * Get video by YouTube ID
   */
  async getVideoByYouTubeId(youtubeId: string): Promise<IVideo | null> {
    try {
      await connectDB();
      return await Video.findOne({ youtubeId });
    } catch (error) {
      console.error('Error fetching video by YouTube ID:', error);
      throw error;
    }
  }

  /**
   * Get videos by category
   */
  async getVideosByCategory(category: string): Promise<IVideo[]> {
    try {
      await connectDB();
      return await Video.find({ category }).sort({ publishedAt: -1 });
    } catch (error) {
      console.error('Error fetching videos by category:', error);
      throw error;
    }
  }
} 