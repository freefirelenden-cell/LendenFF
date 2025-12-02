// app/accounts/page.js
import ListCards from "../components/ListCards";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://freefirelenden.vercel.app";
const pageUrl = `${baseUrl}/accounts`;
const pageTitle = "Browse Free Fire Accounts — Buy Premium FF IDs | FreeFireLenden";
const pageDescription =
  "Browse verified Free Fire accounts for sale — premium skins, high levels, rare characters. Secure marketplace with instant delivery. Find the best Free Fire account for your play style.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "free fire accounts",
    "buy free fire id",
    "free fire account sale",
    "premium free fire accounts",
    "ff accounts for sale",
    "buy ff id india"
  ].join(", "),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "FreeFireLenden",
    images: [
      {
        url: `${baseUrl}/og/accounts-list.png`,
        width: 1200,
        height: 630,
        alt: "Free Fire Accounts - FreeFireLenden",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${baseUrl}/og/accounts-list.png`],
  },
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  // small structured data snippets that are safe even without real items
  other: {
    // Breadcrumb
    "application/ld+json+breadcrumb": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Accounts", item: pageUrl }
      ]
    }),
  }
};

export default function AccountsPage() {
  // NOTE: agar tumhare paas server-side se accounts data aata hai,
  // recommended: generate ItemList structured data dynamically using real items,
  // phir inject karo JSON-LD with those items. Niche example comment mein diya hai.

  return (
    <>
      {/* 🔹 Visible content (main listing) */}
      <header className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[var(--color-brand-yellow)]">
          Browse Free Fire Accounts — Verified & Ready
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)] max-w-3xl">
          {pageDescription} — Filter by rank, price and features. Instant delivery and secure transfers.
        </p>
      </header>

      {/* 🔹 Cards / Listing component */}
      <main className="container mx-auto px-6 pb-16">
        <ListCards />
      </main>

      {/* 🔹 Hidden SEO content for crawlers (semantic, accessible) */}
      <section style={{ display: "none" }} aria-hidden="true">
        <article>
          <header>
            <h2>Free Fire Accounts Marketplace</h2>
            <p>FreeFireLenden provides verified Free Fire accounts with detailed specs — level, diamonds, skins and characters.</p>
          </header>

          <section>
            <h3>Popular Account Types</h3>
            <ul>
              <li>Premium Accounts — Level 50+</li>
              <li>Diamond Rich Accounts — Large diamond balance</li>
              <li>Character Collections — Rare characters included</li>
              <li>Weapon/Skins Accounts — Exclusive weapon skins</li>
              <li>Beginner Accounts — Cheap starter accounts</li>
            </ul>
          </section>

          <section>
            <h3>How Buying Works</h3>
            <ol>
              <li>Select an account and complete payment.</li>
              <li>Seller provides login details after confirmation.</li>
              <li>We recommend changing password and verifying email immediately.</li>
            </ol>
          </section>

          <footer>
            <p>Updated: {new Date().toISOString().slice(0, 10)}</p>
          </footer>
        </article>
      </section>

      {/* 🔹 FAQ structured data for this page (lightweight) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are accounts verified before listing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes — every seller is manually verified before an account is listed. We verify Gmail & seller history."
                }
              },
              {
                "@type": "Question",
                "name": "How fast is delivery?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most purchases are delivered instantly or within a few hours, depending on seller response time."
                }
              }
            ]
          })
        }}
      />
      
      {/* 🔹 Optional: Example ItemList schema (SAMPLE) */}
      {/* 
         IMPORTANT:
         - Replace `sampleItems` below with real accounts data from your DB and render that JSON-LD server-side.
         - Do NOT expose sensitive data (passwords). Only include public fields: title, url, image, price, availability.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              // Example placeholder — replace when you have real data
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Product",
                  "name": "Free Fire Account Level 75 — Rare Skins",
                  "image": `${baseUrl}/og/accounts-list.png`,
                  "description": "Level 75 account with rare skins and passes.",
                  "url": `${pageUrl}/sample-account-1`,
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": "2999",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
