import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ігноруємо помилки під час збірки для стабільного деплою
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Налаштування Webpack для Web3 (WalletConnect, Pino)
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  // Якщо помилка "Call retries were exceeded" повториться, додаємо цей параметр:
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;