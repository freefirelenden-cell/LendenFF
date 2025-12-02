
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  try {
 

    // ✅ STEP 4: Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/accounts`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
      },
      // ... baki static pages
    ];

    // ✅ STEP 5: Dynamic pages (REAL DATA se)
    const accountPages = accounts.map(acc => ({
      url: `${baseUrl}/accounts/${acc._id}`,
      lastModified: acc.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const sellerPages = sellers.map(seller => ({
      url: `${baseUrl}/seller-${seller._id}`,
      lastModified: seller.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // ✅ STEP 6: Sab combine karo
    return [
      ...staticPages,
      ...accountPages,
      ...sellerPages,
    ];
    
  } catch (error) {
    console.error('❌ Sitemap generation error:', error);
    
    // Agar database error aaye, toh at least static pages return karo
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/accounts`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];
  }
}