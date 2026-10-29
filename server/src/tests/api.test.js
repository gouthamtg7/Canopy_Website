import assert from 'node:assert/strict';
import http from 'node:http';
import { createApp } from '../app.js';
import { connectDB, disconnectDB } from '../config/db.js';

process.env.NODE_ENV = 'test';
process.env.PORT = '5001';

const app = createApp();
let server;
let baseUrl;

async function request(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json();
  return { status: response.status, data };
}

async function runTests() {
  console.log('--- Starting Canopy API Test Suite ---');


  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  console.log(`Test server running at ${baseUrl}`);

  try {
    // 1. Health endpoint
    console.log('[Test 1] GET /api/health');
    const health = await request('/api/health');
    assert.equal(health.status, 200);
    assert.equal(health.data.status, 'ok');
    console.log('✓ Health check passed');

    // 2. Claims endpoint
    console.log('[Test 2] GET /api/claims');
    const claims = await request('/api/claims');
    assert.equal(claims.status, 200);
    assert.ok(claims.data.raw.includes('Canopy Claims'));
    console.log('✓ Claims endpoint passed');

    // 3. Benchmarks endpoint
    console.log('[Test 3] GET /api/benchmarks');
    const benchmarks = await request('/api/benchmarks');
    assert.equal(benchmarks.status, 200);
    assert.equal(benchmarks.data.count, 3);
    assert.equal(benchmarks.data.benchmarks[0].name, 'Novu');
    console.log('✓ Benchmarks endpoint passed (3 measured runs)');

    // 4. GST Results endpoint
    console.log('[Test 4] GET /api/gst-results');
    const gst = await request('/api/gst-results');
    assert.equal(gst.status, 200);
    assert.equal(gst.data.repositories.length, 10);
    console.log('✓ GST results endpoint passed (10 pinned repos verified)');

    // 5. Reviews endpoint
    console.log('[Test 5] GET /api/reviews');
    const reviews = await request('/api/reviews');
    assert.equal(reviews.status, 200);
    assert.equal(reviews.data.emptyState.title, 'Be the first.');
    console.log('✓ Reviews endpoint passed');

    // 6. Docs List & Single Doc
    console.log('[Test 6] GET /api/docs and /api/docs/quickstart');
    const docs = await request('/api/docs');
    assert.equal(docs.status, 200);
    assert.ok(docs.data.count >= 9);

    const quickstart = await request('/api/docs/quickstart');
    assert.equal(quickstart.status, 200);
    assert.equal(quickstart.data.slug, 'quickstart');
    assert.ok(quickstart.data.content.includes('npm install -g canopy-engine'));
    console.log('✓ Docs endpoints passed');

    // 7. Early testers waitlist validation
    console.log('[Test 7] POST /api/waitlist/early-testers (Zod Validation)');
    // Bad payload: missing stack and OS
    const badEarlyTester = await request('/api/waitlist/early-testers', {
      method: 'POST',
      body: JSON.stringify({ email: 'bad-email' }),
    });
    assert.equal(badEarlyTester.status, 400);
    assert.equal(badEarlyTester.data.error, 'Validation Error');

    // Good payload
    const goodEarlyTester = await request('/api/waitlist/early-testers', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test.dev@example.com',
        stack: ['TypeScript', 'Express', 'React'],
        repoSizeBucket: '200-1000 files',
        operatingSystem: 'Windows 11 / 10',
        timeZone: 'UTC+5:30 (IST)',
      }),
    });
    assert.equal(goodEarlyTester.status, 503);
    assert.equal(goodEarlyTester.data.success, false);
    console.log('✓ Early tester validation & submission passed');

    // 8. Teams waitlist
    console.log('[Test 8] POST /api/waitlist/teams');
    const goodTeams = await request('/api/waitlist/teams', {
      method: 'POST',
      body: JSON.stringify({
        workEmail: 'lead@enterprise.com',
        teamSize: '6-20 developers',
        companyName: 'Acme Cloud Corp',
        primaryUseCase: 'Shared architecture maps across engineering team',
      }),
    });
    assert.equal(goodTeams.status, 503);
    console.log('✓ Teams waitlist submission passed');

    // 9. Feedback submission
    console.log('[Test 9] POST /api/feedback');
    const goodFeedback = await request('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        category: 'limitation_reproduction',
        title: 'Speculative edge on dynamic import',
        message: 'Observed a speculative badge when using computed template string in import() statement.',
        repoUrl: 'https://github.com/example/repo',
        canopyVersion: '1.0.0-rc.3',
      }),
    });
    assert.equal(goodFeedback.status, 503);
    console.log('✓ Feedback submission passed');

    // 10. 404 Handler
    console.log('[Test 10] 404 Catch-All');
    const notFound = await request('/api/non-existent-route');
    assert.equal(notFound.status, 404);
    console.log('✓ 404 handler passed');

    for (const slug of ['privacy', 'license', 'changelog', 'claims', 'third-party-notices']) assert.equal((await request(`/api/pages/${slug}`)).status, 200);
    assert.equal((await request('/api/pages/constructor')).status, 404);
    assert.equal((await request('/api/docs/bad.slug')).status, 400);
    assert.equal((await request('/api/health', { headers: { Origin: 'https://untrusted.invalid' } })).status, 403);
    assert.equal((await request('/api/health', { headers: { Origin: 'http://localhost:5173' } })).status, 200);
    assert.equal((await request('/api/feedback', { method: 'POST', body: '{' })).status, 400);
    const security = await fetch(`${baseUrl}/api/health`);
    assert.ok(security.headers.get('content-security-policy'));
    assert.equal(security.headers.get('x-content-type-options'), 'nosniff');
    for (const repo of gst.data.repositories) assert.equal(repo.status, 'results pending');
    for (let index = 0; index < 25; index++) {
      const attempt = await request('/api/feedback', { method: 'POST', body: '{}' });
      if (index === 24) assert.equal(attempt.status, 429);
    }
    process.env.NODE_ENV = 'production';
    const production = http.createServer(createApp());
    await new Promise(resolve => production.listen(0, '127.0.0.1', resolve));
    try {
      const origin = `http://127.0.0.1:${production.address().port}`;
      for (const path of ['/', '/docs/quickstart', '/community', '/missing-page']) {
        const page = await fetch(origin + path);
        assert.equal(page.status, 200);
        assert.ok((await page.text()).includes('id="root"'));
      }
      const page = await (await fetch(origin)).text();
      const assets = [...page.matchAll(/(?:src|href)="([^" ]+\.(?:js|css))"/g)].map(match => match[1]);
      assert.ok(assets.length >= 3);
      for (const asset of assets) assert.equal((await fetch(origin + asset)).status, 200);
      assert.equal((await fetch(origin + '/api/missing')).status, 404);
    } finally { await new Promise(resolve => production.close(resolve)); }
    console.log('Content, storage failure, validation, CORS, security, rate limits, and production asset checks passed.');
  } finally {
    if (server) {
      server.close();
    }
    await disconnectDB();
  }
}

runTests().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
