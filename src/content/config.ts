import { defineCollection, z } from "astro:content";

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
