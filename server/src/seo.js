import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Server-side per-route <head>: crawlers and link previews get the right title, description and canonical
// without running JavaScript. Values come from content/brand.json (and docs frontmatter for /docs/*).
const CONTENT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../content');
let cache = null;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function load(file) {
  const mtime = (await fs.stat(file)).mtimeMs;
  if (cache && cache.file === file && cache.mtime === mtime) return cache;
  const [html, brand] = await Promise.all([fs.readFile(file, 'utf8'), fs.readFile(path.join(CONTENT_DIR, 'brand.json'), 'utf8').then(JSON.parse)]);
  cache = { file, mtime, html, brand };
  return cache;
}

async function docMeta(slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const md = await fs.readFile(path.join(CONTENT_DIR, 'docs', `${slug}.md`), 'utf8');
    const fm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const get = (k) => fm?.[1].match(new RegExp(`^${k}:\s*(.+)$`, 'm'))?.[1].trim();
    return { title: get('title'), description: get('description') };
  } catch { return null; }
}

export async function renderShell(file, reqPath) {
  const { html, brand } = await load(file);
  const p = reqPath.length > 1 ? reqPath.replace(/\/+$/, '') : '/';
  let meta = brand.pages[p];
  if (!meta && p.startsWith('/docs/')) {
    const d = await docMeta(p.slice(6));
    if (d?.title) meta = { title: `${d.title} docs · ${brand.name}`, description: d.description || brand.description };
  }
  if (!meta) return html;
  const url = `${brand.url}${p === '/' ? '/' : p}`;
  const t = esc(meta.title), d = esc(meta.description), u = esc(url);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${u}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${u}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${d}`);
}
