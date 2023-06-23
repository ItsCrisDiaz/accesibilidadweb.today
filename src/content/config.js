// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
const modules = defineCollection({
  schema: z.object({
    title: z.string(),
    module: z.string(),
    availableLessons: z.string(),
    totalLessons: z.string(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  modules,
};
