'use client';

import React, { ReactNode, useState } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, cookieToInitialState } from 'wagmi';
import { config } from '@/lib/config';

export function Providers({ 
  children, 
  cookie 
}: { 
  children: ReactNode, 
  cookie?: string | null 
}) {
  // 1. Инициализируем QueryClient внутри useState, чтобы он не пересоздавался при ререндерах
  const [queryClient] = useState(() => new QueryClient());

  // 2. Получаем начальное состояние из кук для гидратации Wagmi
  const initialState = cookieToInitialState(config, cookie);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: '#EAB308' })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}