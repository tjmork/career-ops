#!/usr/bin/env node
/**
 * scan-greenhouse.mjs — Level 2 portal scan (Greenhouse JSON API)
 * Per modes/scan.md: fetch boards-api, filter titles, dedupe, append pipeline + history.
 * Also overwrites data/scan-history-urls.txt with only this run's new URLs (empty if none).
 *
 * Usage: node scan-greenhouse.mjs
 *
 * Env:
 *   SCAN_MAX_PER_BOARD (default 20) — max new URLs per board this run.
 *   SCAN_MIN_PER_BOARD (default 5) — round-robin depth: first this many “waves” try to take one job
 *     from every board (so each board with enough inventory gets at least this many before any board
 *     gets a 6th). Capped by SCAN_MAX_PER_BOARD waves total.
 *   SCAN_MAX_NEW — optional global cap (default: boards × SCAN_MAX_PER_BOARD).
 *   SCAN_STRATEGY — `hybrid` (default) = first SCAN_MIN_PER_BOARD interleaved waves (one new job
 *     per board per pass so every board with enough inventory gets at least that many), then
 *     sequential slots to SCAN_MAX_PER_BOARD per board. Matches “5–20 from each” when min=5, max=20.
 *     `per_board` = up to N jobs from each board in order (no interleaving). `round_robin` = only
 *     interleaved waves to max depth (no per-board 6..N fill after).
 */

import { readFile, appendFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname);
const PORTALS = resolve(ROOT, 'portals.yml');
const PIPELINE = resolve(ROOT, 'data', 'pipeline.md');
const HISTORY = resolve(ROOT, 'data', 'scan-history.tsv');
/** One URL per line: overwritten each run — only URLs newly added this scan (empty if none). */
const NEW_URLS_TXT = resolve(ROOT, 'data', 'scan-history-urls.txt');

const today = new Date().toISOString().slice(0, 10);

