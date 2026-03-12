import { getPageData } from '@/services/api';
import { ThemeWrapper } from '@/components/templates/ThemeWrapper';
import { BandHeader } from '@/components/templates/header/BandHeader';
import { notFound } from 'next/navigation';
import { isValidArticleSlug } from '@/lib/url';
import { mapVibraToCleanArticle, mapVibraToCleanRecipe } from '@/lib/mappers/vibraMapper';
import { mapVibraToHeaderData } from '@/lib/mappers/menuMapper';
import { Article } from '@/types/article';
import { BandFooter } from '@/components/templates/footer/BandFooter';
import { getArticleType } from '@/utils/getArticleType';
import { ArticleRaw } from '@/types/article-raw';
import { Recipe, RecipeRaw } from '@/types/recipe';
import { ReceitasFooter } from '@/components/templates/footer/ReceitasFooter';

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
  let theme;
  const isArticle = isValidArticleSlug(path);
  const articleType = getArticleType(path);

  if (!articleType) {
    return notFound();
  }

  if (isArticle === true) {
    dataRaw = await getPageData(path);

    if (!dataRaw) {
      return notFound();
    }
  } else {
    return notFound();
  }

  switch (articleType) {
    case 'BandArticle': {
      const articleData: Article = mapVibraToCleanArticle(dataRaw as ArticleRaw);
      theme = articleData.metadata.theme;
      break;
    }
    case 'BandReceitas': {
      const recipeData: Recipe = mapVibraToCleanRecipe(dataRaw as RecipeRaw);
      theme = recipeData.metadata.theme;
      break;
    }
    default: {
      return notFound();
    }
  }

  return (
    <ThemeWrapper theme={theme}>
      {/* <BandHeader headerData={headerData} /> */}
      <>{children}</>
      <ReceitasFooter />
    // </ThemeWrapper>
  );
}
