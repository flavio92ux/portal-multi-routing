import { SocialShareSidebar } from './SocialShareSidebar';
import { MaisLidas } from './MaisLidas';
import { BandplayBanner } from './BandplayBanner';
import { RelatedVideos } from './RelatedVideos';
import { Article } from '@/types/article';
import { ArticleBody } from './ArticleBody';
import { Breadcrumb } from './Breadcrumb';
import { AuthorInfo } from './AuthorInfo';

export default function ArticlePage({ data }: { data: Article }) {
  const { content } = data;

  if (!content) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[#ffffff]">
      <Breadcrumb headline={content.headline} />

      {/* Main content area */}
      <main className="mx-auto w-full max-w-[1060px] flex-1 px-4 pt-6 pb-8">
        {/* Article title section */}
        <h1 className="mb-3 text-2xl leading-tight font-extrabold text-[#1d1d1d] md:text-[32px] md:leading-[1.15]">
          {content.headline}
        </h1>

        {content.subheadline && (
          <p className="mb-4 text-sm leading-relaxed text-[#647083] md:text-base">
            {content.subheadline}
          </p>
        )}

        {/* Author & date */}
        {content.author && (
          <AuthorInfo author={content.author} dates={content.dates} />
        )}

        {/* Two-column layout: article + sidebar */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column: social share icons + article content */}
          <div className="flex flex-1 gap-3">
            {/* Social share sidebar (desktop only) */}
            <div className="hidden shrink-0 pt-1 md:block">
              <SocialShareSidebar />
            </div>

            {/* Article body */}
            <article className="min-w-0 flex-1">
              <ArticleBody content={content} />
            </article>
          </div>

          {/* Right sidebar */}
          <aside className="w-full shrink-0 lg:w-[260px]">
            <MaisLidas />
          </aside>
        </div>
      </main>

      {/* Bandplay banner */}
      <BandplayBanner />

      {/* Related videos */}
      <RelatedVideos />
    </div>
  );
}
