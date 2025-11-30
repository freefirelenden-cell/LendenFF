/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // allow all paths from this domain
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**", // allow all paths from this domain
      },
    ],
  },
};

export default nextConfig;
