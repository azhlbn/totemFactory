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
    // Используем оптимизацию изображений для лучшей производительности
    unoptimized: false,
  },
  // Basic configuration for Pages Router
  distDir: '.next',
  // Explicitly define page paths and extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Удаляем exportPathMap, так как он может вызывать проблемы на Vercel
  // Resolve extensions for imports
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', ...config.resolve.extensions];
    
    // Упрощенная конфигурация без использования rule.test.test
    // Next.js уже включает postcss-loader по умолчанию
    return config;
  },
  // Optimization for Vercel
  poweredByHeader: false,
  swcMinify: true,
}

module.exports = nextConfig