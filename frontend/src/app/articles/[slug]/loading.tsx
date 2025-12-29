export default function LoadingArticle() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}


