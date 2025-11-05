/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev", // Clerk sometimes uses this domain too
      },
        {
        protocol: "https",
        hostname: "ik.imagekit.io", // ✅ Correct hostname for ImageKit
      },
    ],
  },
};

export default nextConfig;
