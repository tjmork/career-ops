/**
 * Writes reports/, jds/, and prints applications.md table rows for Oregon EMP NLx batch.
 * Run from career-ops/: node scripts/write-oregon-emp-wioa-batch.mjs
 */
import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATE = '2026-04-07';

function u(ord) {
  return `https://secure.emp.state.or.us/jobs/index.cfm?location_content=jobdisplay.cfm&ord=${ord}&system=WIOA&type=N&lang=E`;
}

/** @type {Array<{num:number,ord:number,company:string,role:string,score:number,summary:string}>} */
const rows = [
  {
    num: 150,
    ord: 4473319,
    company: 'Teradyne',
    role: 'Sr. Software Engineer (Oregon)',
    score: 3.4,
    summary:
      'Test & automation OEM (Tualatin). Semiconductor / manufacturing tooling; confirm stack vs pure web/SFCC.',
  },
  {
    num: 151,
    ord: 4473223,
    company: 'EY',
    role: 'Solution Architect — Senior Manager — Consulting (Location OPEN)',
    score: 3.2,
    summary:
      'Big-4 consulting solution architecture; “Location OPEN” / Salem listing. Presales and stakeholder-heavy vs hands-on IC dev.',
  },
  {
    num: 152,
    ord: 4473225,
    company: 'EY',
    role: 'Solution Architect — Senior Manager — Consulting (Portland listing)',
    score: 3.2,
    summary:
      'Same EY Technology Architecture track as 151; Portland job location field — likely duplicate pipeline; pick one req.',
  },
  {
    num: 153,
    ord: 4473168,
    company: 'Noblis',
    role: 'Software Engineer/Developer',
    score: 3.5,
    summary:
      'NASA Ames–adjacent work; ML/NLP/LLM and aerospace analytics. Strong eng; role may skew research/ML vs your commerce core.',
  },
  {
    num: 154,
    ord: 4473059,
    company: 'GovCIO',
    role: 'Software Engineer',
    score: 3.5,
    summary:
      'Federal suitability / public trust; remote IT modernization, legacy document-centric systems. Mission fit; stack confirm.',
  },
  {
    num: 155,
    ord: 4473028,
    company: 'Confluent',
    role: 'Senior Software Engineer',
    score: 4.0,
    summary:
      'Remote US; streaming/data platform (comp band listed on NLx). Strong distributed-systems fit; weak Salesforce tie.',
  },
  {
    num: 156,
    ord: 4472471,
    company: 'Oracle Health',
    role: 'Senior Software Developer',
    score: 3.7,
    summary:
      'OHAI / healthcare platform; cloud clearance-adjacent themes. Enterprise Java/cloud narrative; regulated data.',
  },
  {
    num: 157,
    ord: 4472344,
    company: 'FranklinCovey',
    role: 'Senior Software Engineer',
    score: 3.3,
    summary:
      'Leadership / learning SaaS subscription model. General senior IC; confirm product stack vs SFCC.',
  },
  {
    num: 158,
    ord: 4472268,
    company: 'Coinbase',
    role: 'Senior Software Engineer — Data Platform',
    score: 2.6,
    summary:
      'Crypto exchange; blockchain-adjacent mission. Title filter excludes crypto-heavy paths — low pursuit unless you waive.',
  },
  {
    num: 159,
    ord: 4472265,
    company: 'Coinbase',
    role: 'Senior Software Engineer, Backend — Platform (Payment Rails)',
    score: 2.6,
    summary:
      'Payment rails at crypto firm; same Coinbase caveats as 158.',
  },
  {
    num: 160,
    ord: 4472188,
    company: 'Capital One Shopping',
    role: 'Sr Lead Software Engineer, Analytics — Shopping (Remote-Eligible)',
    score: 4.1,
    summary:
      'Lead full-stack / analytics for Shopping; strong overlap with retail tech, data, distributed systems.',
  },
  {
    num: 161,
    ord: 4471784,
    company: 'UST',
    role: 'Full Stack Software Developer (Hillsboro)',
    score: 3.8,
    summary:
      'Digital transformation consultancy; full-stack delivery. Hybrid/on-site Hillsboro — confirm RTO.',
  },
  {
    num: 162,
    ord: 4471476,
    company: 'Verint',
    role: 'Sr. Engineer, Software',
    score: 3.5,
    summary:
      'CX automation / QM platform; senior full-stack ownership. Enterprise B2B; not commerce-specific.',
  },
  {
    num: 163,
    ord: 4469242,
    company: 'Nike',
    role: 'Principal Software Engineer (Beaverton)',
    score: 4.2,
    summary:
      'Principal IC; roadmaps, multi-team alignment, Beaverton. Strong brand; map to platform leadership stories.',
  },
  {
    num: 164,
    ord: 4469230,
    company: 'Oracle Health',
    role: 'Senior Principal Software Developer',
    score: 3.6,
    summary:
      'Healthcare analytics on OCI Government; data plane architecture. High scope; healthcare + cloud security context.',
  },
  {
    num: 165,
    ord: 4468958,
    company: 'Capital One',
    role: 'Lead Software Engineer, Systematics (Remote)',
    score: 2.9,
    summary:
      'Mainframe / Systematics emphasis per NLx snippet. Weak fit vs web commerce unless you target mainframe bridge roles.',
  },
  {
    num: 166,
    ord: 4468956,
    company: 'Capital One Shopping',
    role: 'Sr Lead Software Engineer, Full Stack AI MCP — Shopping (Remote-Eligible)',
    score: 4.0,
    summary:
      'AI/MCP and Shopping product; overlaps your modern full-stack + retail-adjacent narrative.',
  },
  {
    num: 167,
    ord: 4468905,
    company: 'Amazon Web Services (AWS)',
    role: 'Sr. Software Dev Engineer, Kiro',
    score: 3.3,
    summary:
      'Autonomous dev agent / frontier AI engineering. Exciting but diverges from SFCC; calibrate interest in AI infra.',
  },
  {
    num: 168,
    ord: 4468686,
    company: 'Teradata',
    role: 'Senior Staff Software Engineer',
    score: 3.6,
    summary:
      'Analytics / database query optimization. Data-platform senior IC; enterprise scale.',
  },
  {
    num: 169,
    ord: 4468344,
    company: 'Cribl',
    role: 'Sr Software Engineer, Search Federation',
    score: 3.9,
    summary:
      'B2B observability; remote-first. Search/distributed systems; strong eng brand in Portland ecosystem.',
  },
  {
    num: 170,
    ord: 4470707,
    company: 'Providence',
    role: 'Senior Software Developer — Data Warehousing & ETL (Hybrid)',
    score: 3.2,
    summary:
      'Providence EIS; ERP / data warehousing hybrid Portland. Healthcare IT; less SFCC, more ETL/ERP.',
  },
];

