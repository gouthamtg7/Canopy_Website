---
title: MCP Server Integration
description: Connect Claude Code to the local Canopy workflow map.
slug: mcp
order: 5
---

# MCP Server Integration

Canopy provides a local Model Context Protocol server for Claude Code.

## Setup

```bash
canopy mcp
```

The no-install form is:

```bash
npx -y canopy-engine@latest mcp
```

To install the supported client configuration:

```bash
canopy install
```

## What Claude Code can query

- workflow paths
- symbols and source locations
- upstream callers
- downstream calls
- exact, resolved, and inferred edge explanations

The map is derived from static code analysis. Runtime-generated paths can remain inferred or incomplete.
