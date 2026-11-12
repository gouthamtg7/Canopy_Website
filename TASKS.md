# Zupra home: task list

Branch: `zupra-home` (website repo). Never push/deploy. `C:\Canopy\canopy-engine` is READ-ONLY.
Engine git baseline (before): `M scripts/git-hooks/post-commit`, `M scripts/git-hooks/post-merge` (pre-existing, not ours) at 40d721d.

## Plan
- [x] T1 Brand config `content/brand.json` (name, domain, tagline, commands, rename note, forms, video/social links, page SEO) + client import alias `@content`
- [x] T2 Palette from product (warm paper / ink / slate / sage / terracotta) + dark variant; remap Tailwind tokens so every page re-skins; system font stack like product
- [x] T3 Logo mark + wordmark component, favicon.svg, apple-touch-icon, OG image (script `client/scripts/make-og.mjs`)
- [x] T4 Header/Footer rebuilt (quiet nav, everything else in footer)
- [x] T5 Home: Hero (headline + loop + copy install) / Demo / Videos / Reviews / Install CTA. Delete old home sections
- [x] T6 Demo: product mock (topbar, sidebar, canvas, node panel, blast radius, Mental Model, Ask/Edit, Live HUD, Changes), cursor, spotlight, captions, chapters, autoplay-on-visible, takeover, Browser vs VS Code frames, phone layout, reduced motion; lazy-loaded
- [x] T7 Content: `content/videos.json`, `content/reviews.json` (real only), claims.md additions, rename Canopy→Zupra in visible copy (keep package/command names)
- [x] T8 Forms → Google Forms / mailto from brand config (Community page)
- [x] T9 SEO: per-page title/description/canonical (client + server-injected), OG/Twitter, JSON-LD, sitemap.xml, robots.txt, llms.txt; CSP for YouTube
- [x] T10 Tests: fix smoke for react-router v7, update server tests for new content; build passes
- [x] T11 Visual QA in Playwright: 375/768/1280/1920, light+dark, all demo steps, both views, console clean; Lighthouse mobile perf ≥90, a11y ≥95
- [x] T12 REPORT-zupra-home.md with screenshots; engine git status after; kill processes
