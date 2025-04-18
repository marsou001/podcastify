import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "grateful-lemming-831.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
