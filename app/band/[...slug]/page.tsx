import { notFound } from 'next/navigation';
import { getPageData } from '@/services/api';
import ArticlePage from '@/components/templates/ArticlePage';
import CategoryPage from '@/components/templates/CategoryPage';
import GeneralLayout from '@/components/templates/GeneralLayout';
import { isValidArticleSlug } from '@/lib/url';

export default async function SlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const resolvedParams = await params;

  const path = resolvedParams.slug.join('/');

  let data;
  const isArticle = isValidArticleSlug(path);

  if (isArticle === true) {
    data = await getPageData(path);
  }

  if (!data || !data.metadata || !data.metadata.type) {
    return notFound();
  }

  const stringfyded = JSON.stringify(data);

  return <p>Não encontrado</p>;

  // switch (data.metadata.type) {
  //   case 'article':
  //     return <ArticlePage data={data} />;
  //   case 'category':
  //     return <CategoryPage data={data} />;
  //   default:
  //     return <p>Não encontrado</p>;
  // }
}
