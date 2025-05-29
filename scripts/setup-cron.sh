#!/bin/bash

# Setup Cron Job for YouTube Video Fetching
# This script sets up a cron job to run every Sunday at 5 PM

set -e

# Get the project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_PATH="$PROJECT_DIR/scripts/fetch-videos.mjs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 Setting up YouTube video fetch cron job...${NC}"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if the fetch script exists
if [ ! -f "$SCRIPT_PATH" ]; then
    echo -e "${RED}❌ Fetch script not found at: $SCRIPT_PATH${NC}"
    exit 1
fi

# Make the script executable
chmod +x "$SCRIPT_PATH"

# Check for environment variables
if [ -z "$YOUTUBE_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  YOUTUBE_API_KEY environment variable not set.${NC}"
    echo -e "Please add it to your system environment or .env file."
fi

if [ -z "$YOUTUBE_CHANNEL_ID" ]; then
    echo -e "${YELLOW}⚠️  YOUTUBE_CHANNEL_ID environment variable not set.${NC}"
    echo -e "Please add it to your system environment or .env file."
fi

# Create the cron job command
# Runs every Sunday at 5 PM (17:00)
CRON_SCHEDULE="0 17 * * 0"
CRON_COMMAND="cd $PROJECT_DIR && /usr/bin/env node scripts/fetch-videos.mjs >> logs/cron.log 2>&1"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Create a temporary cron file
TEMP_CRON=$(mktemp)

# Get current crontab (if any) and remove any existing entry for this script
crontab -l 2>/dev/null | grep -v "fetch-videos" > "$TEMP_CRON" || true

# Add the new cron job
echo "$CRON_SCHEDULE $CRON_COMMAND" >> "$TEMP_CRON"

# Install the new crontab
crontab "$TEMP_CRON"

# Clean up
rm "$TEMP_CRON"

echo -e "${GREEN}✅ Cron job successfully installed!${NC}"
echo -e "Schedule: Every Sunday at 5:00 PM"
echo -e "Command: $CRON_COMMAND"
echo -e "Logs: $PROJECT_DIR/logs/cron.log"
echo ""
echo -e "${YELLOW}📋 Current crontab:${NC}"
crontab -l

echo ""
echo -e "${GREEN}🎬 To test the script manually, run:${NC}"
echo -e "YOUTUBE_API_KEY=your_key YOUTUBE_CHANNEL_ID=your_channel_id node scripts/fetch-videos.mjs" 