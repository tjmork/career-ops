#!/usr/bin/env node
/**
 * Playwright fetch for URLs listed in data/scan-history-urls.txt (or argv[2]).
 * Writes jds/, reports/, batch JSON, PDF variant stub + folders, applications.md rows, summary.
 *
 * Usage (from career-ops/):
 *   node scripts/scan-history-urls-pipeline.mjs [urls.txt] [startNum] [YYYY-MM-DD] [--lines M-N]
 *
 * Optional `--lines M-N`: 1-based inclusive editor line range in the URL file (e.g. `@file (1-51)`).
 *
 * Defaults: data/scan-history-urls.txt, 243, BATCH_DATE env or 2026-04-16, footnote 19 (¹⁹).
 *
 * Idempotency: if applications.md already has rows for this START_NUM + DATE + run tag, exits before
 * Playwright unless FORCE_REFETCH=1 (refetch overwrites jds/reports/batch; tracker merge is skipped if rows exist).
 * Next incremental batch: append URLs to the .txt file, set BATCH_START_NUM=343 (or last_num+1), keep DATE in sync.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const rawArgv = process.argv.slice(2);
let lineStart = 1;
let lineEnd = Infinity;
const argv = [];
for (let i = 0; i < rawArgv.length; i++) {
  if (rawArgv[i] === '--lines' && rawArgv[i + 1]) {
    const m = String(rawArgv[++i]).match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      lineStart = Math.max(1, Number(m[1]));
      lineEnd = Math.max(lineStart, Number(m[2]));
    }
    continue;
  }
  argv.push(rawArgv[i]);
}

const URL_FILE = resolve(ROOT, argv[0] || 'data/scan-history-urls.txt');
const START_NUM = Math.max(1, parseInt(argv[1] || process.env.BATCH_START_NUM || '243', 10) || 243);
const DATE = (argv[2] || process.env.BATCH_DATE || '2026-04-16').trim();
/** PDF column marker for score ≥3.5 (applications.md footnote ¹⁹ for this batch). */
const PDF_MARK_GOOD = '✅¹⁹';

const RUN_TAG = basename(URL_FILE).replace(/\.txt$/i, '');
const BATCH_JSON = resolve(ROOT, 'batch', `${RUN_TAG}-run-${DATE}.json`);
const VARIANTS_OUT = resolve(ROOT, 'batch', `${RUN_TAG}-variants-${DATE.replace(/-/g, '')}.mjs`);
const FOLDERS_OUT = resolve(ROOT, 'batch', `${RUN_TAG}-folders-${DATE.replace(/-/g, '')}.mjs`);
const EXPORT_FN = `scanHistoryUrlsVariants${DATE.replace(/-/g, '')}`;
const FOLDERS_EXPORT = `SCAN_HISTORY_URLS_${DATE.replace(/-/g, '')}_FOLDERS`;
const SUMMARY_MD = resolve(ROOT, 'reports', `${RUN_TAG}-${DATE}-summary.md`);

