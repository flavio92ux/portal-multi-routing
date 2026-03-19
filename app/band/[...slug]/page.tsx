import { notFound } from 'next/navigation';
import { getPageData, getVideoPageData } from '@/services/api';
import ArticlePage from '@/components/templates/article/ArticlePage';
import VideoPage from '@/components/templates/video/VideoPage';
import { isValidArticleSlug } from '@/lib/url';
import {
  mapVibraToCleanArticle,
  mapVibraToCleanVideoArticle,
} from '@/lib/mappers/vibraMapper';
import { Article } from '@/types/article';

export const revalidate = false;

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

/**
 * Checks if the URL path contains '/videos/' segment
 */
function isVideoUrl(path: string): boolean {
  return path.includes('/videos/');
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const resolvedParams = await params;

  const path = resolvedParams.slug.join('/');

  let articleData: Article;
  const isArticle = isValidArticleSlug(path);
  const isVideo = isVideoUrl(path);

  if (!isArticle) {
    return notFound();
  }

  // Handle video URLs
  if (isVideo) {
    const dataRaw = await getVideoPageData(path);

    if (!dataRaw) {
      return notFound();
    }

    articleData = mapVibraToCleanVideoArticle(dataRaw);
  } else {
    // Handle article URLs
    const dataRaw = await getPageData(path);

    if (!dataRaw) {
      return notFound();
    }

    articleData = mapVibraToCleanArticle(dataRaw);
  }

  if (!articleData || !articleData.metadata || !articleData.metadata.type) {
    return notFound();
  }

  switch (articleData.metadata.type) {
    case 'video':
      return <VideoPage data={articleData} />;
    case 'article':
      return <ArticlePage data={articleData} />;
    default:
      return <p>Nao encontrado</p>;
  }
}
