import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
// @ts-ignore
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://tulsawebdevs.github.io',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  integrations: [tailwind(), react()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  server: {
    host: true,
  },
});
