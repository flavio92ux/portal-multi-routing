import { ArticleBlock } from '@/types/article-blocks';

export function htmlToBlocks(html: string): ArticleBlock[] {
  if (!html) return [];

  const blocks: ArticleBlock[] = [];

  const parser =
    typeof window === 'undefined'
      ? new (require('jsdom').JSDOM)(html).window.DOMParser()
      : new DOMParser();

  const doc = parser.parseFromString(html, 'text/html');

  doc.body.childNodes.forEach((node: any) => {
    if (node.nodeType !== 1) return;

    switch (node.tagName) {
      case 'P':
        blocks.push({
          type: 'paragraph',
          text: node.textContent?.trim() || '',
        });
        break;

      case 'H2':
      case 'H3':
      case 'H4':
        blocks.push({
          type: 'heading',
          level: Number(node.tagName.replace('H', '')) as 2 | 3 | 4,
          text: node.textContent?.trim() || '',
        });
        break;

      case 'BLOCKQUOTE':
        blocks.push({
          type: 'quote',
          text: node.textContent?.trim() || '',
        });
        break;

      case 'FIGURE': {
        const img = node.querySelector('img');
        const figcaption = node.querySelector('figcaption');

        if (img) {
          blocks.push({
            type: 'image',
            src: img.getAttribute('src') || '',
            alt: img.getAttribute('alt') || undefined,
            caption: figcaption?.textContent?.trim(),
          });
        }
        break;
      }

      case 'IMG':
        blocks.push({
          type: 'image',
          src: node.getAttribute('src') || '',
          alt: node.getAttribute('alt') || undefined,
        });
        break;
    }
  });

  return blocks;
}
