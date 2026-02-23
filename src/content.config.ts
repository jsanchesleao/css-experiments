import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.string(),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/pages/posts" }),
  schema: postSchema,
});

export const collections = { posts };
export type Post = z.infer<typeof postSchema>;
