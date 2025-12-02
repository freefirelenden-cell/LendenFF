import { getUserById } from "@/lib/apiClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ⭐ DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { id } = params;

  // Seller data fetch
  const { user } = await getUserById(id);

  if (!user) {
    return {
      title: "Seller Not Found | FreeFireLenden",
      description: "This seller does not exist on Free Fire Lenden.",
    };
  }

  const sellerName = user.name || "Free Fire Seller";
  const sellerImage = user.image || `${baseUrl}/default-seller.jpg`;
  const sellerTrusted = user.isTrusted ? "Trusted" : "Verified";

  const url = `${baseUrl}/seller/${id}`;

  const description = `${sellerName} is a ${sellerTrusted} FreeFire ID Seller on FreeFireLenden. Check their listed Free Fire accounts including premium IDs, high-level accounts, rare bundles, diamond accounts & more. Safe trading & instant delivery across India.`;

  return {
    title: `${sellerName} | ${sellerTrusted} Free Fire ID Seller | FreeFireLenden`,
    description,
    keywords: [
      `${sellerName} free fire seller`,
      "free fire id seller",
      "free fire account seller",
      "buy free fire id",
      "trusted free fire seller",
      "freefirelenden seller",
      "free fire marketplace india",
      "free fire account store",
      "seller profile free fire",
      "ff id sellers india"
    ].join(", "),

    openGraph: {
      title: `${sellerName} - ${sellerTrusted} Free Fire Seller`,
      description,
      url,
      siteName: "FreeFireLenden",
      images: [
        {
          url: sellerImage,
          width: 1200,
          height: 630,
          alt: `${sellerName} - Free Fire Seller`,
        }
      ],
      type: "profile",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: `${sellerName} - Free Fire Seller`,
      description,
      images: [sellerImage],
      creator: "@freefirelenden",
    },

    // ⭐ Structured Data (HIGH RANK BOOSTER)  
    other: {
      // Seller Schema
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": sellerName,
        "url": url,
        "image": sellerImage,
        "jobTitle": "Free Fire Account Seller",
        "description": description,
        "sameAs": [
          `${baseUrl}/seller/${id}`,
        ],
      }),

      // Seller's Product List Schema
      "application/ld+json+products": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${sellerName} - Free Fire Accounts`,
        "url": url,
        "description": `${sellerName}'s active Free Fire accounts for sale`,
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
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sellers",
            "item": `${baseUrl}/sellers`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": sellerName,
            "item": url
          }
        ]
      })
    }
  };
}
