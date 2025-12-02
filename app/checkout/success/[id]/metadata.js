// app/checkout/success/metadata.js
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://freefirelenden.vercel.app';

export const metadata = {
  title: "Payment Successful - Free Fire Account Purchase Confirmed | FreeFireLenden",
  description: "Your Free Fire account purchase has been confirmed. Account details will be delivered within 10 minutes. Thank you for choosing FreeFireLenden - India's trusted Free Fire marketplace.",
  
  keywords: [
    "free fire payment successful",
    "free fire account purchase confirmed",
    "freefirelenden payment success",
    "free fire order completed",
    "free fire account delivery",
    "ff account purchase success"
  ].join(', '),
  
  openGraph: {
    title: "Payment Successful - Free Fire Account Purchase",
    description: "Free Fire account purchase confirmed on FreeFireLenden. Account details delivery in progress.",
    url: `${baseUrl}/checkout/success`,
    siteName: "FreeFireLenden",
    images: [
      {
        url: `${baseUrl}/og-payment-success.jpg`,
        width: 1200,
        height: 630,
        alt: "Payment Successful - FreeFireLenden",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  
  twitter: {
    card: "summary",
    title: "Payment Successful - FreeFireLenden",
    description: "Your Free Fire account purchase is confirmed",
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
    canonical: `${baseUrl}/checkout/success`,
  },
};