import { ArticleBlock } from './article-blocks';

export type Article = {
  id: string;
  type: 'article' | 'category' | 'home';
  slug: string;
  url: string;

  seo: ArticleSEO;

  header: ArticleHeader;

  cover?: ArticleMedia;

  content: ArticleBlock[];

  tags?: ArticleTag[];

  related?: RelatedArticle[];
};

export type ArticleSEO = {
  title: string;
  description?: string;
  image?: string;
  robots?: string;
};

export type ArticleHeader = {
  editorial?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
};

export type ArticleMedia = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
  credit?: string;
};

export type ArticleTag = {
  label: string;
  slug: string;
};

export type RelatedArticle = {
  id: string;
  title: string;
  url: string;
  image?: string;
};
