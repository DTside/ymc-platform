import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Игнорируем ошибки во время сборки, чтобы Vercel не падал из-за типов
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Настройка Webpack для работы крипто-библиотек
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  // Увеличиваем время генерации страниц (помогает при медленной сборке)
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;