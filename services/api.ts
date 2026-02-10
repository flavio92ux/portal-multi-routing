export async function getPageData(path: string) {
  const URL_FETCH = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandArticle/${path}`;

  const response = await fetch(URL_FETCH, { next: { revalidate: 60 } });

  if (!response.ok) return null;

  const json = await response.json();

  return json;
}
