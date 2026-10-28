#!/usr/bin/env node
/**
 * Add discovered job URLs to pipeline.md + scan-history.tsv with title filter + dedupe.
 * Usage: node scripts/scan-add-urls.mjs data/scan-batch-urls.json
 *
 * JSON: [{ "url", "title", "company", "portal" }]
 */
import { readFile, appendFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PORTALS = resolve(ROOT, 'portals.yml');
const PIPELINE = resolve(ROOT, 'data', 'pipeline.md');
const HISTORY = resolve(ROOT, 'data', 'scan-history.tsv');
const NEW_URLS_TXT = resolve(ROOT, 'data', 'scan-history-urls.txt');

const today = new Date().toISOString().slice(0, 10);

function parseTitleFilter(text) {
  const start = text.indexOf('title_filter:');
  const end = text.indexOf('search_queries:');
  const block = text.slice(start, end);
  const positive = [];
  const negative = [];
  let mode = null;
  for (const line of block.split('\n')) {
    if (/^\s*positive:\s*$/.test(line)) {
      mode = 'pos';
      continue;
    }
    if (/^\s*negative:\s*$/.test(line)) {
      mode = 'neg';
      continue;
    }
    if (/^\s*seniority_boost:\s*$/.test(line)) {
      mode = null;
      continue;
    }
    const m = line.match(/^\s*-\s*"([^"]*)"\s*$/);
    if (m && mode === 'pos') positive.push(m[1]);
    if (m && mode === 'neg') negative.push(m[1]);
  }
  return { positive, negative };
}

function titlePasses(title, { positive, negative }) {
  const t = title;
  const lower = t.toLowerCase();
  for (const neg of negative) {
    if (neg === 'Java ') {
      if (/\bjava\b/i.test(t) && !/javascript/i.test(t)) return false;
      continue;
    }
    if (lower.includes(neg.toLowerCase())) return false;
  }
  for (const pos of positive) {
    if (lower.includes(pos.toLowerCase())) return true;
  }
  return false;
}

function engineeringRelevant(title) {
  const t = title;
  if (
    /\b(Account Executive|Strategic Account|Customer Success|Sales Manager|Account Director|Business Development Representative)\b/i.test(
      t
    )
  ) {
    return false;
  }
  if (
    /\b(Digital Marketing|Marketing Manager|Brand Manager|Growth Marketing|Retail Designer|Recruiter|Sourcer)\b/i.test(t)
  ) {
    return false;
  }
  if (/\b(Paralegal|Legal Counsel|Corporate Counsel)\b/i.test(t)) return false;
  if (/\bIntern(ship)?\b/i.test(t) && !/Engineer/i.test(t)) return false;
  if (/\bSummer Job\b/i.test(t)) return false;
  if (/\bManager\b/i.test(t) && !/Engineering Manager|Technical Lead Manager/i.test(t) && /Manager, Software/i.test(t)) {
    /* allow Manager, Software Engineering */
  } else if (/\bManager\b/i.test(t) && !/Engineer/i.test(t) && !/Architect/i.test(t) && !/Developer/i.test(t)) {
    return false;
  }

  if (
    /(Software|Applications|Full[\s-]?Stack|Backend|Front[- ]?end|Web|Platform|Infrastructure|Security|Mobile|iOS|Android|ML|AI)\s+(Engineer|Developer)/i.test(
      t
    )
  ) {
    return true;
  }
  if (
    /\b(Software Engineer|Software Developer|Applications Developer|Web Developer|Staff Engineer|Principal Engineer)\b/i.test(
      t
    )
  ) {
    return true;
  }
  if (/\b(Salesforce|SFCC)\s+(Engineer|Developer)\b/i.test(t)) return true;
  if (/\b(Solutions Architect|Solutions Engineer|Integrations Developer)\b/i.test(t)) return true;
  if (/\b(Business Systems Analyst|Systems Analyst)\b/i.test(t)) return true;
  if (/\b(SRE|Site Reliability)\b/i.test(t)) return true;
  if (/\bPlatform Engineer\b/i.test(t)) return true;
  return false;
}

async function loadKnownUrls() {
  const known = new Set();
  try {
    const pipe = await readFile(PIPELINE, 'utf8');
    for (const m of pipe.matchAll(/https?:\/\/[^\s|)]+/g)) {
      known.add(m[0].replace(/[),.;]+$/, ''));
    }
  } catch {
    /* empty */
  }
  try {
    const hist = await readFile(HISTORY, 'utf8');
    for (const line of hist.split('\n').slice(1)) {
      const url = line.split('\t')[0];
      if (url?.startsWith('http')) known.add(url.trim());
    }
  } catch {
    /* empty */
  }
  return known;
}

function escapePipe(s) {
  return String(s).replace(/\|/g, '/');
}

function normalizeUrl(url) {
  return url.replace(/\?embed=js.*$/, '').replace(/\/apply$/, '').split('?')[0];
}

async function main() {
  const inputPath = resolve(process.argv[2] || 'data/scan-batch-urls.json');
  const raw = JSON.parse(await readFile(inputPath, 'utf8'));
  const items = Array.isArray(raw) ? raw : raw.items || [];
  const filter = parseTitleFilter(await readFile(PORTALS, 'utf8'));
  const known = await loadKnownUrls();

  const added = [];
  let skippedTitle = 0;
  let skippedDup = 0;

  for (const item of items) {
    const url = normalizeUrl(item.url?.trim());
    const title = item.title?.trim() || 'Unknown title';
    const company = item.company?.trim() || 'Unknown';
    const portal = item.portal?.trim() || 'WebSearch';

    if (!url?.startsWith('http')) continue;
    if (!titlePasses(title, filter) || !engineeringRelevant(title)) {
      skippedTitle++;
      continue;
    }
    if (known.has(url)) {
      skippedDup++;
      continue;
    }
    known.add(url);
    added.push({ url, title, company, portal });
  }

  if (added.length) {
    const historyLines = added.map((a) =>
      [a.url, today, a.portal, a.title, a.company, 'added'].join('\t')
    );
    await appendFile(HISTORY, historyLines.map((l) => `${l}\n`).join(''), 'utf8');

    const pipe = await readFile(PIPELINE, 'utf8');
    const pendingIdx = pipe.indexOf('## Pending');
    const rest = pipe.slice(pendingIdx);
    const nlIdx = rest.indexOf('\n');
    const head = pipe.slice(0, pendingIdx + nlIdx + 1);
    const tail = pipe.slice(pendingIdx + nlIdx + 1);
    const newLines = added
      .map((a) => `- [ ] ${a.url} | ${escapePipe(a.company)} | ${escapePipe(a.title)}`)
      .join('\n');
    await writeFile(PIPELINE, `${head}${newLines}\n${tail}`, 'utf8');

    const prev = await readFile(NEW_URLS_TXT, 'utf8').catch(() => '');
    const merged = [...prev.split('\n').filter(Boolean), ...added.map((a) => a.url)].join('\n');
    await writeFile(NEW_URLS_TXT, merged ? `${merged}\n` : '', 'utf8');
  }

  console.log(`\nScan URL ingest — ${today}`);
  console.log(`Input items: ${items.length}`);
  console.log(`Added: ${added.length}`);
  console.log(`Skipped (title): ${skippedTitle}`);
  console.log(`Skipped (dup): ${skippedDup}`);
  for (const a of added) console.log(`  + [${a.portal}] ${a.company} | ${a.title}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
