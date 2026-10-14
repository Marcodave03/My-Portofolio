import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This app lives beside the old Vite build, which has its own lockfile.
  turbopack: { root: __dirname },
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
