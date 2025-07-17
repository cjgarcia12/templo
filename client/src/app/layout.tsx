import type { Metadata } from "next";
import { Lora, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import StructuredData from "@/components/seo/StructuredData";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Templo Adoracion Y Alabanza | Church in Wilmington, NC",
    template: "%s | Templo Adoracion Y Alabanza"
  },
  description: "A welcoming Spanish-speaking church community in Wilmington, NC. Join us for worship services, prayer nights, Bible study, and community events. Everyone is welcome!",
  keywords: "church, Spanish church, Wilmington NC, worship, prayer, Bible study, community, faith, Christian, templo, adoracion, alabanza",
  authors: [{ name: "Templo Adoracion Y Alabanza" }],
  creator: "Templo Adoracion Y Alabanza",
  publisher: "Templo Adoracion Y Alabanza",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://temploaa.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-ES': '/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: '/',
    siteName: 'Templo Adoracion Y Alabanza',
    title: 'Templo Adoracion Y Alabanza | Church in Wilmington, NC',
    description: 'A welcoming Spanish-speaking church community in Wilmington, NC. Join us for worship services, prayer nights, Bible study, and community events.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Templo Adoracion Y Alabanza Church',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Templo Adoracion Y Alabanza | Church in Wilmington, NC',
    description: 'A welcoming Spanish-speaking church community in Wilmington, NC.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes as needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8B4513" />
        <meta name="msapplication-TileColor" content="#8B4513" />
      </head>
      <body
        className={`${lora.variable} ${raleway.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Organization Structured Data */}
        <StructuredData 
          type="Organization" 
          data={{}} 
        />
        
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
