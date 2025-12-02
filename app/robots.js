// app/robots.js
export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/*',      // Login required pages
        '/api/*',           // API routes
        '/admin/*',         // Admin pages
        '/private/*',       // Private content
        '/checkout/success', // Success pages - no need to index
        '/checkout/failed',  // Failed pages - no need to index
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}