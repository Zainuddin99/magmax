import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleMeta } from "../../../components/ArticleMeta";
import { ProseContent } from "../../../components/ProseContent";
import {
  getArticleBySlug,
  getRecentArticleSlugs,
  type ArticleDetail,
} from "../../../lib/api";
import { DEFAULT_ARTICLE_IMAGE } from "../../../lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateStaticParams() {
  const slugs = await getRecentArticleSlugs(10);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };

  const { meta_title, meta_description, meta_keywords, og_title, og_description, og_image } =
    article.seo;
  const articleUrl = `${siteUrl}/articles/${slug}`;
  const publishedDate = article.published_date
    ? new Date(article.published_date).toISOString()
    : undefined;
  const modifiedDate = article.updated_at
    ? new Date(article.updated_at).toISOString()
    : undefined;

  const imageUrl = article.featured_image_url || og_image || DEFAULT_ARTICLE_IMAGE;

  return {
    title: meta_title,
    description: meta_description,
    keywords: meta_keywords || undefined,
    authors: article.author.first_name || article.author.last_name
      ? [
          {
            name: `${article.author.first_name || ""} ${article.author.last_name || ""}`.trim() || article.author.username,
          },
        ]
      : undefined,
    openGraph: {
      title: og_title,
      description: og_description,
      url: articleUrl,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "MagMax Blog",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: article.author.username,
      tags: article.categories.map((cat) => cat.name),
    },
    twitter: {
      card: "summary_large_image",
      title: og_title,
      description: og_description,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

async function getArticle(slug: string): Promise<ArticleDetail> {
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  return article;
}

function ArticleStructuredData({ article }: { article: ArticleDetail }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image_url || article.seo.og_image || DEFAULT_ARTICLE_IMAGE,
    datePublished: article.published_date || article.created_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Person",
      name:
        `${article.author.first_name || ""} ${article.author.last_name || ""}`.trim() ||
        article.author.username,
      url: `${siteUrl}/author/${article.author.username}`,
    },
    publisher: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_SITE_NAME || "MagMax Blog",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: article.seo.meta_keywords || undefined,
    articleSection: article.categories.map((cat) => cat.name).join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  const imageUrl = article.featured_image_url || DEFAULT_ARTICLE_IMAGE;

  return (
    <>
      <ArticleStructuredData article={article} />
      <div className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to articles
        </Link>

        <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <ArticleMeta
              publishedDate={article.published_date || undefined}
              readingTime={article.reading_time}
              categories={article.categories}
              author={article.author}
            />
            <h1 className="text-3xl font-bold text-slate-900">
              {article.title}
            </h1>
            <p className="text-slate-600">{article.excerpt}</p>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              unoptimized={imageUrl.startsWith("http://localhost")}
            />
          </div>

          <div className="pt-4">
            <ProseContent html={article.content} />
          </div>
        </article>
      </div>
    </>
  );
}
