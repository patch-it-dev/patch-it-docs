---
title: All plugins
description: Every provider and source patch-it watches, grouped by category, with what each reports and where it reads it.
sidebar:
  order: 2
---

patch-it watches providers (Stripe, OpenAI, GitHub…), each through one or more sources: the provider's own spec, changelog, deprecations page or feed, read so that each change becomes an event with a link and a quote. A source's id is `provider/source`, like `stripe/api`. The plugins are open source in [patch-it-plugins](https://github.com/patch-it-dev/patch-it-plugins) (Apache-2.0), where each source is registered in code; this list is built from the `plugins.json` attached to its latest release, every time these docs are built.

<!-- plugins:start -->
:::note
The list is temporarily unavailable. It is read from the latest [patch-it-plugins release](https://github.com/patch-it-dev/patch-it-plugins/releases/latest) when these docs are built; it will be back on the next build.
:::
<!-- plugins:end -->

**Layer** is which part of your stack a source covers: `api`, `sdk`, `package`, `runtime`, `ci`, `ai-models` or `infra`. Every source listed is read on a schedule, with no one triggering it.

Missing a provider? [Request it](/supported-apis/request-an-api/), or [write the plugin](https://github.com/patch-it-dev/patch-it-plugins/blob/main/CONTRIBUTING.md).
