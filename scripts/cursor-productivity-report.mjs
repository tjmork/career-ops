#!/usr/bin/env node
/**
 * Build a simple Cursor productivity report from local agent transcripts + career-ops artifacts.
 * Usage: node scripts/cursor-productivity-report.mjs
 */
import fs from "fs";
import path from "path";
import { walkTree } from "../lib/walk-tree.mjs";
import { fileURLToPath } from "url";

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
const OUT_FILE = path.join(OUT_DIR, "cursor-productivity-report-2026-05-31.md");

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
  let career = 0;
  let study = 0;
  let code = 0;
  for (const line of lines) {
    if (!line.includes('"role":"user"') && !line.includes('"role": "user"')) continue;
    userMsgs++;
    const low = line.toLowerCase();
    if (/career|apply|cover letter|resume|pipeline|job/.test(low)) career++;
    if (/sql|cobol|jcl|db2|cics|javascript|html|css/.test(low)) study++;
    if (/implement|fix|refactor|bug|script|code|build/.test(low)) code++;
  }
  return {
    file: path.basename(filePath),
    date: stat.mtime.toISOString().slice(0, 10),
    created: stat.birthtime.toISOString().slice(0, 10),
    userMsgs,
    lines: lines.length,
    career,
    study,
    code,
  };
}

function countReports() {
  const reportsDir = path.join(ROOT, "reports");
  if (!fs.existsSync(reportsDir)) return 0;
  return fs.readdirSync(reportsDir).filter((f) => f.endsWith(".md")).length;
}

function countCoverLetters() {
  const clDir = path.join(ROOT, "..", "cover-letters");
  const alt = path.join(ROOT, "cover-letters");
  const dir = fs.existsSync(clDir) ? clDir : fs.existsSync(alt) ? alt : null;
  if (!dir) return 0;
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).length;
}

const files = walkJsonl(TRANSCRIPT_DIR);
const sessions = files.map(analyzeFile);

const byDay = new Map();
for (const s of sessions) {
  const d = byDay.get(s.date) || {
    date: s.date,
    sessions: 0,
    userMsgs: 0,
    career: 0,
    study: 0,
    code: 0,
  };
  d.sessions++;
  d.userMsgs += s.userMsgs;
  d.career += s.career;
  d.study += s.study;
  d.code += s.code;
  byDay.set(s.date, d);
}

const days = [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date));
const totalUserMsgs = sessions.reduce((n, s) => n + s.userMsgs, 0);
const activeDays = days.filter((d) => d.userMsgs > 0).length;
const avgMsgsPerActiveDay = activeDays
  ? Math.round(totalUserMsgs / activeDays)
  : 0;

const earlyDays = days.slice(0, Math.min(5, days.length));
const recentDays = days.slice(-7);
const earlyAvg =
  earlyDays.length > 0
    ? Math.round(
        earlyDays.reduce((n, d) => n + d.userMsgs, 0) / earlyDays.length
      )
    : 0;
const recentAvg =
  recentDays.length > 0
    ? Math.round(
        recentDays.reduce((n, d) => n + d.userMsgs, 0) / recentDays.length
      )
    : 0;

const topSessions = [...sessions]
  .sort((a, b) => b.userMsgs - a.userMsgs)
  .slice(0, 8);

const reportCount = countReports();
const coverLetterCount = countCoverLetters();

const today = new Date().toISOString().slice(0, 10);

const md = `# Cursor Productivity Report

**Prepared for:** Terry J. Mork  
**Report date:** ${today}  
**Scope:** Local Cursor agent activity + career-ops deliverables

---

## At a glance

| Metric | Value |
|--------|------:|
| Cursor chat sessions | ${sessions.length} |
| Total prompts (user messages) | ${totalUserMsgs} |
| Active days (with prompts) | ${activeDays} |
| Avg prompts per active day | ${avgMsgsPerActiveDay} |
| Job evaluation reports | ${reportCount} |
| Cover letter drafts | ${coverLetterCount} |

---

## Then vs now

| | Early Cursor use | Current active days |
|--|------------------|---------------------|
| **Typical session** | 1 question, 1 answer | Many tasks in one session |
| **Work type** | Learning / Q&A | Pipeline + applications + study + code |
| **Research** | Manual browsing | Batch scans & pipeline evaluation |
| **Writing** | Start from scratch each time | Reusable answer bank & templates |
| **Avg prompts/day** | ~${earlyAvg} (first tracked days) | ~${recentAvg} (last 7 active days) |

**Simple takeaway:** On active days, you now handle **more tasks per session** and produce **more finished outputs** (reports, cover letters, application answers) in less wall-clock time.

---

## What you ship with Cursor now

- **Job pipeline:** portal scans, batch URL evaluation (e.g. 463 roles in one batch), tier A/B apply lists
- **Applications:** tailored cover letters and form answers for multiple companies
- **Reusable assets:** story bank, application answer bank, skills lists
- **Learning:** SQL, COBOL, JCL, web fundamentals in the same workspace as job search
- **AI workflow:** daily use of Cursor/Claude with validation-first habits (resume-backed, honest claims)

---

## Most active sessions (by prompts)

| Prompts | Last active | Focus signals |
|--------:|-------------|---------------|
${topSessions
  .map(
    (s) =>
      `| ${s.userMsgs} | ${s.date} | career ${s.career}, study ${s.study}, code ${s.code} |`
  )
  .join("\n")}

---

## Active days (recent)

| Date | Sessions | Prompts | Career | Study | Code |
|------|----------|--------:|-------:|------:|-----:|
${days
  .slice(-14)
  .map(
    (d) =>
      `| ${d.date} | ${d.sessions} | ${d.userMsgs} | ${d.career} | ${d.study} | ${d.code} |`
  )
  .join("\n")}

---

## Efficiency summary (honest)

**Biggest gains**
1. **Job research throughput** — batch evaluation vs one-at-a-time manual review  
2. **Application copy** — minutes instead of hours per company  
3. **Context reuse** — story bank, answer bank, cover letter library  

**What did not change**
- Cursor only helps on days you use it  
- Speed still depends on you validating output (especially for applications and technical claims)

**Professional AI experience**
- Daily personal use in Cursor and Claude on side projects and career-ops  
- Practical familiarity with agent workflows, tool use, and MCP concepts  
- Not a formal production AI engineer role yet; strong practitioner + validation discipline

---

## One-paragraph summary (for uploads)

I use Cursor daily for full-stack and career workflow work. Compared to my first use (single Q&A prompts), I now run multi-step agent sessions that batch job research, draft tailored applications, and reuse story/answer banks. On active days I process far more roles and finished outputs than before, while keeping a validation-first approach so AI speeds delivery without replacing engineering judgment.

---

*Generated from local Cursor transcript metadata and career-ops file counts. Not official Cursor billing data.*
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, md, "utf8");
console.log(`Wrote ${OUT_FILE}`);
console.log(`Sessions: ${sessions.length}, User messages: ${totalUserMsgs}, Active days: ${activeDays}`);
