import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-slate-900">
        Article not found
      </p>
      <p className="mt-2 text-slate-600">
        This article may be unpublished or the slug is incorrect.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
      >
        ← Back to articles
      </Link>
    </div>
  );
}


