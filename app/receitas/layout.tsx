import type { Metadata } from "next";
import "./receitas.css";

export const metadata: Metadata = {
  title: "Receitas",
  description: "Site Receitas",
};

export default function ReceitasLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      {/* A classe 'bg-primary' agora é o Verde definido no receitas.css */}
      <body className="bg-orange-50 text-orange-950">
        <nav className="bg-primary p-4 text-white shadow-md">
          <span className="font-bold">Minhas Receitas</span>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
