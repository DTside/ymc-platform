import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { headers } from "next/headers";
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

/**
 * 1. Используем динамический импорт с отключением SSR.
 * Это предотвращает ошибки WalletConnect и RainbowKit на сервере.
 * Убедитесь, что файл находится по пути src/components/Providers.tsx
 */
const Providers = dynamic(
  () => import('./providers').then(mod => mod.Providers), 
  { ssr: false }
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /** * В Next.js 16 headers() — это асинхронная функция.
   */
  const headerList = await headers();
  const cookie = headerList.get("cookie");

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Передаем куки, если ваш провайдер их поддерживает для гидратации */}
        <Providers cookie={cookie}>
          {children}
        </Providers>
      </body>
    </html>
  );
}