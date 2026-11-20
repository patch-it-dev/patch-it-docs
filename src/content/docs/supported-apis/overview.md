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

Each provider has one or more sources, each read by a plugin. [All plugins](/supported-apis/plugins/) lists them, grouped by category: what each watches and where it reads it.

## What counts as a change

| Type | Meaning |
|---|---|
| Breaking | Fails now (a removed field, a shut-down model) |
| Deprecation | Will fail on a known date |
| Behavior change | Still works, acts differently |
| Non-breaking | New feature, no action needed |

Need a provider we don't cover? [Request it](/supported-apis/request-an-api/).
