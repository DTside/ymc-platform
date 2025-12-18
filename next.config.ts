import type { NextConfig } from 'next';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config: any) => {
    // Это лечит ошибку 'module-not-found' для крипто-библиотек
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  staticPageGenerationTimeout: 1200,
} as any;

export default nextConfig;