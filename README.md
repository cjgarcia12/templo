# Templo Adoración Y Alabanza - Church Website

A modern, bilingual church website built with Next.js 14, featuring responsive design, SEO optimization, MongoDB database, and smooth animations. Serving the Wilmington, NC community with both English and Spanish language support.

## 🌟 Features

### 🌍 **Multilingual Support**
- Full English and Spanish translations
- Dynamic language switching with localStorage persistence
- SEO-optimized content in both languages

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes
- Modern, accessible UI components

### 🎨 **Interactive Animations**
- GSAP-powered smooth animations
- Scroll-triggered effects
- Professional page transitions

### 🗄️ **Dynamic Data Management**
- MongoDB database with Mongoose ODM
- Google Calendar API integration for events
- YouTube API integration for sermons
- Automated weekly data synchronization via cron jobs

### 📄 **Dynamic Pages**
- **Home**: Welcome message, service times, latest sermon
- **Services**: Worship schedule and what to expect
- **Events**: Live events from Google Calendar with filtering
- **Sermons**: Video sermon archive with YouTube integration
- **Ministries**: Church ministry information and volunteer opportunities

### 🔍 **SEO Optimized**
- Server-side rendering for search engines
- Structured data markup
- Dynamic meta tags and Open Graph support
- Sitemap and robots.txt generation

