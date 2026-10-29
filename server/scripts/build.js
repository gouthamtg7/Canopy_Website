import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
async function check(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await check(file);
    else if (file.endsWith('.js')) {
      const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
      if (result.status !== 0) throw new Error(`Syntax validation failed: ${file}`);
    }
  }
}
await check('src');
for (const name of ['benchmarks', 'gst-results', 'reviews', 'site']) JSON.parse(await readFile(`../content/${name}.json`, 'utf8'));
await import('../src/app.js');
console.log('Server syntax, content JSON, and application imports validated.');
