/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pics
      },
        {
        protocol: "https",
        hostname: "ik.imagekit.io", // ✅ Correct hostname for ImageKit
      },
    ],
  },
};

export default nextConfig;