/** Insert new tracker rows after the first line that exists (prefer latest scan-history batch, then LinkedIn batch). */
const APPLICATION_ANCHORS = [
  '| 745 | 2026-05-20 | Myworkdayjobs | IT, Software Engineer 3 | 3.3/5 | Evaluated | ❌ | [745](reports/745-myworkdayjobs-it-software-engineer-3-133066-2026-05-20.md) | batch-2026-05-20-emp-oregon-mixed-urls autopipeline 2026-05-20 |',
  '| 653 | 2026-05-07 | Myworkdayjobs | Senior Systems & Network Engineer (Information Systems Specialist 7) Limited Duration and/or Job Rotation | 3/5 | Evaluated | ❌ | [653](reports/653-myworkdayjobs-senior-systems-network-engineer-info-199237-2026-05-07.md) | batch-2026-05-07-oregon-sor-urls autopipeline 2026-05-07 |',
  '| 646 | 2026-04-30 | Bayer | Staff Software Engineer Job Details | 3.7/5 | Evaluated | ✅¹⁹ | [646](reports/646-bayer-staff-software-engineer-job-details-1230618101-2026-04-30.md) | batch-2026-04-30-mixed-urls autopipeline 2026-04-30 |',
  '| 546 | 2026-04-29 | Dice | Sr Software Engineer - Randstad Digital - | 3.6/5 | Evaluated | ✅¹⁹ | [546](reports/546-dice-sr-software-engineer-randstad-digita-f8670f29-67ee-4ed5-9a1c--2026-04-29.md) | batch-2026-04-29-mixed-urls autopipeline 2026-04-29 |',
  '| 520 | 2026-04-28 | Dice | Senior Software Engineer - UnitedHealth Group - Remote in Hartford, CT, US | 3.7/5 | Evaluated | ✅¹⁹ | [520](reports/520-dice-senior-software-engineer-unitedhealt-e5b14cff-888b-4c4f-895b--2026-04-28.md) | batch-2026-04-28-mixed-urls autopipeline 2026-04-28 |',
  '| 473 | 2026-04-23 | Linkedin | DAT Freight & Analytics hiring Principal Software Engineer in Beaverton, OR | 3.5/5 | Evaluated | ✅¹⁹ | [473](reports/473-linkedin-dat-freight-analytics-hiring-princip-4389451138-2026-04-23.md) | batch-mixed-2026-04-23 autopipeline 2026-04-23 |',
  '| 404 | 2026-04-07 | Boeing | Mission Software Engineer (Mid Level or Senior) at Boeing | 3.3/5 | Evaluated | ❌ | [404](reports/404-boeing-mission-software-engineer-mid-level-93759812528-2026-04-07.md) | batch-mixed-boards-2026-04-07 autopipeline 2026-04-07 |',
  '| 372 | 2026-04-18 | Uber | Senior Software Engineer - San Francisco, California | 3.4/5 | Evaluated | ❌ | [372](reports/372-uber-senior-software-engineer-san-francis-155294-2026-04-18.md) | batch-pasted-urls-2026-04-18 autopipeline 2026-04-18 |',
  '| 342 | 2026-04-18 | Anduril | Job Application for Mission Software Engineer at Anduril Industries | 3.2/5 | Evaluated | ❌ | [342](reports/342-anduril-job-application-for-mission-software-5047469007-2026-04-18.md) | scan-history-urls autopipeline 2026-04-18 |',
  '| 292 | 2026-04-16 | Greenhouse | Job Application for Senior Software Engineer, Vehicle Intelligence at Axon | 3.3/5 | Evaluated | ❌ | [292](reports/292-greenhouse-job-application-for-senior-software-7677943003-2026-04-16.md) | scan-history-urls autopipeline 2026-04-16 |',
  '| 242 | 2026-04-07 | JPMorgan Chase | Sr Lead Software Engineer - JPMC Candidate Experience page Careers | 3.1/5 | Evaluated | ❌ | [242](reports/242-jpmorgan-chase-sr-lead-software-engineer-210717924-2026-04-07.md) | LinkedIn batch 2026-04-07 autopipeline |',
];

/** @type {Record<string, string>} */
const HOST_TO_COMPANY = {
  'careers.upstart.com': 'Upstart',
};

