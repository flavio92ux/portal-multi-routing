import { notFound } from 'next/navigation';
import { getPageData } from '@/services/api';
import ArticlePage from '@/components/templates/article/ArticlePage';
import { isValidArticleSlug } from '@/lib/url';
import { mapVibraToCleanArticle } from '@/lib/mappers/vibraMapper';
import { Article } from '@/types/article';

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default async function SlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const resolvedParams = await params;

  const path = resolvedParams.slug.join('/');

  let dataRaw;
  const isArticle = isValidArticleSlug(path);

  if (isArticle === true) {
    dataRaw = await getPageData(path);

    if (!dataRaw) {
      return notFound();
    }
  } else {
    return notFound();
  }

  const articleData: Article = mapVibraToCleanArticle(dataRaw);

  if (!articleData || !articleData.metadata || !articleData.metadata.type) {
    return notFound();
  }

  switch (articleData.metadata.type) {
    case 'article':
      return <ArticlePage data={articleData} />;
    default:
      return <p>Não encontrado</p>;
  }
}
