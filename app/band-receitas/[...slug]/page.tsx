import { notFound } from 'next/navigation';
import { getPageData } from '@/services/api';
import ArticlePage from '@/components/templates/article/ArticlePage';
import { isValidArticleSlug } from '@/lib/url';
import { mapVibraToCleanArticle, mapVibraToCleanRecipe } from '@/lib/mappers/vibraMapper';
import { Article } from '@/types/article';
import { getArticleType } from '@/utils/getArticleType';
import { ArticleRaw } from '@/types/article-raw';
import { Recipe, RecipeRaw } from '@/types/recipe';

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
      return <ArticlePage data={articleData} />;
    }
    case 'BandReceitas': {
      const recipeData: Recipe = mapVibraToCleanRecipe(dataRaw as RecipeRaw);
      return (
        <pre>
          {JSON.stringify(recipeData, null, 2)}
        </pre>
      )
    }
    default:
      return notFound();
  }

}
