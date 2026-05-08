import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/content";
import { PostCard } from "@/components/posts/PostCard";

interface PageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};
  return {
    title: `${category.title} — ${category.titleEn}`,
    description: category.description ?? `Latest ${category.titleEn} stories on Kasaala.`,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const posts = getPostsByCategory(params.category);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <h1
          className="font-malayalam font-bold text-3xl sm:text-4xl
                     text-neutral-900 dark:text-neutral-100"
          lang="ml"
        >
          {category.title}
        </h1>
        {category.description && (
          <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-base">
            {category.description}
          </p>
        )}
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="font-malayalam text-neutral-400 text-center py-20">
          ഉടൻ വരുന്നു… — Stories coming soon.
        </p>
      )}
    </div>
  );
}
