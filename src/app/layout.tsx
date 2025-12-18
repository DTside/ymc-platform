import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { headers } from "next/headers"; // Импортируем headers
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

// Динамический импорт провайдеров
const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), {
  ssr: false,
});

// Добавляем async перед функцией RootLayout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Добавляем await перед headers()
  const headerList = await headers(); 
  const cookie = headerList.get("cookie");

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Передаем cookie в Providers, если он там ожидается */}
        <Providers cookie={cookie}>
          {children}
        </Providers>
      </body>
    </html>
  );
}