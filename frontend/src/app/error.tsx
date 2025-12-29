"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-lg font-semibold text-slate-900">
        Something went wrong
      </p>
      <p className="mt-2 text-slate-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}


