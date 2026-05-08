import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/content";

interface PostCardProps {
  post: Post;
  priority?: boolean;
  large?: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ml-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post, priority = false, large = false }: PostCardProps) {
  return (
    <article className="card-lift group flex flex-col">
      <Link href={`/post/${post.slug}`} className="block overflow-hidden rounded-2xl">
        <div className={`relative w-full ${large ? "aspect-[1.91/1]" : "aspect-[16/9]"}
                          bg-neutral-100 dark:bg-neutral-800`}>
          {post.mainImage ? (
            <Image
              src={post.mainImage}
              alt={post.mainImageAlt ?? post.title}
              fill
              sizes={large ? "(max-width: 768px) 100vw, 800px" : "(max-width: 640px) 100vw, 50vw"}
              priority={priority}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center
                             text-neutral-300 dark:text-neutral-600 text-4xl font-malayalam">
              ക
            </div>
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-2">
        {post.categoryData && (
          <Link
            href={`/${post.category}`}
            className="self-start text-xs font-semibold uppercase tracking-wider
                       text-brand-600 dark:text-brand-400 hover:underline"
          >
            {post.categoryData.title}
          </Link>
        )}

        <Link href={`/post/${post.slug}`}>
          <h2
            className={`font-malayalam font-bold leading-snug
                        text-neutral-900 dark:text-neutral-100
                        group-hover:text-brand-600 dark:group-hover:text-brand-400
                        transition-colors
                        ${large ? "text-2xl sm:text-3xl" : "text-lg"}`}
            lang="ml"
          >
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p
            className={`font-malayalam text-neutral-600 dark:text-neutral-400 line-clamp-2
                          ${large ? "text-base" : "text-sm"}`}
            lang="ml"
          >
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 mt-1">
          <span>{post.authorData?.name ?? post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
}
