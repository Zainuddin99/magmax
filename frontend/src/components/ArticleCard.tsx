import Image from "next/image";
import Link from "next/link";
import { ArticleListItem } from "../lib/api";
import { DEFAULT_ARTICLE_IMAGE } from "../lib/constants";
import { ArticleMeta } from "./ArticleMeta";

type Props = {
  article: ArticleListItem;
};

export function ArticleCard({ article }: Props) {
  const imageUrl = article.featured_image_url || DEFAULT_ARTICLE_IMAGE;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/articles/${article.slug}`}>
        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={imageUrl.startsWith("http://localhost")}
          />
        </div>
      </Link>
      <div className="flex-1 p-6">
        <Link href={`/articles/${article.slug}`} className="block space-y-3">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-700">
              {article.title}
            </h2>
            <p className="text-slate-600 line-clamp-3">{article.excerpt}</p>
          </div>
          <ArticleMeta
            publishedDate={article.published_date || undefined}
            readingTime={article.reading_time}
            categories={article.categories}
            author={article.author}
          />
        </Link>
      </div>
    </article>
  );
}
