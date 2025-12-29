const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};

export type Author = {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
};

export type ArticleListItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url?: string | null;
  author: Author;
  categories: Category[];
  status: string;
  published_date: string | null;
  reading_time: number;
  view_count: number;
  created_at: string;
};

export type ArticleDetail = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string | null;
  author: Author;
  categories: Category[];
  status: string;
  published_date: string | null;
  created_at: string;
  updated_at: string;
  reading_time: number;
  view_count: number;
  is_published: boolean;
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    og_title: string;
    og_description: string;
    og_image?: string | null;
  };
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

const defaultRevalidate = 60;
export const PAGE_SIZE = 10; // must match DRF PAGE_SIZE

export async function getPublishedArticles(page = 1) {
  const url = new URL(`${API_BASE}/articles/published/`);
  url.searchParams.set("page", String(page));

  const res = await fetch(url.toString(), {
    next: { revalidate: defaultRevalidate },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  return (await res.json()) as PaginatedResponse<ArticleListItem>;
}

export async function getArticleBySlug(slug: string) {
  if (!slug || slug.trim() === "") {
    return null;
  }

  const url = `${API_BASE}/articles/${slug}/`;

  try {
    const res = await fetch(url, {
      next: { revalidate: defaultRevalidate },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status}`);
    }

    return (await res.json()) as ArticleDetail;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

export async function getRecentArticleSlugs(limit = 10) {
  const data = await getPublishedArticles(1);
  return data.results.slice(0, limit).map((article) => article.slug);
}
