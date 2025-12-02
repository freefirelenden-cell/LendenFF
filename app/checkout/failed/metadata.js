// app/checkout/failed/metadata.js
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://freefirelenden.vercel.app';

export const metadata = {
  title: "Payment Failed - Free Fire Account Purchase Issue | FreeFireLenden",
  description: "We encountered an issue processing your Free Fire account payment. Please try again or contact our support team at 03091186958 for assistance.",
  
  keywords: [
    "free fire payment failed",
    "free fire account purchase failed",
    "freefirelenden payment issue",
    "free fire order failed",
    "ff account payment problem",
    "free fire transaction failed"
  ].join(', '),
  
  openGraph: {
    title: "Payment Failed - Free Fire Account Purchase",
    description: "Free Fire account payment failed on FreeFireLenden. Please try again or contact support.",
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
    locale: "en_IN",
    type: "website",
  },
  
  twitter: {
    card: "summary",
    title: "Payment Failed - FreeFireLenden",
    description: "Free Fire account payment issue. Contact support for help.",
  },
  
  robots: {
    index: false, // ❌ IMPORTANT: Don't index checkout pages
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: `${baseUrl}/checkout/failed`,
  },
};