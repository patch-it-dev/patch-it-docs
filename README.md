# patch-it docs

Public developer documentation for patch-it, published at **https://docs.patch-it.dev**.

Built with [Astro Starlight](https://starlight.astro.build): the standard developer-docs layout (sidebar, page, "On this page", search, light/dark mode).

## Write a page

Pages are Markdown files in `src/content/docs/`. The folder decides where a page appears in the sidebar:

| Folder | Sidebar section |
|---|---|
| `get-started/` | Get started (order set in `astro.config.mjs`) |
| `guides/` | Guides |
| `configuration/` | Configuration |
| `supported-apis/` | Supported APIs |
| `api-reference/` | API reference |
| `resources/` | Resources |

Each page starts with frontmatter:

```md
---
title: Page title
description: One sentence for search and link previews.
sidebar:
  order: 2
---
```

Use `:::note`, `:::tip`, `:::caution` and `:::danger` for callouts.

Keep internal details out of here: internal APIs, architecture and runbooks belong in the private `developer-handbook` repo.

## The list of plugins

[Supported APIs → All plugins](src/content/docs/supported-apis/plugins.md) is built from [`docs/plugins.md`](https://github.com/patch-it-dev/patch-it-plugins/blob/main/docs/plugins.md) in the public `patch-it-plugins` repo, the one list of supported plugins. Don't edit the table on this site; change it there.

- `npm run build` first runs `scripts/sync-plugins.mjs` (npm's `prebuild`): it downloads that file from `main` (raw.githubusercontent.com, no token) and copies the table between `<!-- plugins:start -->` and `<!-- plugins:end -->` into the page, between the same markers.
- **Offline or GitHub down:** it prints a warning and keeps the committed table, so the build never fails on it.
- **Refresh the committed copy** with `npm run sync-plugins` and commit the page; a build that changed the table leaves it as a diff in your working tree.
- The site updates when it's rebuilt: a change merged in `patch-it-plugins` shows up on the next docs deploy.

## llms.txt

The build also writes `/llms.txt` (an index of the docs for AI tools, in the [llmstxt.org](https://llmstxt.org) format) and `/llms-full.txt` (the text of those pages in one file). Both are generated from the pages (`src/pages/llms*.txt.ts`, `src/llms.ts`):

- Summary and details come from the first paragraph and the rest of `get-started/introduction.md`.
- Sections follow the sidebar (`src/sidebar.mjs`), pages in sidebar order.
- **Stubs are left out**: a page is listed once it has at least 30 words besides the `:::note[Coming soon]` aside. Write the page and it shows up; there is no list to update.

## The look

The docs wear the patch-it brand (the `patch-it-brand` repo), the same as patch-it.dev:

| What | Where |
|---|---|
| Colors (Dark default, Light) mapped onto Starlight's variables | `src/styles/custom.css` |
| Wordmark in the header, with a "docs" tag | `src/assets/wordmark-plain-on-*.svg` |
| Patchy on the home page | `src/assets/bot-on-*.svg` |
| Code-block colors: the same themes as the CLI and editor | `src/themes/patch-it-*.json` |
| Favicons, app icons, social image | `public/` |
| IBM Plex Sans and Mono, self-hosted | `@fontsource/*` in `astro.config.mjs` |

When the brand changes, copy the new files over from `patch-it-brand`. Don't restyle the docs by hand.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm start        # serves dist/ on $PORT (what Railway runs)
```

## Deploy (Railway)

- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Custom domain:** `docs.patch-it.dev`. In Railway → Settings → Public Networking → + Custom Domain, then add the CNAME and the `_railway-verify` TXT it shows in Cloudflare (CNAME proxied).

## Brand

Colors, fonts and logo are in `src/styles/custom.css`, `src/assets/logo.svg` and `public/favicon.svg`. The orange accent is a placeholder until the brand color is final.
