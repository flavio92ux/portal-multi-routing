/**
 * Root Article model
 * Representa o retorno final do mapper mapVibraArticleToExample
 */
export interface Article {
  id: string;

  metadata: ArticleMetadata;

  content: ArticleContent;
}

/* ============================================================
 * METADATA
 * ============================================================ */

export interface ArticleMetadata {
  type: 'article' | 'category' | 'home';

  title: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  og_image?: string;

  theme: ArticleTheme;
}

export interface ArticleTheme {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  card: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  input: string;
  border: string;
  ring: string;
  radius: string;
}

/* ============================================================
 * CONTENT
 * ============================================================ */

export interface ArticleContent {
  slug: string;
  kicker?: string;

  headline: string;
  subheadline?: string;

  author: ArticleAuthor;

  dates: ArticleDates;

  media?: ArticleMedia;

  body: ArticleBlock[];

  tags: ArticleTag[];

  related: RelatedArticle[];
}

/* ============================================================
 * AUTHOR
 * ============================================================ */

export interface ArticleAuthor {
  id: string;
  name: string;
  role?: string;
  avatar?: string | null;
  twitter?: string | null;
}

/* ============================================================
 * DATES
 * ============================================================ */

export interface ArticleDates {
  published_at: string; // ISO 8601
  updated_at?: string; // ISO 8601
}

/* ============================================================
 * MEDIA
 * ============================================================ */

export interface ArticleMedia {
  main: ArticleMediaItem;
}

export interface ArticleMediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  caption?: string;
  credit?: string;
}

/* ============================================================
 * BODY BLOCKS
 * ============================================================ */

export type ArticleBlock =
  | ParagraphBlock
  | HeadingBlock
  | QuoteBlock
  | ImageBlock;

export interface ParagraphBlock {
  type: 'paragraph';
  content: string;
}

export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}

export interface QuoteBlock {
  type: 'quote';
  content: string;
  author?: string;
}

export interface ImageBlock {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}

/* ============================================================
 * TAGS
 * ============================================================ */

export interface ArticleTag {
  label: string;
  slug: string;
}

/* ============================================================
 * RELATED ARTICLES
 * ============================================================ */

export interface RelatedArticle {
  id: string;
  title: string;
  url: string;
  thumb?: string;
}
