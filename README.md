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
