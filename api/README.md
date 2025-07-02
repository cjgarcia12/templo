# Templo Church API

Express.js backend for the Templo Church website, providing REST API endpoints for videos, events, and youth camp registrations.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- Google API credentials (for YouTube and Calendar integration)

### Installation

1. **Install dependencies:**
   ```bash
   cd api
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the `/api` directory:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/templo

   # Google APIs
   GOOGLE_API_KEY=your_google_api_key_here
   YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here
   GOOGLE_CALENDAR_ID=your_google_calendar_id_here

   # Security
   API_SECRET_KEY=your_secret_api_key_here
   JWT_SECRET=your_jwt_secret_here

   # CORS
   FRONTEND_URL=http://localhost:3000

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3001`

## 📁 Project Structure

```
api/
├── src/
│   ├── config.ts              # Environment configuration
│   ├── index.ts               # Express app setup
│   ├── controllers/           # Business logic
│   │   ├── VideoController.ts
│   │   ├── EventController.ts
│   │   └── YouthCampController.ts
│   ├── models/                # Mongoose schemas
│   │   ├── Video.ts
│   │   ├── Event.ts
│   │   └── YouthCampRegistration.ts
│   ├── routes/                # API routes
│   │   ├── index.ts
│   │   ├── videoRoutes.ts
│   │   ├── eventRoutes.ts
│   │   └── youthCampRoutes.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── rateLimiting.ts
│   ├── validation/            # Yup schemas
│   │   └── youthCampValidation.ts
│   ├── db/                    # Database connection
│   │   └── connection.ts
│   ├── services/              # External services
│   ├── utils/                 # Utility functions
│   └── errors/                # Custom error classes
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠 API Endpoints

### Videos
- `GET /api/videos` - Get all videos
- `GET /api/videos/featured` - Get featured video
- `GET /api/videos/category/:category` - Get videos by category
- `GET /api/videos/youtube/:youtubeId` - Get video by YouTube ID
- `POST /api/videos/sync` - Sync videos from YouTube (requires API key)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/category/:category` - Get events by category
- `GET /api/events/fallback` - Get fallback events
- `POST /api/events/sync` - Sync events from Google Calendar (requires API key)

### Youth Camp
- `GET /api/youth-camp/info` - Get registration information
- `POST /api/youth-camp/register` - Submit registration
- `GET /api/youth-camp/registrations` - Get all registrations (admin)
- `GET /api/youth-camp/registrations/:id` - Get registration by ID (admin)
- `PATCH /api/youth-camp/registrations/:id/status` - Update status (admin)
- `DELETE /api/youth-camp/registrations/:id` - Delete registration (admin)
- `GET /api/youth-camp/stats` - Get registration statistics (admin)

### System
- `GET /api/health` - Health check
- `GET /api` - API information

## 🔐 Authentication

Admin endpoints require an API key in the request headers:

```bash
# Using x-api-key header
curl -H "x-api-key: your_secret_api_key" http://localhost:3001/api/videos/sync

# Using Authorization header
curl -H "Authorization: Bearer your_secret_api_key" http://localhost:3001/api/videos/sync
```

## ⚡ Rate Limiting

- **General endpoints:** 100 requests per 15 minutes per IP/API key
- **Sync endpoints:** 10 requests per hour per API key
- **Registration endpoint:** 5 attempts per 15 minutes per IP

## 🗃 Database Models

### Video
- Title, preacher, date, description
- YouTube ID, category, duration
- View count, like count, featured status

### Event
- Title, date, time, location
- Description, category (Worship/Community/Youth/Special)
- Google Calendar integration

### Youth Camp Registration
- Participant and parent/guardian information
- Contact details and emergency contacts
- Medical information and special requirements
- Legal waiver and signature

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Set all required environment variables in your production environment.

### Database
Ensure MongoDB is running and accessible from your production server.

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

### Adding New Endpoints
1. Create controller method in `/controllers`
2. Add route in `/routes`
3. Add validation schema in `/validation` (if needed)
4. Update this README

## 📝 Migration from Next.js

This API replaces the Next.js API routes that were previously in:
- `/client/src/app/api/videos/` → `/api/videos`
- `/client/src/app/api/events/` → `/api/events`
- `/client/src/app/api/youth-camp/` → `/api/youth-camp`

The frontend should now make requests to this Express server instead of the built-in Next.js API routes.

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection:** Ensure MongoDB is running and URI is correct
2. **Google API:** Verify API keys and enable YouTube Data API v3 and Calendar API
3. **CORS:** Check FRONTEND_URL matches your client application URL
4. **Port Conflicts:** Change PORT in .env if 3001 is in use

### Logs
The server provides detailed logging in development mode. Check console output for errors and debugging information.

## 📄 License

MIT License - see LICENSE file for details. 