import Link from 'next/link';
import Image from 'next/image';
import { mapMaisLidasApiToComponent, type MaisLidasItem } from '@/lib/mapper';

const MAIS_LIDAS_API_URL =
  'https://apiconteudo.bs.vibra.digital/?query={ga4(dateRanges:[{startDate:"yesterday",endDate:"today"}],limit:5,channel:"noticias",domain:"band"){url pageTitle}}';

const REVALIDATE_24H = 86400; // 24 horas em segundos

async function getMaisLidas(): Promise<MaisLidasItem[]> {
  try {
    const response = await fetch(MAIS_LIDAS_API_URL, {
      next: { revalidate: REVALIDATE_24H },
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

async function getFirstMaisLidasThumb(path: string): Promise<string> {
  if (!path) return '';

  console.log("Buscando API...")

  const url = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandArticle/${path}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_24H },
    });

    if (!response.ok) return '';

    const data = await response.json();
    return data?.config?.order?.data?.image?.url || '';
  } catch {
    return '';
  }
}

export async function MaisLidas() {
  const maisLidasItems = await getMaisLidas();

  if (maisLidasItems.length > 0) {
    const urlFirst = maisLidasItems[0].href;
    const path = urlFirst.replace('https://www.band.com.br/', '');
    maisLidasItems[0].thumb = await getFirstMaisLidasThumb(path);
  }

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
              <Image
                src={maisLidasItems[0].thumb}
                alt={maisLidasItems[0].title}
                className="h-40 w-full object-cover"
                width={500}
                height={160}
              />
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
