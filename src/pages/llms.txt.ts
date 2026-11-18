// /llms.txt: an index of these docs for language models, in the llmstxt.org format (H1, a blockquote summary,
// paragraphs with no headings, then H2 sections that are only lists of links; "Optional" is the part a model may skip).
// Built from the pages themselves; stubs are left out (see src/llms.ts).
import type { APIRoute } from 'astro';
import { header, pageUrl, sections, siteUrl, textResponse } from '../llms';

export const GET: APIRoute = async ({ site }) => {
  const base = siteUrl(site);
  const { summary, details } = await header();
  const groups = await sections();

  const parts = [
    '# patch-it',
    `> ${summary}`,
    details,
    'These are the patch-it developer docs. Pages that are still being written are left out of this file and of llms-full.txt until they have content.',
    ...groups.map(
      ({ label, pages }) =>
        `## ${label}\n\n` +
        pages.map((p) => `- [${p.data.title}](${pageUrl(base, p)}): ${p.data.description ?? ''}`.replace(/: $/, '')).join('\n'),
    ),
    '## Optional\n\n' +
      [
        `- [All pages in one file](${base}/llms-full.txt): the full text of every page listed above`,
        `- [Docs home](${base}/): the documentation site, including pages still being written`,
        '- [patch-it.dev](https://patch-it.dev/llms.txt): the product site\'s llms.txt',
        '- [GitHub](https://github.com/patch-it-dev): the patch-it-dev organization',
      ].join('\n'),
  ];
  return textResponse(parts.filter(Boolean).join('\n\n') + '\n');
};
