/**
 * Root Article model
 * Representa o retorno final do mapper mapVibraArticleToExample
 */
export interface Article {
  id: string;

  metadata: ArticleMetadata;

  content: ArticleContent;

  /** Video-specific content (only present when metadata.type === 'video') */
  videoContent?: VideoContent;
}

/* ============================================================
 * METADATA
 * ============================================================ */

export interface ArticleMetadata {
  type: 'article' | 'video' | 'category' | 'home';

  title: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  og_image?: string;

  theme: ArticleTheme;
}

export interface ArticleTheme {
  primary: string;
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

  textEmbed?: string;

  tags: ArticleTag[];

  related: RelatedArticle[];
}

/* ============================================================
 * VIDEO CONTENT
 * ============================================================ */

export interface VideoContent {
  slug: string;
  headline: string;
  description?: string;

  dates: ArticleDates;

  video: VideoData;

  tags: ArticleTag[];

  relatedVideos: RelatedVideoItem[];
}

export interface VideoData {
  videoId: string;
  title: string;
  duration?: number;
  thumbnail: string;
  player: string;
  iframe?: string;
  hls?: string;
  mp4?: {
    '240p'?: string;
    '360p'?: string;
    '480p'?: string;
    '720p'?: string;
    '1080p'?: string;
  };
}

export interface RelatedVideoItem {
  id: string;
  title: string;
  href: string;
  thumb: string;
  date?: string;
  duration?: number;
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
  url_webp?: string;
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
  | ImageBlock
  | EmbedBlock
  | CmsEmbedBlock
  | CustomTemplateBlock;

/* ============================================================
 * INLINE NODE
 * ============================================================ */

export interface InlineNode {
  type: 'text';
  value: string;
  marks?: ('bold' | 'italic' | 'link')[];
  // URL to use when rendering a link-marked node (may come from CMS)
  url?: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  content: InlineNode[];
}

export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: InlineNode[];
}

export interface QuoteBlock {
  type: 'quote';
  content: InlineNode[];
  author?: string;
}

export interface ImageBlock {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}

export interface EmbedBlock {
  type: 'embed';
  /** URL canônica do embed (ex: https://www.youtube.com/embed/VIDEO_ID) */
  url: string;
  /** Provedor detectado — útil para renderização condicional */
  provider?: 'youtube' | 'generic' | 'twitter' | 'x' | 'instagram' | string;
}

export interface CmsEmbedBlock {
  type: 'cms-embed';
  url: string;
  provider: string;
}

export interface CustomTemplateBlock {
  type?: 'template';
  template: string;
  props: Record<string, any>;
}

/* ============================================================
 * TAGS
 * ============================================================ */

export interface ArticleTag {
  label: string;
  slug: string;
  /** Original tag ID from API (e.g., 'videos-ibge', 'videos-economia') */
  id?: string;
}

/* ============================================================
 * RELATED ARTICLES
 * ============================================================ */

export interface RelatedArticle {
  id: string;
  title: string;
  href: string;
  image: string;
}
