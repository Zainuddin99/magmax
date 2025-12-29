import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "../components/ArticleCard";
import { getPublishedArticles, PAGE_SIZE } from "../lib/api";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "MagMax Blog";
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "Articles powered by Django CMS and Next.js";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  keywords: "blog, articles, cms, django, nextjs",
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? Math.max(parseInt(pageParam, 10) || 1, 1) : 1;

  const articles = await getPublishedArticles(currentPage);

  const totalPages = Math.max(Math.ceil(articles.count / PAGE_SIZE), 1);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Latest
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Articles from the CMS
        </h1>
        <p className="text-slate-600">
          Fresh content fetched directly from Django CMS via the public API.
        </p>
      </div>

      {articles.results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No published articles yet. Add some content in the CMS and this page
          will auto-update.
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {articles.results.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between text-sm text-slate-600">
            <span>
              Page {currentPage} of {totalPages} • {articles.count} articles
            </span>
            <div className="flex gap-2">
              <Link
                href={hasPrev ? `/?page=${currentPage - 1}` : "#"}
                aria-disabled={!hasPrev}
                className={`inline-flex items-center rounded-full border px-3 py-1 ${
                  hasPrev
                    ? "border-slate-300 text-slate-700 hover:bg-slate-50"
                    : "cursor-not-allowed border-slate-200 text-slate-400"
                }`}
              >
                ← Prev
              </Link>
              <Link
                href={hasNext ? `/?page=${currentPage + 1}` : "#"}
                aria-disabled={!hasNext}
                className={`inline-flex items-center rounded-full border px-3 py-1 ${
                  hasNext
                    ? "border-slate-300 text-slate-700 hover:bg-slate-50"
                    : "cursor-not-allowed border-slate-200 text-slate-400"
                }`}
              >
                Next →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
