---
title: Troubleshooting
description: Diagnose global npm path conflicts, updates, cache, and memory issues.
slug: troubleshooting
order: 7
---

# Troubleshooting

## Version mismatch

Run these commands in order:

```bash
npm ls -g canopy-engine
npm prefix -g
canopy --version
canopy update --check
canopy doctor
npm install -g canopy-engine@latest
```

On Windows, locate every executable:

```powershell
where canopy
```

On macOS or Linux:

```bash
which -a canopy
```

If a shell alias shadows the npm executable, inspect or remove it:

```bash
alias canopy-engine
```

## Cache locations

- Windows: `%LOCALAPPDATA%\canopy\projects\<hash>`
- macOS: `~/Library/Caches/canopy/projects/<hash>`
- Linux: `$XDG_CACHE_HOME/canopy/projects/<hash>` or `~/.cache/canopy/projects/<hash>`

Consent configuration is stored at `%APPDATA%\canopy\config.json` on Windows or `~/.config/canopy/config.json` on macOS and Linux.

## Memory and disk

Analysis uses about 75% of RAM and needs 300 MB of free disk space. Set `CANOPY_MAX_MEMORY_MB` to override the memory limit. If the process stops cleanly with exit code 3, reduce the repository scope or increase the configured limit within available hardware.
