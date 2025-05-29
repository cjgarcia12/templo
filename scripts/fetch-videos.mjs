#!/usr/bin/env node

/**
 * Fetch YouTube Videos Script
 * 
 * This script fetches the latest videos from the church's YouTube channel
 * and updates the static data files. It's designed to be run by a cron job.
 * 
 * Usage: node scripts/fetch-videos.js
 * 
 * Environment variables required:
 * - YOUTUBE_API_KEY: YouTube Data API v3 key
 * - YOUTUBE_CHANNEL_ID: The channel ID to fetch videos from
 */

import { get } from 'https';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const MAX_RESULTS = 20;

// File paths
const DATA_DIR = join(__dirname, '..', 'data');
const SERMONS_FILE = join(DATA_DIR, 'sermons.json');
const FEATURED_VIDEO_FILE = join(DATA_DIR, 'featured-video.json');

/**
 * Make HTTP request
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error(`JSON parse error: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Fetch video IDs from channel
 */
async function fetchVideoIds() {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=${MAX_RESULTS}`;
  
  try {
    const searchData = await makeRequest(searchUrl);
    
    if (searchData.error) {
      throw new Error(`YouTube API error: ${searchData.error.message}`);
    }
    
    return searchData.items.map(item => item.id.videoId);
  } catch (error) {
    console.error('Error fetching video IDs:', error.message);
    throw error;
  }
}

/**
 * Fetch detailed video information
 */
async function fetchVideoDetails(videoIds) {
  const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(',')}&part=snippet,contentDetails,statistics`;
  
  try {
    const videosData = await makeRequest(videosUrl);
    
    if (videosData.error) {
      throw new Error(`YouTube API error: ${videosData.error.message}`);
    }
    
    return videosData.items;
  } catch (error) {
    console.error('Error fetching video details:', error.message);
    throw error;
  }
}

/**
 * Extract preacher name from title
 */
// function extractPreacherFromTitle(title) {
//   const patterns = [
//     /[-|]\s*Pastor\s+([^|-]+)/i,
//     /[-|]\s*([^|-]+)\s*Pastor/i,
//     /Pastor\s+([A-Za-z\s]+)/i,
//   ];

//   for (const pattern of patterns) {
//     const match = title.match(pattern);
//     if (match) {
//       return match[1].trim();
//     }
//   }

//   return 'Pastor Leon Garcia';
// }

/**
 * Extract category from title
 */
// function extractCategoryFromTitle(title) {
//   const lowerTitle = title.toLowerCase();
  
//   if (lowerTitle.includes('sermon') || lowerTitle.includes('predicación')) {
//     return 'Sermon';
//   } else if (lowerTitle.includes('worship') || lowerTitle.includes('alabanza')) {
//     return 'Worship';
//   } else if (lowerTitle.includes('prayer') || lowerTitle.includes('oración')) {
//     return 'Prayer';
//   } else if (lowerTitle.includes('study') || lowerTitle.includes('estudio')) {
//     return 'Bible Study';
//   } else if (lowerTitle.includes('youth') || lowerTitle.includes('jóvenes')) {
//     return 'Youth';
//   }
  
//   return 'Service';
// }

/**
 * Truncate description
 */
function truncateDescription(description) {
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
function parseDuration(duration) {
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
 * Convert video data to sermon format
 */
function convertToSermonData(videos) {
  return videos.map(video => ({
    title: video.snippet.title,
    preacher: 'Pastor Leon Garcia',
    date: new Date(video.snippet.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    description: truncateDescription(video.snippet.description),
    youtubeId: video.id,
    category: 'Sunday Service',
    publishedAt: video.snippet.publishedAt,
    duration: parseDuration(video.contentDetails.duration),
    viewCount: video.statistics.viewCount || '0',
    likeCount: video.statistics.likeCount || '0',
  }));
}

/**
 * Ensure data directory exists
 */
function ensureDataDirectory() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Save sermon data
 */
function saveSermonData(sermons) {
  try {
    ensureDataDirectory();
    writeFileSync(SERMONS_FILE, JSON.stringify(sermons, null, 2));
    console.log(`✅ Saved ${sermons.length} sermons to ${SERMONS_FILE}`);
  } catch (error) {
    console.error('❌ Error saving sermon data:', error);
    throw error;
  }
}

/**
 * Save featured video
 */
function saveFeaturedVideo(video) {
  try {
    ensureDataDirectory();
    writeFileSync(FEATURED_VIDEO_FILE, JSON.stringify(video, null, 2));
    console.log(`✅ Saved featured video: ${video.title}`);
  } catch (error) {
    console.error('❌ Error saving featured video:', error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🎬 Starting YouTube video fetch...');
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);

  // Validate environment variables
  if (!API_KEY) {
    console.error('❌ YOUTUBE_API_KEY environment variable is required');
    process.exit(1);
  }

  if (!CHANNEL_ID) {
    console.error('❌ YOUTUBE_CHANNEL_ID environment variable is required');
    process.exit(1);
  }

  try {
    // Fetch video IDs
    console.log('🔍 Fetching video IDs...');
    const videoIds = await fetchVideoIds();
    console.log(`📹 Found ${videoIds.length} videos`);

    if (videoIds.length === 0) {
      console.log('ℹ️ No videos found');
      return;
    }

    // Fetch detailed video information
    console.log('📊 Fetching video details...');
    const videos = await fetchVideoDetails(videoIds);

    // Convert to sermon format
    const sermons = convertToSermonData(videos);

    // Save all sermons
    saveSermonData(sermons);

    // Save the most recent video as featured
    if (sermons.length > 0) {
      saveFeaturedVideo(sermons[0]);
    }

    console.log('✅ Video fetch completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in main process:', error.message);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 