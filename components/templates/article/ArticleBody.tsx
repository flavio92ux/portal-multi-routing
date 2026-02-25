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
      element = <strong key={`${idx}-bold`}>{element}</strong>;
    }
    if (node.marks?.includes('italic')) {
      element = <em key={`${idx}-italic`}>{element}</em>;
    }
    if (node.marks?.includes('link')) {
      element = (
        <a
          key={`${idx}-link`}
          href={node.url || '#'}
          className="font-bold text-primary underline hover:no-underline"
        >
          {element}
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
        <figure className="mb-5">
          <img
            src={content.media.main.url}
            alt={content.media.main.alt || ''}
            className="h-auto w-full object-cover"
          />
          <figcaption className="mt-2 flex items-start gap-2 text-[11px] text-[#647083]">
            <span className="inline-block w-0.5 shrink-0 self-stretch bg-[#1f2328]" />
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
        <div className="flex flex-col gap-4">
          {content.body.map((block: ArticleBlock, idx: number) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p
                    key={idx}
                    className="text-[14px] leading-relaxed text-[#3c444e]"
                  >
                    {renderInlineNodes(block.content)}
                  </p>
                );
              case 'heading':
                return (
                  <h2
                    key={idx}
                    className="mt-4 text-lg font-bold text-[#1d1d1d]"
                  >
                    {renderInlineNodes(block.content)}
                  </h2>
                );
              case 'quote':
                return (
                  <blockquote
                    key={idx}
                    className="my-4 border-l-4 border-primary pl-4 italic"
                  >
                    <p className="text-base text-[#3c444e]">
                      {'"'}
                      {renderInlineNodes(block.content)}
                      {'"'}
                    </p>
                    {block.author && (
                      <cite className="mt-1 block text-sm text-[#939daa]">
                        {'-- '}
                        {block.author}
                      </cite>
                    )}
                  </blockquote>
                );
              case 'image':
                return (
                  <figure key={idx} className="my-4">
                    <img
                      src={block.url}
                      alt={block.alt || ''}
                      className="w-full"
                    />
                    {block.caption && (
                      <figcaption className="mt-2 text-center text-[11px] text-[#939daa]">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              default:
                return null;
            }
          })}

          {/* Share bar after body */}
          <ShareBar />
        </div>
      )}

      {/* Newsletter (moved from parent) */}
      <div className="mt-8">
        <Newsletter />
      </div>

      {/* Related topics (moved from parent) */}
      <RelatedTopics tags={content.tags} />
    </>
  );
}
