export default function ArticlePage({ data }: { data: any }) {
  const { content } = data;

  if (!content) return null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      {/* Categoria/Kicker */}
      {content.kicker && (
        <span className="text-primary text-sm font-bold tracking-widest uppercase">
          {content.kicker}
        </span>
      )}

      <h1 className="mt-2 mb-4 text-5xl leading-tight font-extrabold">
        {content.headline}
      </h1>

      {content.subheadline && (
        <p className="mb-8 text-xl leading-relaxed text-gray-500">
          {content.subheadline}
        </p>
      )}

      {/* Info do Autor e Datas */}
      {content.author && (
        <div className="mb-8 flex items-center border-y border-gray-100 py-6">
          {content.author.avatar && (
            <img
              src={content.author.avatar}
              alt={content.author.name}
              className="mr-4 h-12 w-12 rounded-full"
            />
          )}
          <div className="text-sm">
            <p className="font-bold text-gray-900">{content.author.name}</p>
            {content.dates?.published_at && (
              <p className="text-gray-500">
                {new Date(content.dates.published_at).toLocaleDateString(
                  'pt-BR'
                )}{' '}
                às{' '}
                {new Date(content.dates.published_at).toLocaleTimeString(
                  'pt-BR',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Imagem Principal */}
      {content.media?.main && (
        <figure className="mb-10">
          <img
            src={content.media.main.url}
            alt={content.media.main.alt || ''}
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-2 text-xs text-gray-400 italic">
            {content.media.main.caption}
            {content.media.main.credit &&
              ` — Foto: ${content.media.main.credit}`}
          </figcaption>
        </figure>
      )}

      {/* Renderizador de Blocos do Body */}
      {Array.isArray(content.body) && content.body.length > 0 && (
        <div className="prose prose-lg prose-red max-w-none">
          {content.body.map((block: any, idx: number) => {
            switch (block.type) {
              case 'paragraph':
                return <p key={idx}>{block.content}</p>;
              case 'heading':
                return (
                  <h2 key={idx} className="mt-8 text-3xl font-bold">
                    {block.content}
                  </h2>
                );
              case 'quote':
                return (
                  <blockquote
                    key={idx}
                    className="my-8 border-l-4 border-red-500 pl-4 italic"
                  >
                    <p className="text-2xl">"{block.content}"</p>
                    {block.author && (
                      <cite className="mt-2 block text-sm">
                        — {block.author}
                      </cite>
                    )}
                  </blockquote>
                );
              case 'image':
                return (
                  <figure key={idx} className="my-8">
                    <img
                      src={block.url}
                      alt={block.alt || ''}
                      className="w-full"
                    />
                    {block.caption && (
                      <figcaption className="mt-2 text-center text-sm text-gray-500">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              default:
                return null;
            }
          })}
        </div>
      )}

      {/* Tags e Relacionadas podem vir aqui abaixo */}
    </article>
  );
}
