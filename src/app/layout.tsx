import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { headers } from "next/headers";
import dynamic from 'next/dynamic'; // Тільки цей імпорт для динаміки

const inter = Inter({ subsets: ["latin"] });

// Імпортуємо Providers ТІЛЬКИ ТАК
const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), {
  ssr: false,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const cookie = headerList.get("cookie");

  return (
    <html lang="en" className="dark">
      <body>
        <Providers cookie={cookie}>
          {children}
        </Providers>
      </body>
    </html>
  );
}