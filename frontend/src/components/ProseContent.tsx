type Props = {
  html: string;
};

/**
 * Render HTML content from the API safely.
 * The backend is trusted (Django CMS), so we allow `dangerouslySetInnerHTML`.
 */
export function ProseContent({ html }: Props) {
  return (
    <div
      className="prose prose-slate max-w-none prose-a:text-blue-600 prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


