---
title: How it works
description: The two loops and why your code never leaves your CI.
sidebar:
  order: 3
---

1. **We watch providers.** We read their own sources every day: API specs, changelogs, shutdown pages and SDK migration guides. Each change becomes one event with a link and a quote from the source. No source, no event.
2. **Your CI pulls new changes.** The GitHub Action asks our API for changes since its last run. That request is the only thing that crosses from your side to ours.
3. **It finds your code.** The Action scans your repo for the affected lines and asks your model whether each one is really affected.
4. **You get a pull request.** Confident fixes become a PR you review and merge like any other. Anything uncertain becomes an issue instead.

:::note[Coming soon]
This page is being written. Want it sooner? [Open an issue](https://github.com/patch-it-dev/patch-it-docs/issues).
:::
