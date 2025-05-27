import { defineConfig } from "astro/config";
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

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
        minify: 'esbuild', // Cambio de terser a esbuild
        // Eliminamos terserOptions ya que usamos esbuild
      },
    },
  });