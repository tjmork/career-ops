#!/usr/bin/env node
/**
 * Fetch LinkedIn batch URLs (Playwright), score vs cv themes, write jds/reports,
 * applications.md rows (171+), batch JSON, pdf variant stubs + company folders, summary.
 *
 * Usage (from career-ops/): node scripts/linkedin-batch-pipeline-2026-04-07.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATE = '2026-04-07';
const START_NUM = 171;
const URL_FILE = resolve(ROOT, 'data', 'batch-2026-04-07-linkedin-urls.txt');
const BATCH_JSON = resolve(ROOT, 'batch', 'linkedin-batch-run-2026-04-07.json');
const VARIANTS_OUT = resolve(ROOT, 'batch', 'linkedin-batch-variants-20260407.mjs');
const FOLDERS_OUT = resolve(ROOT, 'batch', 'linkedin-batch-company-folders-20260407.mjs');
const SUMMARY_MD = resolve(ROOT, 'reports', `linkedin-batch-${DATE}-summary.md`);

/** @type {Record<string, string>} */
const HOST_TO_COMPANY = {
  'careers.na.panasonic.com': 'Panasonic',
  'www.cockroachlabs.com': 'Cockroach Labs',
  'careers.lululemon.com': 'lululemon',
  'www.jaguarlandrovercareers.com': 'Jaguar Land Rover',
  'www.databricks.com': 'Databricks',
  'generalmotors.wd5.myworkdayjobs.com': 'General Motors',
  'wellington.wd5.myworkdayjobs.com': 'Wellington Management',
  'apply.starbucks.com': 'Starbucks',
  'careers.expediagroup.com': 'Expedia Group',
  'jobs.lever.co': 'Lever',
  'www.google.com': 'Google',
  'job-boards.greenhouse.io': 'Greenhouse',
  'jobs.boeing.com': 'Boeing',
  'www.amazon.jobs': 'Amazon',
  'careers.adobe.com': 'Adobe',
  'jobs.rossstores.com': 'Ross Stores',
  'blueorigin.wd5.myworkdayjobs.com': 'Blue Origin',
  'careers.toasttab.com': 'Toast',
  'careers.veeva.com': 'Veeva',
  'geico.wd1.myworkdayjobs.com': 'GEICO',
  'careers.walmart.com': 'Walmart',
  'jobs.intuit.com': 'Intuit',
  'careers.gehealthcare.com': 'GE HealthCare',
  'careers.cisco.com': 'Cisco',
  'curativeai.applytojob.com': 'Curative',
  'careers.lilly.com': 'Eli Lilly',
  'coreweave.com': 'CoreWeave',
  'apply.careers.microsoft.com': 'Microsoft',
  'earlywarning.wd5.myworkdayjobs.com': 'Early Warning',
  'usource.ripplehire.com': 'UST',
  'careers.withwaymo.com': 'Waymo',
  'ro.careers.tsmc.com': 'TSMC',
  'jobs.xpo.com': 'XPO',
  'jobs.ashbyhq.com': 'Ashby',
  'www.uber.com': 'Uber',
  'jpmc.fa.oraclecloud.com': 'JPMorgan Chase',
  'ats.rippling.com': 'Rippling',
  'www.nexhealth.com': 'NexHealth',
  'zoom.wd5.myworkdayjobs.com': 'Zoom',
  'careers.pnnl.gov': 'PNNL',
  'careers.humana.com': 'Humana',
  'paypal.eightfold.ai': 'PayPal',
  'bcbsnc.wd5.myworkdayjobs.com': 'Blue Cross NC',
  'costar.wd1.myworkdayjobs.com': 'CoStar',
  'careers.footlocker.com': 'Foot Locker',
};

