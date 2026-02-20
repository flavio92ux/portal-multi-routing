import { JSX } from 'react';
import Link from 'next/link';
import { SocialShareSidebar } from './article/SocialShareSidebar';
import { ShareBar } from './article/ShareBar';
import { MaisLidas } from './article/MaisLidas';
import { Newsletter } from './article/Newsletter';
import { RelatedTopics } from './article/RelatedTopics';
import { BandplayBanner } from './article/BandplayBanner';
import { RelatedVideos } from './article/RelatedVideos';
import { BandFooter } from './footer/BandFooter';
import { Article } from '@/types/article';

interface InlineNode {
  type: 'text';
  value: string;
  marks?: ('bold' | 'italic' | 'link')[];
  url?: string;
}

function renderInlineNodes(nodes: InlineNode[]) {
  if (!Array.isArray(nodes)) {
    return nodes;
  }

  return nodes.map((node, idx) => {
    let element: string | JSX.Element = node.value;

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
          className="text-primary underline hover:no-underline"
        >
          {element}
        </a>
      );
    }

    return element || null;
  });
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.toLocaleDateString('pt-BR')} - ${d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}

export default function ArticlePage({ data }: { data: Article }) {
  const { content, metadata } = data;

  if (!content) return null;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Kicker bar */}
      {content.kicker && (
        <div className="bg-primary py-1.5 text-center">
          <span className="text-xs font-bold tracking-widest text-primary-foreground uppercase">
            {content.kicker}
          </span>
        </div>
      )}

      {/* Breadcrumb */}
      <nav
        className="border-b border-border bg-background"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto max-w-5xl px-4 py-2">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link
                href="/band"
                className="text-muted-foreground no-underline hover:text-foreground"
              >
                Band
              </Link>
            </li>
            <li aria-hidden="true">{'>'}</li>
            <li className="truncate text-primary no-underline">
              {content.headline}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main content area */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {/* Article title section */}
        <h1 className="mb-2 text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
          {content.headline}
        </h1>

        {content.subheadline && (
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {content.subheadline}
          </p>
        )}

        {/* Author & date */}
        {content.author && (
          <div className="mb-6">
            <p className="text-xs font-bold uppercase text-primary no-underline">
              {content.author.name}
            </p>
            {content.dates?.published_at && (
              <p className="text-xs text-muted-foreground">
                {formatDate(content.dates.published_at)}
                {content.dates.updated_at &&
                  ` - Atualizado em ${formatDate(content.dates.updated_at)}`}
              </p>
            )}
          </div>
        )}

        {/* Two-column layout: article + sidebar */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column: social share icons + article content */}
          <div className="flex flex-1 gap-4">
            {/* Social share sidebar (desktop only) */}
            <div className="hidden shrink-0 pt-2 md:block">
              <SocialShareSidebar />
            </div>

            {/* Article body */}
            <article className="min-w-0 flex-1">
              {/* Main image */}
              {content.media?.main && (
                <figure className="mb-6">
                  <img
                    src={content.media.main.url}
                    alt={content.media.main.alt || ''}
                    className="h-auto w-full rounded object-cover"
                  />
                  <figcaption className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="inline-block h-full w-0.5 shrink-0 self-stretch bg-foreground" />
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
                  {content.body.map((block: any, idx: number) => {
                    switch (block.type) {
                      case 'paragraph':
                        return (
                          <p
                            key={idx}
                            className="text-sm leading-relaxed text-foreground"
                          >
                            {renderInlineNodes(block.content)}
                          </p>
                        );
                      case 'heading':
                        return (
                          <h2
                            key={idx}
                            className="mt-6 text-xl font-bold text-foreground"
                          >
                            {renderInlineNodes(block.content)}
                          </h2>
                        );
                      case 'quote':
                        return (
                          <blockquote
                            key={idx}
                            className="my-6 border-l-4 border-primary pl-4 italic"
                          >
                            <p className="text-lg text-foreground">
                              {'"'}
                              {renderInlineNodes(block.content)}
                              {'"'}
                            </p>
                            {block.author && (
                              <cite className="mt-1 block text-sm text-muted-foreground">
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
                              <figcaption className="mt-2 text-center text-xs text-muted-foreground">
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

              {/* Newsletter */}
              <div className="mt-8">
                <Newsletter />
              </div>

              {/* Related topics */}
              <RelatedTopics tags={content.tags} />
            </article>
          </div>

          {/* Right sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <MaisLidas />
          </aside>
        </div>
      </main>

      {/* Bandplay banner */}
      <BandplayBanner />

      {/* Related videos */}
      <RelatedVideos />

      {/* Footer */}
      <BandFooter />
    </div>
  );
}
