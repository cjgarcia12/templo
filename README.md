# Templo Church Website

A modern church website built with separate Express API backend and Next.js frontend.

## 🏗️ Architecture

- **API** (`/api`): Express.js backend with MongoDB integration
- **Client** (`/client`): Next.js frontend

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Google API Key (for YouTube and Calendar)

### Development Setup

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd templo

# Install API dependencies
cd api
npm install

# Install client dependencies  
cd ../client
npm install
```

2. **Configure environment variables:**

**API** (`api/.env`):
```env
# Database
MONGODB_URI=mongodb://localhost:27017/templo

# API Configuration
API_SECRET_KEY=your_secret_api_key_here

# Google Services
GOOGLE_API_KEY=your_google_api_key_here
YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here
GOOGLE_CALENDAR_ID=your_calendar_id_here

# Cron Jobs (enabled by default)
# CRON_ENABLED=false  # Only set this if you want to disable cron jobs
SYNC_SCHEDULE=0 5 * * 0

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Client** (`client/.env.local`):
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_API_KEY=your_secret_api_key_here
```

> ⚠️ **Important**: The `NEXT_PUBLIC_API_KEY` must match the `API_SECRET_KEY` in your API environment.

3. **Start development servers:**

```bash
# Terminal 1 - Start API server (cron jobs will start automatically)
cd api
npm run dev

# Terminal 2 - Start client
cd client  
npm run dev
```

4. **Access the application:**
- Frontend: http://localhost:3000
- API: http://localhost:3001/api

## 🔑 API Key Setup

1. **Generate a secure API key:**
```bash
# Generate a random API key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. **Add the same key to both environments:**
- API: `API_SECRET_KEY=your_generated_key`
- Client: `NEXT_PUBLIC_API_KEY=your_generated_key`

3. **Test the API protection:**
```bash
# This should fail (no API key)
curl http://localhost:3001/api/events

# This should work (with API key)
curl -H "x-api-key: your_api_key" http://localhost:3001/api/events
```

## 🔄 Data Synchronization

The system automatically syncs data from YouTube and Google Calendar. **Cron jobs are enabled by default** and will start running as soon as you start the API server.

### Automatic Sync
- **Schedule**: Every Sunday at 5:00 AM (configurable)
- **Sources**: YouTube channel videos + Google Calendar events  
- **Storage**: MongoDB database
- **Status**: Always enabled by default (set `CRON_ENABLED=false` to disable)

### Manual Sync

**From API directory:**
```bash
cd api
npm run sync
```

**Using API endpoints directly:**
```bash
# Sync events
curl -X POST http://localhost:3001/api/events/sync \
  -H "x-api-key: your_api_key"

# Sync videos  
curl -X POST http://localhost:3001/api/videos/sync \
  -H "x-api-key: your_api_key"

# Check API status
curl -H "x-api-key: your_api_key" http://localhost:3001/api/status
```

## 📡 API Endpoints

🔒 = Requires API key authentication

### Events
- `GET /api/events` 🔒 - Get all events
- `GET /api/events/upcoming` 🔒 - Get upcoming events
- `GET /api/events/category/:category` 🔒 - Get events by category
- `POST /api/events/sync` 🔒 - Sync from Google Calendar

### Videos
- `GET /api/videos` 🔒 - Get all videos
- `GET /api/videos/featured` 🔒 - Get featured video
- `POST /api/videos/sync` 🔒 - Sync from YouTube

### Youth Camp
- `GET /api/youth-camp/info` - Get registration info (public)
- `POST /api/youth-camp/register` - Register for youth camp (public)
- `GET /api/youth-camp/registrations` 🔒 - Get registrations (admin)
- `GET /api/youth-camp/stats` 🔒 - Get registration statistics (admin)

### System
- `GET /api/health` - Health check (public)
- `GET /api/status` 🔒 - API status and cron job info

## 🚀 Deployment

### Production Environment

**API Environment:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://yourdomain.com
# CRON_ENABLED=false  # Only set if you want to disable cron jobs
```

**Client Environment:**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_API_KEY=your_production_api_key_here
```

### Deployment Steps

1. **Build the API:**
```bash
cd api
npm run build
npm start
```

2. **Build and deploy the client:**
```bash
cd client
npm run build
npm start
```

## 🛠️ Development

### API Development
- Express.js with TypeScript
- MongoDB with Mongoose
- Google APIs integration
- Cron job scheduling
- Rate limiting and security

### Client Development
- Next.js 15 with App Router
- TypeScript and Tailwind CSS
- GSAP animations
- Bilingual support (English/Spanish)

## 📁 Project Structure

```
templo/
├── api/                    # Express backend
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Services (cron, etc.)
│   │   ├── middleware/     # Express middleware
│   │   └── config.ts       # Configuration
│   └── package.json
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   └── hooks/          # Custom hooks
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Cron Schedule Format
The `SYNC_SCHEDULE` uses standard cron format:
- `0 5 * * 0` = Every Sunday at 5:00 AM (default)
- `0 */6 * * *` = Every 6 hours
- `0 0 * * *` = Every day at midnight

### Disabling Cron Jobs
Cron jobs are enabled by default. To disable them:
```env
CRON_ENABLED=false
```

### Rate Limiting
- General API: 100 requests per 15 minutes
- Sync endpoints: 5 requests per hour
- Registration: 10 requests per hour


This project is licensed under the MIT License. 
