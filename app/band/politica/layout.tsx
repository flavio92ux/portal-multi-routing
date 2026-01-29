import type { Metadata } from 'next';

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
