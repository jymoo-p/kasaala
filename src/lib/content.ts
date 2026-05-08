import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const CATEGORIES_DIR = path.join(process.cwd(), "content/categories");
const AUTHORS_DIR = path.join(process.cwd(), "content/authors");

export interface Category {
  title: string;
  titleEn: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Author {
  name: string;
  slug: string;
  bio?: string;
  photo?: string;
}

export interface Post {
  slug: string;
  title: string;
  titleEn?: string;
  author: string;
  mainImage?: string;
  mainImageAlt?: string;
  mainImageCaption?: string;
  category: string;
  publishedAt: string;
  excerpt?: string;
  featured?: boolean;
  seoDescription?: string;
  body: string;
  categoryData?: Category;
  authorData?: Author;
}

function readJson<T>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}

// Keystatic relationship fields store just the slug string.
// Category JSON has both old {titleEn} and new {slug:{name}} shapes —
// normalise both into our Category interface.
function normaliseCategory(raw: Record<string, unknown>, fileSlug: string): Category {
  // New shape: slug field is {name, discriminant}; titleEn comes from slug.name
  const slugField = raw.slug as { name?: string } | string | undefined;
  const titleEn =
    (raw.titleEn as string | undefined) ??
    (typeof slugField === "object" ? slugField?.name : undefined) ??
    fileSlug;

  return {
    title: (raw.title as string) ?? titleEn,
    titleEn,
    slug: fileSlug,
    description: raw.description as string | undefined,
    color: raw.color as string | undefined,
  };
}

// Author JSON: old shape has {name, slug}, new shape has {slug:{name}}.
function normaliseAuthor(raw: Record<string, unknown>, fileSlug: string): Author {
  const slugField = raw.slug as { name?: string } | string | undefined;
  const name =
    (raw.name as string | undefined) ??
    (typeof slugField === "object" ? slugField?.name : undefined) ??
    fileSlug;

  return {
    name,
    slug: fileSlug,
    bio: raw.bio as string | undefined,
    photo: raw.photo as string | undefined,
  };
}

export function getAllCategories(): Category[] {
  if (!fs.existsSync(CATEGORIES_DIR)) return [];
  return fs
    .readdirSync(CATEGORIES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const slug = f.replace(/\.json$/, "");
      const raw = readJson<Record<string, unknown>>(path.join(CATEGORIES_DIR, f));
      return raw ? normaliseCategory(raw, slug) : null;
    })
    .filter(Boolean) as Category[];
}

export function getCategoryBySlug(slug: string): Category | null {
  const raw = readJson<Record<string, unknown>>(path.join(CATEGORIES_DIR, `${slug}.json`));
  return raw ? normaliseCategory(raw, slug) : null;
}

export function getAuthorBySlug(slugOrName: string): Author | null {
  // First try direct slug lookup
  const bySlug = readJson<Record<string, unknown>>(
    path.join(AUTHORS_DIR, `${slugOrName}.json`)
  );
  if (bySlug) return normaliseAuthor(bySlug, slugOrName);

  // Fallback: scan all authors and match by name (for old posts that stored "Jai" not "jai")
  if (!fs.existsSync(AUTHORS_DIR)) return null;
  for (const f of fs.readdirSync(AUTHORS_DIR).filter((x) => x.endsWith(".json"))) {
    const fileSlug = f.replace(/\.json$/, "");
    const raw = readJson<Record<string, unknown>>(path.join(AUTHORS_DIR, f));
    if (!raw) continue;
    const author = normaliseAuthor(raw, fileSlug);
    if (author.name.toLowerCase() === slugOrName.toLowerCase()) return author;
  }
  return null;
}

function parsePost(filename: string): Post | null {
  try {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.mdoc$/, "");

    // relationship field stores slug; plain text fields store name or slug
    const categorySlug = (data.category as string) ?? "";
    const authorRef = (data.author as string) ?? "";

    const categoryData = getCategoryBySlug(categorySlug) ?? undefined;
    const authorData = getAuthorBySlug(authorRef) ?? undefined;

    // titleEn falls back to the slug.name value if keystatic stored it there
    const slugField = data.slug as { name?: string } | string | undefined;
    const titleEn =
      (data.titleEn as string | undefined) ??
      (typeof slugField === "object" ? slugField?.name : undefined);

    return {
      slug,
      title: (data.title as string) ?? "",
      titleEn,
      author: authorRef,
      mainImage: data.mainImage as string | undefined,
      mainImageAlt: data.mainImageAlt as string | undefined,
      mainImageCaption: data.mainImageCaption as string | undefined,
      category: categorySlug,
      publishedAt: (data.publishedAt as string) ?? new Date().toISOString(),
      excerpt: data.excerpt as string | undefined,
      featured: (data.featured as boolean) ?? false,
      seoDescription: data.seoDescription as string | undefined,
      body: content,
      categoryData,
      authorData,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdoc"))
    .map(parsePost)
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b!.publishedAt).getTime() - new Date(a!.publishedAt).getTime()
    ) as Post[];
}

export function getPostBySlug(slug: string): Post | null {
  const filename = `${slug}.mdoc`;
  if (!fs.existsSync(path.join(POSTS_DIR, filename))) return null;
  return parsePost(filename);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getLatestPosts(limit = 20): Post[] {
  return getAllPosts().slice(0, limit);
}
