// app/about/metadata.js
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://freefirelenden.vercel.app';
const currentYear = new Date().getFullYear();

export const aboutMetadata = {
  title: "About Free Fire Lenden - India's Trusted Free Fire Marketplace | Our Story",
  description: `Learn about FreeFireLenden (${baseUrl}) - India's most trusted Free Fire account trading platform. Our mission, team, and commitment to secure Free Fire ID buying/selling since ${currentYear}.`,
  keywords: [
    "about freefirelenden",
    "free fire lenden about us",
    "freefirestore about",
    "free fire account trading platform",
    "free fire marketplace india",
    "free fire id sell platform",
    "free fire account buy website",
    "trusted free fire trading",
    "free fire lenden team",
    "free fire account security"
  ].join(', '),

  openGraph: {
    title: "About Free Fire Lenden - Our Free Fire Trading Platform",
    description: "Discover the story behind India's most trusted Free Fire account marketplace. Learn about our mission to provide safe trading.",
    url: `${baseUrl}/about`,
    siteName: "FreeFireLenden",
    images: [
      {
        url: `${baseUrl}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: "About Free Fire Lenden - Free Fire Trading Platform",
      },
    ],
    locale: "en_IN",
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Free Fire Lenden - Our Story",
    description: "Learn about India's trusted Free Fire account trading platform",
    images: [`${baseUrl}/twitter-about.jpg`],
  },

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Free Fire Lenden",
      "description": "India's trusted Free Fire account trading platform",
      "url": `${baseUrl}/about`,
      "publisher": {
        "@type": "Organization",
        "name": "Free Fire Lenden",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "foundingDate": "2023",
        "founders": [
          {
            "@type": "Person",
            "name": "Free Fire Lenden Team"
          }
        ],
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "10+"
        }
      },
      "mainEntity": {
        "@type": "WebPageElement",
        "name": "Our Mission",
        "text": "To provide a 100% secure platform for Free Fire account trading in India"
      }
    }),

    "application/ld+json+article": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "About Free Fire Lenden - Our Story",
      "description": "The story of India's most trusted Free Fire account trading platform",
      "image": `${baseUrl}/og-about.jpg`,
      "datePublished": "2023-01-01T00:00:00+05:30",
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Free Fire Lenden Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "FreeFireStore",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      }
    })
  }
};
