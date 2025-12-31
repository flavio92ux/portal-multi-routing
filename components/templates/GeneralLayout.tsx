// src/components/templates/GeneralLayout.tsx
export default function GeneralLayout({ children, data }: { children?: React.ReactNode, data?: any }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto font-bold text-xl">PORTAL DE NOTÍCIAS</div>
      </nav>
      
      <main className="flex-grow container mx-auto p-4">
        {children || (
           <div>
             <h1 className="text-2xl mb-4">{data?.metadata.title}</h1>
             <p>Página genérica ou institucional.</p>
           </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white p-8 mt-12 text-center">
        © 2025 Portal de Notícias - Todos os direitos reservados.
      </footer>
    </div>
  );
}