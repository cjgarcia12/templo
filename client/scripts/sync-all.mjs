#!/usr/bin/env node

import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
config({ path: join(__dirname, '..', '.env.local') });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Make HTTP request to sync endpoint
 */
async function makeRequest(url, method = 'POST') {
  try {
    const response = await fetch(url, { method });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error calling ${url}:`, error.message);
    throw error;
  }
}

/**
 * Sync events from Google Calendar
 */
async function syncEvents() {
  console.log('🗓️ Starting event sync...');
  
  try {
    const result = await makeRequest(`${BASE_URL}/api/sync/events`);
    console.log(`✅ Events: ${result.message} (${result.count} events)`);
    return result;
  } catch (error) {
    console.error('❌ Event sync failed:', error.message);
    throw error;
  }
}

/**
 * Sync videos from YouTube
 */
async function syncVideos() {
  console.log('🎬 Starting video sync...');
  
  try {
    const result = await makeRequest(`${BASE_URL}/api/sync/videos`);
    console.log(`✅ Videos: ${result.message} (${result.count} videos)`);
    return result;
  } catch (error) {
    console.error('❌ Video sync failed:', error.message);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting data sync...');
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  
  let eventsSuccess = false;
  let videosSuccess = false;
  
  try {
    // Sync events
    await syncEvents();
    eventsSuccess = true;
  } catch {
    console.error('Event sync failed but continuing...');
  }
  
  try {
    // Sync videos
    await syncVideos();
    videosSuccess = true;
  } catch {
    console.error('Video sync failed but continuing...');
  }
  
  // Summary
  console.log('\n📊 Sync Summary:');
  console.log(`   Events: ${eventsSuccess ? '✅ Success' : '❌ Failed'}`);
  console.log(`   Videos: ${videosSuccess ? '✅ Success' : '❌ Failed'}`);
  
  if (eventsSuccess && videosSuccess) {
    console.log('🎉 All syncs completed successfully!');
    process.exit(0);
  } else {
    console.log('⚠️ Some syncs failed. Check logs above.');
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 