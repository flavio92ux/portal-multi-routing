import type { Metadata } from 'next';
import { Inter, Caladea } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const caladea = Caladea({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Band - Portal de Noticias',
  description:
    'Portal de noticias Band - Jornalismo, Esportes, Entretenimento e mais.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      style={
        {
          '--font-caladea-family': caladea.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <Script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="afterInteractive"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
