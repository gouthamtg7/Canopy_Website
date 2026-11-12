---
title: Ask AI
description: Use Claude Code and MCP with your own login to query a Zupra map.
slug: ask-ai
order: 4
---

# Ask AI

Ask AI runs your own AI tool under your own login. Claude Code is the supported provider; other providers are not yet supported. Zupra does not ship AI code edits.

## MCP

Start the local server with:

```bash
canopy mcp
```

Use `canopy install` to install the MCP configuration supported by your Claude Code setup.

## Questions

Claude Code can query indexed symbols, upstream callers, downstream calls, workflows, and edge confidence. Inferred relationships remain visibly dashed so the answer can distinguish static evidence from prediction.

## Privacy

Zupra does not send source code anywhere. Ask AI sends requests through the user's own Claude Code login and provider configuration.
