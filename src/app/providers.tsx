'use client';

import React, { ReactNode } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, cookieToInitialState } from 'wagmi';
import { config } from '@/lib/config';

// Добавляем initialState для поддержки кук
// src/app/providers.tsx
export function Providers({ 
  children, 
  cookie 
}: { 
  children: React.ReactNode, 
  cookie?: string | null 
}) {
  const [queryClient] = React.useState(() => new QueryClient());
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