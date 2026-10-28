#!/usr/bin/env node
/**
 * Reads batch/batch-url-run-YYYY-MM-DD.json and writes jds/, reports/, batch/tracker-additions/*.tsv
 * Usage: node scripts/batch-write-reports-from-json.mjs [batch/batch-url-run-2026-04-15.json]
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const arg = process.argv[2] || resolve(ROOT, 'batch', 'batch-url-run-2026-04-15.json');
const items = JSON.parse(readFileSync(arg, 'utf8'));
const DATE = '2026-04-15';

const addDir = resolve(ROOT, 'batch', 'tracker-additions');
if (!existsSync(addDir)) mkdirSync(addDir, { recursive: true });

function reportMd(it) {
  const pdfLine =
    it.score >= 3.5
      ? `**PDF:** ❌ Batch run — score ≥3.5 eligible for tailored PDF; add \`pdf-variants-2026-04-09.mjs\` slug + \`node render-pdfs-2026-04-09.mjs\` when ready (not executed in this batch).`
      : `**PDF:** ❌ Score < 3.5 — no tailored PDF per career-ops threshold.`;
  return `# Evaluation: ${it.company} — ${it.role}

**Date:** ${DATE}  
**Archetype:** Mixed — see JD summary  
**Score:** ${it.score}/5  
${pdfLine}  
**Source URL:** ${it.url}  
**JD file:** [\`jds/${it.slug}-${DATE}.md\`](../jds/${it.slug}-${DATE}.md)

---

## JD summary

${it.jd}

---

## Fit (\`cv.md\` ↔ role)

| Focus | Notes |
|--------|--------|
| **Salesforce / commerce** | Strong when role is SFDC/B2C; weaker when **Java-primary** or **presales SE**. |
| **Integrations / APIs** | Strong match for MarTech, payments, and platform integration roles. |
| **Location / RTO** | Confirm hybrid and on-site requirements vs your target geography. |

**Score rationale:** Single-pass assessment from posting text and \`cv.md\`; re-score after you confirm live JD and team.

---

## A) Role summary

Condensed: see JD summary and source URL.

## B) CV match

Map ${it.company} bullets to BBW/Saks/SFCC proof points in cover letter if you pursue.

## C–F) Strategy / comp / interview

Defer detail until you shortlist; use \`interview-prep/story-bank.md\` for STAR.

---

## Extracted keywords

${it.company}, ${it.role.split(' ').slice(0, 6).join(', ')}
`;
}

for (const it of items) {
  const jdPath = resolve(ROOT, 'jds', `${it.slug}-${DATE}.md`);
  const jdContent = `# ${it.company} — ${it.role}

**Captured:** ${DATE}  
**Source:** ${it.url}

${it.jd}
`;
  writeFileSync(jdPath, jdContent);
  const repPath = resolve(ROOT, 'reports', `${it.num}-${it.slug}-${DATE}.md`);
  writeFileSync(repPath, reportMd(it));

  const tsvSlug = it.slug.replace(/[^a-z0-9-]/gi, '-').slice(0, 40);
  const note = (it.role.slice(0, 60) + '; batch').replace(/\t/g, ' ');
  const line = `${it.num}\t${DATE}\t${it.company}\t${it.role.replace(/\t/g, ' ')}\tEvaluated\t${it.score}/5\t❌\t[${it.num}](reports/${it.num}-${it.slug}-${DATE}.md)\t${note}\n`;
  writeFileSync(resolve(addDir, `${it.num}-${tsvSlug}.tsv`), line);
}

console.log(`Wrote ${items.length} JDs, reports, and tracker TSVs under career-ops/`);
