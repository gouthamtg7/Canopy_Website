import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { MarkdownRenderer } = await vite.ssrLoadModule('/src/components/docs/MarkdownRenderer.jsx');
  for (const payload of ['[bad](javascript:alert)', '[bad](data:text/html,evil)', '<img src=x onerror=alert(1)>']) {
    const html = renderToString(React.createElement(MarkdownRenderer, { content: payload }));
    assert.ok(!html.includes('href="javascript:') && !html.includes('href="data:') && !html.includes('<img'));
  }
  const markdown = renderToString(React.createElement(MarkdownRenderer, { content: '# Guide\n\n```bash\nnpm i -g canopy-engine\n```\n\n| A | B |\n|---|---|\n| 1 | 2 |' }));
  assert.ok(markdown.includes('<table') && markdown.includes('Copy code to clipboard') && markdown.includes('npm i -g canopy-engine'));
  // Static rendering catches component/import failures; interactive browser QA is separate.
  const { StaticRouter } = await import('react-router-dom/server.js');
  for (const name of ['HomePage', 'DocsPage', 'BenchmarksPage', 'GstPage', 'ReviewsPage', 'CommunityPage']) {
    const module = await vite.ssrLoadModule(`/src/pages/${name}.jsx`);
    const html = renderToString(React.createElement(StaticRouter, { location: "/" }, React.createElement(module[name])));
    assert.ok(html.length > 100, `${name} rendered`);
  }
  console.log('Page rendering and Markdown security smoke checks passed.');
} finally { await vite.close(); }

