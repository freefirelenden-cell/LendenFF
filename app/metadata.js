// app/metadata.js - ALL METADATA IN ONE FILE
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://freefirelenden.vercel.app';
const currentYear = new Date().getFullYear();

// ✅ Home Page Metadata
export const homeMetadata = {
  title: "Free Fire Lenden | Buy/Sell Free Fire IDs, Accounts, Diamonds | No.1 FreeFireStore India",
  description: `FreeFireLenden (${baseUrl}) - India's most trusted Free Fire marketplace. Buy 100% verified Free Fire accounts, sell your FF ID instantly, purchase diamonds & characters. Safe trading, instant delivery, best prices. 100% secure platform for Free Fire account trading.`,
  keywords: [
    "freefirelenden",
    "free fire lended", 
    "freefire lenden",
    "Free fire lenden",
    "Free Fire Lenden",
    "freefirestore",
    "free fire store",
    "free fire id sell",
    "free fire account sell",
    "buy free fire id",
    "sell free fire account",
    "free fire diamonds",
    "free fire top up",
    "free fire account buy india",
    "free fire id purchase",
    "free fire characters",
    "free fire weapons",
    "free fire trading platform",
    "free fire account marketplace"
  ].join(', '),
  
  openGraph: {
    title: "Free Fire Lenden - India's No.1 Free Fire Account Marketplace",
    description: "Buy & sell verified Free Fire accounts safely. Instant delivery, secure payments, best prices for FF IDs, diamonds & characters.",
    url: baseUrl,
    siteName: "FreeFireLenden",
    images: [
      {
        url: `${baseUrl}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: "Free Fire Lenden - Buy/Sell Free Fire Accounts, Diamonds, Characters",
      },
    ],
    locale: "en_IN",
    type: "website",
    publishedTime: new Date().toISOString(),
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Free Fire Lenden - Free Fire Store India",
    description: "Trusted platform for Free Fire account trading. Buy/Sell FF IDs, diamonds, characters.",
    images: [`${baseUrl}/twitter-home.jpg`],
    creator: "@freefirelenden",
    site: "@freefirelenden",
  },
  
  authors: [{ name: "Free Fire Lenden Team", url: baseUrl }],
  creator: "Free Fire Lenden",
  publisher: "FreeFireStore",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  
  // ✅ ADVANCED Structured Data
  other: {
    // Website Schema
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Free Fire Lenden",
      "alternateName": ["FreeFireStore", "Free Fire Account Marketplace"],
      "url": baseUrl,
      "description": "India's trusted platform for buying and selling Free Fire game accounts, IDs, diamonds and characters",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/accounts?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en_IN",
      "countryOfOrigin": "IN"
    }),
    
    // Organization Schema
    "application/ld+json+org": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Free Fire Lenden",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "description": "Trusted Free Fire account trading platform",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service"
      }
    }),
    
    // Product Collection Schema
    "application/ld+json+products": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Product",
            "name": "Free Fire Premium Account Level 70",
            "description": "Level 70 Free Fire account with 5000+ diamonds, rare characters",
            "offers": {
              "@type": "Offer",
              "price": "799",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Product",
            "name": "Free Fire Diamond Pack 2000",
            "description": "2000 Free Fire diamonds for top-up",
            "offers": {
              "@type": "Offer",
              "price": "499",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          }
        }
      ]
    }),
    
    // Breadcrumb Schema
    "application/ld+json+breadcrumb": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        }
      ]
    })
  }
};

// ✅ About Page Metadata
export const aboutMetadata = {
  title: "About Free Fire Lenden - Trusted Free Fire Marketplace | FreeFireStore",
  description: `Learn about ${baseUrl} - India's secure platform for Free Fire account trading. Our story, mission, and commitment to safe transactions.`,
  keywords: "about freefirelenden, free fire lenden about us, freefirestore about, free fire account trading platform",
};

// ✅ Accounts Page Metadata
export const accountsMetadata = {
  title: "Free Fire Accounts for Sale | Buy FF IDs - FreeFireLenden",
  description: "Browse 100+ Free Fire accounts for sale. Buy verified FF IDs with diamonds, characters, weapons. Level 1-70 accounts available. Safe trading.",
  keywords: "free fire accounts for sale, buy free fire id, cheap free fire account, free fire diamond account, level 70 ff account",
};

// ✅ Account Detail Page Metadata (Dynamic)
export const getAccountDetailMetadata = (accountId) => ({
  title: `Free Fire Account ${accountId} - Buy Premium FF ID | FreeFireLenden`,
  description: `Buy this verified Free Fire account ${accountId}. Premium FF ID with diamonds, characters, weapons. Level 50+ account. Safe trading on FreeFireLenden.`,
  keywords: `free fire account ${accountId}, buy ff id, free fire account for sale, premium free fire account, free fire diamonds account`,
});

// ✅ Dashboard Metadata
export const dashboardMetadata = {
  title: "Dashboard - FreeFireLenden | Manage Your Account",
  description: "Your FreeFireLenden dashboard. Manage your account, track orders, and view stats.",
};

// ✅ Sell Account Page Metadata
export const sellAccountMetadata = {
  title: "Sell Free Fire Account | Get Best Price - FreeFireLenden",
  description: "Sell your Free Fire account for highest price. Instant payment, secure process. We buy all FF accounts with diamonds, characters, rare items.",
  keywords: "sell free fire account, sell ff id, free fire account sell price, where to sell free fire account",
};

// ✅ Buy Account Page Metadata
export const buyAccountMetadata = {
  title: "Buy Free Fire Account | Verified IDs - FreeFireLenden",
  description: "Buy 100% verified Free Fire accounts. Premium FF IDs with diamonds, characters, weapons. Instant delivery, secure purchase.",
  keywords: "buy free fire account, purchase ff id, cheap free fire account buy, verified free fire account",
};

// ✅ Common Metadata for All Pages
export const commonMetadata = {
  metadataBase: new URL(baseUrl),
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
  alternates: {
    canonical: baseUrl,
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "language": "en-IN",
  }
};