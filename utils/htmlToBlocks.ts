import { JSDOM } from 'jsdom';

export function htmlToBlocks(html: string = '') {
  if (!html) return [];

  try {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const blocks: any[] = [];

    doc.body.childNodes.forEach((node: any) => {
      if (node.nodeType !== 1) return;

      const text = node.textContent?.trim();

      if (node.tagName === 'P' && text) {
        blocks.push({
          type: 'paragraph',
          content: text,
        });
      }

      if (/H[1-6]/.test(node.tagName) && text) {
        blocks.push({
          type: 'heading',
          level: Number(node.tagName.replace('H', '')),
          content: text,
        });
      }

      if (node.tagName === 'BLOCKQUOTE' && text) {
        blocks.push({
          type: 'quote',
          content: text,
        });
      }

      if (node.tagName === 'IMG') {
        blocks.push({
          type: 'image',
          url: node.getAttribute('src'),
          alt: node.getAttribute('alt') || '',
          caption: node.getAttribute('title') || '',
        });
      }
    });

    return blocks;
  } catch (error) {
    console.error(error);
    return [];
  }
}
