import { google } from 'googleapis';
import Video, { IVideo } from '@/models/Video';
import connectDB from '@/lib/database';

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
    this.channelId = process.env.YOUTUBE_CHANNEL_ID || '';
    this.youtube = null;
    this.initializeYouTube();
  }

  private initializeYouTube() {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (apiKey) {
      this.youtube = google.youtube({
        version: 'v3',
        auth: apiKey
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
    const description = this.truncateDescription(youtubeVideo.snippet?.description || '');
    const publishedAt = youtubeVideo.snippet?.publishedAt || '';
    const duration = this.parseDuration(youtubeVideo.contentDetails?.duration || '');
    const viewCount = youtubeVideo.statistics?.viewCount || '0';
    const likeCount = youtubeVideo.statistics?.likeCount || '0';

    const date = new Date(publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return {
      title,
      preacher: 'Pastor Leon Garcia', // Default preacher
      date,
      description,
      youtubeId: youtubeVideo.id || '',
      category: 'Sunday Service', // Default category
      publishedAt,
      duration,
      viewCount,
      likeCount,
      isFeatured: false, // Will be set separately for the latest video
    };
  }

  /**
   * Truncate description
   */
  private truncateDescription(description: string): string {
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
    if (!match) return '';

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

      // Fetch video IDs from YouTube
      const videoIds = await this.fetchVideoIds();
      
      if (videoIds.length === 0) {
        return {
          success: true,
          message: 'No videos found on YouTube channel',
          count: 0
        };
      }

      // Fetch detailed video information
      const youtubeVideos = await this.fetchVideoDetails(videoIds);
      
      // Convert to our format
      const convertedVideos = youtubeVideos.map(video => this.convertYouTubeVideo(video));

      // Clear existing featured status
      await Video.updateMany({}, { isFeatured: false });

      // Upsert videos (update if exists, create if not)
      for (const video of convertedVideos) {
        await Video.findOneAndUpdate(
          { youtubeId: video.youtubeId },
          video,
          { upsert: true, new: true }
        );
      }

      // Set the most recent video as featured
      if (convertedVideos.length > 0) {
        await Video.findOneAndUpdate(
          { youtubeId: convertedVideos[0].youtubeId },
          { isFeatured: true }
        );
      }

      return {
        success: true,
        message: `Successfully synced ${convertedVideos.length} videos`,
        count: convertedVideos.length
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
} 