async function main() {
  const mdRows = [];
  for (const r of rows) {
    const fileBase = `${r.num}-oregon-emp-nlx-${r.ord}-${DATE}`;
    const urlStr = u(r.ord);
    const jdPath = `jds/${fileBase}.md`;
    const jdBody = `# ${r.company} — ${r.role}

**Captured:** ${DATE}  
**Source (Oregon EMP / NLx):** ${urlStr}

${r.summary}
`;
    const repBody = `# Evaluation: ${r.company} — ${r.role}

**Date:** ${DATE}  
**Archetype:** Mixed — see JD summary  
**Score:** ${r.score}/5  
**PDF:** ❌ Oregon EMP batch — no tailored PDF in this run (set \`ONLY_VARIANT\` + \`render-pdfs\` if you shortlist).  
**Source URL:** ${urlStr}  
**JD file:** [\`${jdPath}\`](../${jdPath})

---

## JD summary

${r.summary}

---

## Fit (\`cv.md\` ↔ role)

| Focus | Notes |
|--------|--------|
| **Salesforce / commerce** | See JD summary; many are platform/full-stack outside SFCC. |
| **Integrations / APIs** | Strong where role emphasizes services, data, or enterprise delivery. |
| **Location / RTO** | Oregon EMP lists Salem/Portland fields; actual worksite may be remote — confirm on employer site. |

**Score rationale:** From NLx text captured via Playwright (${DATE}); re-score after employer’s canonical posting.

---

## A) Role summary

Oregon Employment Department / NLx mirror — verify on employer careers site before applying.

## B) CV match

Map strongest proof points from \`cv.md\` once you confirm stack.

## C–F) Strategy / comp / interview

Use \`interview-prep/story-bank.md\` for STAR.

---

## Extracted keywords

${r.company}, ${r.role.split(/[^A-Za-z0-9]+/).filter(Boolean).slice(0, 6).join(', ')}
`;
    await writeFile(join(ROOT, jdPath), jdBody, 'utf8');
    await writeFile(join(ROOT, 'reports', `${fileBase}.md`), repBody, 'utf8');
    mdRows.push(
      `| ${r.num} | ${DATE} | ${r.company} | ${r.role} (ord ${r.ord}) | ${r.score}/5 | Evaluated | ❌ | [${r.num}](reports/${fileBase}.md) | Oregon EMP NLx autopipeline ${DATE} |`
    );
  }
  console.log('Wrote', rows.length, 'jds + reports.');
  console.log('\n--- Paste into applications.md after row 149 ---\n');
  console.log(mdRows.join('\n'));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
