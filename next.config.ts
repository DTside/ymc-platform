import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // В Next.js 16 настройки Turbopack переехали на верхний уровень
  turbopack: {
    // Здесь можно добавить настройки, если нужно
  },

  webpack: (config, { isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  experimental: {
    // Ограничиваем билд одним потоком, чтобы воркеры не падали по памяти
    cpus: 1, 
    workerThreads: false,
  },

  staticPageGenerationTimeout: 1200,
};

export default nextConfig;