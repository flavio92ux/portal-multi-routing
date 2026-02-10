import { getPageData } from '@/services/api';
import { ThemeWrapper } from '@/components/templates/ThemeWrapper';
import { notFound } from 'next/navigation';
import { isValidArticleSlug } from '@/lib/url';

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const path = resolvedParams.slug.join('/');

  let data;
  const isArticle = isValidArticleSlug(path);

  if (isArticle === true) {
    data = await getPageData(path);
  }

  if (!data || !data.metadata || !data.metadata.theme) {
    return notFound();
  }

  const theme = data.metadata.theme;
  return <ThemeWrapper theme={theme}>{children}</ThemeWrapper>;
}
