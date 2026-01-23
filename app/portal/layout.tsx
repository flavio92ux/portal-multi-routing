import type { Metadata } from 'next';
import './portal.css';

export const metadata: Metadata = {
  title: 'Portal',
  description: 'Site Portal',
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {/* A classe 'bg-primary' agora é o Azul definido no portal.css */}
      <body className="bg-slate-50 text-slate-900">
        <nav className="bg-secondary p-4 text-white shadow-lg">
          <span className="font-bold">Portal News</span>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
