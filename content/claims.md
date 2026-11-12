# Zupra Claims and Specifications

Last updated: October 2026

## Product

- **Name:** Zupra (zupra.dev). The product was called Canopy and is being renamed.
- **Tagline:** Understand it. Change it. Know what changed.
- **Package:** `canopy-engine`. The package and the `canopy` command will be renamed to zupra later; until then they keep working.
- **License:** Source-available, not open source.
- **Beta:** Public beta, currently `0.1.x`.
- **Install:** `npm install -g canopy-engine`, then `canopy`.
- **No-install run:** `npx -y canopy-engine@latest`.
- **Runtime:** Node.js 18 or newer.
- **Scope:** JavaScript and TypeScript source. Vue and Svelte files are skipped and counted.
- **Processing:** Zupra builds workflow maps locally from the code. Source code is not sent anywhere by Zupra.
- **AI:** Ask AI runs the user's own AI tool under the user's own login. Claude Code is the supported provider.
- **Credentials and code:** Ask AI and Edit run through the user's own Claude Code login. We never see the user's credentials or code. Code stays on the user's machine.

## The loop (what the home page and walkthrough show)

- **Understand:** The map shows services, routes (workflows) and the calls between them. A function's panel has "What breaks if I change this?", which lists direct callers, indirect callers and calls that may be missed, each with its confidence tier, and notes that runtime or dynamic calls may be missed.
- **Mental Model:** Pick a start and an end; the real calls in the code join them (Deterministic). An AI mode can connect gaps; those links are checked in the code and drawn differently ("Connected by AI, checked in code").
- **Change:** Ask AI has two modes. Ask answers in plain words with a list of places on the map you can click. Edit proposes a small change, shows what depends on it before anything is written, and asks you to allow it once or for the session.
- **Watch:** Live shows what your Claude Code agent is doing right now (reading, editing, testing), its task progress, and lights up the functions it reads or edits on the map.
- **Review:** Changes shows working (uncommitted) changes, changes since your last visit, and commits, with the functions that changed and what could be affected; changed functions are marked on the map.
- **VS Code:** The viewer is a local web page, so it can be opened in VS Code's built-in Simple Browser next to your agent and terminal.
- **Walkthrough:** The home-page walkthrough is an illustrative recreation on a made-up sample repo (acme-shop). Its numbers are not measurements.

## Planned (shown only as "coming soon")

- Security review hints.

## Confidence tiers

- **Exact:** The URL and route are written out in full and use the same method and path.
- **Resolved:** A base URL is followed through the project's own configuration, such as an environment variable, Docker Compose file, proxy, or port.
- **Inferred:** Any other relationship. Inferred links are shown dashed.

## Trust and telemetry

Zupra uses the network for an update check and a small daily ping containing a random install ID, version, operating-system family, Node.js version, and date. Disable that ping with:

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

The Golden Standard Test covers ten repositories, eight fixed questions per repository, and a 0/1/2 score per question. All repository commits and results are pending. Each repository has an evidence folder and founder-reviewed answers. Token reduction is reported only against a measured no-Zupra baseline.

## Boundaries

Zupra is a static code analysis tool, not a runtime recorder. Calls such as `obj.method()`, URLs built at runtime, variable base URLs without configuration, server-to-browser messages, runtime queue names, anonymous exports, Flow annotations, event emitters, and dynamic dispatch can be incomplete. These relationships are flagged or inferred rather than guessed.
