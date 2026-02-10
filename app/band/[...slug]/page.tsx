import { notFound } from 'next/navigation';
import { getPageData } from '@/services/api';
import ArticlePage from '@/components/templates/ArticlePage';
import CategoryPage from '@/components/templates/CategoryPage';
import GeneralLayout from '@/components/templates/GeneralLayout';
import { isArticleUrl } from '@/lib/url';

export default async function SlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const resolvedParams = await params;

  const path = resolvedParams.slug.join('/');

  let data;

  if (isArticleUrl(path)) {
    data = await getPageData(path);
  }

  if (!data || !data.type) {
    return notFound();
  }

  switch (data.type) {
    case 'article':
      return <ArticlePage data={data} />;
    case 'category':
      return <CategoryPage data={data} />;
    default:
      return <GeneralLayout data={data} />;
  }
}
