import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { ArticleRaw } from '@/types/article-raw';
import { getArticleType } from '@/utils/getArticleType';
import { getHostname, isReceitas } from '@/utils/host';
import { buildEndpoint } from '@/utils/endpoint';

// Nota: unstable_cache inclui automaticamente os args da função (path) na chave de cache
const _getPageData = unstable_cache(
  async (path: string, hostname?: string): Promise<ArticleRaw | null> => {
    console.log('url base', process.env.PROXY_VIBRA_ELASTIC);

    const articleType = getArticleType(path);

    if (!articleType) {
      console.error('[API ERROR] Invalid article type for path', { path });
      return null;
    }

    const URL_FETCH = buildEndpoint(
      process.env.PROXY_VIBRA_ELASTIC!,
      path,
      articleType,
      isReceitas(hostname)
    );

    console.log('url fetch', URL_FETCH);

    try {
      const response = await fetch(URL_FETCH);

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

      console.log('[cache miss] getPageData:', path);

      return rawData;
    } catch (error) {
      console.error('[API ERROR] Failed to fetch page data', {
        error: error instanceof Error ? error.message : String(error),
        url: URL_FETCH,
        path,
      });
      return null;
    }
  },
  ['page-data'],
  { revalidate: false }
);

// Deduplica chamadas simultâneas dentro do mesmo render (layout.tsx + page.tsx)
export const getPageData = cache(async (path: string) => {
  const hostname = await getHostname();

  return _getPageData(path, hostname);
});