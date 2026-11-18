---
title: All plugins
description: Every source patch-it watches today, one plugin each, with what it reports and where it reads it.
sidebar:
  order: 2
---

Every source patch-it watches is one plugin: it reads the provider's own page, spec or feed and turns each change into an event with a link and a quote. This is the full list. Plugins are open source in [patch-it-plugins](https://github.com/patch-it-dev/patch-it-plugins) (Apache-2.0), and this table is copied from its [`docs/plugins.md`](https://github.com/patch-it-dev/patch-it-plugins/blob/main/docs/plugins.md) whenever these docs are built.

<!-- plugins:start -->
| Plugin (`--api`) | Provider | What it watches | Format plugin | Source | Status |
|---|---|---|---|---|---|
| `stripe` | Stripe | REST API changes between OpenAPI spec releases (removed and renamed endpoints, parameters and fields), with migration hints from Stripe's API changelog | `openapi` | [stripe/openapi](https://github.com/stripe/openapi) | live |
| `datadog` | Datadog | API v2 changes between OpenAPI spec releases | `openapi` | [DataDog/datadog-api-client-python](https://github.com/DataDog/datadog-api-client-python) (`.generator/schemas/v2/openapi.yaml`) | live |
| `github` | GitHub | REST API changes between dated API versions | `openapi` | [github/rest-api-description](https://github.com/github/rest-api-description) | live |
| `gitlab` | GitLab | REST API changes between releases, request side only (what callers send) | `openapi` | [gitlab-org/gitlab `doc/api/openapi`](https://gitlab.com/gitlab-org/gitlab/-/tree/master/doc/api/openapi) | live |
| `openai-models` | OpenAI | Model deprecations and shutdown dates (Chat Completions and Responses text models) | `retirements` | [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations) | live |
| `anthropic-models` | Anthropic | Model deprecations and retirement dates (Messages API models) | `retirements` | [Anthropic model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations) | live |
| `anthropic` | Anthropic | Parameters removed from `messages.create()` and friends in the Python SDK 1.0 | `migrationguide` | [anthropic-sdk-python MIGRATION.md](https://github.com/anthropics/anthropic-sdk-python/blob/v1.0.0/MIGRATION.md) | live |
| `numpy` | NumPy | Members removed or renamed in the main namespace in NumPy 2.0 | `removedmembers` | [NumPy 2.0 migration guide](https://github.com/numpy/numpy/blob/v2.0.0/doc/source/numpy_2_0_migration_guide.rst) | live |
| `textual` | Textual | Removals and breaking changes in release 0.86.0 | `changelog` | [Textualize/textual CHANGELOG.md](https://github.com/Textualize/textual/blob/v0.86.0/CHANGELOG.md) | live |
| `urllib3` | urllib3 | Removals and deprecations in release 2.0.0 | `changelog` | [urllib3/urllib3 CHANGES.rst](https://github.com/urllib3/urllib3/blob/2.0.0/CHANGES.rst) | live |
| `github-actions` | GitHub | GitHub Actions retirements, such as runner images and the `runs-on` labels they remove | `feed` | [GitHub changelog, Actions label (RSS)](https://github.blog/changelog/label/actions/feed/) | live |
| `vertex-ai-models` | Google | Generative AI model deprecations on Vertex AI | `feed` | [Vertex AI generative AI release notes (Atom)](https://docs.cloud.google.com/feeds/generative-ai-on-vertex-ai-release-notes.xml) | live |
<!-- plugins:end -->

**Format plugin** is the shared reader a plugin is built on: `openapi` diffs a spec per release, `retirements` reads a deprecations page, `migrationguide` and `removedmembers` read migration guides, `changelog` reads a release changelog, `feed` reads an RSS or Atom feed. **Live** means it runs every day.

Missing a provider? [Request it](/supported-apis/request-an-api/), or [write the plugin](https://github.com/patch-it-dev/patch-it-plugins/blob/main/CONTRIBUTING.md).
