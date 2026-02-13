import { mapVibraToCleanArticle } from '@/lib/mappers/vibraMapper';
import { Article } from '@/types/article';

export async function getPageData(path: string): Promise<Article | null> {
  const URL_FETCH = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandArticle/${path}`;

  try {
    const response = await fetch(URL_FETCH, { next: { revalidate: 60 } });

    if (!response.ok) {
      console.error('[API ERROR] Fetch failed', {
        status: response.status,
        statusText: response.statusText,
        url: URL_FETCH,
        path,
      });
      return null;
    }

    const rawData = await response.json();
    return mapVibraToCleanArticle(rawData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[API ERROR] Failed to fetch page data', {
      error: errorMessage,
      url: URL_FETCH,
      path,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}
