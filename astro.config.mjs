import { defineConfig } from "astro/config";
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';    // ← IMPORTA sitemap



// https://astro.build/config
export default defineConfig({
    site: 'https://unamorconsciente.com',
    integrations: [
      tailwind(),
      sitemap()
    ],
    // Optimizaciones para SEO
    vite: {
      build: {
        cssCodeSplit: true,
        cssMinify: true,
        minify: 'terser',
        terserOptions: {
          format: {
            comments: false,
          },
        },
      },
    },
  });