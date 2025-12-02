import Providers from "./providers.js";
import './globals.css'
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import DataProvider from "./context/DataProvider.js";
import SyncUserToDB from "./components/SyncUserToDB.js";
import CheckAuth from "./components/CheckAuth.js";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://freefirelenden.vercel.app';

export const metadata = {
  title: "Free Fire Lenden - Buy/Sell Free Fire IDs & Accounts | FreeFireStore",
  description: "FreeFireLenden - India's No.1 Free Fire marketplace. Buy verified Free Fire accounts, sell your FF ID, purchase diamonds & characters. 100% secure trading platform.",
  keywords: "freefirelenden, free fire lended, freefire lenden, Free fire lenden, Free Fire Lenden, freefirestore, free fire store, free fire id sell, free fire account sell, buy free fire id, sell free fire account, free fire diamonds, free fire top up, free fire account buy india",
  
  openGraph: {
    title: "Free Fire Lenden - Buy/Sell Free Fire Accounts",
    description: "Trusted platform for Free Fire account trading. Instant delivery, secure payments.",
    url: baseUrl,
    siteName: "FreeFireLenden",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Free Fire Lenden - Free Fire Account Marketplace",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Free Fire Lenden - Free Fire Store",
    description: "Buy and sell Free Fire accounts safely",
    creator: "@freefirelenden",
    images: [`${baseUrl}/twitter-image.jpg`],
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  alternates: {
    canonical: baseUrl,
  },
  
  verification: {
    google: "add-your-google-verification-code",
  },
  
  metadataBase: new URL(baseUrl), // ✅ IMPORTANT: Fix for Next.js 13/14
  
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "language": "en-IN",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="canonical" href={baseUrl} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* ✅ Structured Data - Single line, no whitespace */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Free Fire Lenden",
          "alternateName": "FreeFireStore",
          "url": baseUrl,
          "description": "Buy and sell Free Fire game accounts, IDs, diamonds and characters",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/accounts?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }) }} />
        {/* ✅ Product Schema - Single line */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Free Fire Premium Account",
          "description": "Level 70 Free Fire account with 5000+ diamonds",
          "offers": {
            "@type": "Offer",
            "price": "499",
            "priceCurrency": "INR"
          }
        }) }} />
      </head>
      <body>
        <Providers> 
          <DataProvider>
            <Navbar />
            <SyncUserToDB />
            <CheckAuth>
              {children}
            </CheckAuth>
            <Footer />
          </DataProvider>
        </Providers>
      </body>
    </html>
  );
}