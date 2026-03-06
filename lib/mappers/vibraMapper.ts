import { Article } from '@/types/article';
import { htmlToBlocks } from '@/utils/htmlToBlocks';
import { slugify } from '@/utils/slugify';
import { ArticleRaw } from '@/types/article-raw';

export function mapVibraToCleanArticle(vibraData: ArticleRaw): Article {
  const data = vibraData?.config?.order?.data ?? {};
  const seo = vibraData?.config?.seo ?? {};
  const cssPrimaryColorByTheme =
    vibraData?.route?.map?.template?.config?.theme?.css[0]?.value ?? '';

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
        id: slugify(data.redactor || 'autor'),
        name: data.redactor,
        role: 'Redação',
        avatar: null,
        twitter: null,
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
      related: [],
    },
  };
}
