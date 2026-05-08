import { groq } from "next-sanity";

const postFields = groq`
  _id,
  title,
  titleEn,
  "slug": slug.current,
  publishedAt,
  excerpt,
  featured,
  "mainImage": mainImage {
    asset,
    alt,
    caption
  },
  "category": category-> { title, titleEn, "slug": slug.current, color },
  "author": author-> { name, "slug": slug.current, image }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    ${postFields}
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    ${postFields}
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) [0...$limit] {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body,
    seoDescription
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(titleEn asc) {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    description,
    color
  }
`;

export const rssPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...20] {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "category": category->{ titleEn, "slug": slug.current },
    "author": author->{ name },
    "mainImage": mainImage { asset, alt }
  }
`;
