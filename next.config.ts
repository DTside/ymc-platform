import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Игнорируем только ошибки типов (eslint больше не нужен здесь)
  typescript: {
    ignoreBuildErrors: true,
  },

  // 2. В Next.js 16 turbopack настраивается на верхнем уровне
  turbopack: {}, 

  // 3. Настройка Webpack для крипто-библиотек
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

  // 4. Ограничение ресурсов для стабильности
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  staticPageGenerationTimeout: 1200,
};

export default nextConfig;