import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: { esmExternals: true },
};

export default nextConfig;
