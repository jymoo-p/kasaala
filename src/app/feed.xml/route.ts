import { getLatestPosts } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kasaala.com";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getLatestPosts(20);

  const items = posts
    .map((post) => {
      const link = `${siteUrl}/post/${post.slug}`;
      const imageUrl = post.mainImage ? `${siteUrl}${post.mainImage}` : null;

      return `    <item>
      <title>${escapeXml(post.titleEn ?? post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.excerpt ?? "")}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${escapeXml(post.authorData?.name ?? post.author)}</author>
      <category>${escapeXml(post.categoryData?.titleEn ?? post.category)}</category>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" length="0" />
      <media:content url="${imageUrl}" medium="image" xmlns:media="http://search.yahoo.com/mrss/" />` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>കസാല (Kasaala)</title>
    <link>${siteUrl}</link>
    <description>Malayalam human-interest stories — Health, Tech, Film, Politics, and more.</description>
    <language>ml</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>Kasaala</title>
      <link>${siteUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
    },
  });
}
