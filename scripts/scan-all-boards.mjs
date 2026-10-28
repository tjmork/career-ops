#!/usr/bin/env node
/**
 * Scan all configured boards: Greenhouse API (20/board) + optional web batch ingest.
 *
 * Usage (from career-ops/):
 *   npm run scan:all
 *   SCAN_WEB_BATCH=data/scan-batch-urls-2026-05-29.json npm run scan:all
 */
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

process.env.SCAN_MIN_PER_BOARD = process.env.SCAN_MIN_PER_BOARD || '20';
process.env.SCAN_MAX_PER_BOARD = process.env.SCAN_MAX_PER_BOARD || '20';
process.env.SCAN_STRATEGY = process.env.SCAN_STRATEGY || 'per_board';

console.log('=== Greenhouse API (all api: boards, up to 20 new each) ===');
execSync('node scan-greenhouse.mjs', { cwd: root, stdio: 'inherit', env: process.env });

const webBatch =
  process.env.SCAN_WEB_BATCH ||
  resolve(root, 'data', 'scan-batch-urls-2026-05-29.json');

if (existsSync(webBatch)) {
  console.log(`\n=== Web board ingest: ${webBatch} ===`);
  execSync(`node scripts/scan-add-urls.mjs "${webBatch}"`, {
    cwd: root,
    stdio: 'inherit',
  });
} else {
  console.log(`\n(No web batch at ${webBatch} — Greenhouse-only run.)`);
}

console.log('\nDone. See data/pipeline.md ## Pending and reports/portal-scan-*.md');
