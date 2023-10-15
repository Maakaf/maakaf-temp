import { defineCollection, z } from "astro:content";

// const blog = defineCollection({
//   // Type-check frontmatter using a schema
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     // Transform string to Date object
//     pubDate: z.coerce.date(),
//     updatedDate: z.coerce.date().optional(),
//     heroImage: z.string().optional(),
//   }),
// });

const newbies = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

const members = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

const maintainers = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

const recruiters = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

const sponsors = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  newbies,
  members,
  maintainers,
  recruiters,
  sponsors,
};

export type CollectionType = keyof typeof collections;
