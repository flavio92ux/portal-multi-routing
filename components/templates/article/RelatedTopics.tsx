import Link from 'next/link';
import { ArticleTag } from '@/types/article';

interface RelatedTopicsProps {
  tags: ArticleTag[];
}

export function RelatedTopics({ tags }: RelatedTopicsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="mb-2.5 text-[13px] font-bold text-[#1d1d1d]">
        Topicos relacionados
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/band/tag/${tag.slug}`}
            className="rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white no-underline transition-opacity hover:opacity-80"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
