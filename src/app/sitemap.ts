import type { MetadataRoute } from "next";
import { getAllPosts, getAllCategories } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kasaala.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1.0 },
    ...categories.map((cat) => ({
      url: `${siteUrl}/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/post/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
