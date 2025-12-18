'use client';

import { ReactNode } from 'react';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Обязательно экспортируем интерфейс пропсов
interface ProvidersProps {
  children: ReactNode;
  cookie?: string | null;
}

const config = getDefaultConfig({
  appName: 'Crypto App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
});

const queryClient = new QueryClient();

export function Providers({ children, cookie }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}