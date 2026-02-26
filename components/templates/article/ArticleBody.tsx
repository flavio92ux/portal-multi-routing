import React from 'react';
import { ArticleContent, ArticleBlock, InlineNode } from '@/types/article';
import { ShareBar } from './ShareBar';
import { Newsletter } from './Newsletter';
import { RelatedTopics } from './RelatedTopics';

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

    return element || null;
  });
}

interface ArticleBodyProps {
  content: ArticleContent;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <>
      {/* Main image */}
      {content.media?.main && (
        <figure className="mb-6">
          <img
            src={content.media.main.url}
            alt={content.media.main.alt || ''}
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
      {Array.isArray(content.body) && content.body.length > 0 && (
        <div className="space-y-4">
          {content.body.map((block: ArticleBlock, idx: number) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={idx} className="text-cinza text-[20px] leading-7.5">
                    {renderInlineNodes(block.content)}
                  </p>
                );
              case 'heading':
                return (
                  <h2 key={idx} className="text-cinza text-[20px] leading-7.5">
                    {renderInlineNodes(block.content)}
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
                      {renderInlineNodes(block.content)}
                      {'"'}
                    </p>
                    {block.author && (
                      <cite className="text-cinza-secundario mt-1 block text-sm">
                        {'-- '}
                        {block.author}
                      </cite>
                    )}
                  </blockquote>
                );
              case 'image':
                return (
                  <figure key={idx} className="my-6">
                    <img
                      src={block.url}
                      alt={block.alt || ''}
                      className="w-full rounded"
                    />
                    {block.caption && (
                      <figcaption className="text-cinza-secundario mt-2 text-center text-xs">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              default:
                return null;
            }
          })}

          {/* Share bar after first few paragraphs */}
          <ShareBar />
        </div>
      )}

      {/* Newsletter (moved from parent) */}
      <div className="mt-8">
        <Newsletter />
      </div>
    </>
  );
}
