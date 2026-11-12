import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(root, '../content');
const brand = JSON.parse(fs.readFileSync(path.join(contentDir, 'brand.json'), 'utf8'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function docSlugs() {
  return fs.readdirSync(path.join(contentDir, 'docs')).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

/** Brand-driven HTML and crawler files: index.html placeholders, sitemap.xml, robots.txt, llms.txt. */
function brandPlugin() {
  const home = brand.pages['/'];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: brand.name,
    url: brand.url,
    description: brand.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows, macOS, Linux (Node.js 18+)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    softwareHelp: `${brand.url}/docs/quickstart`,
  };
  const files = () => {
    const routes = [...Object.keys(brand.pages), ...docSlugs().map((s) => `/docs/${s}`)];
    const unique = [...new Set(routes)];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map((r) => `  <url><loc>${brand.url}${r === '/' ? '/' : r}</loc></url>`).join('\n')}\n</urlset>\n`;
    const robots = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${brand.url}/sitemap.xml\n`;
    const docs = docSlugs().map((s) => `- [${s.replace(/-/g, ' ')}](${brand.url}/docs/${s})`).join('\n');
    const llms = `# ${brand.name}\n\n> ${brand.description}\n\n${brand.name} is a local tool for JavaScript and TypeScript repositories. It is in public beta.\n\n- Install: \`${brand.installCommand}\`, then run \`${brand.runCommand}\` in your repo.\n- ${brand.renameNote}\n- ${brand.privacyLine}\n- It is source-available, not open source.\n\n## Docs\n\n${docs}\n\n## Facts\n\n- [Claims](${brand.url}/claims): every claim the site makes.\n- [Changelog](${brand.url}/changelog)\n- [Privacy](${brand.url}/privacy)\n`;
    return { 'sitemap.xml': sitemap, 'robots.txt': robots, 'llms.txt': llms };
  };
  return {
    name: 'zupra-brand',
    transformIndexHtml(html) {
      return html
        .replaceAll('%BRAND_TITLE%', esc(home.title))
        .replaceAll('%BRAND_DESCRIPTION%', esc(home.description))
        .replaceAll('%BRAND_URL%', esc(brand.url))
        .replaceAll('%BRAND_NAME%', esc(brand.name))
        .replace('%BRAND_JSONLD%', JSON.stringify(jsonLd).replace(/</g, '\\u003c'));
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = (req.url || '').slice(1);
        const out = files()[name];
        if (!out) return next();
        res.setHeader('Content-Type', name.endsWith('.xml') ? 'application/xml' : 'text/plain; charset=utf-8');
        res.end(out);
      });
    },
    generateBundle() {
      for (const [fileName, source] of Object.entries(files())) this.emitFile({ type: 'asset', fileName, source });
    },
  };
}

export default defineConfig({
  plugins: [react(), brandPlugin()],
  resolve: { alias: { '@content': contentDir } },
  server: {
    port: 5173,
    fs: { allow: [root, contentDir] },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] },
      },
    },
  },
});