function parseTitleFilter(text) {
  const start = text.indexOf('title_filter:');
  const end = text.indexOf('search_queries:');
  if (start === -1 || end === -1) throw new Error('portals.yml: missing title_filter or search_queries');
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

function parseGreenhouseBoards(text) {
  const idx = text.indexOf('tracked_companies:');
  if (idx === -1) throw new Error('portals.yml: no tracked_companies');
  const tail = text.slice(idx);
  const lines = tail.split('\n');
  const boards = [];
  let entry = null;

  const flush = () => {
    if (entry?.api && entry.enabled !== false) {
      boards.push({ name: entry.name, api: entry.api });
    }
    entry = null;
  };

  for (const line of lines) {
    if (/^  - name:\s*/.test(line)) {
      flush();
      const raw = line.replace(/^  - name:\s*/, '').trim();
      entry = {
        name: raw.replace(/^"(.*)"$/, '$1'),
        api: null,
        enabled: true,
      };
      continue;
    }
    if (!entry) continue;
    if (/^\s+enabled:\s*false\s*$/.test(line)) entry.enabled = false;
    const apiMatch = line.match(
      /^\s+api:\s+(https:\/\/boards-api\.greenhouse\.io\/v1\/boards\/[^/\s]+\/jobs)\s*$/
    );
    if (apiMatch) entry.api = apiMatch[1];
  }
  flush();
  return boards;
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

/** Drop sales/marketing/etc. titles that matched broad positives like "Digital" or "Retail". */
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
  if (/\b(Lead|Senior|Staff|Principal)\s+Software\s+Engineer\b/i.test(t)) return true;
  if (/\b(Solutions Architect|Solutions Engineer|Forward Deployed)\b/i.test(t)) return true;
  if (/\b(Business Systems Analyst|Systems Analyst)\b/i.test(t)) return true;
  if (/\bEngineering Manager\b/i.test(t)) return true;
  if (/\b(SRE|Site Reliability)\b/i.test(t)) return true;
  if (/\bPlatform Engineer\b/i.test(t)) return true;
  if (/\bIntegrations Developer\b/i.test(t)) return true;
  if (/\bResearch Engineer\b/i.test(t)) return true;
  if (/\b(UI|UX)\s+Software Engineer\b/i.test(t)) return true;
  if (/\bTechnical (Program Manager|Lead Manager|Lead)\b/i.test(t)) return true;
  if (/\bML Ops\b/i.test(t)) return true;
  if (/\b(Salesforce|SFCC)\s+(Engineer|Developer)\b/i.test(t)) return true;
  if (/\bPartner Solutions Engineer\b/i.test(t)) return true;
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

async function main() {
  const portalsText = await readFile(PORTALS, 'utf8');
  const filter = parseTitleFilter(portalsText);
  const boards = parseGreenhouseBoards(portalsText);
  const known = await loadKnownUrls();

  const maxPerBoard = Math.max(1, Number(process.env.SCAN_MAX_PER_BOARD || '20', 10) || 20);
  const minPerBoard = Math.max(0, Number(process.env.SCAN_MIN_PER_BOARD || '5', 10) || 5);
  const defaultGlobalMax = boards.length * maxPerBoard;
  const maxNew = Math.max(
    1,
    Number(process.env.SCAN_MAX_NEW || String(defaultGlobalMax), 10) || defaultGlobalMax
  );
  const strategy = (process.env.SCAN_STRATEGY || 'hybrid').toLowerCase();
  const useRoundRobin = strategy === 'round_robin' || strategy === 'interleaved';
  const useHybrid = strategy === 'hybrid';

  let totalJobs = 0;
  let eligibleNew = 0;
  let skippedTitle = 0;
  let skippedDup = 0;
  let skippedCap = 0;
  let skippedBoardCap = 0;
  /** @type {Map<string, { company: string; title: string; url: string }[]>} */
  const boardQueues = new Map();

  for (const { name: company, api } of boards) {
    let data;
    try {
      const res = await fetch(api, {
        headers: { Accept: 'application/json', 'User-Agent': 'career-ops-scan-greenhouse/1.0' },
      });
      if (!res.ok) {
        console.warn(`WARN ${company}: HTTP ${res.status} ${api}`);
        continue;
      }
      data = await res.json();
    } catch (e) {
      console.warn(`WARN ${company}: ${e.message}`);
      continue;
    }
    const jobs = data.jobs ?? [];
    totalJobs += jobs.length;

    const q = [];
    for (const job of jobs) {
      const title = job.title ?? '';
      const url = job.absolute_url ?? '';
      if (!url) continue;

      if (!titlePasses(title, filter) || !engineeringRelevant(title)) {
        skippedTitle++;
        continue;
      }
      if (known.has(url)) {
        skippedDup++;
        continue;
      }
      q.push({ company, title, url });
    }
    eligibleNew += q.length;
    if (q.length > maxPerBoard) skippedBoardCap += q.length - maxPerBoard;
    boardQueues.set(company, q);
  }

  const added = [];
  const historyLines = [];

  const pushItem = (item) => {
    known.add(item.url);
    added.push(item);
    historyLines.push(
      [item.url, today, `Greenhouse API — ${item.company}`, item.title, item.company, 'added'].join('\t')
    );
  };

  if (useHybrid) {
    const waveDepth = Math.min(minPerBoard, maxPerBoard);
    /* Phase 1: interleave first job from each board, then second, … up to waveDepth. */
    for (let slot = 0; slot < waveDepth; slot++) {
      for (const { name: company } of boards) {
        const q = boardQueues.get(company) || [];
        if (slot >= q.length) continue;
        if (added.length >= maxNew) {
          skippedCap++;
          continue;
        }
        pushItem(q[slot]);
      }
    }
    /* Phase 2: for each board, add slots waveDepth..maxPerBoard-1 (up to 20 total per board). */
    for (const { name: company } of boards) {
      const q = boardQueues.get(company) || [];
      for (let i = waveDepth; i < maxPerBoard && i < q.length; i++) {
        if (added.length >= maxNew) {
          skippedCap++;
          break;
        }
        pushItem(q[i]);
      }
    }
  } else if (useRoundRobin) {
    for (let slot = 0; slot < maxPerBoard; slot++) {
      for (const { name: company } of boards) {
        const q = boardQueues.get(company) || [];
        if (slot >= q.length) continue;
        if (added.length >= maxNew) {
          skippedCap++;
          continue;
        }
        pushItem(q[slot]);
      }
    }
  } else {
    /* per_board: take up to maxPerBoard from each board, then next board (fair share across APIs). */
    for (const { name: company } of boards) {
      const q = boardQueues.get(company) || [];
      const take = Math.min(maxPerBoard, q.length);
      for (let i = 0; i < take; i++) {
        if (added.length >= maxNew) {
          skippedCap++;
          break;
        }
        pushItem(q[i]);
      }
    }
  }

  if (historyLines.length) await appendFile(HISTORY, historyLines.map((l) => `${l}\n`).join(''), 'utf8');

  await writeFile(
    NEW_URLS_TXT,
    added.length ? `${added.map((a) => a.url).join('\n')}\n` : '',
    'utf8'
  );

  if (added.length) {
    const pipe = await readFile(PIPELINE, 'utf8');
    const pendingIdx = pipe.indexOf('## Pending');
    if (pendingIdx === -1) throw new Error('pipeline.md: no ## Pending section');
    const rest = pipe.slice(pendingIdx);
    const nlIdx = rest.indexOf('\n');
    const head = pipe.slice(0, pendingIdx + nlIdx + 1);
    const tail = pipe.slice(pendingIdx + nlIdx + 1);
    const newLines = added
      .map(
        (a) =>
          `- [ ] ${a.url} | ${escapePipe(a.company)} | ${escapePipe(a.title)}`
      )
      .join('\n');
    await writeFile(PIPELINE, `${head}${newLines}\n${tail}`, 'utf8');
  }

  console.log(`\nPortal Scan (Greenhouse API) — ${today}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const strategyLine = useHybrid
    ? `Hybrid: first ${Math.min(
        minPerBoard,
        maxPerBoard
      )} interleaved waves across all boards, then up to ${maxPerBoard} total per board. Set SCAN_STRATEGY=per_board or round_robin to change.`
    : useRoundRobin
      ? `Per board: round-robin up to ${maxPerBoard} new URLs. Set SCAN_STRATEGY=hybrid for 5+20-style fill.`
      : `Per board: sequential — up to ${maxPerBoard} new URLs from each board. Set SCAN_STRATEGY=hybrid for balanced waves + fill.`;
  console.log(strategyLine);
  console.log(`Global cap: ${maxNew} new URLs this run`);
  console.log(`Boards queried: ${boards.length}`);
  console.log(`Listings fetched: ${totalJobs}`);
  console.log(`Eligible new URLs (title + engineering gate, not dup): ${eligibleNew}`);
  console.log(`Skipped (title): ${skippedTitle}`);
  console.log(`Skipped (dup): ${skippedDup}`);
  console.log(`Skipped (per-board cap ${maxPerBoard}): ${skippedBoardCap}`);
  console.log(`Skipped (global cap ${maxNew}): ${skippedCap}`);
  console.log(`New rows added to pipeline.md: ${added.length}`);
  console.log(
    `data/scan-history-urls.txt: ${added.length ? `${added.length} new URL(s)` : 'cleared (no new links this run)'}`
  );
  if (added.length) {
    for (const a of added) console.log(`  + ${a.company} | ${a.title}`);
  }
  const byBoard = new Map();
  for (const a of added) {
    byBoard.set(a.company, (byBoard.get(a.company) || 0) + 1);
  }
  if (boards.length) {
    const perBoardLine = boards
      .map(({ name }) => `${name}: ${byBoard.get(name) || 0}`)
      .join(' | ');
    const boardsWithNew = boards.filter(({ name }) => (byBoard.get(name) || 0) > 0).length;
    console.log(
      `\nPer board (this run, max ${maxPerBoard} each; 0 = no *new* listings vs pipeline+history for that board): ${boardsWithNew} of ${boards.length} boards contributed.`
    );
    console.log('  ' + perBoardLine);
  }
  console.log('\n→ Run /career-ops pipeline (or oferta) to evaluate new listings.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
