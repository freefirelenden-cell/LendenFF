// app/checkout/success/metadata.js
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://freefirelenden.vercel.app';

export async function generateMetadata() {
  const title = "Payment Successful – Free Fire Account Purchase Confirmed | FreeFireLenden";
  const description = "Your Free Fire account purchase has been confirmed. Account details will be delivered within 10 minutes. Thank you for choosing FreeFireLenden - India's trusted Free Fire marketplace.";

  return {
    title,
    description,
    keywords: [
      "free fire payment successful",
      "free fire account purchase confirmed",
      "freefirelenden payment success",
      "free fire order completed",
      "free fire account delivery",
      "ff account purchase success"
    ].join(", "),
    
    openGraph: {
      title,
      description,
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
      type: "website",
      locale: "en_IN",
    },
    
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-payment-success.jpg`],
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
      canonical: `${baseUrl}/checkout/success`,
    },

    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Checkout Successful - FreeFireLenden",
        "url": `${baseUrl}/checkout/success`,
        "description": description,
      })
    }
  };
}
