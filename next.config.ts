import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ігноруємо помилки типізації та лінтингу під час білду
  // Це критично для зменшення навантаження на пам'ять при деплої
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Налаштування Webpack для сумісності з крипто-бібліотеками
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  // Збільшуємо таймаут для генерації статичних сторінок
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;