export default function ArticlePage({ data }: { data: any }) {
  const { content } = data;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Categoria/Kicker */}
      <span className="text-red-600 font-bold text-sm tracking-widest uppercase">
        {content.kicker}
      </span>

      <h1 className="text-5xl font-extrabold leading-tight mt-2 mb-4">
        {content.headline}
      </h1>

      <p className="text-xl text-gray-500 mb-8 leading-relaxed">
        {content.subheadline}
      </p>

      {/* Info do Autor e Datas */}
      <div className="flex items-center border-y border-gray-100 py-6 mb-8">
        <img src={content.author.avatar} alt={content.author.name} className="w-12 h-12 rounded-full mr-4" />
        <div className="text-sm">
          <p className="font-bold text-gray-900">{content.author.name}</p>
          <p className="text-gray-500">
            {new Date(content.dates.published_at).toLocaleDateString('pt-BR')} às {new Date(content.dates.published_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
      </div>

      {/* Imagem Principal */}
      <figure className="mb-10">
        <img src={content.media.main.url} alt={content.media.main.alt} className="w-full h-auto object-cover" />
        <figcaption className="text-xs text-gray-400 mt-2 italic">
          {content.media.main.caption} — Foto: {content.media.main.credit}
        </figcaption>
      </figure>

      {/* Renderizador de Blocos do Body */}
      <div className="prose prose-lg prose-red max-w-none">
        {content.body.map((block: any, idx: number) => {
          switch (block.type) {
            case 'paragraph': return <p key={idx}>{block.content}</p>;
            case 'heading': return <h2 key={idx} className="text-3xl font-bold mt-8">{block.content}</h2>;
            case 'quote': return (
              <blockquote key={idx} className="border-l-4 border-red-500 pl-4 italic my-8">
                <p className="text-2xl">"{block.content}"</p>
                <cite className="text-sm block mt-2">— {block.author}</cite>
              </blockquote>
            );
            case 'image': return (
              <figure key={idx} className="my-8">
                <img src={block.url} alt={block.alt} className="w-full" />
                <figcaption className="text-center text-sm text-gray-500 mt-2">{block.caption}</figcaption>
              </figure>
            );
            default: return null;
          }
        })}
      </div>

      {/* Tags e Relacionadas podem vir aqui abaixo */}
    </article>
  );
}