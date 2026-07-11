import { mkdir, writeFile } from 'node:fs/promises';

const url = 'https://raw.githubusercontent.com/maplibre/maplibre-style-spec/main/src/reference/v8.json';
const out = new URL('../vendor/maplibre-style-spec/v8.json', import.meta.url);

await mkdir(new URL('../vendor/maplibre-style-spec/', import.meta.url), { recursive: true });

const res = await fetch(url);
if (!res.ok) {
  throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
}

const text = await res.text();
JSON.parse(text);
await writeFile(out, text, 'utf8');
console.log(`Wrote ${out.pathname}`);
