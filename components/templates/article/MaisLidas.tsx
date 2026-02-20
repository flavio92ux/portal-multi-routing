import Link from 'next/link';

interface MaisLidasItem {
  id: number;
  title: string;
  href: string;
  thumb?: string;
}

const maisLidasMock: MaisLidasItem[] = [
  {
    id: 1,
    title: 'Policia do Reino Unido prende ex-principe Andrew, irmao de rei Charles III',
    href: '#',
    thumb: 'https://placehold.co/300x200/1a365d/ffffff?text=1',
  },
  {
    id: 2,
    title: 'Fim da escala 6x1: proposta de reducao de jornada pros abriu nas conversoes',
    href: '#',
  },
  {
    id: 3,
    title: 'Video: Neres bloqueou zagueiros, invadiu a area adversa e cobrou de chegancamento',
    href: '#',
  },
  {
    id: 4,
    title: 'Trio assassino que adolescente capaz de matar descrito "lamentavel e triste"',
    href: '#',
  },
  {
    id: 5,
    title: 'STF abre acao contra Eduardo Bolsonaro por obstrucao de justica',
    href: '#',
  },
];

export function MaisLidas() {
  return (
    <aside className="w-full">
      <div className="bg-primary px-4 py-2">
        <h3 className="text-sm font-bold text-white">Mais Lidas</h3>
      </div>

      {/* Featured image for first item */}
      {maisLidasMock[0]?.thumb && (
        <Link href={maisLidasMock[0].href} className="block no-underline">
          <img
            src={maisLidasMock[0].thumb}
            alt={maisLidasMock[0].title}
            className="h-40 w-full object-cover"
          />
        </Link>
      )}

      <ol className="mt-0 divide-y divide-gray-100">
        {maisLidasMock.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-start gap-3 px-3 py-3 no-underline transition-colors hover:bg-gray-50"
            >
              <span className="text-lg font-bold text-primary">
                {item.id}
              </span>
              <span className="text-xs leading-snug text-foreground">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
