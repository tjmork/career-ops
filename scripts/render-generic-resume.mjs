#!/usr/bin/env node
/**
 * Generic story-bank resume → output/Misc/cv-terry-mork-senior-full-stack-{date}.pdf
 *
 * Usage (from career-ops/):
 *   node scripts/render-generic-resume.mjs
 *   PDF_DATE=2026-05-27 node scripts/render-generic-resume.mjs
 */
import { execSync } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

if (!process.env.PDF_DATE?.trim()) {
  process.env.PDF_DATE = new Date().toISOString().slice(0, 10);
}
process.env.ONLY_VARIANT = 'terry-mork-generic-full-stack';

execSync('node render-pdfs-2026-04-09.mjs', {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
});
