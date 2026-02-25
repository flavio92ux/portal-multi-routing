import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const _openSans = Open_Sans({ subsets: ['latin'] });

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
    <html lang="pt-br">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
