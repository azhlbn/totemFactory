/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['gateway.pinata.cloud', 'ipfs.io'],
    unoptimized: true,
  },
  // Базовая конфигурация для Pages Router
  distDir: '.next',
  // Отключение предварительной генерации статических страниц
  // Это важно для динамических приложений с Web3
  trailingSlash: false,
  // Явно указываем пути для страниц
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Оптимизация для Vercel
  poweredByHeader: false,
  swcMinify: true,
}

module.exports = nextConfig