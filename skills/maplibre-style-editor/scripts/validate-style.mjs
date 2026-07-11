import { readFile } from 'node:fs/promises';
import { validateStyleMin as validateStyle } from '@maplibre/maplibre-gl-style-spec';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/validate-style.mjs -- <style.json>');
  process.exit(1);
}

const style = JSON.parse(await readFile(file, 'utf8'));
const errors = validateStyle(style);

if (!errors || errors.length === 0) {
  console.log('Style is valid.');
  process.exit(0);
}

console.error(`Style has ${errors.length} validation error(s):`);
for (const error of errors) {
  console.error(`- ${error.message ?? String(error)}`);
}
process.exit(2);
