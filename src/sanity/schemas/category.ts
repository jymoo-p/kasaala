import { defineField, defineType, type StringRule, type SlugRule } from "sanity";

export const categorySchema = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (Malayalam)",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Title (English)",
      type: "string",
      description: "Used for URL slugs and SEO",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titleEn", maxLength: 50 },
      validation: (Rule: SlugRule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "color",
      title: "Accent Color",
      type: "string",
      description: "Tailwind color class, e.g. bg-emerald-500",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
