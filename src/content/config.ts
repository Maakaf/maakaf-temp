import { defineCollection, z } from "astro:content";

const newbies = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(["en", "he"]),
  }),
});

const members = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(["en", "he"]),
  }),
});

const maintainers = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(["en", "he"]),
  }),
});

const recruiters = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(["en", "he"]),
  }),
});

const sponsors = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(["en", "he"]),
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
