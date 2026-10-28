#!/usr/bin/env node
/**
 * Cursor productivity report v2 — throughput, commits, workflows, projects.
 * Usage: node scripts/cursor-productivity-report-v2.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { walkTree } from "../lib/walk-tree.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TRANSCRIPT_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || "",
  ".cursor",
  "projects",
  "d-AI-Code-aiprojects-main",
  "agent-transcripts"
);
const OUT_DIR = path.join(ROOT, "output", "reports");
const today = new Date().toISOString().slice(0, 10);
const OUT_MD = path.join(OUT_DIR, `cursor-throughput-report-${today}.md`);
const OUT_HTML = path.join(OUT_DIR, `cursor-throughput-report-${today}.html`);
const OUT_PRINT_HTML = path.join(
  OUT_DIR,
  `cursor-throughput-report-${today}.print.html`
);
const OUT_PDF = path.join(OUT_DIR, `cursor-throughput-report-${today}.pdf`);

const REPOS = [
  { name: "career-ops", path: ROOT },
  { name: "heartopia", path: "D:/AI Code/heartopia" },
  { name: "autoApply", path: "D:/AI Code/autoApply" },
];

function walkJsonl(dir) {
  if (!fs.existsSync(dir)) return [];
  return walkTree(dir, {
    allowNestedCheckouts: true,
    skip: (entry) => entry.isDirectory() && entry.name === "subagents",
  }).filter((p) => p.endsWith(".jsonl"));
}

function analyzeFile(filePath) {
  const stat = fs.statSync(filePath);
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split("\n").filter(Boolean);
  let userMsgs = 0;
  let chars = 0;
  for (const line of lines) {
    if (!line.includes('"role":"user"') && !line.includes('"role": "user"'))
      continue;
    userMsgs++;
    try {
      const obj = JSON.parse(line);
      const content = obj.message?.content;
      if (typeof content === "string") chars += content.length;
      else if (Array.isArray(content))
        chars += content
          .filter((p) => p.type === "text" && p.text)
          .reduce((n, p) => n + p.text.length, 0);
      else chars += Math.min(line.length, 800);
    } catch {
      chars += Math.min(line.length, 800);
    }
  }
  return {
    date: stat.mtime.toISOString().slice(0, 10),
    userMsgs,
    chars,
  };
}

function gitLog(repoPath, since = "2026-03-01") {
  try {
    execSync(`git -C "${repoPath}" rev-parse --is-inside-work-tree`, {
      stdio: "pipe",
    });
  } catch {
    return null;
  }
  const oneline = execSync(
    `git -C "${repoPath}" log --since=${since} --oneline`,
    { encoding: "utf8" }
  )
    .trim()
    .split("\n")
    .filter(Boolean);

  const numstat = execSync(
    `git -C "${repoPath}" log --since=${since} --pretty=tformat: --numstat`,
    { encoding: "utf8" }
  );
  let added = 0;
  let deleted = 0;
  for (const line of numstat.split("\n")) {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
      added += Number(parts[0]);
      deleted += Number(parts[1]);
    }
  }

  const byDay = new Map();
  const dayLines = execSync(
    `git -C "${repoPath}" log --since=${since} --format="%ad" --date=short`,
    { encoding: "utf8" }
  )
    .trim()
    .split("\n")
    .filter(Boolean);
  for (const d of dayLines) {
    byDay.set(d, (byDay.get(d) || 0) + 1);
  }

  const prRefs = oneline.filter((l) => /#\d+/.test(l)).length;

  return {
    commits: oneline.length,
    added,
    deleted,
    net: added - deleted,
    prRefs,
    byDay,
    messages: oneline.slice(0, 6),
  };
}

function countFiles(dir, ext) {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir).filter((f) => f.endsWith(ext)).length;
}

function countScripts() {
  const dir = path.join(ROOT, "scripts");
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mjs")).length;
}

// Transcripts
const sessions = walkJsonl(TRANSCRIPT_DIR).map(analyzeFile);
const byDay = new Map();
for (const s of sessions) {
  const d = byDay.get(s.date) || { date: s.date, prompts: 0, chars: 0 };
  d.prompts += s.userMsgs;
  d.chars += s.chars;
  byDay.set(s.date, d);
}
const cursorDays = [...byDay.values()].sort((a, b) =>
  a.date.localeCompare(b.date)
);
const totalPrompts = sessions.reduce((n, s) => n + s.userMsgs, 0);
const totalChars = sessions.reduce((n, s) => n + s.chars, 0);
const activeDays = cursorDays.filter((d) => d.prompts > 0).length;

// Git across repos
const gitStats = {};
let totalCommits = 0;
let totalAdded = 0;
let totalDeleted = 0;
let totalPrRefs = 0;
const commitByDay = new Map();

for (const repo of REPOS) {
  const g = gitLog(repo.path);
  if (!g) continue;
  gitStats[repo.name] = g;
  totalCommits += g.commits;
  totalAdded += g.added;
  totalDeleted += g.deleted;
  totalPrRefs += g.prRefs;
  for (const [d, c] of g.byDay) {
    commitByDay.set(d, (commitByDay.get(d) || 0) + c);
  }
}

// Artifacts
const reportCount = countFiles(path.join(ROOT, "reports"), ".md");
const coverLetters = countFiles(path.join(ROOT, "cover-letters"), ".md");
const scripts = countScripts();
const answerBank = fs.existsSync(
  path.join(ROOT, "output", "application-answers", "company-answer-bank.md")
);

// Token proxy: rough estimate from prompt character volume (not billing data)
const estInputTokens = Math.round(totalChars / 4);
const estTurnTokens = Math.round((totalPrompts * 800 + totalChars / 4) / 1000);

// Chart data: merge cursor prompts + commits by week
const weekMap = new Map();
function weekKey(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const mon = new Date(d.setDate(diff));
  return mon.toISOString().slice(0, 10);
}
for (const d of cursorDays) {
  const w = weekKey(d.date);
  const e = weekMap.get(w) || { week: w, prompts: 0, commits: 0 };
  e.prompts += d.prompts;
  weekMap.set(w, e);
}
for (const [date, c] of commitByDay) {
  const w = weekKey(date);
  const e = weekMap.get(w) || { week: w, prompts: 0, commits: 0 };
  e.commits += c;
  weekMap.set(w, e);
}
const weeks = [...weekMap.values()].sort((a, b) => a.week.localeCompare(b.week));

const recentWeeks = weeks.slice(-8);
const maxPrompts = Math.max(...recentWeeks.map((w) => w.prompts), 1);
const maxCommits = Math.max(...recentWeeks.map((w) => w.commits), 1);

const barChartAscii = recentWeeks
  .map((w) => {
    const pBar = "█".repeat(Math.round((w.prompts / maxPrompts) * 20) || 0);
    const cBar = "▓".repeat(Math.round((w.commits / maxCommits) * 20) || 0);
    return `${w.week}  prompts ${String(w.prompts).padStart(4)} ${pBar}\n${" ".repeat(11)} commits ${String(w.commits).padStart(3)} ${cBar}`;
  })
  .join("\n");

const mermaidBars = recentWeeks
  .map((w) => `    ${w.week} : ${w.prompts}, ${w.commits}`)
  .join("\n");

const md = `# Cursor AI Throughput Report (v2)

**Prepared for:** Terry J. Mork  
**Report date:** ${today}  
**Data sources:** Local git history, Cursor agent transcripts, career-ops artifacts

---

## Summary

Over the last few months, Cursor has become the control plane for my job search and side projects. I run **${totalPrompts.toLocaleString()} agent prompts** across **${sessions.length} sessions** on **${activeDays} active days**, while shipping **${totalCommits} commits** (~**${totalAdded.toLocaleString()} lines added**) across personal repos. The biggest throughput gains are not raw code volume but **finished outputs**: **${reportCount.toLocaleString()} job evaluation reports**, **${coverLetters} cover letters**, reusable application answer banks, and automated pipeline scripts. Token billing is not stored locally; activity volume suggests heavy daily AI use (see proxy estimate below).

---

## PR throughput

| Metric | Value | Notes |
|--------|------:|-------|
| Commits referencing merged PRs | ${totalPrRefs} | career-ops upstream (santifer/career-ops) |
| Local commits (Mar 2026+) | ${totalCommits} | career-ops ${gitStats["career-ops"]?.commits ?? 0}, heartopia ${gitStats["heartopia"]?.commits ?? 0} |
| Open PRs authored (this machine) | n/a | \`gh\` CLI not available locally |

**Examples of upstream contributions (career-ops):**

${(gitStats["career-ops"]?.messages ?? [])
  .filter((m) => /#\d+/.test(m))
  .slice(0, 5)
  .map((m) => `- \`${m}\``)
  .join("\n") || "- (none in recent sample)"}

Personal workflow: most application work ships as **markdown artifacts** (reports, cover letters) rather than GitHub PRs.

---

## Commits and lines shipped

| Repository | Commits | Lines + | Lines − | Net |
|------------|--------:|--------:|--------:|----:|
${REPOS.map((r) => {
  const g = gitStats[r.name];
  if (!g)
    return `| ${r.name} | — | — | — | — |`;
  return `| ${r.name} | ${g.commits} | ${g.added.toLocaleString()} | ${g.deleted.toLocaleString()} | ${g.net.toLocaleString()} |`;
}).join("\n")}
| **Total** | **${totalCommits}** | **${totalAdded.toLocaleString()}** | **${totalDeleted.toLocaleString()}** | **${(totalAdded - totalDeleted).toLocaleString()}** |

Peak commit days (career-ops fork): Apr 4–7, 2026 (47 commits in 4 days during active customization).

---

## Token usage

| Metric | Value |
|--------|------:|
| Cursor user messages (local) | ${totalPrompts.toLocaleString()} |
| Approx. user text volume | ${Math.round(totalChars / 1000).toLocaleString()}K characters |
| Proxy input tokens (chars ÷ 4) | ~${estInputTokens.toLocaleString()} |
| Rough session load (prompts + replies) | ~${estTurnTokens}K tokens equivalent |

**Note:** Cursor does not expose billing/token totals in local transcript files. For official numbers, export from **Cursor Settings → Usage**. The proxy above reflects sustained daily agent use, not an invoice.

---

## AI workflows and automations

| Workflow | What it does |
|----------|----------------|
| **Job pipeline** | Portal scan → batch URL evaluation → tier A/B apply lists |
| **Batch runner** | Parallel role evaluation (e.g. 463 URLs in one batch) |
| **Cover letter factory** | Role-specific letters from resume + story bank |
| **Application answer bank** | Reusable company blocks (ActBlue, Anthropic, Costco, etc.) |
| **Study loop** | SQL/COBOL/JCL prep in same workspace as applications |
| **Productivity scripts** | ${scripts} Node scripts including auto-report generation |
| **autoApply (Python)** | Browser + LLM form-fill experiments for Workday/Lululemon |

Agent patterns: multi-step sessions, validation-first edits, MCP/browser tools for research, Ask vs Agent mode for copy-only vs file writes.

---

## Personal and open source projects

| Project | Role | Recent activity |
|---------|------|-----------------|
| **career-ops** | Fork/customization of open-source job search OS | ${gitStats["career-ops"]?.commits ?? 0} commits, ${reportCount} eval reports, story bank |
| **heartopia** | React/Vite game calculators (personal) | ${gitStats["heartopia"]?.commits ?? 0} commits, cooking/gardening/fishing tabs |
| **autoApply** | Python Playwright + LLM job form automation | Prototype runs logged Apr 2026 (Workday, Lululemon) |

---

## Chart: weekly throughput (prompts vs commits)

\`\`\`mermaid
xychart-beta
    title "Weekly AI prompts vs git commits"
    x-axis [${recentWeeks.map((w) => `"${w.week.slice(5)}"`).join(", ")}]
    y-axis "Count" 0 --> ${Math.max(maxPrompts, maxCommits, 10)}
    bar "Cursor prompts" [${recentWeeks.map((w) => w.prompts).join(", ")}]
    bar "Git commits" [${recentWeeks.map((w) => w.commits).join(", ")}]
\`\`\`

**ASCII view (same data):**

\`\`\`
${barChartAscii}
Legend: █ = Cursor prompts/week   ▓ = git commits/week
\`\`\`

---

## Examples

1. **Batch job research** — One session evaluated hundreds of roles and produced tiered apply lists instead of manual one-by-one browsing.
2. **Costco Travel (#10424)** — Full cover letter + honest form answers (Java/DB2 calibration) in one agent session.
3. **Application answer bank** — Centralized reusable blocks for 12+ companies; cuts repeat writing for "why this company" prompts.
4. **career-ops upstream** — Contributed fixes/features merged via PRs (#57 WebSearch filter, #50 doctor script, #68 Canva CV, i18n modes).
5. **heartopia** — Built multi-tab React calculators with Cursor-assisted component and data work.

---

## One-paragraph upload summary

I use Cursor daily as an AI workflow layer for engineering and career ops. Since March 2026 I logged ${totalPrompts.toLocaleString()} agent prompts across ${activeDays} active days, shipped ${totalCommits} commits (~${totalAdded.toLocaleString()} lines added), and produced ${reportCount.toLocaleString()} job reports plus ${coverLetters} tailored cover letters. Throughput improved most in research batching, reusable application assets, and multi-step agent sessions—not just typing speed. Token usage is high but unverified locally; official billing would come from Cursor account settings.

---

*Generated by \`scripts/cursor-productivity-report-v2.mjs\`. Git + transcript data only; not official Cursor metrics.*
`;

const prExamples = (gitStats["career-ops"]?.messages ?? [])
  .filter((m) => /#\d+/.test(m))
  .slice(0, 5);

const repoRows = REPOS.map((r) => {
  const g = gitStats[r.name];
  if (!g)
    return `<tr><td>${r.name}</td><td class="num">-</td><td class="num">-</td><td class="num">-</td><td class="num">-</td></tr>`;
  return `<tr><td>${r.name}</td><td class="num">${g.commits}</td><td class="num">${g.added.toLocaleString()}</td><td class="num">${g.deleted.toLocaleString()}</td><td class="num">${g.net.toLocaleString()}</td></tr>`;
}).join("\n");

// Full print HTML (chart + all sections) for PDF export
const printHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cursor AI Throughput Report - ${today}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <style>
    @page { size: letter; margin: 0.6in; }
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #1a1a1a;
      max-width: 7.5in;
      margin: 0 auto;
      padding: 0.25in 0;
    }
    h1 { font-size: 18pt; margin: 0 0 0.25rem; }
    h2 { font-size: 12pt; margin: 1.25rem 0 0.5rem; border-bottom: 1px solid #ddd; padding-bottom: 0.2rem; }
    .sub { color: #555; margin: 0 0 1rem; }
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.6rem;
      margin: 1rem 0;
    }
    .metric { background: #f4f4f5; border-radius: 6px; padding: 0.65rem; text-align: center; }
    .metric .val { font-size: 16pt; font-weight: 700; }
    .metric .lbl { font-size: 8.5pt; color: #555; }
    table { width: 100%; border-collapse: collapse; margin: 0.5rem 0 0.75rem; font-size: 9.5pt; }
    th, td { border: 1px solid #ddd; padding: 0.35rem 0.5rem; text-align: left; }
    th { background: #f8f8f8; }
    td.num, th.num { text-align: right; }
    ul { margin: 0.4rem 0 0.75rem; padding-left: 1.25rem; }
    li { margin: 0.25rem 0; }
    .chart-wrap { height: 260px; margin: 0.75rem 0; page-break-inside: avoid; }
    .note { font-size: 9pt; color: #666; }
    .summary-box { background: #f0f7ff; border-left: 3px solid #2563eb; padding: 0.75rem 1rem; margin: 0.75rem 0; }
    code { font-size: 8.5pt; background: #f4f4f5; padding: 0.1rem 0.25rem; border-radius: 3px; }
    .footer { margin-top: 1.5rem; font-size: 8.5pt; color: #888; }
  </style>
</head>
<body>
  <h1>Cursor AI Throughput Report</h1>
  <p class="sub"><strong>Terry J. Mork</strong> &middot; ${today}</p>

  <div class="summary-box">
    Over the last few months, Cursor has become the control plane for my job search and side projects.
    I run <strong>${totalPrompts.toLocaleString()} agent prompts</strong> across <strong>${sessions.length} sessions</strong>
    on <strong>${activeDays} active days</strong>, while shipping <strong>${totalCommits} commits</strong>
    (~<strong>${totalAdded.toLocaleString()} lines added</strong>). The biggest gains are finished outputs:
    <strong>${reportCount.toLocaleString()} job reports</strong>, <strong>${coverLetters} cover letters</strong>,
    reusable answer banks, and pipeline scripts.
  </div>

  <div class="metrics">
    <div class="metric"><div class="val">${totalPrompts.toLocaleString()}</div><div class="lbl">Agent prompts</div></div>
    <div class="metric"><div class="val">${totalCommits}</div><div class="lbl">Git commits</div></div>
    <div class="metric"><div class="val">${totalAdded.toLocaleString()}</div><div class="lbl">Lines added</div></div>
    <div class="metric"><div class="val">${reportCount.toLocaleString()}</div><div class="lbl">Job reports</div></div>
    <div class="metric"><div class="val">${coverLetters}</div><div class="lbl">Cover letters</div></div>
    <div class="metric"><div class="val">${activeDays}</div><div class="lbl">Active days</div></div>
  </div>

  <h2>Weekly throughput</h2>
  <div class="chart-wrap"><canvas id="chart"></canvas></div>
  <p class="note">Cursor prompts vs git commits by week. Source: local transcripts + git history.</p>

  <h2>PR throughput</h2>
  <table>
    <thead><tr><th>Metric</th><th class="num">Value</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Commits referencing merged PRs</td><td class="num">${totalPrRefs}</td><td>career-ops upstream (santifer/career-ops)</td></tr>
      <tr><td>Local commits (Mar 2026+)</td><td class="num">${totalCommits}</td><td>career-ops ${gitStats["career-ops"]?.commits ?? 0}, heartopia ${gitStats["heartopia"]?.commits ?? 0}</td></tr>
      <tr><td>Open PRs authored</td><td class="num">n/a</td><td>gh CLI not available locally</td></tr>
    </tbody>
  </table>
  <p><strong>Upstream PR examples:</strong></p>
  <ul>
    ${prExamples.map((m) => `<li><code>${m.replace(/</g, "&lt;")}</code></li>`).join("\n    ") || "<li>(none in recent sample)</li>"}
  </ul>

  <h2>Commits and lines shipped</h2>
  <table>
    <thead><tr><th>Repository</th><th class="num">Commits</th><th class="num">Lines +</th><th class="num">Lines -</th><th class="num">Net</th></tr></thead>
    <tbody>
      ${repoRows}
      <tr><td><strong>Total</strong></td><td class="num"><strong>${totalCommits}</strong></td><td class="num"><strong>${totalAdded.toLocaleString()}</strong></td><td class="num"><strong>${totalDeleted.toLocaleString()}</strong></td><td class="num"><strong>${(totalAdded - totalDeleted).toLocaleString()}</strong></td></tr>
    </tbody>
  </table>

  <h2>Token usage (proxy)</h2>
  <table>
    <thead><tr><th>Metric</th><th class="num">Value</th></tr></thead>
    <tbody>
      <tr><td>Cursor user messages (local)</td><td class="num">${totalPrompts.toLocaleString()}</td></tr>
      <tr><td>Approx. user text volume</td><td class="num">${Math.round(totalChars / 1000).toLocaleString()}K characters</td></tr>
      <tr><td>Proxy input tokens (chars / 4)</td><td class="num">~${estInputTokens.toLocaleString()}</td></tr>
      <tr><td>Rough session load</td><td class="num">~${estTurnTokens}K tokens equivalent</td></tr>
    </tbody>
  </table>
  <p class="note">Official billing: Cursor Settings &rarr; Usage. Local transcripts do not store invoice data.</p>

  <h2>AI workflows and automations</h2>
  <table>
    <thead><tr><th>Workflow</th><th>What it does</th></tr></thead>
    <tbody>
      <tr><td>Job pipeline</td><td>Portal scan, batch URL evaluation, tier A/B apply lists</td></tr>
      <tr><td>Batch runner</td><td>Parallel role evaluation (e.g. 463 URLs in one batch)</td></tr>
      <tr><td>Cover letter factory</td><td>Role-specific letters from resume + story bank</td></tr>
      <tr><td>Application answer bank</td><td>Reusable blocks for ActBlue, Anthropic, Costco, etc.</td></tr>
      <tr><td>Study loop</td><td>SQL/COBOL/JCL prep in same workspace as applications</td></tr>
      <tr><td>Productivity scripts</td><td>${scripts} Node scripts including auto-report generation</td></tr>
      <tr><td>autoApply (Python)</td><td>Browser + LLM form-fill experiments for Workday/Lululemon</td></tr>
    </tbody>
  </table>

  <h2>Personal and open source projects</h2>
  <table>
    <thead><tr><th>Project</th><th>Role</th><th>Recent activity</th></tr></thead>
    <tbody>
      <tr><td>career-ops</td><td>Open-source job search OS fork</td><td>${gitStats["career-ops"]?.commits ?? 0} commits, ${reportCount} eval reports, story bank</td></tr>
      <tr><td>heartopia</td><td>React/Vite game calculators</td><td>${gitStats["heartopia"]?.commits ?? 0} commits, cooking/gardening/fishing tabs</td></tr>
      <tr><td>autoApply</td><td>Python Playwright + LLM automation</td><td>Prototype runs Apr 2026 (Workday, Lululemon)</td></tr>
    </tbody>
  </table>

  <h2>Examples</h2>
  <ol>
    <li><strong>Batch job research</strong> - Hundreds of roles evaluated in one session with tiered apply lists.</li>
    <li><strong>Costco Travel (#10424)</strong> - Cover letter + honest form answers in one agent session.</li>
    <li><strong>Application answer bank</strong> - Reusable blocks for 12+ companies.</li>
    <li><strong>career-ops upstream</strong> - PRs #57, #50, #68, i18n modes merged upstream.</li>
    <li><strong>heartopia</strong> - Multi-tab React calculators built with Cursor assistance.</li>
  </ol>

  <h2>Upload summary</h2>
  <p>I use Cursor daily as an AI workflow layer for engineering and career ops. Since March 2026 I logged ${totalPrompts.toLocaleString()} agent prompts across ${activeDays} active days, shipped ${totalCommits} commits (~${totalAdded.toLocaleString()} lines added), and produced ${reportCount.toLocaleString()} job reports plus ${coverLetters} tailored cover letters. Throughput improved most in research batching, reusable application assets, and multi-step agent sessions. Token usage is high but unverified locally.</p>

  <p class="footer">Generated ${today} from local git history and Cursor transcripts. Not official Cursor billing data.</p>

  <script>
    window.__chartReady = false;
    const labels = ${JSON.stringify(recentWeeks.map((w) => w.week))};
    new Chart(document.getElementById('chart'), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Cursor prompts', data: ${JSON.stringify(recentWeeks.map((w) => w.prompts))}, backgroundColor: '#2563eb' },
          { label: 'Git commits', data: ${JSON.stringify(recentWeeks.map((w) => w.commits))}, backgroundColor: '#94a3b8' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: { y: { beginAtZero: true } }
      },
      plugins: { legend: { position: 'bottom' } }
    });
    window.__chartReady = true;
  </script>
</body>
</html>`;

// Simple standalone HTML chart for upload
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cursor Throughput Report — ${today}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; color: #1a1a1a; }
    h1 { font-size: 1.5rem; }
    .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
    .metric { background: #f4f4f5; border-radius: 8px; padding: 1rem; text-align: center; }
    .metric .val { font-size: 1.75rem; font-weight: 700; }
    .metric .lbl { font-size: 0.85rem; color: #555; margin-top: 0.25rem; }
    canvas { max-height: 360px; }
    p.note { font-size: 0.9rem; color: #666; }
  </style>
</head>
<body>
  <h1>Cursor AI Throughput Report</h1>
  <p><strong>Terry J. Mork</strong> · ${today}</p>
  <p>Cursor powers job pipeline automation, application writing, study prep, and personal projects—with validation-first habits.</p>
  <div class="metrics">
    <div class="metric"><div class="val">${totalPrompts.toLocaleString()}</div><div class="lbl">Agent prompts</div></div>
    <div class="metric"><div class="val">${totalCommits}</div><div class="lbl">Git commits</div></div>
    <div class="metric"><div class="val">${totalAdded.toLocaleString()}</div><div class="lbl">Lines added</div></div>
    <div class="metric"><div class="val">${reportCount.toLocaleString()}</div><div class="lbl">Job reports</div></div>
    <div class="metric"><div class="val">${coverLetters}</div><div class="lbl">Cover letters</div></div>
    <div class="metric"><div class="val">${activeDays}</div><div class="lbl">Active days</div></div>
  </div>
  <canvas id="chart"></canvas>
  <p class="note">Weekly Cursor prompts vs git commits. Source: local transcripts + git history.</p>
  <script>
    const labels = ${JSON.stringify(recentWeeks.map((w) => w.week))};
    new Chart(document.getElementById('chart'), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Cursor prompts', data: ${JSON.stringify(recentWeeks.map((w) => w.prompts))}, backgroundColor: '#2563eb' },
          { label: 'Git commits', data: ${JSON.stringify(recentWeeks.map((w) => w.commits))}, backgroundColor: '#94a3b8' }
        ]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  </script>
</body>
</html>`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_MD, md, "utf8");
fs.writeFileSync(OUT_HTML, html, "utf8");
fs.writeFileSync(OUT_PRINT_HTML, printHtml, "utf8");
console.log(`Wrote ${OUT_MD}`);
console.log(`Wrote ${OUT_HTML}`);
console.log(`Wrote ${OUT_PRINT_HTML}`);
console.log(
  `Prompts: ${totalPrompts}, Commits: ${totalCommits}, Lines+: ${totalAdded}`
);

async function renderPdf() {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`file:///${OUT_PRINT_HTML.replace(/\\/g, "/")}`, {
    waitUntil: "networkidle",
  });
  await page.waitForFunction(() => window.__chartReady === true, null, {
    timeout: 15000,
  });
  await page.waitForTimeout(500);
  const pdfBuffer = await page.pdf({
    format: "letter",
    printBackground: true,
    margin: { top: "0.6in", right: "0.6in", bottom: "0.6in", left: "0.6in" },
  });
  fs.writeFileSync(OUT_PDF, pdfBuffer);
  await browser.close();
  console.log(`Wrote ${OUT_PDF} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
}

renderPdf().catch((err) => {
  console.error("PDF generation failed:", err.message);
  console.error(`Try manually: node generate-pdf.mjs "${OUT_PRINT_HTML}" "${OUT_PDF}"`);
  process.exit(1);
});
