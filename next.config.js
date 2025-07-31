/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  devIndicators: false
};

module.exports = nextConfig;
