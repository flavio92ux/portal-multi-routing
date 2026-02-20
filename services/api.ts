import * as Sentry from '@sentry/nextjs';

export async function getPageData(path: string): Promise<any> {
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

      Sentry.captureException(
        new Error(
          `API Fetch Failed: ${response.status} ${response.statusText}`
        ),
        {
          contexts: {
            api: errorContext,
          },
        }
      );

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

    Sentry.captureException(error, {
      contexts: {
        api: errorContext,
      },
    });

    return null;
  }
}
