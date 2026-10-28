#!/usr/bin/env node
/**
 * Rewrite markdown links from flat output/cv-candidate-* to output/<Company>/cv-candidate-*.
 * Run from career-ops/: node scripts/rewrite-output-links-in-markdown.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
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

function folderForBasename(base) {
  if (base.startsWith('cv-terry-mork-')) return sanitizeFolderName(MISC_OUTPUT_FOLDER);
  const parsed = parseCandidateBaseName(base);
  if (!parsed) return null;
  try {
    return companyFolderForSlug(parsed.slug);
  } catch {
    return null;
  }
}

function rewriteText(text) {
  let out = text;
  const fileRe = /(output\/|\.\.\/output\/)(cv-candidate-[^\/\s\)]+\.(?:pdf|html))/g;
  out = out.replace(fileRe, (m, prefix, filePath) => {
    const fileName = filePath.replace(/^.*\//, '');
    const ext = fileName.endsWith('.pdf') ? '.pdf' : '.html';
    const base = fileName.slice(0, -ext.length);
    const folder = folderForBasename(base);
    if (!folder) return m;
    return `${prefix}${folder}/${fileName}`;
  });
  // Backtick paths in tables: `output/cv-...`
  out = out.replace(/`output\/(cv-candidate-[^`]+\.(?:pdf|html))`/g, (m, filePath) => {
    const fileName = filePath;
    const ext = fileName.endsWith('.pdf') ? '.pdf' : '.html';
    const base = fileName.slice(0, -ext.length);
    const folder = folderForBasename(base);
    if (!folder) return m;
    return '`output/' + folder + '/' + fileName + '`';
  });
  // Report header: link text was bare filename; href already under output/<company>/
  out = out.replace(
    /\*\*PDF:\*\* \[(cv-candidate-[^\]]+\.pdf)\]\(\.\.\/output\/([^/]+)\/\1\)/g,
    (m, fileName, folder) =>
      `**PDF:** [output/${folder}/${fileName}](../output/${folder}/${fileName})`,
  );
  return out;
}

const targets = [
  join(repoRoot, 'data', 'applications.md'),
  ...readdirSync(join(repoRoot, 'reports'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => join(repoRoot, 'reports', f)),
];

for (const file of targets) {
  const before = readFileSync(file, 'utf8');
  const after = rewriteText(before);
  if (after !== before) {
    writeFileSync(file, after, 'utf8');
    console.log('Updated', file.replace(repoRoot + '\\', '').replace(repoRoot + '/', ''));
  }
}

console.log('Done rewriting links.');
