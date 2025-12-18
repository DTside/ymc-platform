import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { headers } from "next/headers";
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

// ВАЖНО: Оставляем ТОЛЬКО динамический импорт. 
// Обычный импорт 'import { Providers } ...' должен быть удален!
const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), {
  ssr: false,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const cookie = headerList.get("cookie");

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Providers cookie={cookie}>
          {children}
        </Providers>
      </body>
    </html>
  );
}