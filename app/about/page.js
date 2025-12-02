// app/components/About.js - UPDATED WITH CLEAR MESSAGING
import Image from "next/image";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://freefirelenden.vercel.app';
const currentYear = new Date().getFullYear();

export const metadata = {
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
  
  // Structured Data for About Page
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
    
    // Article Schema
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

export default function About() {

 
  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 mt-16 rounded-3xl shadow-xl border border-[var(--color-border)] transition-colors duration-300">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-[var(--color-brand-yellow)] mb-6">
            About FreeFireStore
          </h2>

          <p className="text-[var(--color-link)] mb-6 leading-relaxed">
            <strong>FreeFireStore</strong> is the trusted online marketplace for
            buying and selling verified <strong>Free Fire accounts</strong>. We
            created this platform for gamers who want to level up fast — without
            worrying about scams or unsafe trades.
          </p>

          <p className="text-[var(--color-link)] mb-6 leading-relaxed">
            Every account listed here is manually verified by our team. We
            ensure Gmail ownership proof, rank validation, and smooth, secure
            delivery — so you can focus on what matters most: <strong>winning matches</strong>.
          </p>

          {/* ✅ UPDATED SECTION WITH CLEAR MESSAGING */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
            <p className="text-[var(--color-link)] leading-relaxed font-semibold">
              <span className="text-red-600">⚠️ Important Note:</span> 
              <br />
              • <strong>"100% Security Guarantee"</strong> refers only to our platform's payment processing and dispute resolution.
              <br />
              • Individual sellers on our marketplace are responsible for their own account delivery.
              <br />
              • We verify sellers but <strong>cannot guarantee 100% security</strong> for every individual transaction by external sellers.
              <br />
              • Our platform provides secure payment gateway and customer support for issue resolution.
            </p>
          </div>

          <p className="text-[var(--color-link)] leading-relaxed">
            Our goal is to make Free Fire trading <strong>transparent and safe</strong> 
            through verified sellers and secure payment processing for every player.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-brand-yellow)] text-lg">✅</span>
              <p className="text-sm text-[var(--color-link)]">Verified Sellers</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-brand-yellow)] text-lg">💳</span>
              <p className="text-sm text-[var(--color-link)]">Secure Payments</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-brand-yellow)] text-lg">🛡️</span>
              <p className="text-sm text-[var(--color-link)]">Dispute Resolution</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-brand-yellow)] text-lg">👥</span>
              <p className="text-sm text-[var(--color-link)]">Seller Verification</p>
            </div>
          </div>
          
          {/* ✅ Benefits List */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-[var(--color-brand-yellow)]">
              What We Provide:
            </h3>
            <ul className="list-disc pl-5 text-sm text-[var(--color-link)] space-y-1">
              <li>Secure payment processing through trusted gateways</li>
              <li>Seller identity verification process</li>
              <li>Customer support for transaction issues</li>
              <li>Dispute resolution mechanism</li>
              <li>Platform-level security for data protection</li>
            </ul>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/about-banner.webp"
            alt="Free Fire gaming marketplace - Secure trading platform"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Overlay Text */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-sm bg-black/70 p-2 rounded">
              <strong>Platform Security Only</strong> - We ensure payment security and verification, but individual seller transactions vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}




