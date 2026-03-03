import { ArticleRaw } from '@/types/article-raw';

export async function getPageData(path: string): Promise<ArticleRaw | null> {
  const URL_FETCH = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandArticle/${path}`;

  try {
    const response = await fetch(URL_FETCH, { next: { revalidate: 60 } });

    if (!response.ok) {
      const errorContext = {
        status: response.status,
        statusText: response.statusText,
        url: URL_FETCH,
        path,
      };

      console.error('[API ERROR] Fetch failed', errorContext);

      return null;
    }

    const rawData = await response.json();

    return rawData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorContext = {
      error: errorMessage,
      url: URL_FETCH,
      path,
    };

    console.error('[API ERROR] Failed to fetch page data', errorContext);

    return null;
  }
}
