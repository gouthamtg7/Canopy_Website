---
title: Quickstart
description: Install Canopy and open a local workflow map.
slug: quickstart
order: 1
---

# Quickstart

Canopy turns a JavaScript or TypeScript repository into a clickable map of its workflows. Analysis runs on your computer.

## Requirements

- Node.js 18 or newer
- Windows, macOS, or Linux
- A JavaScript or TypeScript repository

## Install and run

```bash
npm install -g canopy-engine
canopy
```

To run without a global install:

```bash
npx -y canopy-engine@latest
```

Canopy scans supported source files, builds a local map, and opens the canvas. Vue and Svelte files are skipped and counted.

## Common options

```text
canopy [path]
canopy -y --no-hook --no-open --port=N --for=SECONDS --full --quiet --no-color
```

See the [CLI reference](/docs/cli-reference) for commands, exit codes, cache paths, and memory settings.
