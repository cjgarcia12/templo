#!/bin/bash

# Setup script for church website data synchronization cron job
# This script sets up a weekly cron job to sync events and videos

set -e

# Get the project directory
PROJECT_DIR=$(cd "$(dirname "$0")/.." && pwd)
SYNC_SCRIPT="$PROJECT_DIR/scripts/sync-all.mjs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 Setting up cron job for church website data sync...${NC}"
echo "Project directory: $PROJECT_DIR"

# Load environment variables from .env.local if it exists
if [ -f "$PROJECT_DIR/.env.local" ]; then
    echo "📄 Loading environment variables from .env.local..."
    export $(grep -v '^#' "$PROJECT_DIR/.env.local" | xargs)
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

# Check if sync script exists
if [ ! -f "$SYNC_SCRIPT" ]; then
    echo -e "${RED}❌ Sync script not found at: $SYNC_SCRIPT${NC}"
    echo "Please ensure the sync-all.mjs script exists."
    exit 1
fi

# Make script executable
chmod +x "$SYNC_SCRIPT"

# Check for environment variables
echo -e "${YELLOW}📋 Environment Variables Check:${NC}"

missing_vars=0

if [ -z "$GOOGLE_API_KEY" ]; then
    echo -e "⚠️  GOOGLE_API_KEY environment variable not set."
    missing_vars=$((missing_vars + 1))
fi

if [ -z "$YOUTUBE_CHANNEL_ID" ]; then
    echo -e "⚠️  YOUTUBE_CHANNEL_ID environment variable not set."
    missing_vars=$((missing_vars + 1))
fi

if [ -z "$GOOGLE_CALENDAR_ID" ]; then
    echo -e "⚠️  GOOGLE_CALENDAR_ID environment variable not set."
    missing_vars=$((missing_vars + 1))
fi

if [ -z "$MONGODB_URI" ]; then
    echo -e "⚠️  MONGODB_URI environment variable not set."
    missing_vars=$((missing_vars + 1))
fi

if [ -z "$NEXT_PUBLIC_BASE_URL" ]; then
    echo -e "⚠️  NEXT_PUBLIC_BASE_URL environment variable not set."
    missing_vars=$((missing_vars + 1))
fi

if [ $missing_vars -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $missing_vars environment variable(s) missing. Please add them to your .env.local file.${NC}"
fi

# Create directories if they don't exist
mkdir -p "$PROJECT_DIR/logs"

# Create the cron job command
CRON_SCHEDULE="0 6 * * 0"  # Every Sunday at 6 AM
CRON_COMMAND="cd $PROJECT_DIR && npm run sync >> logs/sync-cron.log 2>&1"

echo ""
echo -e "${GREEN}📝 Cron job to be configured:${NC}"
echo ""
echo "Data Sync (Events + Videos):"
echo "   Schedule: Every Sunday at 6:00 AM"
echo "   Command: $CRON_COMMAND"
echo "   Log file: $PROJECT_DIR/logs/sync-cron.log"
echo ""

# Check if running as root or with appropriate permissions
if [ "$EUID" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Warning: Running as root. Consider setting up cron for a specific user instead.${NC}"
fi

# Test the sync command first
echo -e "${YELLOW}🧪 Testing the sync command...${NC}"
if cd "$PROJECT_DIR" && npm run sync --silent; then
    echo -e "${GREEN}✅ Sync command test successful!${NC}"
else
    echo -e "${RED}❌ Sync command test failed. Please check your configuration.${NC}"
    echo "Common issues:"
    echo "  - Make sure MongoDB is running"
    echo "  - Check environment variables in .env.local"
    echo "  - Ensure your app is built: npm run build"
    exit 1
fi

echo ""
read -p "Would you like to add this cron job automatically? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create a temporary cron file
    TEMP_CRON=$(mktemp)
    
    # Get current crontab (if any) and remove any existing sync entries
    crontab -l 2>/dev/null | grep -v "npm run sync" | grep -v "sync-all" > "$TEMP_CRON" || true
    
    # Add the new cron job
    echo "$CRON_SCHEDULE $CRON_COMMAND" >> "$TEMP_CRON"
    
    # Install the new crontab
    crontab "$TEMP_CRON"
    
    # Clean up
    rm "$TEMP_CRON"
    
    echo -e "${GREEN}✅ Cron job successfully installed!${NC}"
    echo ""
    echo -e "${GREEN}Data Sync Configuration:${NC}"
    echo -e "  Schedule: Every Sunday at 6:00 AM"
    echo -e "  Action: Syncs both events from Google Calendar and videos from YouTube"
    echo -e "  Logs: $PROJECT_DIR/logs/sync-cron.log"
    echo ""
    
    echo -e "${YELLOW}📋 Current crontab:${NC}"
    crontab -l
    
else
    echo "📝 Cron job not added automatically."
    echo ""
    echo "To add it manually, run: crontab -e"
    echo "Then add this line:"
    echo "$CRON_SCHEDULE $CRON_COMMAND"
fi

echo ""
echo -e "${GREEN}📚 Next steps:${NC}"
echo "1. Make sure your website is running and accessible"
echo "2. Monitor the first sync by checking: tail -f logs/sync-cron.log"
echo "3. Verify synced data appears on your website"
echo ""
echo -e "${GREEN}Manual testing:${NC}"
echo "  - Test sync: npm run sync"
echo "  - Check logs: tail logs/sync-cron.log"
echo "  - View cron jobs: crontab -l" 