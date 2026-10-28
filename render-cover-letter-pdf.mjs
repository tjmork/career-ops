#!/usr/bin/env node
/**
 * Markdown cover letter → HTML + PDF (same fonts / ATS normalization path as CV PDFs).
 *
 * Usage:
 *   node render-cover-letter-pdf.mjs cover-letters/clover-health-principal-technologist-octo-2026-04-07.md
 *   node render-cover-letter-pdf.mjs --all
 *
 * Outputs sit beside the source file: same basename .html and .pdf under cover-letters/.
 *
 * Env:
 *   COVER_LETTER=relative-or-base.md  (single file from career-ops cwd when no argv)
 */
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { basename, dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** **bold** and https:// URLs → links (escape plain segments) */
function inlineMdToHtml(s) {
  const chunks = s.split(/\*\*(.+?)\*\*/g);
  let out = '';
  for (let i = 0; i < chunks.length; i++) {
    if (i % 2 === 0) {
      let t = esc(chunks[i]);
      t = t.replace(/(https?:\/\/[^\s<>"]+)/g, (_, url) => {
        const safe = esc(url);
        return `<a href="${safe}">${safe}</a>`;
      });
      out += t;
    } else {
      out += `<strong>${esc(chunks[i])}</strong>`;
    }
  }
  return out;
}

/** Strip trailing --- / footnote blocks (e.g. *Source role...) from editor notes */
function stripTrailingFootnote(md) {
  return md.replace(/\n---\n\n\*[\s\S]*$/m, '').trim();
}

function mdToLetterParts(md) {
  const cleaned = stripTrailingFootnote(md);
  const parts = cleaned.split(/\n---\n/);
  if (parts.length >= 2 && !parts[0].includes('Dear ')) {
    return { header: parts[0].trim(), body: parts.slice(1).join('\n\n').trim() };
  }
  return { header: '', body: cleaned };
}

function headerToHtml(headerMd) {
  if (!headerMd) return '';
  const lines = headerMd.split('\n').filter((l) => l.trim());
  const blocks = [];
  let title = 'Cover letter';
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('# ')) {
      title = t.slice(2).trim();
      continue;
    }
    if (/^\*\*PDF:\*\*/.test(t)) continue;
    blocks.push(`<div class="meta-line">${inlineMdToHtml(t)}</div>`);
  }
  return { title, html: blocks.join('\n') };
}

function bodyToHtml(bodyMd) {
  const paras = bodyMd
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paras.map((p) => `<p>${inlineMdToHtml(p.replace(/\n/g, ' '))}</p>`).join('\n');
}

const FONT_FACES = `
  @font-face {
    font-family: 'Space Grotesk';
    src: url('./fonts/space-grotesk-latin.woff2') format('woff2');
    font-weight: 300 700;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Space Grotesk';
    src: url('./fonts/space-grotesk-latin-ext.woff2') format('woff2');
    font-weight: 300 700;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'DM Sans';
    src: url('./fonts/dm-sans-latin.woff2') format('woff2');
    font-weight: 100 1000;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'DM Sans';
    src: url('./fonts/dm-sans-latin-ext.woff2') format('woff2');
    font-weight: 100 1000;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
`;

function buildHtml(md, docTitle) {
  const { header, body } = mdToLetterParts(md);
  const { title, html: headerHtml } = headerToHtml(header);
  const bodyHtml = bodyToHtml(body);
  const pageTitle = docTitle || title;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(pageTitle)}</title>
<style>
${FONT_FACES}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    line-height: 1.55;
    color: #1a1a2e;
    background: #ffffff;
    padding: 0;
    margin: 0;
  }
  .page { width: 100%; max-width: 8.5in; margin: 0 auto; padding: 0; }
  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
    color: #1a1a2e;
  }
  .gradient {
    height: 2px;
    background: linear-gradient(to right, hsl(187, 74%, 32%), hsl(270, 70%, 45%));
    border-radius: 1px;
    margin-bottom: 14px;
  }
  .meta-line { font-size: 10px; color: #333; margin-bottom: 6px; }
  .meta-line a { color: hsl(187, 74%, 32%); text-decoration: none; }
  p { margin-bottom: 12px; text-align: left; }
  p strong { font-weight: 600; }
</style>
</head>
<body>
<div class="page">
  <h1>${esc(title)}</h1>
  <div class="gradient"></div>
  ${headerHtml}
  ${headerHtml ? '<div style="height:10px"></div>' : ''}
  ${bodyHtml}
</div>
</body>
</html>`;
}

function renderOne(mdPath) {
  const absMd = resolve(__dirname, mdPath);
  const md = readFileSync(absMd, 'utf8');
  const base = basename(absMd, '.md');
  const outDir = dirname(absMd);
  const htmlPath = join(outDir, `${base}.html`);
  const pdfPath = join(outDir, `${base}.pdf`);
  const html = buildHtml(md, base);
  writeFileSync(htmlPath, html, 'utf8');
  console.log(`\n=== ${base} ===`);
  console.log(`📄 HTML: ${htmlPath}`);
  execSync(`node generate-pdf.mjs "${htmlPath}" "${pdfPath}" --format=letter`, {
    cwd: __dirname,
    stdio: 'inherit',
  });
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--all')) {
    const dir = join(__dirname, 'cover-letters');
    const files = readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('README'));
    if (files.length === 0) {
      console.error('No .md files in cover-letters/');
      process.exit(1);
    }
    for (const f of files) {
      renderOne(join('cover-letters', f));
    }
    console.log(`\nDone: ${files.length} cover letter PDF(s).`);
    return;
  }

  const fromEnv = process.env.COVER_LETTER?.trim();
  const pathArg = argv[0] || fromEnv;
  if (!pathArg) {
    console.error(
      'Usage: node render-cover-letter-pdf.mjs <path-to-letter.md>\n' +
        '   or: node render-cover-letter-pdf.mjs --all\n' +
        '   or: COVER_LETTER=cover-letters/foo.md node render-cover-letter-pdf.mjs'
    );
    process.exit(1);
  }

  renderOne(pathArg);
  console.log('\nDone: 1 cover letter PDF.');
}

main();
