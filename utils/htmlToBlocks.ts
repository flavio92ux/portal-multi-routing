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

/**
 * Normaliza qualquer URL de vídeo do YouTube para o formato embed canônico.
 * Aceita: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID (com ou
 * sem prefixo "https://www.youtube.com/embed/https://youtu.be/..." que alguns
 * CMSs geram por engano).
 */
function normalizeEmbedUrl(raw: string): { url: string; provider: 'youtube' | 'generic' } {
  const cleaned = raw.trim();

  // Detecta padrão CMS com URL duplicada: "…/embed/https://youtu.be/ID?…"
  const nestedMatch = cleaned.match(/youtube\.com\/embed\/https?:\/\/(?:youtu\.be|youtube\.com\/watch[^/]*)\/([A-Za-z0-9_-]{11})/);
  if (nestedMatch) {
    return { url: `https://www.youtube.com/embed/${nestedMatch[1]}`, provider: 'youtube' };
  }

  // youtu.be/ID
  const shortMatch = cleaned.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) {
    return { url: `https://www.youtube.com/embed/${shortMatch[1]}`, provider: 'youtube' };
  }

  // youtube.com/watch?v=ID
  const watchMatch = cleaned.match(/youtube\.com\/watch\?(?:[^&]*&)*v=([A-Za-z0-9_-]{11})/);
  if (watchMatch) {
    return { url: `https://www.youtube.com/embed/${watchMatch[1]}`, provider: 'youtube' };
  }

  // Já está no formato embed limpo
  const embedMatch = cleaned.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
  if (embedMatch) {
    return { url: `https://www.youtube.com/embed/${embedMatch[1]}`, provider: 'youtube' };
  }

  return { url: cleaned, provider: 'generic' };
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

        // Detecta <figure class="media"><oembed url="..."></oembed></figure>
        if (tagName === 'FIGURE') {
          const $oembed = $el.find('oembed[url]');
          if ($oembed.length > 0) {
            const rawUrl = $oembed.attr('url') || '';
            if (rawUrl) {
              const { url, provider } = normalizeEmbedUrl(rawUrl);
              blocks.push({ type: 'embed', url, provider });
            }
          }
        }
      });

    return blocks;
  } catch (error) {
    console.error(error);
    return [];
  }
}
