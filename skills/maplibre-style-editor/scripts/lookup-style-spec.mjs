import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const term = process.argv[2];
if (!term) {
  console.error('Usage: node scripts/lookup-style-spec.mjs -- <property-name>');
  process.exit(1);
}

const refRoot = path.resolve('./reference/maplibre-style-spec/');
const results = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith('.json')) await searchFile(full);
  }
}

function findKey(obj, wanted, trail = []) {
  if (!obj || typeof obj !== 'object') return;
  for (const [key, value] of Object.entries(obj)) {
    const nextTrail = [...trail, key];
    if (key === wanted) results.push({ path: nextTrail.join('.'), value });
    findKey(value, wanted, nextTrail);
  }
}

async function searchFile(file) {
  const data = JSON.parse(await readFile(file, 'utf8'));
  const before = results.length;
  findKey(data, term);
  for (let i = before; i < results.length; i++) {
    results[i].file = path.relative(process.cwd(), file);
  }
}

await walk(refRoot);

if (!results.length) {
  console.error(`No match found for: ${term}`);
  process.exit(2);
}

for (const result of results) {
  console.log(`\n# ${result.file} :: ${result.path}`);
  console.log(JSON.stringify(result.value, null, 2));
}
