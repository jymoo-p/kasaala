import type { Metadata } from "next";
import { getFeaturedPosts, getLatestPosts } from "@/lib/content";
import { PostCard } from "@/components/posts/PostCard";

export const metadata: Metadata = {
  title: "കസാല — Malayalam Stories & Evergreen Advice",
  description:
    "Human-interest stories, health advice, tech insights, film reviews, and more — all in Malayalam.",
};

export default function HomePage() {
  const featured = getFeaturedPosts();
  const latest = getLatestPosts(20);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const stream = latest.filter((p) => !featuredSlugs.has(p.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {featured.length > 0 && (
        <section aria-labelledby="featured-heading">
          <h2
            id="featured-heading"
            className="font-malayalam text-sm font-bold uppercase tracking-widest
                       text-brand-600 dark:text-brand-400 mb-6"
          >
            തിരഞ്ഞെടുത്ത വാർത്തകൾ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 lg:col-span-1">
              <PostCard post={featured[0]} priority large />
            </div>
            <div className="flex flex-col gap-8">
              {featured.slice(1).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {stream.length > 0 && (
        <section aria-labelledby="latest-heading">
          <h2
            id="latest-heading"
            className="font-malayalam text-sm font-bold uppercase tracking-widest
                       text-brand-600 dark:text-brand-400 mb-6"
          >
            ഏറ്റവും പുതിയത്
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stream.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {featured.length === 0 && stream.length === 0 && (
        <div className="text-center py-24 text-neutral-400">
          <p className="font-malayalam text-xl">ഉടൻ വരുന്നു…</p>
          <p className="text-sm mt-2">Stories coming soon.</p>
        </div>
      )}
    </div>
  );
}
