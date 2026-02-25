import { SocialShareSidebar } from './SocialShareSidebar';
import { MaisLidas } from './MaisLidas';
import { BandplayBanner } from './BandplayBanner';
import { RelatedVideos } from './RelatedVideos';
import { Article } from '@/types/article';
import { ArticleBody } from './ArticleBody';
import { Breadcrumb } from './Breadcrumb';
import { AuthorInfo } from './AuthorInfo';

export default function ArticlePage({ data }: { data: Article }) {
  const { content, metadata } = data;

  if (!content) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Breadcrumb headline={content.headline} />

      {/* Main content area */}
      <main className="mx-auto w-full max-w-325 flex-1 px-4 py-8">
        {/* Article title section */}
        <h1 className="font-caladea mb-2 text-2xl leading-tight font-bold text-slate-950 md:text-3xl lg:text-5xl lg:leading-14.5">
          {content.headline}
        </h1>

        {content.subheadline && (
          <p className="text-cinza-secundario mb-4 text-sm leading-relaxed md:text-base lg:text-[20px] lg:leading-7.5">
            {content.subheadline}
          </p>
        )}

        {/* Author & date */}
        {content.author && (
          <AuthorInfo author={content.author} dates={content.dates} />
        )}

        {/* Two-column layout: article + sidebar */}
        <div className="relative">
          {/* Social share sidebar - Agora usando sticky corretamente */}
          <div className="hidden md:block">
            <div className="absolute top-0 -left-16 h-full">
              {' '}
              <div className="sticky top-20 w-12">
                {' '}
                <SocialShareSidebar />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Coluna da Esquerda: Conteúdo */}
            <div className="flex">
              <article>
                <ArticleBody content={content} />
              </article>
            </div>

            {/* Sidebar Direita */}
            <aside className="w-full shrink-0 lg:w-77.5">
              <MaisLidas />
            </aside>
          </div>
        </div>
      </main>

      {/* Bandplay banner */}
      <BandplayBanner />

      {/* Related videos */}
      <RelatedVideos />
    </div>
  );
}
