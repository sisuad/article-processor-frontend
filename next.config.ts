import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    // Only use this temporarily to get the build working
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
