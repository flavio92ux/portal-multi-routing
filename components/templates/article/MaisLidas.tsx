import Link from 'next/link';
import Image from 'next/image';
import { unstable_cache } from 'next/cache';
import {
  mapMaisLidasApiToComponent,
  type MaisLidasItem,
} from '@/lib/mappers/map-mais-lidas';
import { getChannel } from '@/utils/getChannel';

function buildMaisLidasUrl(channel: string): string {
  return `https://apiconteudo.bs.vibra.digital/?query={ga4(dateRanges:[{startDate:"yesterday",endDate:"today"}],limit:5,channel:"${channel}",domain:"band"){url pageTitle}}`;
}

const teste = 123;

console.log(teste);

const REVALIDATE_24H = 86400; // 24 horas em segundos

/**
 * Função unificada para buscar dados e thumb com cache único.
 * Isso garante que as duas APIs sejam tratadas como uma só entrada no cache.
 */
const getMaisLidasCompletas = unstable_cache(
  async (channel: string): Promise<MaisLidasItem[]> => {
    console.log(`--- [CACHE MISS] channel=${channel} ---`);

    try {
      // 1. Busca a lista das mais lidas para o channel
      const response = await fetch(buildMaisLidasUrl(channel));
      if (!response.ok) return [];

      const data = await response.json();
      const maisLidasItems = mapMaisLidasApiToComponent(data);

      // 2. Busca a thumb apenas para o primeiro item, se existir
      if (maisLidasItems.length > 0) {
        const path = maisLidasItems[0].href;

        const thumbUrl = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandArticle/${path}`;
        const thumbRes = await fetch(thumbUrl);

        if (thumbRes.ok) {
          const thumbData = await thumbRes.json();
          maisLidasItems[0].thumb =
            thumbData?.config?.order?.data?.image?.url || '';
        }
      }

      return maisLidasItems;
    } catch (error) {
      console.error('Erro ao processar Mais Lidas:', error);
      return [];
    }
  },
  ['mais-lidas-completa-sidebar'],
  { revalidate: REVALIDATE_24H }
);

export async function MaisLidas({ path }: { path: string }) {
  const channel = getChannel(path);
  const maisLidasItems = await getMaisLidasCompletas(channel);

  if (!maisLidasItems || maisLidasItems.length === 0) return null;

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
                className="h-40 w-full object-cover transition-transform hover:scale-105"
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
                <span
                  className={`font-caladea shrink-0 text-4xl leading-none font-bold ${
                    item.id === 1 ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  {item.id}
                </span>
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
