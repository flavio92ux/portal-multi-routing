import * as cheerio from 'cheerio';

interface InlineNode {
  type: 'text';
  value: string;
  marks?: ('bold' | 'italic' | 'link')[];
}

function htmlToInlineNodes($: any, $el: any): InlineNode[] {
  const inlineNodes: InlineNode[] = [];

  $el.contents().each((_: any, node: any) => {
    if (node.type === 'text') {
      const text = node.data.trim();
      if (text) {
        inlineNodes.push({
          type: 'text',
          value: text,
        });
      }
    } else {
      const $node = $(node);
      const tagName = node.name?.toUpperCase();
      const text = $node.text().trim();

      if (!text) return;

      const marks: Array<'bold' | 'italic' | 'link'> = [];
      let url = '';

      if (tagName === 'STRONG' || tagName === 'B') {
        marks.push('bold');
      } else if (tagName === 'EM' || tagName === 'I') {
        marks.push('italic');
      } else if (tagName === 'A') {
        marks.push('link');
        url = $node.attr('href') || '';
      }

      const inlineNode: InlineNode & { url?: string } = {
        type: 'text',
        value: text,
        ...(marks.length > 0 && { marks }),
        ...(url && { url }),
      };

      inlineNodes.push(inlineNode);
    }
  });

  return inlineNodes.length > 0
    ? inlineNodes
    : [{ type: 'text', value: $el.text().trim() }];
}

export function htmlToBlocks(html: string = '') {
  if (!html) return [];

  try {
    const $ = cheerio.load(html);
    const blocks: any[] = [];

    // Iterar sobre os elementos filhos diretos do body
    $('body')
      .children()
      .each((_: any, element: any) => {
        const $el = $(element);
        const tagName = element.name.toUpperCase();
        const text = $el.text().trim();

        if (tagName === 'P' && text) {
          blocks.push({
            type: 'paragraph',
            content: htmlToInlineNodes($, $el),
          });
        }

        if (/H[1-6]/.test(tagName) && text) {
          blocks.push({
            type: 'heading',
            level: Number(tagName.replace('H', '')),
            content: htmlToInlineNodes($, $el),
          });
        }

        if (tagName === 'BLOCKQUOTE' && text) {
          blocks.push({
            type: 'quote',
            content: htmlToInlineNodes($, $el),
          });
        }

        if (tagName === 'IMG') {
          blocks.push({
            type: 'image',
            url: $el.attr('src'),
            alt: $el.attr('alt') || '',
            caption: $el.attr('title') || '',
          });
        }
      });

    return blocks;
  } catch (error) {
    console.error(error);
    return [];
  }
}
