import { Article, RelatedVideoItem } from '@/types/article';
import { htmlToBlocks } from '@/utils/htmlToBlocks';
import { slugify } from '@/utils/slugify';
import { ArticleRaw, VideoRaw } from '@/types/article-raw';

export function mapVibraToCleanArticle(vibraData: ArticleRaw): Article {
  const data = vibraData?.config?.order?.data ?? {};
  const seo = vibraData?.config?.seo ?? {};
  const cssPrimaryColorByTheme =
    vibraData?.route?.map?.template?.config?.theme?.css[0]?.value ?? '';

  const author = data.author && data.author.length > 0 ? data.author[0] : null;

  return {
    id: vibraData.id ?? vibraData._id,
    metadata: {
      type: 'article',
      title: seo.title || data.title,
      description: seo.description || data.subTitle,
      canonical: vibraData.url
        ? `https://www.band.com.br/${vibraData.url}`
        : undefined,
      keywords: (data.tags || []).map((t: any) => t.name),
      og_image: seo.image?.url || data.image?.url,
      theme: {
        primary: cssPrimaryColorByTheme,
      },
    },
    content: {
      slug: slugify(data.title),
      kicker: data.editorias?.[0]?.name?.toUpperCase(),
      headline: seo.title || data.title,
      subheadline: data.subTitle,
      author: {
        id: slugify(data.redactor || author?.name || 'autor'),
        name: data.redactor || author?.name || 'Por Redação',
        role: 'Redação',
        avatar: author?.image?.urlCrop || null,
      },
      dates: {
        published_at: vibraData.createdAt,
        updated_at: vibraData.updatedAt,
      },
      media: data.image
        ? {
            main: {
              type: 'image',
              url: data.image.url,
              url_webp: seo.image?.urlStr || data.image.url,
              alt: data.image.title,
              caption: data.image.title,
              credit: data.image.credit,
            },
          }
        : undefined,
      body: htmlToBlocks(data.text) || [],
      textEmbed: data.textEmbed || undefined,
      tags: (data.tags || []).map((tag: any) => ({
        label: tag.name,
        slug: slugify(tag.name),
      })),
      related: (data.relatedNews || []).map((news: any) => ({
        id: news._id,
        title: news.config?.order?.data?.title || '',
        href: news.url ? `/${news.url}` : '#',
      image: news.config?.order?.data?.image?.url || '',
    })),
  };
}

export function mapVibraToCleanVideoArticle(vibraData: VideoRaw): Article {
  const data = vibraData?.config?.order?.data ?? {};
  const seo = vibraData?.config?.seo ?? {};
  const cssPrimaryColorByTheme =
    vibraData?.route?.map?.template?.config?.theme?.css[0]?.value ?? '';

  const videoData = data.video ?? {};

  return {
    id: vibraData.id ?? vibraData._id,
    metadata: {
      type: 'video',
      title: seo.title || videoData.title || data.title,
      description: seo.description || data.description,
      canonical: vibraData.url
        ? `https://www.band.com.br/${vibraData.url}`
        : undefined,
      keywords: (data.tags || []).map((t: any) => t.name),
      og_image: seo.image?.url || videoData.assets?.thumbnail,
      theme: {
        primary: cssPrimaryColorByTheme,
      },
    },
    content: {
      slug: slugify(data.title || videoData.title),
      headline: seo.title || videoData.title || data.title,
      subheadline: data.description,
      author: {
        id: 'redacao',
        name: 'Por Redacao',
        role: 'Redacao',
        avatar: null,
      },
      dates: {
        published_at: vibraData.createdAt,
        updated_at: vibraData.updatedAt,
      },
      body: [],
      tags: (data.tags || []).map((tag: any) => ({
        label: tag.name,
        slug: slugify(tag.name),
      })),
      related: [],
    },
    videoContent: {
      slug: slugify(data.title || videoData.title),
      headline: videoData.title || data.title,
      description: data.description,
      dates: {
        published_at: vibraData.createdAt,
        updated_at: vibraData.updatedAt,
      },
      video: {
        videoId: videoData.videoId,
        title: videoData.title,
        duration: videoData.duration || videoData.source?.duration,
        thumbnail: videoData.assets?.thumbnail || videoData.assets?.thumbPreview50,
        player: videoData.assets?.player,
        iframe: videoData.assets?.iframe,
        hls: videoData.assets?.hls,
        mp4: videoData.assets?.mp4,
      },
      tags: (data.tags || []).map((tag: any) => ({
        label: tag.name,
        slug: slugify(tag.name),
      })),
      relatedVideos: [],
    },
  };
}

export function mapApiRelatedVideos(data: any[]): RelatedVideoItem[] {
  return (data || []).map((item: any) => {
    const videoData = item?.config?.order?.data ?? {};
    const video = videoData.video ?? {};
    return {
      id: item._id || item.id,
      title: video.title || videoData.title,
      href: item.url ? `/${item.url}` : '#',
      thumb: video.assets?.thumbnail || video.assets?.thumbPreview25 || '',
      date: item.createdAt,
      duration: video.duration || video.source?.duration,
    };
  });
}
