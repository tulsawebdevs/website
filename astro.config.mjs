import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://tulsawebdevs.org',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  integrations: [tailwind(), react()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
  server: {
    host: true,
  },
});
