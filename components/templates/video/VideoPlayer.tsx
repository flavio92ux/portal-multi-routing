'use client';

import { VideoData } from '@/types/article';

interface VideoPlayerProps {
  video: VideoData;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black">
      <div className="relative aspect-video w-full">
        <iframe
          src={video.player}
          title={video.title}
          frameBorder="0"
          scrolling="no"
          allow="accelerometer; xr-spatial-tracking; autoplay; clipboard-write; encrypted-media; gyroscope"
          className="absolute inset-0 h-full w-full"
          allowFullScreen
        />
      </div>
    </div>
  );
}
