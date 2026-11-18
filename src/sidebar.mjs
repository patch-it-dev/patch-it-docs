// The sidebar groups, in order. Shared by astro.config.mjs (the site's sidebar) and src/llms.ts (the sections of
// /llms.txt), so both always list the same groups in the same order.
export const sidebar = [
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
];
