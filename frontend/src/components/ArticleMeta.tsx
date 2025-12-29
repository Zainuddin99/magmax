import { format } from "date-fns";
import type { Author, Category } from "../lib/api";

type Props = {
  publishedDate?: string | null;
  readingTime?: number;
  categories?: Category[];
  author?: Author;
};

export function ArticleMeta({
  publishedDate,
  readingTime,
  categories,
  author,
}: Props) {
  const authorName =
    author &&
    `${author.first_name || ""} ${author.last_name || ""}`.trim();

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
      {author && (
        <span>
          By{" "}
          <span className="font-medium">
            {authorName || author.username}
          </span>
        </span>
      )}
      {publishedDate && (
        <>
          <span className="text-slate-300">•</span>
          <span>{format(new Date(publishedDate), "dd MMM yyyy")}</span>
        </>
      )}
      {readingTime && (
        <>
          <span className="text-slate-300">•</span>
          <span>{readingTime} min read</span>
        </>
      )}
      {categories && categories.length > 0 && (
        <>
          <span className="text-slate-300">•</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

