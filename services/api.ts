import { mapVibraToCleanArticle } from '@/lib/mappers/vibraMapper';
import { Article } from '@/types/article';

export async function getPageData(path: string): Promise<Article | null> {
  const URL_FETCH = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandArticle/${path}`;

  const response = await fetch(URL_FETCH, { next: { revalidate: 60 } });

  if (!response.ok) return null;

  const rawData = await response.json();

  return mapVibraToCleanArticle(rawData);
}
