---
title: Overview
description: Which providers patch-it covers, and what counts as a breaking change.
sidebar:
  order: 1
---

| Provider | Status |
|---|---|
| Stripe | Live |
| OpenAI | Live |
| Anthropic | Live |
| Packages | Building |
| Runtimes | Building |
| CI platforms | Next |

## What counts as a change

| Type | Meaning |
|---|---|
| Breaking | Fails now (a removed field, a shut-down model) |
| Deprecation | Will fail on a known date |
| Behavior change | Still works, acts differently |
| Non-breaking | New feature, no action needed |

Need a provider we don't cover? [Request it](/supported-apis/request-an-api/).
