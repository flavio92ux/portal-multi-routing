import { SocialShareSidebar } from './SocialShareSidebar';
import { MaisLidas } from './MaisLidas';
import { MaisLidasWrapper } from './MaisLidasWrapper';
import { RelatedVideosWrapper } from './RelatedVideosWrapper';
import { Article } from '@/types/article';
import { ArticleBody } from './ArticleBody';
import { Breadcrumb } from './Breadcrumb';
import { AuthorInfo } from './AuthorInfo';
import AdBlock from '@/components/ui/ad-block';
import { BandplayBannerWrapper } from './BandplayBannerWrapper';
import { SeeMore } from './SeeMore';

export default function ArticlePage({ data }: { data: Article }) {
  const { content } = data;

  if (!content) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Breadcrumb headline={content.headline} />

      <div className="flex justify-center pb-3 lg:pb-0">
        <AdBlock
          width={970}
          height={250}
          mobileWidth={320}
          mobileHeight={100}
          name="Billboard01"
        />
      </div>

      {/* Main content area */}
      <main className="mx-auto w-full max-w-325 flex-1 px-4 lg:py-8">
        {/* Article title section */}
        <h1 className="font-caladea mb-2 text-2xl leading-[28px] font-bold text-slate-950 md:text-3xl lg:text-5xl lg:leading-14.5">
          {content.headline}
        </h1>

        {content.subheadline && (
          <p className="text-cinza-secundario mb-4 text-sm leading-[20px] md:text-base lg:text-[20px] lg:leading-7.5">
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
            <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-77.5">
              <div className="hidden lg:block">
                <SeeMore />
              </div>
              <div className="hidden lg:block">
                <AdBlock width={300} height={250} name="Arroba" />
              </div>
              {/* Desktop: SSR com cache */}
              <div className="hidden lg:block">
                <MaisLidas path={data.id} />
              </div>
              {/* Mobile: LazyLoad client-side (scroll abaixo do artigo) */}
              <div className="lg:hidden">
                <MaisLidasWrapper path={data.id} />
              </div>
              <div className="hidden lg:sticky lg:top-1">
                <AdBlock width={300} height={600} name="HalfPage" />
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Bandplay banner */}
      <BandplayBannerWrapper />

      {/* Related videos */}
      <RelatedVideosWrapper />
    </div>
  );
}