### ⚡ **Performance**
- Next.js 14 App Router
- Image optimization
- Static generation where possible
- Efficient client-side hydration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **APIs**: Google Calendar API, YouTube Data API
- **Font**: Geist (Vercel's optimized font)
- **Deployment**: GitHub Actions + PM2
- **SEO**: Next.js metadata API + structured data

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- Docker (for MongoDB)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd templo
   ```

2. **Set up MongoDB with Docker**
   
   **For Development:**
   ```bash
   # Run MongoDB with auto-restart and data persistence
   docker run -d \
     --name templo-mongodb \
     --restart unless-stopped \
     -p 27017:27017 \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=password123 \
     -e MONGO_INITDB_DATABASE=templo \
     -v templo-mongodb-data:/data/db \
     mongo:7.0
   ```

   **For Production (VPS):**
   ```bash
   # Run MongoDB with stronger password and production settings
   docker run -d \
     --name templo-mongodb \
     --restart unless-stopped \
     -p 127.0.0.1:27017:27017 \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=your_secure_password_here \
     -e MONGO_INITDB_DATABASE=templo \
     -v /opt/templo/mongodb-data:/data/db \
     mongo:7.0
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local
   
   # Edit .env.local with your values
   ```
   
   Required environment variables:
   ```env
   # Google API Configuration
   GOOGLE_API_KEY=your_google_api_key_here
   GOOGLE_CALENDAR_ID=your_google_calendar_id_here
   YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here
   
   # MongoDB Configuration
   # For development
   MONGODB_URI=mongodb://admin:password123@localhost:27017/templo?authSource=admin
   
   # For production
   MONGODB_URI=mongodb://admin:your_secure_password_here@localhost:27017/templo?authSource=admin
   
   # Application Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Sync initial data** (optional)
   ```bash
   # This will fetch events from Google Calendar and videos from YouTube
   npm run sync
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Website: [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### MongoDB with Docker

#### Development Setup

```bash
# Start MongoDB for development
docker run -d \
  --name templo-mongodb \
  --restart unless-stopped \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -e MONGO_INITDB_DATABASE=templo \
  -v templo-mongodb-data:/data/db \
  mongo:7.0

# Check if it's running
docker ps

# View logs
docker logs templo-mongodb

# Stop the container
docker stop templo-mongodb

# Remove the container (keeps data in volume)
docker rm templo-mongodb
```

#### Production Setup (VPS)

```bash
# Create data directory
sudo mkdir -p /opt/templo/mongodb-data
sudo chown 999:999 /opt/templo/mongodb-data

# Start MongoDB for production
docker run -d \
  --name templo-mongodb \
  --restart unless-stopped \
  -p 127.0.0.1:27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=your_very_secure_password_here \
  -e MONGO_INITDB_DATABASE=templo \
  -v /opt/templo/mongodb-data:/data/db \
  mongo:7.0

# Verify it's running and auto-restarts
docker ps
docker restart templo-mongodb  # Should restart automatically
```

#### Useful Docker Commands

```bash
# Check MongoDB status
docker ps | grep templo-mongodb

# View MongoDB logs
docker logs templo-mongodb -f

# Connect to MongoDB shell
docker exec -it templo-mongodb mongosh -u admin -p

# Backup database
docker exec templo-mongodb mongodump --uri="mongodb://admin:password@localhost:27017/templo?authSource=admin" --out=/data/backups/

# Restart if needed
docker restart templo-mongodb

# Check if auto-restart is working
docker stop templo-mongodb
sleep 5
docker ps | grep templo-mongodb  # Should be running again
```

#### Database Structure

- **Events Collection**: Stores church events from Google Calendar
- **Videos Collection**: Stores sermon videos from YouTube
- **Indexes**: Created automatically by the application for optimal performance

### MongoDB Atlas (Alternative)

For cloud hosting, you can use MongoDB Atlas instead:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/templo
```

## 🔄 Data Synchronization

The application fetches data from external APIs and stores it in MongoDB for optimal performance.

### Architecture

```
Cron Job → Backend API Routes → MongoDB → Frontend API Routes → Website
```

### API Endpoints

#### Backend Routes (for data sync)
- `POST /api/sync/events` - Syncs Google Calendar events to database
- `POST /api/sync/videos` - Syncs YouTube videos to database

#### Frontend Routes (for website)
- `GET /api/events` - Returns events from database
- `GET /api/videos` - Returns videos from database
- `GET /api/featured-video` - Returns the latest featured video

### Manual Data Sync

```bash
# Sync both events and videos
npm run sync

# Or sync individually using curl
curl -X POST http://localhost:3000/api/sync/events
curl -X POST http://localhost:3000/api/sync/videos
```

### Automated Sync (Production)

Set up a cron job to run weekly:

```bash
# Add to crontab (runs every Sunday at 6 AM)
0 6 * * 0 cd /path/to/templo && npm run sync
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Page routes
│   │   ├── events/        # Events page
│   │   ├── sermons/       # Sermons page
│   │   ├── services/      # Services page
│   │   └── ministries/    # Ministries page
│   ├── api/               # API routes
│   │   ├── events/        # Frontend API for events
│   │   ├── videos/        # Frontend API for videos
│   │   ├── featured-video/ # Featured video API
│   │   └── sync/          # Backend sync APIs
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── seo/              # SEO components
├── controllers/           # Business logic controllers
│   ├── EventController.ts # Google Calendar + Event DB operations
│   └── VideoController.ts # YouTube + Video DB operations
├── models/               # MongoDB schemas
│   ├── Event.ts          # Event model
│   └── Video.ts          # Video model
├── lib/                  # Utility functions
│   ├── database.ts       # MongoDB connection
│   └── seo.ts           # SEO helpers
├── context/              # React Context providers
│   └── LanguageContext.tsx # Translation context
├── types/               # TypeScript type definitions
└── scripts/             # Utility scripts
    └── sync-all.mjs     # Data synchronization script
```

## 🌐 Language System

The website uses a custom React Context for translations:

```typescript
// Switch language
const { language, setLanguage, t } = useLanguage();
setLanguage('es'); // Switch to Spanish

// Use translations
const title = t('welcome_to_church');
```

### Adding New Translations

1. Open `src/context/LanguageContext.tsx`
2. Add your new key to the `TranslationKeys` interface
3. Add translations for both English (`en`) and Spanish (`es`)

```typescript
interface TranslationKeys {
  // ... existing keys
  new_key: string;
}

const translations = {
  en: {
    // ... existing translations
    new_key: 'Your English text',
  },
  es: {
    // ... existing translations
    new_key: 'Su texto en español',
  }
};
```

## 🎬 Animation System

The website uses GSAP for animations:

- **Hero animations**: Staggered text reveal on page load
- **Scroll animations**: Elements fade in as they enter viewport
- **Page transitions**: Smooth client-side navigation

Animations are implemented in separate client components to maintain SEO benefits.

## 📈 SEO & Performance

### Server-Side Rendering
- Main pages are server components for optimal SEO
- Dynamic metadata generation
- Structured data for rich snippets

### Client-Side Features
- Language switching
- Interactive animations
- Form handling

## 🚀 Deployment

The project uses GitHub Actions for automated deployment:

### Production Workflow
1. Push to `main` branch triggers deployment
2. Code is checked out on self-hosted runner
3. Dependencies are installed
4. Project is built with `npm run build`
5. PM2 process is restarted

### Manual Deployment
```bash
# On your server
git pull origin main
npm install
npm run build
pm2 restart temploaa
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Data Management
npm run sync         # Sync events and videos from APIs

# Database (Docker)
docker run -d --name templo-mongodb --restart unless-stopped \
  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -v templo-mongodb-data:/data/db mongo:7.0    # Start MongoDB

docker stop templo-mongodb     # Stop MongoDB
docker start templo-mongodb    # Start MongoDB
docker logs templo-mongodb     # View MongoDB logs
```

## 🏗️ Architecture Decisions

### Clean Backend Architecture
- **Controllers**: Handle business logic and external API calls
- **Models**: Define MongoDB schemas with Mongoose
- **API Routes**: Clean separation between backend (sync) and frontend (serve) routes
- **Database**: Single source of truth with MongoDB

### Hybrid Rendering Strategy
- **Server Components**: SEO-critical content, metadata generation
- **Client Components**: Interactive features, animations, language switching

### SEO-First Approach
- Static generation where possible
- Server-side rendering for dynamic content
- Proper meta tags and structured data

### Performance Optimizations
- Database indexing for fast queries
- Image optimization with Next.js Image component
- Font optimization with next/font
- Code splitting and lazy loading

## 🔒 Environment Variables

Create a `.env.local` file with these variables:

```env
# Google API Configuration
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_CALENDAR_ID=your_google_calendar_id_here  
YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here

# MongoDB Configuration
# For development
MONGODB_URI=mongodb://admin:password123@localhost:27017/templo?authSource=admin

# For production
# MONGODB_URI=mongodb://admin:your_secure_password_here@localhost:27017/templo?authSource=admin

# Application Configuration  
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for Templo Adoración Y Alabanza church in Wilmington, NC.

## 📞 Contact

**Church Information:**
- **Address**: 209 S 7th Street, Wilmington, NC
- **Services**: 
  - Sunday Worship: 11:00 AM
  - Tuesday Prayer Night: 7:00 PM
  - Friday Bible Study/Youth Night: 7:00 PM

---

Built with ❤️ for the Templo Adoración Y Alabanza community
