import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress lint errors during migration — pre-existing issues in legacy src/ files.
  // Remove this once migration is complete and lint is cleaned up.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow images from external sources used in the example story
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
