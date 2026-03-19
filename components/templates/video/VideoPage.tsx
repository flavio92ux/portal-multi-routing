import { Article } from '@/types/article';
import { Breadcrumb } from '../article/Breadcrumb';
import AdBlock from '@/components/ui/ad-block';
import { VideoPlayer } from './VideoPlayer';
import { VideoSidebar } from './VideoSidebar';
import { VideoInfo } from './VideoInfo';
import { VideoGallerySections } from './VideoGallerySections';
import { BandplayBannerWrapper } from '../article/BandplayBannerWrapper';

export default function VideoPage({ data }: { data: Article }) {
  const { videoContent, content } = data;

  if (!videoContent) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Breadcrumb headline={videoContent.headline} />

      <div className="flex justify-center pb-3 lg:pb-0">
        <AdBlock
          width={728}
          height={90}
          mobileWidth={320}
          mobileHeight={50}
          name="Billboard01"
        />
      </div>

      {/* Main content area */}
      <main className="mx-auto w-full max-w-325 flex-1 px-4 lg:py-4">
        {/* Video player + sidebar layout */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Left column: Video Player + Info */}
          <div className="flex-1">
            <VideoPlayer video={videoContent.video} />
            <VideoInfo
              headline={videoContent.headline}
              description={videoContent.description}
              dates={videoContent.dates}
              tags={videoContent.tags}
            />
          </div>

          {/* Right column: Sidebar with related videos */}
          <aside className="w-full shrink-0 lg:w-80">
            <VideoSidebar tags={content.tags} />
          </aside>
        </div>
      </main>

      {/* Video gallery sections */}
      <VideoGallerySections />

      {/* Bandplay banner */}
      <BandplayBannerWrapper />
    </div>
  );
}
