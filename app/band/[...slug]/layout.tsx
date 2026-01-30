import { getPageData } from '@/services/api';
import { ThemeWrapper } from '@/components/templates/ThemeWrapper';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const headerList = await headers();
  const encodedData = headerList.get('x-page-data');

  if (encodedData) {
    const data = JSON.parse(Buffer.from(encodedData, 'base64').toString());

    console.log(data);
  }

  const { slug } = await params;
  const data = await getPageData(slug.join('/'));

  if (!data || !data.metadata) {
    return notFound();
  }

  return <ThemeWrapper theme={data.metadata.theme}>{children}</ThemeWrapper>;
}
