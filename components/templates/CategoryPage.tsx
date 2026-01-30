// src/components/templates/CategoryPage.tsx

interface CategoryProps {
  data: any; // Em produção, use interfaces TypeScript rigorosas
}

export default function CategoryPage({ data }: CategoryProps) {
  const { content } = data;

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Barra de Sub-editorias */}
      <nav className="scrollbar-hide mb-8 flex gap-4 overflow-x-auto border-b border-gray-200 pb-2 whitespace-nowrap">
        {content.subcategories.map((sub: any) => (
          <a
            key={sub.url}
            href={sub.url}
            className="text-sm font-bold uppercase transition hover:text-red-600"
          >
            {sub.label}
          </a>
        ))}
      </nav>

      <h1 className="text-primary mb-10 text-4xl font-black tracking-tighter uppercase italic">
        {content.name}
      </h1>

      <div className="grid grid-cols-12 gap-8">
        {/* BLOCO DESTAQUE (HERO) - 8 Colunas */}
        <section className="col-span-12 lg:col-span-8">
          <a href={content.hero.url} className="group">
            <div className="relative mb-4 aspect-video overflow-hidden rounded-sm bg-gray-100">
              <img
                src={content.hero.image}
                alt={content.hero.headline}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-red-600 px-2 py-1 text-xs font-bold text-white">
                {content.hero.kicker}
              </span>
            </div>
            <h2 className="text-4xl font-bold decoration-red-600 underline-offset-4 group-hover:underline">
              {content.hero.headline}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-600">
              {content.hero.summary}
            </p>
          </a>

          {/* Grid Secundário abaixo do Hero */}
          <div className="mt-10 grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-2">
            {content.secondary_grid.map((item: any) => (
              <a key={item.id} href={item.url} className="group">
                <div className="mb-3 aspect-[16/9] overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src={item.image}
                    className="h-full w-full object-cover transition group-hover:opacity-90"
                    alt=""
                  />
                </div>
                <span className="text-xs font-bold text-red-600 uppercase">
                  {item.kicker}
                </span>
                <h3 className="text-xl leading-tight font-bold group-hover:text-gray-700">
                  {item.headline}
                </h3>
              </a>
            ))}
          </div>
        </section>

        {/* SIDEBAR - 4 Colunas */}
        <aside className="col-span-12 border-l border-gray-100 pl-0 lg:col-span-4 lg:pl-8">
          <div className="sticky top-4">
            <h3 className="mb-6 flex items-center text-lg font-bold">
              <span className="mr-2 h-2 w-2 bg-red-600"></span>
              ÚLTIMAS NOTÍCIAS
            </h3>
            <div className="space-y-6">
              {content.latest_news.map((news: any) => (
                <a
                  key={news.id}
                  href={news.url}
                  className="group block border-b border-gray-50 pb-4 last:border-0"
                >
                  <span className="font-mono text-xs text-gray-400">
                    {news.time}
                  </span>
                  <h4 className="text-md mt-1 leading-snug font-semibold transition group-hover:text-red-600">
                    {news.title}
                  </h4>
                </a>
              ))}
            </div>

            {/* Widget de Newsletter Simulado */}
            <div className="mt-12 rounded-sm bg-gray-900 p-6 text-center text-white">
              <h4 className="mb-2 text-lg font-bold">Fique por dentro</h4>
              <p className="mb-4 text-sm text-gray-400">
                Receba os destaques de {content.name} no seu e-mail.
              </p>
              <button className="w-full bg-red-600 py-2 text-xs font-bold uppercase transition hover:bg-red-700">
                Assinar
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
