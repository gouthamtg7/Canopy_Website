---
title: Known Limitations
description: Current language, framework, static-analysis, and resource boundaries.
slug: known-limitations
order: 9
---

# Known Limitations

## Language and file coverage

Canopy analyzes `.js`, `.jsx`, `.mjs`, `.cjs`, `.ts`, `.mts`, `.cts`, `.tsx`, and HTML files with `<script src>`. Vue and Svelte files are skipped and counted. Other languages are outside the supported scope.

## Incomplete static patterns

The following patterns can be incomplete:

- `obj.method()` calls where the receiver cannot be resolved
- URLs built at runtime
- Variable base URLs without project configuration
- Server-to-browser messages
- Runtime queue names
- Anonymous exports
- Flow annotations
- Event emitters and dynamic dispatch

Canopy flags these relationships or marks them inferred; it does not guess them as exact.

## Resource limits

Analysis uses about 75% of available RAM, generally 2–8 GB. Set `CANOPY_MAX_MEMORY_MB` to override the limit. Canopy stops cleanly with exit code 3 past `min(4 GB, 70% of RAM)`. At least 300 MB of free disk space is required.

## Accuracy

Accuracy figures will be published after the Golden Standard Test is complete. Canopy is a static map and does not record runtime execution. AI code edits are not shipped.
