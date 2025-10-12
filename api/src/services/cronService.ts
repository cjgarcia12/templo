import * as cron from 'node-cron';
import getConfig from '../config';

const config = getConfig();
const { CRON_ENABLED, SYNC_SCHEDULE, API_SECRET_KEY, PORT, NODE_ENV } = config;

// Interface for sync API responses
interface SyncResponse {
  success: boolean;
  message: string;
  count: number;
  timestamp: string;
}

// Store active cron jobs
const activeJobs = new Map<string, cron.ScheduledTask>();

/**
 * Sync all data (events and videos) using HTTP endpoints
 */
async function syncAllData() {
  const timestamp = new Date().toISOString();
  
  console.log(`🚀 Starting scheduled sync at ${timestamp}`);
  
  let eventsSuccess = false;
  let videosSuccess = false;
  
  const baseUrl = NODE_ENV === 'production' ? 'https://temploaa.com/api' : `http://localhost:${PORT}/api`;
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_SECRET_KEY
  };
  
  // Sync events
  try {
    console.log('🗓️ Syncing events...');
    const response = await fetch(`${baseUrl}/events/sync`, {
      method: 'POST',
      headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const eventResult = await response.json() as SyncResponse;
    console.log(`✅ Events: ${eventResult.message} (${eventResult.count} events)`);
    eventsSuccess = true;
  } catch (error) {
    console.error('❌ Event sync failed:', error);
  }
  
  // Sync videos
  try {
    console.log('🎬 Syncing videos...');
    const response = await fetch(`${baseUrl}/videos/sync`, {
      method: 'POST',
      headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const videoResult = await response.json() as SyncResponse;
    console.log(`✅ Videos: ${videoResult.message} (${videoResult.count} videos)`);
    videosSuccess = true;
  } catch (error) {
    console.error('❌ Video sync failed:', error);
  }
  
  // Summary
  console.log('\n📊 Sync Summary:');
  console.log(`   Events: ${eventsSuccess ? '✅ Success' : '❌ Failed'}`);
  console.log(`   Videos: ${videosSuccess ? '✅ Success' : '❌ Failed'}`);
  
  if (eventsSuccess && videosSuccess) {
    console.log('🎉 All syncs completed successfully!');
  } else {
    console.log('⚠️ Some syncs failed. Check logs above.');
  }
}

/**
 * Initialize cron jobs
 */
export function initializeCronJobs() {
  if (!CRON_ENABLED) {
    console.log('📅 Cron jobs explicitly disabled (CRON_ENABLED=false)');
    return;
  }

  console.log(`📅 Setting up cron job with schedule: ${SYNC_SCHEDULE}`);
  
  // Validate cron expression
  if (!cron.validate(SYNC_SCHEDULE)) {
    console.error(`❌ Invalid cron schedule: ${SYNC_SCHEDULE}`);
    return;
  }

  // Create the sync job
  const syncJob = cron.schedule(SYNC_SCHEDULE, syncAllData, {
    timezone: 'America/New_York' // Adjust timezone as needed
  });

  // Store the job
  activeJobs.set('sync', syncJob);

  // Start the job
  syncJob.start();

  console.log(`✅ Cron job scheduled: ${SYNC_SCHEDULE} (timezone: America/New_York)`);
  console.log('📅 Next sync will occur every Sunday at 5:00 AM');
}

/**
 * Stop all cron jobs
 */
export function stopCronJobs() {
  console.log('🛑 Stopping all cron jobs...');
  
  for (const [name, job] of activeJobs) {
    job.stop();
    job.destroy();
    console.log(`   Stopped: ${name}`);
  }
  
  activeJobs.clear();
  console.log('✅ All cron jobs stopped');
}

/**
 * Get cron job status
 */
export function getCronStatus() {
  return {
    enabled: CRON_ENABLED,
    schedule: SYNC_SCHEDULE,
    activeJobs: Array.from(activeJobs.keys()),
    jobCount: activeJobs.size
  };
}

/**
 * Trigger manual sync
 */
export async function triggerManualSync() {
  console.log('🔄 Manual sync triggered');
  await syncAllData();
}

// Export for external use
export { syncAllData }; 