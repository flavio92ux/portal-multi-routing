import type { Metadata } from 'next';
import './politica.css';

export const metadata: Metadata = {
  title: 'Política',
  description: 'Site Política',
};

export default function PoliticaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
