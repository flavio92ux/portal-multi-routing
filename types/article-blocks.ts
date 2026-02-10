export type ArticleBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | QuoteBlock;

export type ParagraphBlock = {
  type: 'paragraph';
  text: string;
};

export type HeadingBlock = {
  type: 'heading';
  level: 2 | 3 | 4;
  text: string;
};

export type ImageBlock = {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
};

export type QuoteBlock = {
  type: 'quote';
  text: string;
  author?: string;
};
