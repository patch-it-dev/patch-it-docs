// /llms-full.txt: the full text of every page /llms.txt lists, in the same order, in one file.
// Stubs are left out and the "Coming soon" aside is removed from partly written pages (see src/llms.ts).
import type { APIRoute } from 'astro';
import { absoluteLinks, header, pageText, pageUrl, sections, siteUrl, textResponse } from '../llms';

export const GET: APIRoute = async ({ site }) => {
  const base = siteUrl(site);
  const { summary } = await header();
  const pages = (await sections()).flatMap((s) => s.pages.map((page) => ({ label: s.label, page })));

  const parts = [
    `# patch-it\n\n> ${summary}`,
    ...pages.map(({ label, page: p }) =>
      [
        `# ${label}: ${p.data.title}`,
        p.data.description ? `> ${p.data.description}` : '',
        `Source: ${pageUrl(base, p)}`,
        absoluteLinks(base, pageText(p)),
      ]
        .filter(Boolean)
        .join('\n\n'),
    ),
  ];
  return textResponse(parts.join('\n\n---\n\n') + '\n');
};
