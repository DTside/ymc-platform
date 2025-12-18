import { http, createConfig, cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

const projectId = 'ТВОЙ_PROJECT_ID'; // Убедись, что ID на месте

export const config = createConfig({
  chains: [mainnet, sepolia],
  // 1. Включаем SSR
  ssr: true,
  // 2. Настраиваем хранилище в Cookies
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});