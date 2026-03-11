import { Article } from '@/types/article';
import { htmlToBlocks } from '@/utils/htmlToBlocks';
import { slugify } from '@/utils/slugify';
import { ArticleRaw } from '@/types/article-raw';
import { Recipe } from '@/types/recipe';

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
    },
  };
}

const mapVibraToCleanRecipe = (vibraData: ArticleRaw): Recipe => {
  const data = vibraData?.config?.order?.data ?? {};
  const seo = vibraData?.config?.seo ?? {};
  const cssPrimaryColorByTheme =
    vibraData?.route?.map?.template?.config?.theme?.css[0]?.value ?? '';

  return {
    id: vibraData.id ?? vibraData._id,
    metadata: {
      type: 'recipe',
      title: seo.title || data.title,
      description: seo.description || data.subTitle,
      canonical: vibraData.url
        ? `https://www.band.com.br/${vibraData.url}`
        : undefined,
      og_image: seo.image?.url || data.image?.url,
      theme: {
        primary: cssPrimaryColorByTheme,
      },
    },
    content: {
      slug: slugify(data.title),
      headline: seo.title || data.title,
      author: data.autor,
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
      recipe: {
        portions: data.porcao,
        preparation_time: data.tempo_de_preparo,
        difficulty: data.dificuldade,
        preparation: data.modo_preparo,
        parts: data.partes
      },

    },
  };

}

export { mapVibraToCleanRecipe }