import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, '../../../content');

// Helper to parse simple frontmatter from markdown files
function parseFrontmatter(markdownText) {
  const match = markdownText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: markdownText };
  }

  const rawMeta = match[1];
  const content = match[2];
  const frontmatter = {};

  rawMeta.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();
      if (!isNaN(val) && val !== '') val = Number(val);
      frontmatter[key] = val;
    }
  });

  return { frontmatter, content };
}

export async function getClaims(req, res, next) {
  try {
    const filePath = path.join(CONTENT_DIR, 'claims.md');
    const rawMarkdown = await fs.readFile(filePath, 'utf-8');
    res.json({
      title: 'Canopy Verified Claims & Specifications',
      raw: rawMarkdown,
      updatedAt: 'October 2026',
    });
  } catch (error) {
    next(error);
  }
}

export async function getBenchmarks(req, res, next) {
  try {
    const filePath = path.join(CONTENT_DIR, 'benchmarks.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const benchmarks = JSON.parse(rawData);
    res.json({
      count: benchmarks.length,
      benchmarks,
    });
  } catch (error) {
    next(error);
  }
}

export async function getGstResults(req, res, next) {
  try {
    const filePath = path.join(CONTENT_DIR, 'gst-results.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const gstData = JSON.parse(rawData);
    res.json(gstData);
  } catch (error) {
    next(error);
  }
}

export async function getReviews(req, res, next) {
  try {
    const filePath = path.join(CONTENT_DIR, 'reviews.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const reviews = JSON.parse(rawData);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

export async function getSiteMetadata(req, res, next) {
  try {
    const filePath = path.join(CONTENT_DIR, 'site.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const site = JSON.parse(rawData);
    try {
      const npmResponse = await fetch('https://registry.npmjs.org/canopy-engine/latest', {
        signal: AbortSignal.timeout(3000),
        headers: { Accept: 'application/json' },
      });
      if (!npmResponse.ok) throw new Error(`npm registry returned HTTP ${npmResponse.status}`);
      const npmData = await npmResponse.json();
      if (typeof npmData.version !== 'string' || npmData.version.length === 0) throw new Error('npm registry response did not include a version');
      site.version = npmData.version;
      site.versionSource = 'https://registry.npmjs.org/canopy-engine/latest';
    } catch (error) {
      site.versionStatus = 'unavailable';
      site.versionError = error.message;
    }
    res.json(site);
  } catch (error) {
    next(error);
  }
}

export async function getDocsList(req, res, next) {
  try {
    const docsDir = path.join(CONTENT_DIR, 'docs');
    const files = await fs.readdir(docsDir);
    const docs = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const fullPath = path.join(docsDir, file);
        const text = await fs.readFile(fullPath, 'utf-8');
        const { frontmatter, content } = parseFrontmatter(text);
        const slug = frontmatter.slug || file.replace(/\.md$/, '');
        docs.push({
          slug,
          title: frontmatter.title || slug,
          description: frontmatter.description || '',
          order: frontmatter.order || 99,
          searchText: content,
        });
      }
    }

    docs.sort((a, b) => a.order - b.order);
    res.json({ count: docs.length, docs });
  } catch (error) {
    next(error);
  }
}

export async function getDocBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    // Prevent directory traversal
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) return res.status(400).json({ message: 'Invalid documentation slug.' });
    const safeSlug = slug;
    const docsDir = path.join(CONTENT_DIR, 'docs');
    const filePath = path.join(docsDir, `${safeSlug}.md`);

    try {
      const text = await fs.readFile(filePath, 'utf-8');
      const { frontmatter, content } = parseFrontmatter(text);
      res.json({
        slug: safeSlug,
        title: frontmatter.title || safeSlug,
        description: frontmatter.description || '',
        order: frontmatter.order || 99,
        content,
      });
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({
          status: 404,
          error: 'Document Not Found',
          message: `Documentation page for '${safeSlug}' was not found.`,
        });
      }
      throw err;
    }
  } catch (error) {
    next(error);
  }
}

const pages = { claims: ['claims.md', 'Verified Claims'], privacy: ['privacy.md', 'Privacy'], license: ['license.md', 'License'], changelog: ['changelog.md', 'Changelog'], 'third-party-notices': ['third-party-notices.md', 'Third-Party Notices'] };
export async function getPage(req, res, next) {
  const entry = Object.hasOwn(pages, req.params.slug) ? pages[req.params.slug] : null;
  if (!entry) return res.status(404).json({ message: 'Page not found.' });
  try { res.json({ title: entry[1], content: await fs.readFile(path.join(CONTENT_DIR, entry[0]), 'utf8') }); }
  catch (error) { next(error); }
}
