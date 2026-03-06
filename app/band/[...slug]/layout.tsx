import { getPageData } from '@/services/api';
import { ThemeWrapper } from '@/components/templates/ThemeWrapper';
import { BandHeader } from '@/components/templates/header/BandHeader';
import { notFound } from 'next/navigation';
import { isValidArticleSlug } from '@/lib/url';
import { mapVibraToCleanArticle } from '@/lib/mappers/vibraMapper';
import { mapVibraToHeaderData } from '@/lib/mappers/menuMapper';
import { Article } from '@/types/article';
import { BandFooter } from '@/components/templates/footer/BandFooter';

export const revalidate = 60;

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
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
  const headerData = mapVibraToHeaderData(dataRaw);

  if (!articleData || !articleData.metadata || !articleData.metadata.theme) {
    return notFound();
  }

  const theme = articleData.metadata.theme;
  return (
    <ThemeWrapper theme={theme}>
      <BandHeader headerData={headerData} />
      {children}
      <BandFooter />
    </ThemeWrapper>
  );
}
