export interface VideoData {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres?: string;
  };
  duration: string;
  viewCount: string;
  likeCount: string;
}

export interface SermonData {
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
}

// YouTube API response types
interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
}

interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: YouTubeThumbnail;
      medium?: YouTubeThumbnail;
      high?: YouTubeThumbnail;
      maxres?: YouTubeThumbnail;
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount?: string;
    likeCount?: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
  error?: {
    message: string;
  };
}

interface YouTubeVideosResponse {
  items: YouTubeVideoItem[];
  error?: {
    message: string;
  };
}

class YouTubeService {
  private apiKey: string;
  private channelId: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || '';
    this.channelId = process.env.YOUTUBE_CHANNEL_ID || '';
    
    if (!this.apiKey || !this.channelId) {
      console.warn('YouTube API key or Channel ID not configured');
    }
  }

  /**
   * Fetch latest videos from the YouTube channel
   */
  async fetchLatestVideos(maxResults: number = 20): Promise<VideoData[]> {
    if (!this.apiKey || !this.channelId) {
      throw new Error('YouTube API not configured');
    }

    try {
      // Fetch video IDs from channel
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&channelId=${this.channelId}&part=snippet&order=date&type=video&maxResults=${maxResults}`;
      
      const searchResponse = await fetch(searchUrl);
      const searchData: YouTubeSearchResponse = await searchResponse.json();

      if (!searchResponse.ok) {
        throw new Error(`YouTube API error: ${searchData.error?.message || 'Unknown error'}`);
      }

      const videoIds = searchData.items.map((item: YouTubeSearchItem) => item.id.videoId).join(',');

      // Fetch detailed video information
      const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${this.apiKey}&id=${videoIds}&part=snippet,contentDetails,statistics`;
      
      const videosResponse = await fetch(videosUrl);
      const videosData: YouTubeVideosResponse = await videosResponse.json();

      if (!videosResponse.ok) {
        throw new Error(`YouTube API error: ${videosData.error?.message || 'Unknown error'}`);
      }

      return videosData.items.map((video: YouTubeVideoItem) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnails: {
          default: video.snippet.thumbnails.default?.url || '',
          medium: video.snippet.thumbnails.medium?.url || '',
          high: video.snippet.thumbnails.high?.url || '',
          maxres: video.snippet.thumbnails.maxres?.url,
        },
        duration: video.contentDetails.duration,
        viewCount: video.statistics.viewCount || '0',
        likeCount: video.statistics.likeCount || '0',
      }));
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw error;
    }
  }

  /**
   * Convert YouTube video data to sermon format
   */
  convertToSermonData(videos: VideoData[]): SermonData[] {
    return videos.map(video => ({
      title: video.title,
      preacher: this.extractPreacherFromTitle(video.title) || 'Pastor',
      date: new Date(video.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      description: this.truncateDescription(video.description),
      youtubeId: video.id,
      category: this.extractCategoryFromTitle(video.title),
      publishedAt: video.publishedAt,
      duration: this.parseDuration(video.duration),
      viewCount: video.viewCount,
      likeCount: video.likeCount,
    }));
  }

  /**
   * Extract preacher name from video title (customize based on your naming convention)
   */
  private extractPreacherFromTitle(title: string): string | null {
    // Try to match patterns like "Title - Pastor Name" or "Title | Pastor Name"
    const patterns = [
      /[-|]\s*Pastor\s+([^|-]+)/i,
      /[-|]\s*([^|-]+)\s*Pastor/i,
      /Pastor\s+([A-Za-z\s]+)/i,
    ];

    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return null;
  }

  /**
   * Extract category from video title
   */
  private extractCategoryFromTitle(title: string): string {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('sermon') || lowerTitle.includes('predicación')) {
      return 'Sermon';
    } else if (lowerTitle.includes('worship') || lowerTitle.includes('alabanza')) {
      return 'Worship';
    } else if (lowerTitle.includes('prayer') || lowerTitle.includes('oración')) {
      return 'Prayer';
    } else if (lowerTitle.includes('study') || lowerTitle.includes('estudio')) {
      return 'Bible Study';
    } else if (lowerTitle.includes('youth') || lowerTitle.includes('jóvenes')) {
      return 'Youth';
    }
    
    return 'Service';
  }

  /**
   * Truncate description to reasonable length
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
   * Parse YouTube duration format (PT#M#S) to readable format
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
}

export const youtubeService = new YouTubeService(); 