#!/usr/bin/env node
/**
 * batch-dry-run.mjs — List pending batch offers (no bash / no claude CLI).
 * Mirrors batch/batch-runner.sh --dry-run for the common case.
 *
 * Usage: node batch-dry-run.mjs [--start-from N] [--retry-failed] [--max-retries N]
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

function parseArgs(argv) {
  let startFrom = 0;
  let retryFailed = false;
  let maxRetries = 2;
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--retry-failed') retryFailed = true;
    else if (a === '--start-from' && argv[i + 1]) startFrom = Number(argv[++i], 10) || 0;
    else if (a === '--max-retries' && argv[i + 1]) maxRetries = Number(argv[++i], 10) || 2;
  }
  return { startFrom, retryFailed, maxRetries };
}

function parseStateText(text) {
  const byId = new Map();
  for (const line of text.split(/\r?\n/).filter((l) => l.trim())) {
    const p = line.split('\t');
    if (p[0] === 'id' || !p[0]) continue;
    const retries = p[8] !== undefined && p[8] !== '' ? Number(p[8], 10) || 0 : 0;
    byId.set(p[0], { status: p[2] || 'none', retries });
  }
  return byId;
}

async function main() {
  const { startFrom, retryFailed, maxRetries } = parseArgs(process.argv);
  const inputPath = join(ROOT, 'batch', 'batch-input.tsv');
  const statePath = join(ROOT, 'batch', 'batch-state.tsv');

  if (!existsSync(inputPath)) {
    console.error('ERROR: batch/batch-input.tsv not found.');
    process.exit(1);
  }

  const stateText = existsSync(statePath) ? await readFile(statePath, 'utf8') : '';
  const state = parseStateText(stateText);
  const inputText = await readFile(inputPath, 'utf8');
  const lines = inputText.split(/\r?\n/).filter((l) => l.trim());

  let totalInput = 0;
  const pending = [];

  for (const line of lines) {
    const p = line.split('\t');
    if (p[0] === 'id') continue;
    const [id, url, source, ...notesParts] = p;
    if (!id || !url) continue;
    totalInput++;
    const idNum = Number(id, 10);
    if (idNum < startFrom) continue;

    const row = state.get(id) || { status: 'none', retries: 0 };
    const st = row.status;

    if (retryFailed) {
      if (st !== 'failed') continue;
      if (row.retries >= maxRetries) {
        console.log(`SKIP #${id}: max retries (${maxRetries}) reached`);
        continue;
      }
    } else {
      if (st === 'completed') continue;
      if (st === 'failed' && row.retries >= maxRetries) {
        console.log(
          `SKIP #${id}: failed and max retries reached (use --retry-failed to force)`
        );
        continue;
      }
    }

    pending.push({ id, url, source: source || '', notes: notesParts.join('\t') });
  }

  console.log('=== career-ops batch runner (dry-run, Node) ===');
  console.log(`Start-from: ${startFrom} | Max retries: ${maxRetries}`);
  console.log(`Input: ${totalInput} offers`);
  console.log('');

  if (pending.length === 0) {
    console.log('No offers to process.');
    return;
  }

  console.log(`Pending: ${pending.length} offers`);
  console.log('');
  console.log('=== DRY RUN (no processing) ===');
  for (const o of pending) {
    const row = state.get(o.id) || { status: 'none', retries: 0 };
    console.log(`  #${o.id}: ${o.url} [${o.source}] (status: ${row.status})`);
  }
  console.log('');
  console.log(`Would process ${pending.length} offers`);
  console.log('');
  console.log('Full batch (reports + PDF + claude -p workers): install Git Bash or WSL, then:');
  console.log('  bash batch/batch-runner.sh');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
