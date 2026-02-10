import { Article } from '@/types/article';

export function mapVibraToCleanArticle(vibraData: any): Article {
  return {
    id: vibraData._id,
    metadata: {
      title: vibraData.route?.title || '',
      description: vibraData.route?.description || '',
      ogImage: vibraData.route?.image || '', // Exemplo de caminho
    },
    content: {
      headline: vibraData.route?.title, // Na Vibra o título principal costuma estar aqui
      author: vibraData.author?.name || 'Redação Band',
      publishedAt: vibraData.created_at,
      // Simulando a extração do corpo que no Angular vem em blocos de config
      body: (vibraData.route?.map?.template?.config?.order || [])
        .filter((item: any) => item.data?.component === 'text')
        .map((item: any) => ({
          type: 'paragraph',
          content: item.data?.content || '',
        })),
    },
  };
}
