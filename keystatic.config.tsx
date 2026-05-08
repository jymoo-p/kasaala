import { config, collection, fields } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  ui: { brand: { name: "Kasaala" } },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "slug",
      path: "content/posts/*",
      entryLayout: "content",
      format: { contentField: "body" },
      schema: {
        // slug.name is the English title — typing it auto-generates the URL slug
        slug: fields.slug({
          name: {
            label: "Title (English) — auto-generates URL slug",
            description: "Type in English; the slug below updates automatically.",
          },
        }),

        title: fields.text({
          label: "Title (Malayalam)",
          validation: { isRequired: true },
        }),

        // kept for SEO / JSON-LD (same as slug name but editable separately)
        titleEn: fields.text({ label: "Title (English / SEO override)" }),

        author: fields.relationship({
          label: "Author",
          collection: "authors",
          validation: { isRequired: true },
        }),

        category: fields.relationship({
          label: "Category",
          collection: "categories",
          validation: { isRequired: true },
        }),

        mainImage: fields.image({
          label: "Main Image",
          description: "Minimum 1200 × 630 px for Google Discover",
          directory: "public/images/posts",
          publicPath: "/images/posts",
        }),
        mainImageAlt: fields.text({ label: "Image Alt Text" }),
        mainImageCaption: fields.text({ label: "Image Caption" }),

        publishedAt: fields.text({
          label: "Published At (ISO 8601)",
          validation: { isRequired: true },
          defaultValue: new Date().toISOString(),
        }),

        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        featured: fields.checkbox({ label: "Featured Story", defaultValue: false }),
        seoDescription: fields.text({ label: "SEO Meta Description", multiline: true }),

        body: fields.markdoc({
          label: "Body",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts",
            },
          },
        }),
      },
    }),

    categories: collection({
      label: "Categories",
      slugField: "slug",
      path: "content/categories/*",
      format: { data: "json" },
      schema: {
        slug: fields.slug({
          name: { label: "Title (English) — auto-generates slug" },
        }),
        titleEn: fields.text({
          label: "Title (English)",
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: "Title (Malayalam)",
          validation: { isRequired: true },
        }),
        description: fields.text({ label: "Description", multiline: true }),
        color: fields.text({ label: "Accent Color (Tailwind class)" }),
      },
    }),

    authors: collection({
      label: "Authors",
      slugField: "slug",
      path: "content/authors/*",
      format: { data: "json" },
      schema: {
        slug: fields.slug({
          name: { label: "Name — auto-generates slug" },
        }),
        name: fields.text({
          label: "Full Name",
          validation: { isRequired: true },
        }),
        bio: fields.text({ label: "Bio", multiline: true }),
        photo: fields.image({
          label: "Photo",
          directory: "public/images/authors",
          publicPath: "/images/authors",
        }),
      },
    }),
  },
});
