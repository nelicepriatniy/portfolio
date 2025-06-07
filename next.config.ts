import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Основные настройки изображений
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wwwyacheslav.ru',
        port: '4443',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false, // Включите true если проблемы с оптимизацией
  },

  // Настройки для API
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },

  // Оптимизации
  compress: true,
  productionBrowserSourceMaps: true,
  optimizeFonts: true,
  swcMinify: true,


  // Переменные среды
  env: {
    WORDPRESS_API_URL: 'https://wwwyacheslav.ru:8443/wp-json',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },

  // Редкие настройки
  trailingSlash: false,
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  output: 'standalone', // Для Docker
  distDir: '.next', // Можно изменить
}

export default nextConfig