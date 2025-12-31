// src/components/templates/CategoryPage.tsx

interface CategoryProps {
  data: any; // Em produção, use interfaces TypeScript rigorosas
}

export default function CategoryPage({ data }: CategoryProps) {
  const { content } = data;

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Barra de Sub-editorias */}
      <nav className="flex gap-4 border-b border-gray-200 mb-8 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {content.subcategories.map((sub: any) => (
          <a key={sub.url} href={sub.url} className="text-sm font-bold uppercase hover:text-red-600 transition">
            {sub.label}
          </a>
        ))}
      </nav>

      <h1 className="text-4xl font-black mb-10 uppercase tracking-tighter italic">
        {content.name}
      </h1>

      <div className="grid grid-cols-12 gap-8">
        
        {/* BLOCO DESTAQUE (HERO) - 8 Colunas */}
        <section className="col-span-12 lg:col-span-8">
          <a href={content.hero.url} className="group">
            <div className="relative aspect-video overflow-hidden rounded-sm bg-gray-100 mb-4">
              <img 
                src={content.hero.image} 
                alt={content.hero.headline}
                className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1">
                {content.hero.kicker}
              </span>
            </div>
            <h2 className="text-4xl font-bold group-hover:underline decoration-red-600 underline-offset-4">
              {content.hero.headline}
            </h2>
            <p className="text-gray-600 mt-3 text-lg leading-relaxed">
              {content.hero.summary}
            </p>
          </a>

          {/* Grid Secundário abaixo do Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 border-t pt-8">
            {content.secondary_grid.map((item: any) => (
              <a key={item.id} href={item.url} className="group">
                <div className="aspect-[16/9] overflow-hidden rounded-sm bg-gray-100 mb-3">
                  <img src={item.image} className="object-cover w-full h-full group-hover:opacity-90 transition" alt="" />
                </div>
                <span className="text-red-600 text-xs font-bold uppercase">{item.kicker}</span>
                <h3 className="text-xl font-bold leading-tight group-hover:text-gray-700">{item.headline}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* SIDEBAR - 4 Colunas */}
        <aside className="col-span-12 lg:col-span-4 border-l border-gray-100 pl-0 lg:pl-8">
          <div className="sticky top-4">
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <span className="w-2 h-2 bg-red-600 mr-2"></span>
              ÚLTIMAS NOTÍCIAS
            </h3>
            <div className="space-y-6">
              {content.latest_news.map((news: any) => (
                <a key={news.id} href={news.url} className="block group border-b border-gray-50 pb-4 last:border-0">
                  <span className="text-xs text-gray-400 font-mono">{news.time}</span>
                  <h4 className="font-semibold text-md leading-snug group-hover:text-red-600 transition mt-1">
                    {news.title}
                  </h4>
                </a>
              ))}
            </div>
            
            {/* Widget de Newsletter Simulado */}
            <div className="mt-12 bg-gray-900 text-white p-6 rounded-sm text-center">
              <h4 className="font-bold text-lg mb-2">Fique por dentro</h4>
              <p className="text-sm text-gray-400 mb-4">Receba os destaques de {content.name} no seu e-mail.</p>
              <button className="w-full bg-red-600 py-2 font-bold uppercase text-xs hover:bg-red-700 transition">Assinar</button>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}