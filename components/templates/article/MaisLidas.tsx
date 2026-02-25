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
    title: 'Suspensao de direitos: 14 razoes que o voto de 900 desembargadores em Juiz de Fora',
    href: '#',
    thumb: 'https://placehold.co/220x140/1a365d/ffffff?text=1',
  },
  {
    id: 2,
    title: 'Reclassificacao pos reforma legislativa que afeta o mercado estudantil',
    href: '#',
  },
  {
    id: 3,
    title: 'Brasil Pra La e Pra Ca: O que se esta mais a dominar hoje',
    href: '#',
  },
  {
    id: 4,
    title: 'Vitoria conseguiu reter tres jovens grandes artistas estrangeiros',
    href: '#',
  },
];

export function MaisLidas() {
  return (
    <div className="w-full">
      <div className="bg-primary px-3 py-1.5">
        <h3 className="text-[13px] font-bold text-white">Mais Lidas</h3>
      </div>

      {/* Featured image for first item */}
      {maisLidasMock[0]?.thumb && (
        <Link href={maisLidasMock[0].href} className="block no-underline">
          <img
            src={maisLidasMock[0].thumb}
            alt={maisLidasMock[0].title}
            className="h-32 w-full object-cover"
          />
        </Link>
      )}

      <ol className="mt-0 divide-y divide-[#eaeaea]">
        {maisLidasMock.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-start gap-2 px-2 py-2.5 no-underline transition-colors hover:bg-[#f5f5f5]"
            >
              <span className="text-[11px] leading-snug text-[#3c444e]">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
