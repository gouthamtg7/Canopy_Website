---
title: CLI Reference
description: Canopy commands, flags, cache paths, and exit codes.
slug: cli-reference
order: 6
---

# CLI Reference

## Commands

```text
canopy [path]
sync [--profile]
open
doctor
history
diff [--json]
hook install|remove
ai
telemetry
mcp
install|uninstall [--yes]
update [--check] [--yes]
--version
--help
```

## Main flags

```text
-y
--no-hook
--no-open
--port=N
--for=SECONDS
--full
--quiet
--no-color
```

## Exit codes

- `0`: completed successfully
- `1`: problem
- `3`: no JavaScript or TypeScript files

## Cache and consent

- Windows project cache: `%LOCALAPPDATA%\canopy\projects\<hash>`
- macOS project cache: `~/Library/Caches/canopy/projects/<hash>`
- Linux project cache: `$XDG_CACHE_HOME/canopy/projects/<hash>` or `~/.cache/canopy/projects/<hash>`
- Windows consent: `%APPDATA%\canopy\config.json`
- macOS/Linux consent: `~/.config/canopy/config.json`

Set `CANOPY_MAX_MEMORY_MB` to override the analysis memory limit.
