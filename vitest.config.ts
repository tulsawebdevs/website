import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/playwright/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
});
