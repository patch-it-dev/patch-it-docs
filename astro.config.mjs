// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { ExpressiveCodeTheme } from '@astrojs/starlight/expressive-code';

// Code blocks use the same syntax themes as the CLI and editor (patch-it-brand/terminal/).
const theme = (file) => ExpressiveCodeTheme.fromJSONString(readFileSync(new URL(file, import.meta.url), 'utf-8'));

export default defineConfig({
  site: 'https://docs.patch-it.dev',
  integrations: [
    starlight({
      title: 'patch-it docs',
      description: 'Third-party API changes, fixed as pull requests in your own repo.',
      logo: {
        dark: './src/assets/wordmark-plain-on-dark.svg',
        light: './src/assets/wordmark-plain-on-light.svg',
        alt: 'patch-it',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      head: [
        { tag: 'link', attrs: { rel: 'icon', href: '/favicon.ico', sizes: '48x48' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#1E1E24' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.patch-it.dev/og.png' } },
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/patch-it-dev' },
      ],
      editLink: { baseUrl: 'https://github.com/patch-it-dev/patch-it-docs/edit/main/' },
      lastUpdated: true,
      expressiveCode: {
        themes: [theme('./src/themes/patch-it-dark.json'), theme('./src/themes/patch-it-light.json')],
        styleOverrides: {
          borderRadius: '10px',
          codeFontFamily: "'IBM Plex Mono', ui-monospace, monospace",
          uiFontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        },
      },
      customCss: [
        '@fontsource/ibm-plex-sans/400.css',
        '@fontsource/ibm-plex-sans/600.css',
        '@fontsource/ibm-plex-mono/400.css',
        '@fontsource/ibm-plex-mono/500.css',
        './src/styles/custom.css',
      ],
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
