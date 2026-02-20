import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Band - Portal de Noticias',
  description: 'Portal de noticias Band - Jornalismo, Esportes, Entretenimento e mais.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
