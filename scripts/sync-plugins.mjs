// Copies the list of supported plugins from patch-it-plugins into the "All plugins" page.
//
// The source of truth is docs/plugins.md on patch-it-plugins' main branch (a public repo, so no
// token). Its table sits between <!-- plugins:start --> and <!-- plugins:end -->; this script
// puts that table between the same markers in src/content/docs/supported-apis/plugins.md.
//
// Runs before every build (npm's "prebuild"). If GitHub can't be reached, or the file has no
// table, it leaves the committed page alone: that copy is the fallback, so the build never fails
// offline. Run `npm run sync-plugins` and commit the page to refresh the fallback.
import { readFileSync, writeFileSync } from 'node:fs';

// PLUGINS_LIST_URL overrides it, e.g. to preview a patch-it-plugins branch.
const SOURCE = process.env.PLUGINS_LIST_URL || 'https://raw.githubusercontent.com/patch-it-dev/patch-it-plugins/main/docs/plugins.md';
const PAGE = new URL('../src/content/docs/supported-apis/plugins.md', import.meta.url);
const START = '<!-- plugins:start -->';
const END = '<!-- plugins:end -->';

/** The table between the markers: only Markdown table rows, so nothing else can reach the page. */
export function extractTable(markdown) {
  const start = markdown.indexOf(START);
  const end = markdown.indexOf(END, start);
  if (start < 0 || end < 0) return null;
  const rows = markdown
    .slice(start + START.length, end)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'));
  // A header, the |---| line, and at least one plugin.
  return rows.length >= 3 ? rows.join('\n') : null;
}

export function replaceTable(page, table) {
  const start = page.indexOf(START);
  const end = page.indexOf(END, start);
  if (start < 0 || end < 0) throw new Error(`${PAGE.pathname} lost its ${START} / ${END} markers`);
  return `${page.slice(0, start + START.length)}\n${table}\n${page.slice(end)}`;
}

async function main() {
  let table = null;
  try {
    const res = await fetch(SOURCE, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    table = extractTable(await res.text());
    if (!table) throw new Error('no plugin table between the markers');
  } catch (err) {
    console.warn(`sync-plugins: kept the committed plugin list (${SOURCE}: ${err.message})`);
    return;
  }
  const page = readFileSync(PAGE, 'utf-8');
  const next = replaceTable(page, table);
  if (next === page) {
    console.log('sync-plugins: plugin list is up to date');
    return;
  }
  writeFileSync(PAGE, next);
  console.log(`sync-plugins: updated the plugin list from ${SOURCE} (${table.split('\n').length - 2} plugins)`);
}

await main();
