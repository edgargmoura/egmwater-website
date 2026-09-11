import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://egmwater.com',
  base: '/',
  integrations: [tailwind()],
  redirects: {
    '/contato': '/contact',
    '/quem-somos': '/about'
  },
  build: {
    format: 'directory'
  }
});
