import { Article } from '@/types/article';
import { htmlToBlocks } from '@/utils/htmlToBlocks';
import { slugify } from '@/utils/slugify';

export function mapVibraToCleanArticle(vibraData: any): Article {
  const data = vibraData.config.order.data;

  return {
    id: vibraData._id,
    type: 'article',
    slug: vibraData.url,
    url: `/${vibraData.url}`,

    seo: {
      title: vibraData.config.seo.title,
      description: vibraData.config.seo.description,
      image: vibraData.config.seo.image?.url,
      robots: vibraData.config.seo.robots,
    },

    header: {
      editorial: 'Band Minas',
      title: data.title,
      subtitle: data.subTitle,
      author: {
        name: data.redactor,
      },
      publishedAt: vibraData.createdAt,
      updatedAt: vibraData.updatedAt,
    },

    cover: {
      type: 'image',
      src: data.image?.url,
      alt: data.image?.title,
      credit: data.image?.credit,
    },

    content: htmlToBlocks(data.text),

    tags: data.tags?.map((tag: any) => ({
      label: tag.name,
      slug: slugify(tag.name),
    })),
  };
}
