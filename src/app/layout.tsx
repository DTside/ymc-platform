import { headers } from "next/headers";
import dynamic from 'next/dynamic';

// ТОЛЬКО ТАК: обычный импорт Providers выше должен быть УДАЛЕН
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