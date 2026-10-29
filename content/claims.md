# Canopy Claims and Specifications

Last updated: October 2026

## Product

- **Tagline:** See how your code actually works.
- **Package:** `canopy-engine`
- **Beta:** Public beta, currently `0.1.x`.
- **Install:** `npm install -g canopy-engine`, then `canopy`.
- **No-install run:** `npx -y canopy-engine@latest`.
- **Runtime:** Node.js 18 or newer.
- **Scope:** JavaScript and TypeScript source. Vue and Svelte files are skipped and counted.
- **Processing:** Canopy builds workflow maps locally from the code. Source code is not sent anywhere by Canopy.
- **AI:** Ask AI runs the user's own AI tool under the user's own login. Claude Code is the supported provider.

## Confidence tiers

- **Exact:** The URL and route are written out in full and use the same method and path.
- **Resolved:** A base URL is followed through the project's own configuration, such as an environment variable, Docker Compose file, proxy, or port.
- **Inferred:** Any other relationship. Inferred links are shown dashed.

## Trust and telemetry

Canopy uses the network for an update check and a small daily ping containing a random install ID, version, operating-system family, Node.js version, and date. Disable that ping with:

```text
canopy telemetry off
CANOPY_TELEMETRY=0
DO_NOT_TRACK=1
```

Ask AI uses the user's separately configured AI tool and account.

## Supported source extensions

`.js`, `.jsx`, `.mjs`, `.cjs`, `.ts`, `.mts`, `.cts`, `.tsx`, and HTML files with `<script src>`. Vue and Svelte files are skipped.

## Benchmark testbed

The measured runs use an Intel Core i5-12450H with 8 cores / 12 threads, 7.6 GB RAM, Windows 11 Home, and Node.js v22.12.0. Disk type is not recorded. Measurements are single runs, not medians. Commit hashes, most dates, first-view timings, and peak memory are pending. No AST-node counts are published.

## GST status

The Golden Standard Test covers ten repositories, eight fixed questions per repository, and a 0/1/2 score per question. All repository commits and results are pending. Each repository has an evidence folder and founder-reviewed answers. Token reduction is reported only against a measured no-Canopy baseline.

## Boundaries

Canopy is a static code analysis tool, not a runtime recorder. Calls such as `obj.method()`, URLs built at runtime, variable base URLs without configuration, server-to-browser messages, runtime queue names, anonymous exports, Flow annotations, event emitters, and dynamic dispatch can be incomplete. These relationships are flagged or inferred rather than guessed.
