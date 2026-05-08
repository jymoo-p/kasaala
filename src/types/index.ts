import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

export interface PostImage {
  asset: SanityImageAsset;
  alt: string;
  caption?: string;
}

export interface Category {
  _id?: string;
  title: string;
  titleEn: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Author {
  name: string;
  slug?: string;
  image?: { asset: SanityImageAsset };
}

export interface Post {
  _id: string;
  title: string;
  titleEn?: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  featured?: boolean;
  mainImage: PostImage;
  category: Category;
  author: Author;
  body?: PortableTextBlock[];
  seoDescription?: string;
}
