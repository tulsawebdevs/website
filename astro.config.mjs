import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import type React from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://tulsawebdevs.github.io',
  integrations: [tailwind(), react()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  server: {
    host: true,
  },
});