function companyFromUrl(url) {
  let host = '';
  try {
    host = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Unknown employer';
  }
  if (HOST_TO_COMPANY[host]) return HOST_TO_COMPANY[host];
  if (HOST_TO_COMPANY['www.' + host]) return HOST_TO_COMPANY['www.' + host];
  if (host === 'job-boards.greenhouse.io') {
    const m = url.match(/greenhouse\.io\/([^/]+)\//);
    const board = m?.[1] || 'employer';
    const pretty = board.replace(/industries$/i, '').replace(/careers$/i, '');
    return pretty
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .replace('Pokemon', 'Pokémon');
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
    slugify(title.replace(/\s*\|.*$/, '').replace(/\s*-\s*[^-]+$/, '')).slice(0, 36) || 'role';
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
      ? `**PDF:** ✅ Tailored PDF — \`PDF_DATE=${DATE} ONLY_VARIANT=${it.slug} node render-pdfs-2026-04-09.mjs\` (or batch \`ONLY_VARIANTS\`).`
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
  const urls = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith('http'));

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

  const trackerLines = items.map((it) => {
    const pdf = it.score >= 3.5 ? '✅¹⁸' : '❌';
    const note = 'LinkedIn batch 2026-04-07 autopipeline';
    return `| ${it.num} | ${DATE} | ${it.company} | ${it.role.replace(/\|/g, '/')} | ${it.score}/5 | Evaluated | ${pdf} | [${it.num}](reports/${it.slug}-${DATE}.md) | ${note} |`;
  });

  const appPath = resolve(ROOT, 'data', 'applications.md');
  let app = readFileSync(appPath, 'utf8');
  const needle = '| 170 | 2026-04-07 | Providence | Senior Software Developer — Data Warehousing & ETL (Hybrid) (ord 4470707) | 3.2/5 | Evaluated | ❌ | [170](reports/170-oregon-emp-nlx-4470707-2026-04-07.md) | Oregon EMP NLx autopipeline 2026-04-07 |';
  if (!app.includes(needle)) {
    console.error('applications.md: anchor row 170 not found; append manually.');
  } else {
    app = app.replace(needle, `${needle}\n${trackerLines.join('\n')}`);
    writeFileSync(appPath, app, 'utf8');
  }

  const eligible = items.filter((it) => it.score >= 3.5);
  const variants = eligible.map((it) => buildVariantObject(it));

  const variantBodies = variants
    .map((v) => {
      const proj = v.useDefaultProjects ? 'DEFAULT_PROJECTS' : 'DEFAULT_PROJECTS';
      return `    {
      slug: ${JSON.stringify(v.slug)},
      docTitle: ${JSON.stringify(v.docTitle)},
      summary: \`${escTemplate(v.summary)}\`,
      competencies: ${JSON.stringify(v.competencies, null, 6).replace(/\n/g, '\n      ')},
      roleLine: ${JSON.stringify(v.roleLine)},
      projects: ${proj},
    }`;
    })
    .join(',\n');

  writeFileSync(
    VARIANTS_OUT,
    `/**
 * LinkedIn batch 2026-04-07 — PDF variants (generated by scripts/linkedin-batch-pipeline-2026-04-07.mjs).
 */
export function linkedinBatchVariants20260407(DEFAULT_PROJECTS, projectsBlock) {
  return [
${variantBodies}
  ];
}
`,
    'utf8'
  );

  const folderEntries = Object.fromEntries(
    eligible.map((it) => [it.slug, folderName(it.company)])
  );
  writeFileSync(
    FOLDERS_OUT,
    `/** Slug → output folder — merged in output-company-folders.mjs */
export const LINKEDIN_BATCH_20260407_FOLDERS = ${JSON.stringify(folderEntries, null, 2)};
`,
    'utf8'
  );

  const summaryTable = [
    '# LinkedIn batch 2026-04-07 — summary (score ≥ 3.5 + apply)',
    '',
    '| Company | Score | Apply |',
    '|--------|-------|-------|',
    ...eligible.map((it) => `| ${it.company} | ${it.score}/5 | [Apply](${it.url}) |`),
    '',
    `_Total URLs processed: ${items.length}. PDF-eligible (≥3.5): ${eligible.length}. Regenerate all batch PDFs: \`PDF_DATE=${DATE} ONLY_VARIANTS=<comma-separated-slugs> node render-pdfs-2026-04-09.mjs\`._`,
    '',
    '## Below threshold (<3.5)',
    '',
    items
      .filter((it) => it.score < 3.5)
      .map((it) => `- ${it.company} (${it.score}/5): ${it.url}`)
      .join('\n'),
  ].join('\n');

  writeFileSync(SUMMARY_MD, summaryTable, 'utf8');

  const onlySlugs = eligible.map((it) => it.slug).join(',');
  console.log('\n---');
  console.log(`Wrote ${items.length} JDs + reports. Eligible for PDF: ${eligible.length}`);
  console.log(`Batch JSON: ${BATCH_JSON}`);
  console.log(`Summary: ${SUMMARY_MD}`);
  if (eligible.length) {
    console.log(`\nRender PDFs (PowerShell example):\n$env:PDF_DATE='${DATE}'; $env:ONLY_VARIANTS='${onlySlugs}'; node render-pdfs-2026-04-09.mjs`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
