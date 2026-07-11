import { mkdir, readFile, writeFile } from 'node:fs/promises';

const specPath = new URL('../vendor/maplibre-style-spec/v8.json', import.meta.url);
const outDir = new URL('../skills/maplibre-style-editor/reference/maplibre-style-spec/', import.meta.url);
const layersDir = new URL('../skills/maplibre-style-editor/reference/maplibre-style-spec/layers/', import.meta.url);

const spec = JSON.parse(await readFile(specPath, 'utf8'));
await mkdir(outDir, { recursive: true });
await mkdir(layersDir, { recursive: true });

function pick(keys) {
  const result = {};
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(spec, key)) result[key] = spec[key];
  }
  return result;
}

async function writeJson(relative, data) {
  const url = new URL(relative, outDir);
  await writeFile(url, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${url.pathname}`);
}

const rootKeys = [
  '$version', 'version', 'name', 'metadata', 'center', 'zoom', 'bearing', 'pitch',
  'light', 'sky', 'sources', 'sprite', 'glyphs', 'transition', 'layers',
  'terrain', 'projection'
];

await writeJson('root.json', pick(rootKeys));
await writeJson('sources.json', pick(['source', 'source_vector', 'source_raster', 'source_raster_dem', 'source_geojson', 'source_image', 'source_video', 'source_canvas']));
await writeJson('expressions.json', pick(['expression_name', 'expression', 'expression_type', 'function', 'function_stop']));
await writeJson('other.json', pick(['light', 'sky', 'terrain', 'projection', 'transition', 'sprite', 'glyphs']));
await writeJson('layers/layer.json', pick(['layer']));

const layerTypes = ['background', 'fill', 'line', 'symbol', 'raster', 'circle', 'fill-extrusion', 'heatmap', 'hillshade'];
for (const type of layerTypes) {
  const keys = [
    `layout_${type}`,
    `paint_${type}`,
    `paint_${type}-transition`
  ];
  await writeJson(`layers/${type}.json`, pick(keys));
}

const index = {
  generatedFrom: 'vendor/maplibre-style-spec/v8.json',
  files: [
    'root.json', 'sources.json', 'expressions.json', 'other.json',
    'layers/layer.json', ...layerTypes.map(t => `layers/${t}.json`)
  ]
};
await writeJson('index.json', index);
