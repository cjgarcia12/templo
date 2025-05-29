# Templo Adoración Y Alabanza - Church Website

A modern, bilingual church website built with Next.js 14, featuring responsive design, SEO optimization, and smooth animations. Serving the Wilmington, NC community with both English and Spanish language support.

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

### 📄 **Dynamic Pages**
- **Home**: Welcome message, service times, latest sermon
- **Services**: Worship schedule and what to expect
- **Events**: Upcoming church events with filtering
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
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Font**: Geist (Vercel's optimized font)
- **Deployment**: GitHub Actions + PM2
- **SEO**: Next.js metadata API + structured data

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd templo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Page routes
│   │   ├── events/        # Events page
│   │   ├── sermons/       # Sermons page
│   │   ├── services/      # Services page
│   │   └── ministries/    # Ministries page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── seo/              # SEO components
├── context/              # React Context providers
│   └── LanguageContext.tsx # Translation context
├── lib/                  # Utility functions
│   └── seo.ts           # SEO helpers
└── types/               # TypeScript type definitions
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

# Type checking
npm run type-check   # Check TypeScript types
```

## 🏗️ Architecture Decisions

### Hybrid Rendering Strategy
- **Server Components**: SEO-critical content, metadata generation
- **Client Components**: Interactive features, animations, language switching

### SEO-First Approach
- Static generation where possible
- Server-side rendering for dynamic content
- Proper meta tags and structured data

### Performance Optimizations
- Image optimization with Next.js Image component
- Font optimization with next/font
- Code splitting and lazy loading

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
