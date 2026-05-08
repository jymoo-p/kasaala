import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { ArticleActions } from "@/components/posts/ArticleActions";
import { ShareStrip } from "@/components/posts/ShareStrip";
import { MarkdownBody } from "@/components/posts/MarkdownBody";

interface PageProps {
  params: { slug: string };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kasaala.com";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const description = post.seoDescription ?? post.excerpt ?? "";
  const title = post.titleEn ?? post.title;
  const canonical = `${siteUrl}/post/${post.slug}`;
  const ogImage = post.mainImage ? `${siteUrl}${post.mainImage}` : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.authorData?.name ?? post.author],
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: post.mainImageAlt ?? "" }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

function NewsArticleJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const ogImage = post.mainImage ? `${siteUrl}${post.mainImage}` : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.titleEn ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? "",
    ...(ogImage && { image: [ogImage] }),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: [{ "@type": "Person", name: post.authorData?.name ?? post.author }],
    publisher: {
      "@type": "Organization",
      name: "Kasaala",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/post/${post.slug}` },
    inLanguage: "ml",
    articleSection: post.categoryData?.titleEn ?? post.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ml-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}


export default function ArticlePage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleUrl = `${siteUrl}/post/${post.slug}`;
  const authorName = post.authorData?.name ?? post.author;

  return (
    <>
      <NewsArticleJsonLd post={post} />

      <article className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 mb-5">
          {post.categoryData && (
            <>
              <a
                href={`/${post.category}`}
                className="text-xs font-bold uppercase tracking-widest
                           text-brand-600 dark:text-brand-400 hover:underline"
              >
                {post.categoryData.title}
              </a>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            </>
          )}
          <time
            dateTime={post.publishedAt}
            className="text-xs text-neutral-400 dark:text-neutral-500"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>

        <h1
          className="font-malayalam font-bold text-3xl sm:text-4xl leading-tight
                     text-neutral-900 dark:text-neutral-100 mb-4"
          lang="ml"
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p
            className="font-malayalam text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed"
            lang="ml"
          >
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <p className="text-sm text-neutral-400 dark:text-neutral-500">{authorName}</p>
          <ShareStrip title={post.titleEn ?? post.title} url={articleUrl} />
        </div>

        {post.mainImage && (
          <div className="relative w-full aspect-[1.91/1] overflow-hidden rounded-2xl
                           bg-neutral-100 dark:bg-neutral-800 mb-10">
            <Image
              src={post.mainImage}
              alt={post.mainImageAlt ?? ""}
              fill
              priority
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-cover"
            />
            {post.mainImageCaption && (
              <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-2
                                      bg-black/40 text-white text-xs text-center">
                {post.mainImageCaption}
              </figcaption>
            )}
          </div>
        )}

        <div className="article-body" lang="ml">
          <MarkdownBody body={post.body} />
        </div>

        <ArticleActions title={post.titleEn ?? post.title} url={articleUrl} />
      </article>
    </>
  );
}
