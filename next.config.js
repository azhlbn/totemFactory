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
    unoptimized: true, // Отключаем оптимизацию изображений, чтобы избежать проблем со сборкой
  },
  // Отключаем оптимизацию CSS и шрифтов
  optimizeFonts: false,
  // Отключаем минификацию SWC, которая может влиять на стили
  swcMinify: false,
  // Добавляем экспериментальные настройки для решения проблем с CSS
  experimental: {
    optimizeCss: false, // Отключаем оптимизацию CSS
    esmExternals: 'loose', // Более свободный режим для внешних модулей
    appDir: false, // Отключаем App Router, так как используем Pages Router
  },
  // Basic configuration for Pages Router
  distDir: '.next',
  // Explicitly define page paths and extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Исправленная конфигурация webpack для решения проблем с Tailwind CSS
  webpack: (config, { isServer }) => {
    // Добавляем расширения для импортов
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', ...config.resolve.extensions];
    
    // Добавляем поддержку глобальных CSS файлов
    if (!isServer) {
      // Добавляем глобальные CSS файлы в сборку
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js'] && !entries['main.js'].includes('./src/styles/globals.css')) {
          entries['main.js'].unshift('./src/styles/globals.css');
        }
        return entries;
      };
    }
    
    return config;
  },
  // Отключаем заголовок Powered by Vercel
  poweredByHeader: false,
}

module.exports = nextConfig