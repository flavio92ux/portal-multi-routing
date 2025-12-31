import { notFound } from 'next/navigation';
import { getPageData } from '@/services/api';
import ArticlePage from '@/components/templates/ArticlePage';
import CategoryPage from '@/components/templates/CategoryPage';
import GeneralLayout from '@/components/templates/GeneralLayout';

export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;

  const path = resolvedParams.slug.join('/');
  const data = await getPageData(path);

  if (!data) return notFound();

  switch (data.metadata.type) {
    case 'article':
      return <ArticlePage data={data} />;
    case 'category':
      return <CategoryPage data={data} />;
    default:
      return <GeneralLayout data={data} />;
  }
}