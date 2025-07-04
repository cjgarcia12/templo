import getConfig from '../config';

const config = getConfig();
const { API_SECRET_KEY, PORT } = config;

// Interface for sync API responses
interface SyncResponse {
  success: boolean;
  message: string;
  count: number;
  timestamp: string;
}

/**
 * Manual sync script using HTTP endpoints
 * Run with: npx tsx src/scripts/sync.ts
 */
async function syncEndpoint(endpoint: string, name: string) {
  const response = await fetch(`http://localhost:${PORT}/api/${endpoint}/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_SECRET_KEY
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const result = await response.json() as SyncResponse;
  console.log(`✅ ${name}: ${result.message} (${result.count} items)`);
}

async function main() {
  try {
    console.log('🚀 Starting manual data sync...');
    
    // Check if server is running
    try {
      await fetch(`http://localhost:${PORT}/api/health`);
    } catch (error) {
      console.error('❌ Server is not running. Please start the API server first.');
      process.exit(1);
    }
    
    await syncEndpoint('events', 'Events');
    await syncEndpoint('videos', 'Videos');
    
    console.log('✅ Manual sync completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Manual sync failed:', error);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main();
} 