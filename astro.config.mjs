import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://tulsawebdevs.github.io',
  base: '/website',
  integrations: [tailwind()],
  server:{
    host: true
  }
});
