/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["v2.exercisedb.io"],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
}

module.exports = nextConfig
