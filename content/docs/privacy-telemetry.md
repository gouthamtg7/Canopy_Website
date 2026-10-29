---
title: Privacy and Telemetry
description: Our strict local-first privacy architecture and explicit telemetry off switches.
slug: privacy-telemetry
order: 8
---

# Privacy and Telemetry

Canopy runs on your computer. Your code is never sent anywhere by Canopy.

---

## 1. Absolute Local-First Guarantees

1. **Source Code Stays Local**: Analysis runs in local Node.js processes. Canopy does not send source code anywhere.
2. **Store Lives Outside Your Repository**: Project caches use the platform paths documented in the CLI reference.
3. **Your AI Login**: Ask AI runs your own AI tool under your own login. Claude Code is the supported provider.

---

## 2. Two-Tier Telemetry Architecture

We operate with total transparency regarding what telemetry is collected:

The only network use is an update check and a small daily ping containing a random install ID, version, operating-system family, Node.js version, and date.

---

## 3. Explicit Off Switches

We respect your right to zero telemetry. You can permanently turn off all network requests through any of these three mechanisms:

### Method 1: CLI Command
```bash
canopy telemetry off
```
This writes a permanent flag to `~/.canopy/config.json`.

### Method 2: Environment Variable
```bash
export CANOPY_TELEMETRY=0
```

### Method 3: Industry Standard Do Not Track
```bash
export DO_NOT_TRACK=1
```
Canopy honors the standard `DO_NOT_TRACK` environment variable.