function companyFromUrl(url) {
  let host = '';
  try {
    host = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Unknown employer';
  }
  if (HOST_TO_COMPANY[host]) return HOST_TO_COMPANY[host];
  if (host === 'job-boards.greenhouse.io' || host === 'boards.greenhouse.io') {
    const m = url.match(/(?:job-boards|boards)\.greenhouse\.io\/([^/]+)\//i);
    const board = m?.[1] || 'employer';
    const pretty = board.replace(/industries$/i, '').replace(/careers$/i, '');
    return pretty
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  const parts = host.split('.');
  const core = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  return core.charAt(0).toUpperCase() + core.slice(1);
}

function idFromUrl(url) {
  try {
    const u = new URL(url);
    const gh = u.searchParams.get('gh_jid');
    if (gh) return gh;
    const job = u.pathname.match(/(\d{6,})/g);
    if (job) return job[job.length - 1];
    const last = u.pathname.split('/').filter(Boolean).pop() || '';
    return last.replace(/[^a-z0-9-]/gi, '-').slice(0, 40) || 'job';
  } catch {
    return 'job';
  }
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72);
}

function makeSlug(num, company, title, url) {
  const co = slugify(company).slice(0, 24) || 'co';
  const tit =
    slugify(title.replace(/\s*\|.*$/, '').replace(/\s*-\s*Careers.*$/i, '')).slice(0, 36) || 'role';
  const id = slugify(idFromUrl(url)).slice(0, 24);
  return `${num}-${co}-${tit}-${id}`.replace(/-+/g, '-').slice(0, 100);
}

function scoreJob(text, title) {
  const t = `${text}\n${title}`.toLowerCase();
  let s = 3.0;
  const pos = [
    'javascript',
    'typescript',
    'node.js',
    'node ',
    'react',
    'full stack',
    'fullstack',
    'microservice',
    'rest ',
    ' api',
    'apis',
    'salesforce',
    'commerce',
    'retail',
    'e-commerce',
    'kubernetes',
    ' aws',
    'azure',
    'postgresql',
    'postgres',
    'integration',
    'sfcc',
    'apex',
    'graphql',
    'python',
    'golang',
    'go ',
    'software engineer',
    'software development',
    'full-stack',
  ];
  let hits = 0;
  for (const p of pos) if (t.includes(p)) hits++;
  s += Math.min(1.0, hits * 0.065);
  if (/salesforce|apex|\blwc\b|sfdc|sfcc|b2c commerce/.test(t)) s += 0.22;
  const neg = [
    'embedded systems',
    'firmware',
    'verilog',
    'hardware only',
    'clearance required',
    'ts/sci',
    'assembly language',
  ];
  for (const n of neg) if (t.includes(n)) s -= 0.45;
  if (/\bsolution engineer\b/.test(t) && !/software engineer/.test(t)) s -= 0.2;
  if (/\bdata scientist\b/.test(t) && !/software/.test(t)) s -= 0.35;
  if (t.length < 350) s -= 0.15;
  return Math.round(Math.min(4.5, Math.max(1.5, s)) * 10) / 10;
}

function escTemplate(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function folderName(company) {
  return company
    .replace(/[&/\\]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '');
}

function buildVariantObject(item) {
  const short = item.role.slice(0, 70);
  return {
    slug: item.slug,
    docTitle: `${item.company} — ${short}`,
    summary: `Senior engineer with <strong>full-stack</strong> and <strong>integration</strong> delivery: <strong>REST APIs</strong>, <strong>commerce</strong> and <strong>enterprise SaaS</strong> experience, <strong>JavaScript/TypeScript</strong>, and <strong>cloud</strong>-adjacent patterns. Maps to posting themes for <strong>${escTemplate(item.company)}</strong>; confirm stack and location on the live listing. <strong>BS CIS.</strong> Veteran.`,
    competencies: [
      'Full-stack & API integration delivery',
      'JavaScript / TypeScript & modern web',
      'REST, microservices & platform patterns',
      'Commerce, retail & enterprise SaaS',
      'Salesforce ecosystem (when role-relevant)',
      'CI/CD, testing & production ownership',
      'Cross-functional product partnership',
      'Remote / hybrid collaboration',
    ],
    roleLine: `${item.company}: ${short} — see careers link; confirm Job ID and location.`,
    useDefaultProjects: true,
  };
}

function reportMd(it) {
  const pdfLine =
    it.score >= 3.5
      ? `**PDF:** ✅ Tailored PDF — \`PDF_DATE=${DATE} ONLY_VARIANT=${it.slug} node render-pdfs-2026-04-09.mjs\` (or \`ONLY_VARIANTS\`).`
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

${it.jdSummary}

${it.fetchNote ? `\n**Capture note:** ${it.fetchNote}\n` : ''}
---

## Fit (\`cv.md\` ↔ role)

| Focus | Notes |
|--------|--------|
| **Salesforce / commerce** | Strong when role is SFDC/B2C; weaker when **Java-primary** or **presales SE**. |
| **Integrations / APIs** | Strong match for MarTech, payments, and platform integration roles. |
| **Location / RTO** | Confirm hybrid and on-site requirements vs your target geography. |

**Score rationale:** Heuristic from captured page text and \`cv.md\` themes; re-score after you confirm live JD.

---

## A) Role summary

Condensed: see JD summary and source URL.

## B) CV match

Map ${it.company} bullets to BBW/Saks/SFCC proof points in cover letter if you pursue.

## C–F) Strategy / comp / interview

Defer detail until you shortlist; use \`interview-prep/story-bank.md\` for STAR.

---

## Extracted keywords

${it.company}, ${it.role.split(/\s+/).slice(0, 8).join(', ')}
`;
}

async function fetchPage(browser, url) {
  const page = await browser.newPage({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  let title = '';
  let text = '';
  let note = '';
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await new Promise((r) => setTimeout(r, 2500));
    title = await page.title();
    text = await page.evaluate(() => {
      const b = document.body;
      if (!b) return '';
      const t = b.innerText || '';
      return t.slice(0, 18000);
    });
    if (!text || text.length < 120) {
      const desc = await page
        .$eval('meta[name="description"]', (m) => m.content)
        .catch(() => '');
      if (desc) {
        text = desc + '\n' + text;
        note = 'Short body text; supplemented with meta description.';
      }
    }
  } catch (e) {
    note = `Fetch error: ${e.message || e}`;
    title = title || 'Error';
  } finally {
    await page.close().catch(() => {});
  }
  return { title, text, note };
}

async function main() {
  const raw = readFileSync(URL_FILE, 'utf8');
  let lines = raw.split(/\r?\n/);
  if (lineEnd < Infinity || lineStart > 1) {
    lines = lines.slice(lineStart - 1, lineEnd);
  }
  const urls = lines
    .map((l) => l.trim())
    .filter((l) => l.startsWith('http'));
  if (lineEnd < Infinity || lineStart > 1) {
    console.log(`URL line range: ${lineStart}-${lineEnd < Infinity ? lineEnd : 'end'} → ${urls.length} URL(s)\n`);
  }

  const appPath = resolve(ROOT, 'data', 'applications.md');
  const appSnapshot = existsSync(appPath) ? readFileSync(appPath, 'utf8') : '';
  const trackerNoteTag = `${RUN_TAG} autopipeline ${DATE}`;
  const batchAlreadyTracked =
    appSnapshot.includes(`| ${START_NUM} | ${DATE} |`) && appSnapshot.includes(trackerNoteTag);
  if (batchAlreadyTracked && process.env.FORCE_REFETCH !== '1') {
    console.log(
      `Tracker already has this batch (start ${START_NUM}, ${DATE}). Nothing to do.\n` +
        `Set FORCE_REFETCH=1 to re-fetch and overwrite jds/reports/batch (applications.md left unchanged).`
    );
    process.exit(0);
  }

  mkdirSync(resolve(ROOT, 'batch'), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const items = [];
  let num = START_NUM - 1;

  for (const url of urls) {
    num += 1;
    process.stdout.write(`[${num}] ${url.slice(0, 70)}...\n`);
    const { title, text, note } = await fetchPage(browser, url);
    const company = companyFromUrl(url);
    let role = title.replace(/\s*\|\s*.*$/, '').replace(/\s*-\s*Careers.*$/i, '').trim() || 'Role (see listing)';
    if (role.length > 120) role = role.slice(0, 117) + '...';
    const slug = makeSlug(num, company, role, url);
    const score = text.length < 80 ? 2.5 : scoreJob(text, title);
    const jdSummary =
      text.length < 80
        ? '**Thin capture** — open the source URL for the full JD and requirements.'
        : `**${role.slice(0, 90)}** — captured text excerpt below. Confirm stack, level, and location on the live posting.\n\n> ${text.slice(0, 3500).replace(/\n{3,}/g, '\n\n')}${text.length > 3500 ? '\n\n…' : ''}`;
    const fetchNote = note || (text.length < 400 ? 'Limited text extracted; careers sites may require login or block automation.' : '');

    const it = {
      num,
      url,
      company,
      role,
      slug,
      score,
      jdSummary,
      fetchNote,
      title,
      textLen: text.length,
    };
    items.push(it);

    const jdPath = resolve(ROOT, 'jds', `${slug}-${DATE}.md`);
    writeFileSync(
      jdPath,
      `# ${company} — ${role}

**Captured:** ${DATE}  
**Source:** ${url}

## Plain text (automation capture)

${text || '_No body text._'}

`,
      'utf8'
    );

    writeFileSync(resolve(ROOT, 'reports', `${slug}-${DATE}.md`), reportMd(it), 'utf8');
  }

  await browser.close();

  writeFileSync(BATCH_JSON, JSON.stringify(items, null, 2), 'utf8');

  const trackerNote = `${RUN_TAG} autopipeline ${DATE}`;
  const pdfCol = (it) => (it.score >= 3.5 ? PDF_MARK_GOOD : '❌');

  const trackerLines = items.map((it) => {
    return `| ${it.num} | ${DATE} | ${it.company} | ${it.role.replace(/\|/g, '/')} | ${it.score}/5 | Evaluated | ${pdfCol(it)} | [${it.num}](reports/${it.slug}-${DATE}.md) | ${trackerNote} |`;
  });

  let app = readFileSync(appPath, 'utf8');
  const needle = APPLICATION_ANCHORS.find((a) => app.includes(a));
  if (batchAlreadyTracked) {
    console.log('applications.md: batch rows already present; skipping tracker merge.');
  } else if (!needle) {
    console.error(
      'applications.md: no known anchor (row 292 scan-history or 242 LinkedIn); paste tracker lines manually after last batch row.'
    );
  } else {
    app = app.replace(needle, `${needle}\n${trackerLines.join('\n')}`);
    writeFileSync(appPath, app, 'utf8');
  }

  const eligible = items.filter((it) => it.score >= 3.5);
  const variants = eligible.map((it) => buildVariantObject(it));

  const variantBodies = variants
    .map((v) => {
      return `    {
      slug: ${JSON.stringify(v.slug)},
      docTitle: ${JSON.stringify(v.docTitle)},
      summary: \`${escTemplate(v.summary)}\`,
      competencies: ${JSON.stringify(v.competencies, null, 6).replace(/\n/g, '\n      ')},
      roleLine: ${JSON.stringify(v.roleLine)},
      projects: DEFAULT_PROJECTS,
    }`;
    })
    .join(',\n');

  writeFileSync(
    VARIANTS_OUT,
    `/**
 * ${RUN_TAG} — PDF variants (generated by scripts/scan-history-urls-pipeline.mjs).
 */
export function ${EXPORT_FN}(DEFAULT_PROJECTS, projectsBlock) {
  return [
${variantBodies}
  ];
}
`,
    'utf8'
  );

  const folderEntries = Object.fromEntries(eligible.map((it) => [it.slug, folderName(it.company)]));
  writeFileSync(
    FOLDERS_OUT,
    `/** Slug → output folder — merged in output-company-folders.mjs */
export const ${FOLDERS_EXPORT} = ${JSON.stringify(folderEntries, null, 2)};
`,
    'utf8'
  );

  const escPipe = (s) => String(s).replace(/\|/g, '/');
  const allRowsTable = (list) => [
    '| # | Company | Job | Score | Apply URL |',
    '|---|---------|-----|-------|------------|',
    ...list.map(
      (it) =>
        `| ${it.num} | ${escPipe(it.company)} | ${escPipe(it.role)} | ${it.score}/5 | [Apply](${it.url}) |`
    ),
  ];
  const summaryLines = [
    `# ${RUN_TAG} — summary (${DATE})`,
    '',
    '## PDF-eligible (score ≥ 3.5): company, job, score, apply URL',
    '',
    ...allRowsTable(eligible),
    '',
    `_Total URLs processed: ${items.length}. PDF-eligible: ${eligible.length}. Regenerate PDFs: \`PDF_DATE=${DATE} ONLY_VARIANTS=<slugs> node render-pdfs-2026-04-09.mjs\`._`,
    '',
    '## All processed URLs (company, job, score, apply URL)',
    '',
    ...allRowsTable(items),
    '',
    '## Below threshold only (<3.5) — same fields',
    '',
    ...allRowsTable(items.filter((it) => it.score < 3.5)),
  ];
  writeFileSync(SUMMARY_MD, summaryLines.join('\n'), 'utf8');

  console.log('\n---');
  console.log(`Wrote ${items.length} JDs + reports. Eligible for PDF: ${eligible.length}`);
  console.log(`Batch JSON: ${BATCH_JSON}`);
  console.log(`Summary: ${SUMMARY_MD}`);
  console.log(`Variants: ${VARIANTS_OUT}`);
  if (eligible.length) {
    console.log('\nSummary — company | job | score | apply URL (≥3.5):');
    for (const it of eligible) {
      console.log(
        `  ${it.company} | ${it.role.replace(/\s+/g, ' ').slice(0, 80)} | ${it.score}/5 | ${it.url}`
      );
    }
    console.log(`\nMerge ${basename(VARIANTS_OUT)} + ${basename(FOLDERS_OUT)} into pdf-variants-2026-04-09.mjs and output-company-folders.mjs, then:`);
    console.log(`$env:PDF_DATE='${DATE}'; $env:ONLY_VARIANTS='${eligible.map((i) => i.slug).join(',')}'; node render-pdfs-2026-04-09.mjs`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
