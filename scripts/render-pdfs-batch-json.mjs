#!/usr/bin/env node
/**
 * Regenerate tailored PDFs for all items in a batch JSON with score >= 3.5.
 * Usage (from career-ops/): node scripts/render-pdfs-batch-json.mjs [path/to/run.json] [PDF_DATE]
 */
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const jsonPath = resolve(ROOT, process.argv[2] || 'batch/batch-2026-04-30-mixed-urls-run-2026-04-30.json');
const date = (process.argv[3] || '2026-04-30').trim();

const items = JSON.parse(readFileSync(jsonPath, 'utf8'));
const slugs = items.filter((i) => i.score >= 3.5).map((i) => i.slug);
if (!slugs.length) {
  console.error('No items with score >= 3.5 in', jsonPath);
  process.exit(1);
}
const ONLY_VARIANTS = slugs.join(',');
console.log(`PDF_DATE=${date} — ${slugs.length} variant(s)`);

execSync('node render-pdfs-2026-04-09.mjs', {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, PDF_DATE: date, ONLY_VARIANTS },
});
