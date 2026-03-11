import { notFound } from 'next/navigation';
import { getPageData } from '@/services/api';
import ArticlePage from '@/components/templates/article/ArticlePage';
import { isValidArticleSlug } from '@/lib/url';
import { mapVibraToCleanArticle } from '@/lib/mappers/vibraMapper';
import { Article } from '@/types/article';

export const revalidate = false;

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

  console.log(dataRaw)
}
