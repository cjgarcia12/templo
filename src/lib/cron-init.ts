import cron from 'node-cron';

// Store active cron jobs
const activeJobs = new Map<string, cron.ScheduledTask>();

/**
 * Make HTTP request to sync endpoint
 */
async function makeRequest(url: string, method: string = 'POST') {
  try {
    const response = await fetch(url, { method });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error calling ${url}:`, error);
    throw error;
  }
}

/**
 * Sync all data (events and videos)
 */
async function syncAllData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const timestamp = new Date().toISOString();
  
  console.log(`🚀 Starting scheduled sync at ${timestamp}`);
  
  let eventsSuccess = false;
  let videosSuccess = false;
  
  // Sync events
  try {
    console.log('🗓️ Syncing events...');
    const eventResult = await makeRequest(`${baseUrl}/api/sync/events`);
    console.log(`✅ Events: ${eventResult.message} (${eventResult.count} events)`);
    eventsSuccess = true;
  } catch (error) {
    console.error('❌ Event sync failed:', error);
  }
  
  // Sync videos
  try {
    console.log('🎬 Syncing videos...');
    const videoResult = await makeRequest(`${baseUrl}/api/sync/videos`);
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
 * Get next run time for display
 */
function getNextRunTime() {
  try {
    const now = new Date();
    const tomorrow6AM = new Date();
    tomorrow6AM.setDate(now.getDate() + 1);
    tomorrow6AM.setHours(6, 0, 0, 0);
    
    // If it's before 6 AM today, next run is today at 6 AM
    if (now.getHours() < 6) {
      const today6AM = new Date();
      today6AM.setHours(6, 0, 0, 0);
      return today6AM.toLocaleString('en-US', { 
        timeZone: 'America/New_York',
        weekday: 'long',
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    }
    
    return tomorrow6AM.toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      weekday: 'long',
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  } catch {
    return 'Tomorrow at 6:00 AM EST';
  }
}

/**
 * Start the cron job
 */
export function startCronJob() {
  // Stop existing job if running
  if (activeJobs.has('sync-all')) {
    activeJobs.get('sync-all')?.stop();
    console.log('🔄 Stopping existing cron job...');
  }
  
  // Schedule: Every day at 6:00 AM
  // You can change this schedule as needed
  const schedule = '0 6 * * *'; // 6 AM daily
  
  const job = cron.schedule(schedule, async () => {
    await syncAllData();
  }, {
    scheduled: true,
    timezone: 'America/New_York' // Adjust to your timezone
  });
  
  activeJobs.set('sync-all', job);
  
  // Enhanced logging
  console.log('\n🎯 ================== CRON JOB STATUS ==================');
  console.log(`✅ Auto-sync cron job is now ACTIVE`);
  console.log(`📅 Schedule: Daily at 6:00 AM (Eastern Time)`);
  console.log(`🔄 Next sync: ${getNextRunTime()}`);
  console.log(`Cron job is running: ${isCronJobRunning()}`);
  console.log('=======================================================\n');
  
  return job;
}

/**
 * Stop the cron job
 */
export function stopCronJob() {
  if (activeJobs.has('sync-all')) {
    activeJobs.get('sync-all')?.stop();
    activeJobs.delete('sync-all');
  }
}

/**
 * Check if cron job is running
 */
export function isCronJobRunning() {
  return activeJobs.has('sync-all');
}

/**
 * Trigger manual sync
 */
export async function triggerManualSync() {
  await syncAllData();
}

// Initialize cron job when this module is imported
startCronJob(); 