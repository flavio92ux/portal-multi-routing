import React, { useMemo } from 'react';
import Image from 'next/image';
import { ArticleContent, ArticleBlock, InlineNode } from '@/types/article';
import { LazyEmbed } from './LazyEmbed';
import { Newsletter } from './Newsletter';
import { RelatedTopics } from './RelatedTopics';
import {
  injectAdBlocksEveryNParagraphs,
  AdBlockWithId,
} from '@/utils/injectAdBlocks';
import AdBlock from '@/components/ui/ad-block';
import { CustomTemplate } from './CustomTemplate';
import { CmsEmbed } from './CmsEmbed';

function renderInlineNodes(nodes: InlineNode[]) {
  if (!Array.isArray(nodes)) {
    return nodes;
  }

  return nodes.map((node, idx) => {
    let element: string | React.ReactNode = node.value;

    if (node.marks?.includes('bold')) {
      element = (
        <strong key={`${idx}-bold`} className="text-primary">
          {' ' + element + ' '}
        </strong>
      );
    }
    if (node.marks?.includes('italic')) {
      element = <em key={`${idx}-italic`}>{element}</em>;
    }
    if (node.marks?.includes('link')) {
      element = (
        <a
          key={`${idx}-link`}
          href={node.url || '#'}
          className="text-primary underline hover:no-underline"
        >
          {' ' + element + ' '}
        </a>
      );
    }
    d;

    return element || null;
  });
}

interface ArticleBodyProps {
  content: ArticleContent;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  // Processa blocos com ads injetados após 1º parágrafo e depois a cada 3 parágrafos
  const processedBlocks = useMemo(
    () =>
      Array.isArray(content.body) && content.body.length > 0
        ? injectAdBlocksEveryNParagraphs(content.body, 3, {
            width: 300,
            height: 250,
          })
        : [],
    [content.body]
  );

  return (
    <>
      {/* Main media: textEmbed tem prioridade sobre a imagem principal */}
      {content.textEmbed
        ? (() => {
            const match = content.textEmbed.match(/url="([^"]+)"/);
            const embedUrl = match?.[1];
            return embedUrl ? (
              <div className="mb-6">
                <LazyEmbed
                  url={embedUrl}
                  provider={
                    embedUrl.includes('youtube') ? 'youtube' : 'generic'
                  }
                />
              </div>
            ) : null;
          })()
        : content.media?.main && (
            <figure className="mb-6">
              <Image
                src={content.media.main.url || ''}
                alt={content.media.main.alt || ''}
                width={1200}
                height={675}
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="h-auto w-full rounded object-cover"
              />
              <figcaption className="text-cinza-secundario mt-2 flex items-start gap-2 text-xs">
                <span className="bg-foreground inline-block h-full w-0.5 shrink-0 self-stretch" />
                <span>
                  {content.media.main.caption}
                  {content.media.main.credit &&
                    ` - Foto: ${content.media.main.credit}`}
                </span>
              </figcaption>
            </figure>
          )}

      {/* Body blocks */}
      {processedBlocks.length > 0 && (
        <div className="space-y-4">
          {processedBlocks.map((block: AdBlockWithId, idx: number) => {
            // Renderiza blocos de ads
            if (block.__isAd) {
              return (
                <div
                  key={`ad-block-${idx}`}
                  className="my-6 flex justify-center"
                >
                  <AdBlock
                    width={block.__adConfig?.width || '100%'}
                    height={block.__adConfig?.height || 400}
                    name={`InArticle-${idx}`}
                  />
                </div>
              );
            }

            // Renderiza blocos normais
            const articleBlock = block as ArticleBlock;
            switch (articleBlock.type) {
              case 'paragraph':
                return (
                  <p key={idx} className="text-cinza text-[20px] leading-7.5">
                    {renderInlineNodes(articleBlock.content)}
                  </p>
                );
              case 'heading':
                return (
                  <h2
                    key={idx}
                    className="text-primary text-3xl leading-9.25 font-bold"
                  >
                    {renderInlineNodes(articleBlock.content)}
                  </h2>
                );
              case 'quote':
                return (
                  <blockquote
                    key={idx}
                    className="border-primary my-6 border-l-4 pl-4 italic"
                  >
                    <p className="text-foreground text-lg">
                      {'"'}
                      {renderInlineNodes(articleBlock.content)}
                      {'"'}
                    </p>
                    {articleBlock.author && (
                      <cite className="text-cinza-secundario mt-1 block text-sm">
                        {'-- '}
                        {articleBlock.author}
                      </cite>
                    )}
                  </blockquote>
                );
              case 'image':
                return (
                  <figure key={idx} className="my-6">
                    <img
                      src={articleBlock.url}
                      alt={articleBlock.alt || ''}
                      width={800}
                      height={450}
                      className="h-auto w-full rounded"
                    />
                    {articleBlock.caption && (
                      <figcaption className="text-cinza-secundario mt-2 text-center text-xs">
                        {articleBlock.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              case 'embed':
                return (
                  <LazyEmbed
                    key={idx}
                    url={articleBlock.url}
                    provider={articleBlock.provider}
                  />
                );
              case 'cms-embed':
                return (
                  <CmsEmbed
                    key={idx}
                    url={articleBlock.url}
                    provider={articleBlock.provider}
                  />
                );
              case 'template':
                return (
                  <CustomTemplate
                    key={idx}
                    template={articleBlock.template}
                    props={articleBlock.props}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      )}

      {/* <WhatsappBanner /> */}

      {/* Share bar after first few paragraphs */}
      {/* <ShareBar /> */}

      {/* Newsletter (moved from parent) */}
      <div className="mt-8">
        <Newsletter />
        <RelatedTopics tags={content.tags} />
      </div>
    </>
  );
}
