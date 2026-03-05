import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { ArticleRaw } from '@/types/article-raw';

const REVALIDATE_60S = 60;

// Cache entre requests (persiste 60s no servidor)
const _getPageData = unstable_cache(
  async (path: string): Promise<ArticleRaw | null> => {
    // Chama o proxy interno para evitar erro de certificado SSL na Vercel
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const URL_FETCH = `${baseUrl}/api/vibra/v1/BandArticle/${path}`;

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
  { revalidate: REVALIDATE_60S }
);

// Deduplica chamadas simultâneas dentro do mesmo render (layout.tsx + page.tsx)
export const getPageData = cache(_getPageData);
