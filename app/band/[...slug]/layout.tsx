import { getPageData } from '@/services/api';
import { ThemeWrapper } from '@/components/templates/ThemeWrapper';
import { notFound } from 'next/navigation';

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const data = await getPageData(slug.join('/'));

  if (!data || !data.metadata) {
    return notFound();
  }

  return <ThemeWrapper theme={data.metadata.theme}>{children}</ThemeWrapper>;
}
