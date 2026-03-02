import Link from 'next/link';
import { mapMaisLidasApiToComponent, type MaisLidasItem } from '@/lib/mapper';

const MAIS_LIDAS_API_URL =
  'https://apiconteudo.bs.vibra.digital/?query={ga4(dateRanges:[{startDate:"yesterday",endDate:"today"}],limit:5,channel:"noticias",domain:"band"){url pageTitle}}';

async function getMaisLidas(): Promise<MaisLidasItem[]> {
  try {
    const response = await fetch(MAIS_LIDAS_API_URL, {
      next: {
        revalidate: 86400, // 24 horas em segundos
      },
    });

    if (!response.ok) {
      console.error('Erro ao buscar mais lidas:', response.statusText);
      return [];
    }

    const data = await response.json();
    return mapMaisLidasApiToComponent(data);
  } catch (error) {
    console.error('Erro ao buscar mais lidas:', error);
    return [];
  }
}

export async function MaisLidas() {
  const maisLidasItems = await getMaisLidas();
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
        {maisLidasItems[0]?.thumb && (
          <Link
            href={maisLidasItems[0].href}
            className="relative block px-4 py-3 no-underline"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={maisLidasItems[0].thumb}
                alt={maisLidasItems[0].title}
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
          {maisLidasItems.map((item) => (
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
