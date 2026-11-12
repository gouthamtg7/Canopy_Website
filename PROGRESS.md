# Progress log (Zupra home)

## Session 1 (2026-11-13)
- Baseline: server tests pass; client smoke FAILED before any change (react-router v7 bump left uncommitted by user removes `react-router-dom/server.js`). User's package.json bump kept.
- Explored real product: ran global `canopy` (0.1.20, real npm install, not linked to engine) on a copied sample repo in the session scratchpad with CANOPY_NO_BROWSER=1, telemetry off. Screenshots in scratchpad `real/`. Viewer killed afterwards.
  - Note: two `canopy` node processes (PIDs 21528/13536, started 2026-11-12 23:15) belong to the user and were left alone.
- Product look: warm paper `#f3efe3`/raised `#faf7ee`/contour `#d9d0ba`, ink `#2b2a22`/dim `#6b664f`, accents sage `#4f7a5c`, terracotta `#9a5b32`, slate `#4a6480`, purple `#6b5a8f`; system-ui type; mono meta; pill toolbar; Live HUD dark green `#0f1f16`/`#3dff8b`.
- Decisions: system font stack (matches product, zero CLS); product mock stays light in both site themes (product has no dark theme); mock UI keeps product name via `brand.productUiName` ("Canopy") since it mirrors shipped UI.
- Done: T1 brand.json + vite brand plugin (sitemap/robots/llms), T2 palette, T3 logo/favicon/OG (scripts/make-og.mjs), T4 header/footer, T5 home sections, T6 demo (browser + VS Code, phone layouts, takeover), T7 rename + claims, T8 forms page, T9 SEO (client applySeo + server/src/seo.js per-route head), CSP for YouTube.
- Server fixes found in QA: shell cache now keyed on mtime; missing asset paths 404 instead of HTML.
- QA server: production Express on :5055 (CORS_ORIGIN=http://localhost:5055), PID in scratchpad site.pid. Kill when done.
- Next: tests, dark/tablet/wide QA, Lighthouse, report.
- Session 1 complete: tests pass (server, smoke from C:\ path, build); Lighthouse mobile median ~90 perf (84-96 under ~60% background CPU), a11y/BP/SEO 100, CLS 0. Engine status identical before/after. All my processes killed. See REPORT-zupra-home.md.
