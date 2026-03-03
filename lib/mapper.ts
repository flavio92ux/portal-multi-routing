// Tipos da API
interface GA4Item {
  url: string;
  pageTitle: string;
}

interface MaisLidasApiResponse {
  data: {
    ga4: GA4Item[];
  };
}

// Tipo do componente MaisLidas
export interface MaisLidasItem {
  id: number;
  title: string;
  href: string;
  thumb?: string;
}

/**
 * Converte a resposta da API do GA4 para o formato esperado pelo componente MaisLidas
 */
export function mapMaisLidasApiToComponent(
  apiResponse: MaisLidasApiResponse
): MaisLidasItem[] {
  if (!apiResponse?.data?.ga4 || !Array.isArray(apiResponse.data.ga4)) {
    return [];
  }

  return apiResponse.data.ga4.map((item, index) => ({
    id: index + 1,
    title: item.pageTitle,
    href: item.url && item.url.replace('https://www.band.com.br', ''),
    // A API não retorna thumb, então deixamos undefined
    thumb: undefined,
  }));
}
