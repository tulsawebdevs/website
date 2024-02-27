import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://astro.build/config
export default defineConfig({
  site: 'https://tulsawebdevs.github.io',
  integrations: [tailwind()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  server: {
    host: true,
  },
});
