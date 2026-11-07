// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.patch-it.dev',
  integrations: [
    starlight({
      title: 'patch-it docs',
      description: 'Third-party API changes, fixed as pull requests in your own repo.',
      logo: { src: './src/assets/logo.svg', alt: 'patch-it' },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/patch-it-dev' },
      ],
      editLink: { baseUrl: 'https://github.com/patch-it-dev/patch-it-docs/edit/main/' },
      lastUpdated: true,
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Get started',
          items: [
            { slug: 'get-started/introduction' },
            { slug: 'get-started/quickstart' },
            { slug: 'get-started/how-it-works' },
          ],
        },
        { label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
        { label: 'Configuration', items: [{ autogenerate: { directory: 'configuration' } }] },
        { label: 'Supported APIs', items: [{ autogenerate: { directory: 'supported-apis' } }] },
        { label: 'API reference', items: [{ autogenerate: { directory: 'api-reference' } }] },
        { label: 'Resources', items: [{ autogenerate: { directory: 'resources' } }] },
      ],
    }),
  ],
});
