/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['gateway.pinata.cloud', 'ipfs.io'],
    unoptimized: true,
  },
  // Basic configuration for Pages Router
  distDir: '.next',
  // Explicitly define page paths and extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Force the index page to be generated
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' }
    };
  },
  // Resolve extensions for imports
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', ...config.resolve.extensions];
    return config;
  },
  // Optimization for Vercel
  poweredByHeader: false,
  swcMinify: true,
}

module.exports = nextConfig