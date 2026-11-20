// Renders the list of providers and sources patch-it watches into the "All plugins" page.
//
// The only list is the plugin registry in patch-it-plugins' code. Each release of that public
// repo carries it as an asset, plugins.json (printed by `go run ./cmd/list-plugins`), so this
// script reads the latest release's copy: no token, no committed list anywhere. It groups the
// providers by category and writes them between <!-- plugins:start --> and <!-- plugins:end -->
// in src/content/docs/supported-apis/plugins.md.
//
// Runs before every build and dev server (npm's "prebuild" and "predev"). If GitHub can't be
// reached, or the asset is missing or malformed, it writes a short "temporarily unavailable"
// note instead, never an old copy, and the build goes on. The committed page holds that note:
// don't commit a rendered list.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// PLUGINS_JSON_URL overrides it, e.g. a file:// path or another release's asset to preview.
const SOURCE =
  process.env.PLUGINS_JSON_URL ||
  'https://github.com/patch-it-dev/patch-it-plugins/releases/latest/download/plugins.json';
const PAGE = new URL('../src/content/docs/supported-apis/plugins.md', import.meta.url);
const START = '<!-- plugins:start -->';
const END = '<!-- plugins:end -->';

export const UNAVAILABLE =
  ':::note\nThe list is temporarily unavailable. It is read from the latest [patch-it-plugins release](https://github.com/patch-it-dev/patch-it-plugins/releases/latest) when these docs are built; it will be back on the next build.\n:::';

// How a category id reads as a heading; any other id is capitalized.
const TITLES = { ai: 'AI', crm: 'CRM', devtools: 'Developer tools' };

export function title(category) {
  return TITLES[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

/** A table cell: one line, no pipe that would split it. */
function cell(text) {
  return String(text ?? '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
}

function host(url) {
  try {
    const u = new URL(url);
    return u.hostname + (u.pathname === '/' ? '' : u.pathname);
  } catch {
    return url;
  }
}

/** Markdown for a plugins.json document: one section per category, in the list's order. */
export function render(list) {
  if (!list || !Array.isArray(list.providers) || list.providers.length === 0) {
    throw new Error('no providers in the list');
  }
  const order = Array.isArray(list.categories) ? [...list.categories] : [];
  for (const p of list.providers) if (!order.includes(p.category)) order.push(p.category);
  const sections = [];
  for (const category of order) {
    const providers = list.providers.filter((p) => p.category === category);
    if (providers.length === 0) continue;
    const rows = ['| Provider | Source | Layer | What it watches | Reads |', '|---|---|---|---|---|'];
    for (const p of providers) {
      for (const s of p.sources || []) {
        const reads = (s.urls || []).slice(0, 1).map((u) => `[${cell(host(u))}](${u})`).join('');
        rows.push(
          `| [${cell(p.name)}](${p.homepage}) | [\`${cell(s.id)}\`](${s.page}) | ${cell(s.layer)} | ${cell(s.watches)} | ${reads} |`,
        );
      }
    }
    sections.push(`### ${title(category)}\n\n${rows.join('\n')}`);
  }
  const version = list.version ? ` (${cell(list.version)})` : '';
  const counts = `${list.provider_count ?? list.providers.length} providers, ${list.source_count ?? ''} sources`.replace(', ,', ',');
  return `${sections.join('\n\n')}\n\n<small>${counts}, from patch-it-plugins${version}.</small>`;
}

export function replaceBetweenMarkers(page, body) {
  const start = page.indexOf(START);
  const end = page.indexOf(END, start);
  if (start < 0 || end < 0) throw new Error(`${PAGE.pathname} lost its ${START} / ${END} markers`);
  return `${page.slice(0, start + START.length)}\n${body}\n${page.slice(end)}`;
}

async function load(source) {
  if (source.startsWith('file:')) return JSON.parse(readFileSync(new URL(source), 'utf-8'));
  const res = await fetch(source, { signal: AbortSignal.timeout(10_000), redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function main() {
  let body = UNAVAILABLE;
  try {
    body = render(await load(SOURCE));
  } catch (err) {
    console.warn(`sync-plugins: the list is unavailable (${SOURCE}: ${err.message}); the page says so`);
  }
  const page = readFileSync(PAGE, 'utf-8');
  const next = replaceBetweenMarkers(page, body);
  if (next !== page) writeFileSync(PAGE, next);
  if (body !== UNAVAILABLE) console.log(`sync-plugins: rendered the list from ${SOURCE}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
