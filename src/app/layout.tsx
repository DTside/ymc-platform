import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "./providers";
import { headers } from "next/headers"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YMC | Young Millionaires Club",
  description: "Join the elite processing team.",
};

// 1. Добавляем ключевое слово async
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. Ждем получения заголовков (await headers())
  const headersData = await headers();
  const cookie = headersData.get('cookie');

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