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
    title:
      'Policia do Reino Unido prende ex-principe Andrew, irmao de rei Charles III',
    href: '#',
    thumb:
      'https://img.band.com.br/image/2026/02/25/bombeiros-atuam-em-resgate-em-area-soterrada-de-juiz-de-fora-12928_300x168.jpg',
  },
  {
    id: 2,
    title:
      'Fim da escala 6x1: proposta de reducao de jornada pros abriu nas conversoes',
    href: '#',
  },
  {
    id: 3,
    title:
      'Video: Neres bloqueou zagueiros, invadiu a area adversa e cobrou de chegancamento',
    href: '#',
  },
  {
    id: 4,
    title:
      'Trio assassino que adolescente capaz de matar descrito "lamentavel e triste"',
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
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-t-primary border-t-10 px-4 py-3">
          <h3 className="text-primary text-[20px] leading-7 font-bold">
            Mais Lidas
          </h3>
        </div>

        {/* Featured image for first item */}
        {maisLidasMock[0]?.thumb && (
          <Link
            href={maisLidasMock[0].href}
            className="relative block px-4 py-3 no-underline"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={maisLidasMock[0].thumb}
                alt={maisLidasMock[0].title}
                className="h-40 w-full object-cover"
              />
              {/* Badge */}
              <div className="absolute top-3 left-3 rounded bg-slate-950 px-2 py-1">
                <span className="text-xs font-bold text-white">Arial</span>
              </div>
            </div>
          </Link>
        )}

        {/* Articles List */}
        <ol className="divide-y divide-gray-200">
          {maisLidasMock.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-start gap-4 px-4 py-4 no-underline transition-colors hover:bg-gray-50"
              >
                {/* Number */}
                <span
                  className={`font-caladea shrink-0 text-4xl leading-none font-bold ${
                    item.id === 1 ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  {item.id}
                </span>
                {/* Title */}
                <span className="text-sm leading-snug font-medium text-slate-950">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
