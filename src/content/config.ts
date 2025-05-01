import { defineCollection, z } from 'astro:content';

// Define la estructura para imágenes adicionales
const extraImageSchema = z.object({
  image: z.string(),
  caption: z.string().optional()
});

// Define el esquema para la colección de blog
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    author: z.string().default('Maria Magdalena Peña Romero'),
    authorImage: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    minutesRead: z.number().int().positive().optional(),
    // Añadimos la propiedad extraImages como un array de objetos
    extraImages: z.array(extraImageSchema).optional(),
  }),
});

// Exporta las colecciones
export const collections = {
  'blog': blogCollection,
};