import * as cheerio from 'cheerio';

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
            content: text,
          });
        }

        if (/H[1-6]/.test(tagName) && text) {
          blocks.push({
            type: 'heading',
            level: Number(tagName.replace('H', '')),
            content: text,
          });
        }

        if (tagName === 'BLOCKQUOTE' && text) {
          blocks.push({
            type: 'quote',
            content: text,
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
