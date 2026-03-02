export interface RelatedVideoItem {
  id: string;
  title: string;
  date: string;
  thumb: string;
  href: string;
}

interface VideoApiItem {
  _id: string;
  createdAt: string;
  url: string;
  config: {
    order: {
      data: {
        title: string;
        description: string;
        video: {
          videoId: string;
          title: string;
          duration: number;
          assets: {
            thumbnail: string;
            thumbPreview25?: string;
            thumbPreview50?: string;
            thumbPreview75?: string;
          };
        };
      };
    };
  };
}

interface RelatedVideosApiResponse {
  total: number;
  items: VideoApiItem[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

export function mapRelatedVideosToItems(
  apiResponse: RelatedVideosApiResponse
): RelatedVideoItem[] {
  if (!apiResponse?.items || !Array.isArray(apiResponse.items)) {
    return [];
  }

  return apiResponse.items.map((item) => {
    const videoData = item.config?.order?.data;
    const videoAssets = videoData?.video?.assets;

    return {
      id: item._id,
      title: videoData?.title || videoData?.video?.title || '',
      date: formatDate(item.createdAt),
      thumb:
        videoAssets?.thumbnail ||
        videoAssets?.thumbPreview50 ||
        videoAssets?.thumbPreview25 ||
        '',
      href: item.url ? `/${item.url}` : '#',
    };
  });
}
