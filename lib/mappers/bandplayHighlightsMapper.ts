export interface BandplayBannerItem {
  id: string;
  title: string;
  description: string;
  logo: string;
  image: string;
  cta_text: string;
  cta_link: string;
}

interface BandplayHighlightApiItem {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    urlCrop?: string;
    urlStr?: string;
  };
  more: {
    link: string;
    title: string;
  };
}

interface BandplayHighlightsApiResponse {
  total: number;
  items: BandplayHighlightApiItem[];
}

const BANDPLAY_LOGO = 'https://img.band.com.br/image/2024/01/31/bandplay-logo-171516.png';

export function mapBandplayHighlightsToBanner(
  apiResponse: BandplayHighlightsApiResponse
): BandplayBannerItem[] {
  if (!apiResponse?.items || !Array.isArray(apiResponse.items)) {
    return [];
  }

  return apiResponse.items.map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    logo: BANDPLAY_LOGO,
    image: item.image?.urlStr || item.image?.urlCrop || item.image?.url || '',
    cta_text: item.more?.title?.toUpperCase() || 'ASSISTA',
    cta_link: item.more?.link || '#',
  }));
}
