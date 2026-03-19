import { ArticleDates, ArticleTag } from '@/types/article';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';

interface VideoInfoProps {
  headline: string;
  description?: string;
  dates: ArticleDates;
  tags: ArticleTag[];
}

export function VideoInfo({
  headline,
  description,
  dates,
  tags,
}: VideoInfoProps) {
  return (
    <div className="mt-4">
      <h1 className="font-caladea text-xl leading-tight font-bold text-slate-950 md:text-2xl lg:text-3xl">
        {headline}
      </h1>

      {description && (
        <p className="text-cinza-secundario mt-2 text-sm leading-relaxed md:text-base">
          {description}
        </p>
      )}

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <time dateTime={dates.published_at}>
          {formatDate(dates.published_at)}
        </time>
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 no-underline transition-colors hover:bg-gray-200"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
