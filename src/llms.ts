// Shared by /llms.txt and /llms-full.txt (src/pages/). Format: https://llmstxt.org
//
// Only pages with real content go in. Most pages are still stubs: a title, maybe a sentence, and the
// ":::note[Coming soon]" aside. A page counts as real when, with that aside taken out, it has at least
// MIN_WORDS words. So a page appears here by itself once someone writes it; nothing to update by hand.
import { getCollection, type CollectionEntry } from 'astro:content';
import { sidebar } from './sidebar.mjs';

type Page = CollectionEntry<'docs'>;

export const MIN_WORDS = 30;

const COMING_SOON = /:::note\[Coming soon\][\s\S]*?\n:::\s*/g;

/** The page's Markdown without the "Coming soon" aside and MDX imports. */
export function pageText(page: Page): string {
  return (page.body ?? '')
    .replace(COMING_SOON, '')
    .replace(/^import .*$/gm, '')
    .trim();
}

function wordCount(text: string): number {
  return text.replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean).length;
}

export function isReal(page: Page): boolean {
  return page.data.template !== 'splash' && !page.data.draft && wordCount(pageText(page)) >= MIN_WORDS;
}

export function pageUrl(site: string, page: Page): string {
  return `${site}/${page.id}/`;
}

/** Root-relative links (`](/x/)`) become absolute, so they work outside the site. */
export function absoluteLinks(site: string, text: string): string {
  return text.replace(/\]\(\//g, `](${site}/`);
}

export function siteUrl(site: URL | undefined): string {
  return (site?.href ?? 'https://docs.patch-it.dev/').replace(/\/$/, '');
}

/** Sidebar groups, in sidebar order, each with its real pages in sidebar order. Empty groups are dropped. */
export async function sections(): Promise<{ label: string; pages: Page[] }[]> {
  const pages = (await getCollection('docs')).filter(isReal);
  return sidebar
    .map((group) => {
      const first = group.items[0];
      const dir = 'autogenerate' in first ? first.autogenerate.directory : first.slug.split('/')[0];
      const inGroup = pages
        .filter((p) => p.id.startsWith(`${dir}/`))
        .sort(
          (a, b) =>
            (a.data.sidebar.order ?? Infinity) - (b.data.sidebar.order ?? Infinity) ||
            a.data.title.localeCompare(b.data.title),
        );
      return { label: group.label, pages: inGroup };
    })
    .filter((s) => s.pages.length > 0);
}

/** Title, summary and details, taken from the Introduction page: its first paragraph is the summary. */
export async function header(): Promise<{ summary: string; details: string }> {
  const intro = (await getCollection('docs')).find((p) => p.id === 'get-started/introduction');
  const [summary = '', ...rest] = (intro ? pageText(intro) : '').split(/\n\s*\n/);
  // llmstxt.org: no headings between the summary and the first "##" section.
  const details = rest.filter((block) => !/^#/.test(block.trim())).join('\n\n');
  return { summary: summary.replace(/\s+/g, ' ').trim(), details };
}

export function textResponse(text: string): Response {
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
