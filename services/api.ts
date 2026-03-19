import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { ArticleRaw, VideoRaw } from '@/types/article-raw';

// Nota: unstable_cache inclui automaticamente os args da função (path) na chave de cache
const _getPageData = unstable_cache(
  async (path: string): Promise<ArticleRaw | null> => {
    console.log('url base', process.env.PROXY_VIBRA_ELASTIC);

    const URL_FETCH = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandArticle/${path}`;

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

// Deduplica chamadas simultaneas dentro do mesmo render (layout.tsx + page.tsx)
export const getPageData = cache(_getPageData);

// Video data fetching
const _getVideoPageData = unstable_cache(
  async (path: string): Promise<VideoRaw | null> => {
    const URL_FETCH = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandVideo/${path}`;

    console.log('[Video API] url fetch', URL_FETCH);

    try {
      const response = await fetch(URL_FETCH);

      if (!response.ok) {
        console.error('[Video API ERROR] Fetch failed', {
          status: response.status,
          statusText: response.statusText,
          url: URL_FETCH,
          path,
        });
        return null;
      }

      const rawData = await response.json();

      console.log('[cache miss] getVideoPageData:', path);

      return rawData;
    } catch (error) {
      console.error('[Video API ERROR] Failed to fetch video data', {
        error: error instanceof Error ? error.message : String(error),
        url: URL_FETCH,
        path,
      });
      return null;
    }
  },
  ['video-page-data'],
  { revalidate: false }
);

export const getVideoPageData = cache(_getVideoPageData);
