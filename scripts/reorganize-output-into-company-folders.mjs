#!/usr/bin/env node
/**
 * One-time (or repeat-safe): move flat output/cv-candidate-*.pdf|html into output/<Company>/.
 * Run from career-ops/: node scripts/reorganize-output-into-company-folders.mjs
 */
import { readdirSync, renameSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  parseCandidateBaseName,
  companyFolderForSlug,
  MISC_OUTPUT_FOLDER,
  sanitizeFolderName,
} from '../output-company-folders.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const outDir = join(repoRoot, 'output');

if (!existsSync(outDir)) {
  console.error('No output/ directory');
  process.exit(1);
}

for (const name of readdirSync(outDir)) {
  const p = join(outDir, name);
  if (!statSync(p).isFile()) continue;
  if (!name.endsWith('.html') && !name.endsWith('.pdf')) continue;

  const ext = name.endsWith('.pdf') ? '.pdf' : '.html';
  const base = name.slice(0, -ext.length);

  let folder;
  if (base.startsWith('cv-terry-mork-')) {
    folder = sanitizeFolderName(MISC_OUTPUT_FOLDER);
  } else {
    const parsed = parseCandidateBaseName(base);
    if (!parsed) {
      console.warn(`Skip (unrecognized name): ${name}`);
      continue;
    }
    try {
      folder = companyFolderForSlug(parsed.slug);
    } catch (e) {
      console.warn(`Skip: ${name} — ${e.message}`);
      continue;
    }
  }

  const destDir = join(outDir, folder);
  mkdirSync(destDir, { recursive: true });
  const dest = join(destDir, name);
  if (p === dest) continue;
  if (existsSync(dest)) {
    console.warn(`Skip (target exists): ${folder}/${name}`);
    continue;
  }
  renameSync(p, dest);
  console.log(`Moved ${name} → output/${folder}/`);
}

console.log('Done.');
