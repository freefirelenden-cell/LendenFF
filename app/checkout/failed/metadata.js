// app/checkout/failed/metadata.js
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://freefirelenden.vercel.app';

// ✅ Dynamic Metadata for Client Component Page
export async function generateMetadata() {
  const title = "Payment Failed – Free Fire Account Purchase Issue | FreeFireLenden";
  const description = "We encountered an issue processing your Free Fire account payment. Please try again or contact our support team at 03091186958 for assistance.";
  
  return {
    title,
    description,
    keywords: [
      "free fire payment failed",
      "free fire account purchase failed",
      "freefirelenden payment issue",
      "free fire order failed",
      "ff account payment problem",
      "free fire transaction failed"
    ].join(", "),
    
    openGraph: {
      title,
      description,
      url: `${baseUrl}/checkout/failed`,
      siteName: "FreeFireLenden",
      images: [
        {
          url: `${baseUrl}/og-payment-failed.jpg`,
          width: 1200,
          height: 630,
          alt: "Payment Failed - FreeFireLenden",
        },
      ],
      type: "website",
      locale: "en_IN",
    },
    
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-payment-failed.jpg`],
      creator: "@freefirelenden",
    },

    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "none",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: `${baseUrl}/checkout/failed`,
    },

    // Structured Data
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Checkout Failed - FreeFireLenden",
        "url": `${baseUrl}/checkout/failed`,
        "description": description,
      })
    }
  };
}
