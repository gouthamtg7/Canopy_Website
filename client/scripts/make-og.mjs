// Renders public/og.png (1200x630) and public/apple-touch-icon.png (180x180) from content/brand.json.
// Needs Playwright (not a site dependency): `npx -y -p playwright node scripts/make-og.mjs`, or run with any Node that can import it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const pub = path.resolve(here, '../public');
const brand = JSON.parse(fs.readFileSync(path.resolve(here, '../../content/brand.json'), 'utf8'));
const { chromium } = await import(process.env.PLAYWRIGHT_PATH || 'playwright');

const mark = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#22211B"/><path d="M9.5 10.5h12.5L10 21.5h12.5" fill="none" stroke="#F6F3EB" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="10.5" r="2.6" fill="#9DB4CE"/><circle cx="22.5" cy="21.5" r="2.6" fill="#9DB4CE"/></svg>`;
const font = `system-ui, -apple-system, 'Segoe UI Variable Display', 'Segoe UI', Roboto, sans-serif`;
const [l1, l2, l3] = brand.tagline.split(/(?<=\.)\s+/);

const og = `<html><body style="margin:0;width:1200px;height:630px;background:#F6F3EB;font-family:${font};color:#22211B;position:relative;overflow:hidden">
<div style="position:absolute;inset:0;background:radial-gradient(50% 60% at 85% 10%,rgba(74,100,128,.16),transparent 70%),radial-gradient(40% 50% at 5% 100%,rgba(140,82,44,.08),transparent 70%)"></div>
<div style="position:absolute;inset:0;background:radial-gradient(circle at 1px 1px,rgba(120,105,70,.14) 1px,transparent 0) 0 0/22px 22px;mask-image:linear-gradient(90deg,transparent 35%,#000)"></div>
<div style="position:absolute;left:80px;top:72px;display:flex;align-items:center;gap:16px">${mark(52)}<span style="font-size:38px;font-weight:600;letter-spacing:-.035em">zupra</span></div>
<div style="position:absolute;left:80px;top:178px;font-size:84px;line-height:1.02;font-weight:600;letter-spacing:-.045em">${l1}<br>${l2}<br><span style="color:#57523F">${l3}</span></div>
<div style="position:absolute;left:80px;bottom:62px;font-size:24px;color:#57523F">A map of your JS/TS codebase, built on your machine.</div>
<div style="position:absolute;right:80px;bottom:62px;font:500 22px ui-monospace,Consolas,monospace;color:#736D56">${brand.domain}</div>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(og);
await p.screenshot({ path: path.join(pub, 'og.png') });
await p.setViewportSize({ width: 180, height: 180 });
await p.setContent(`<html><body style="margin:0;background:#22211B">${mark(180).replace('rx="9"', 'rx="0"')}</body></html>`);
await p.screenshot({ path: path.join(pub, 'apple-touch-icon.png') });
await b.close();
console.log('wrote og.png and apple-touch-icon.png');
