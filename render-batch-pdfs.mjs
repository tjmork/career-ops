#!/usr/bin/env node
/**
 * Renders tailored CV HTML + PDFs for tracker batch (rows 11–26).
 * Run from career-ops/: node render-batch-pdfs.mjs
 */
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { pathsForVariant } from './output-company-folders.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATE = '2026-04-07';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const STYLES = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Terry J. Mork — CV</title>
<style>
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
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    line-height: 1.5;
    color: #1a1a2e;
    background: #ffffff;
    padding: 0;
    margin: 0;
  }
  .page { width: 100%; max-width: 8.5in; margin: 0 auto; padding: 0; }
  .header { margin-bottom: 16px; }
  .header h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #1a1a2e;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }
  .header-gradient {
    height: 2px;
    background: linear-gradient(to right, hsl(187, 74%, 32%), hsl(270, 70%, 45%));
    border-radius: 1px;
    margin-bottom: 8px;
  }
  .contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    color: #555;
  }
  .contact-row a { color: #555; text-decoration: none; }
  .contact-row .separator { color: #ccc; }
  .section { margin-bottom: 14px; }
  .section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: hsl(187, 74%, 32%);
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 3px;
    margin-bottom: 8px;
  }
  .summary-text { font-size: 11px; line-height: 1.6; color: #333; }
  a { white-space: nowrap; }
  .competencies-grid { display: flex; flex-wrap: wrap; gap: 6px; }
  .competency-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    color: hsl(187, 74%, 28%);
    background: hsl(187, 40%, 95%);
    padding: 3px 10px;
    border-radius: 3px;
    border: 1px solid hsl(187, 40%, 88%);
  }
  .job { margin-bottom: 12px; }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }
  .job-company {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: hsl(270, 70%, 45%);
  }
  .job-period { font-size: 10px; color: #777; white-space: nowrap; }
  .job-role { font-size: 11px; font-weight: 500; color: #444; margin-bottom: 4px; }
  .job ul { padding-left: 16px; margin-top: 4px; }
  .job li { font-size: 10.5px; line-height: 1.5; color: #333; margin-bottom: 2px; }
  .job li strong { font-weight: 600; }
  .project { margin-bottom: 10px; }
  .project-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: hsl(270, 70%, 45%);
  }
  .project-badge {
    font-size: 9px;
    font-weight: 500;
    color: hsl(187, 74%, 32%);
    background: hsl(187, 40%, 95%);
    padding: 1px 6px;
    border-radius: 2px;
    margin-left: 6px;
  }
  .project-desc { font-size: 10.5px; color: #444; margin-top: 2px; }
  .edu-item { margin-bottom: 6px; }
  .edu-header { display: flex; justify-content: space-between; align-items: baseline; }
  .edu-title { font-weight: 600; font-size: 11px; color: #333; }
  .edu-org { color: hsl(270, 70%, 45%); font-weight: 500; }
  .cert-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }
  .cert-title { font-size: 10.5px; font-weight: 500; color: #333; }
  .cert-year { font-size: 10px; color: #777; }
  .skills-grid { display: flex; flex-wrap: wrap; gap: 4px 12px; }
  .skill-item { font-size: 10.5px; color: #444; }
  .skill-category { font-weight: 600; color: #333; font-size: 10.5px; }
  .avoid-break { break-inside: avoid; }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <h1>Terry J. Mork</h1>
    <div class="header-gradient"></div>
    <div class="contact-row">
      <span>tmork.dev@gmail.com</span>
      <span class="separator">|</span>
      <span>+1-909-973-9479</span>
      <span class="separator">|</span>
      <a href="https://www.linkedin.com/in/terryjmork/">linkedin.com/in/terryjmork</a>
      <span class="separator">|</span>
      <span>Oregon, United States</span>
    </div>
  </div>`;

const EXPERIENCE = `
  <div class="section">
    <div class="section-title">Work Experience</div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Bath &amp; Body Works</span>
        <span class="job-period">04/2023 – 11/2025</span>
      </div>
      <div class="job-role">Senior Applications Developer</div>
      <ul>
        <li><strong>Integrations &amp; APIs:</strong> Led <strong>SiteGenesis to PWA Kit</strong> with explicit <strong>REST API contracts</strong> for auth, account, loyalty, orders (<strong>US &amp; Canada</strong>).</li>
        <li><strong>Email &amp; data pipelines:</strong> End-to-end migration via <strong>SFMC APIs</strong>; <strong>DKIM, SPF, DMARC</strong>; batch and operational reliability.</li>
        <li><strong>Scale:</strong> <strong>BOPIS</strong> across <strong>114</strong> stores; SMS and loyalty integrations.</li>
        <li><strong>Stack:</strong> Python, Golang, JavaScript, Postgres, Azure, SAP, Splunk, DataDog, Agile.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Saks OFF 5TH</span>
        <span class="job-period">04/2021 – 01/2023</span>
      </div>
      <div class="job-role">Senior Software Engineer</div>
      <ul>
        <li><strong>Performance &amp; experimentation:</strong> Checkout and platform work; <strong>~6–7s</strong> gains; <strong>A/B testing</strong> (Optimizely).</li>
        <li><strong>Production quality:</strong> Fraud and security components in critical paths.</li>
        <li><strong>Mobile &amp; full-stack:</strong> App Store delivery; initiative tied to <strong>~10–20% sales lift</strong>.</li>
        <li><strong>Tech:</strong> JavaScript, AWS, CDN.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Techsparq</span>
        <span class="job-period">01/2020 – 04/2021</span>
      </div>
      <div class="job-role">Senior Software Engineer (Columbia Sportswear)</div>
      <ul>
        <li>Internal <strong>React</strong> tooling; SFCC sandbox automation.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Columbia Sportswear</span>
        <span class="job-period">12/2019 – 11/2020</span>
      </div>
      <div class="job-role">Business Systems Analyst</div>
      <ul>
        <li><strong>Stakeholder alignment:</strong> Product, pricing, promotions; on-time enterprise releases.</li>
        <li><strong>Third-party integrations:</strong> Order, analytics, reviews, and data platforms.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">National Data Systems</span>
        <span class="job-period">05/2018 – 12/2019</span>
      </div>
      <div class="job-role">Software Engineer II</div>
      <ul>
        <li><strong>C#, ASP.NET, SQL Server</strong>; multi-tenant onboarding and data workflows.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">MyUSP 800 LLC</span>
        <span class="job-period">08/2017 – 04/2018</span>
      </div>
      <div class="job-role">Lead Software Architect</div>
      <ul>
        <li><strong>Node.js / Express</strong> on <strong>AWS</strong>: auth, encryption, subscriptions; rapid full-stack ownership.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">C-LOGIC INC.</span>
        <span class="job-period">01/2015 – 05/2018</span>
      </div>
      <div class="job-role">Senior Software Developer</div>
      <ul>
        <li>Perl, JavaScript, SQL Server, Azure, IIS; client delivery and documentation.</li>
      </ul>
    </div>
  </div>`;

const EDU = `
  <div class="section avoid-break">
    <div class="section-title">Education</div>
    <div class="edu-item">
      <div class="edu-header">
        <span class="edu-title">BS, Computer Information Systems</span>
      </div>
      <div class="edu-org">California State Polytechnic University, Pomona</div>
    </div>
  </div>`;

const CERTS = `
  <div class="section avoid-break">
    <div class="section-title">Certifications &amp; Service</div>
    <div class="cert-item">
      <span class="cert-title">Salesforce B2C Commerce Cloud Certified Developer</span>
      <span class="cert-year">2020</span>
    </div>
    <div class="cert-item">
      <span class="cert-title">US Army National Guard</span>
      <span class="cert-year">2010–2018</span>
    </div>
  </div>`;

function projectsBlock(p1, p2, p3) {
  return `
  <div class="section avoid-break">
    <div class="section-title">Selected Impact</div>
    <div class="project">
      <span class="project-title">${p1.t}</span><span class="project-badge">${p1.b}</span>
      <div class="project-desc">${p1.d}</div>
    </div>
    <div class="project">
      <span class="project-title">${p2.t}</span><span class="project-badge">${p2.b}</span>
      <div class="project-desc">${p2.d}</div>
    </div>
    <div class="project">
      <span class="project-title">${p3.t}</span><span class="project-badge">${p3.b}</span>
      <div class="project-desc">${p3.d}</div>
    </div>
  </div>`;
}

const DEFAULT_PROJECTS = projectsBlock(
  { t: 'API-first commerce migration', b: 'Platform', d: 'PWA Kit headless transition with service boundaries for millions of shoppers.' },
  { t: 'Nationwide BOPIS', b: 'Scale', d: '114 stores; cross-functional rollout and operational support.' },
  { t: 'Email &amp; marketing integrations', b: 'Integrations', d: 'SFMC API migration, deliverability (DKIM/SPF/DMARC), SMS.' }
);

function skillsBlock(roleLine) {
  return `
  <div class="section avoid-break">
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      <span class="skill-item"><span class="skill-category">Languages:</span> Python, TypeScript, JavaScript, C#, Golang, Perl, HTML/CSS</span>
    </div>
    <div class="skills-grid" style="margin-top:6px;">
      <span class="skill-item"><span class="skill-category">Engineering:</span> REST APIs, microservices patterns, SQL Server, PostgreSQL, MySQL, automated testing, Agile</span>
    </div>
    <div class="skills-grid" style="margin-top:6px;">
      <span class="skill-item"><span class="skill-category">Cloud &amp; ops:</span> AWS, Azure; Git, GitHub, GitLab, Jenkins; DataDog, Splunk, ServiceNow</span>
    </div>
    <div class="skills-grid" style="margin-top:6px;">
      <span class="skill-item"><span class="skill-category">Front end / mobile:</span> React, SFCC storefronts, Apple App Store, Figma</span>
    </div>
    <div class="skills-grid" style="margin-top:6px;">
      <span class="skill-item"><span class="skill-category">Role alignment:</span> ${roleLine}</span>
    </div>
  </div>`;
}

const variants = [
  {
    slug: 'delta-air-lines',
    docTitle: 'Delta Air Lines',
    summary: `Senior software engineer with <strong>enterprise integration</strong> and <strong>cloud-oriented delivery</strong> across retail and SaaS. Strong <strong>REST APIs</strong>, <strong>batch and event-style workflows</strong>, and production operations (<strong>Splunk</strong>, <strong>DataDog</strong>). Comfortable with <strong>JavaScript, Python, Golang, and C#</strong>; <strong>AWS and Azure</strong>. Eager to support <strong>large-scale IT transformation</strong> in aviation: reliability, security, and cross-functional execution. <strong>BS CIS.</strong> Veteran.`,
    competencies: [
      'Enterprise software delivery',
      'REST APIs & service integration',
      'Cloud (AWS / Azure)',
      'Agile & cross-functional teams',
      'Observability (Splunk, DataDog)',
      'Python / Golang / JavaScript / C#',
      'Data pipelines & operational excellence',
      'Security-aware engineering',
    ],
    roleLine:
      'Airline IT: scalable services, integration, and quality engineering mindset; quick ramp on org SDLC.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'ohsu',
    docTitle: 'OHSU',
    summary: `Senior engineer/analyst profile with deep <strong>enterprise system</strong> experience and <strong>cross-functional delivery</strong> in regulated environments. Strong <strong>requirements, UAT, and integration</strong> work across commerce and data platforms; <strong>third-party vendor</strong> coordination. <strong>SQL</strong>, <strong>REST</strong>, and full-stack background (<strong>C#, Python, JavaScript</strong>). Motivated to support <strong>academic medical center</strong> applications with careful change management. <strong>BS CIS.</strong>`,
    competencies: [
      'Systems analysis & UAT',
      'Enterprise integrations',
      'Healthcare-adjacent data discipline',
      'Stakeholder alignment',
      'SQL Server / PostgreSQL',
      'REST & batch interfaces',
      'Documentation & SOP mindset',
      'Agile delivery',
    ],
    roleLine:
      'Health systems: analyst/senior analyst tracks; Epic/Cerner-adjacent integration interest with honest ramp plan.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'sephora-integrations',
    docTitle: 'Sephora Integrations',
    summary: `Senior engineer focused on <strong>enterprise integrations</strong> and <strong>API-led connectivity</strong> between commerce, marketing, and operations. Led <strong>headless</strong> migration with explicit <strong>service contracts</strong> and high-volume <strong>retail</strong> rollouts (<strong>BOPIS</strong>, loyalty, SMS). Strong <strong>Python, Golang, JavaScript, TypeScript</strong>; <strong>OAuth</strong> and email authentication programs. Ready to own <strong>integration roadmap</strong> for global beauty retail tech. <strong>Salesforce B2C Commerce Certified Developer.</strong>`,
    competencies: [
      'Lead integration engineering',
      'REST & event-driven patterns',
      'Retail & omnichannel scale',
      'PWA Kit / API-first commerce',
      'Partner & vendor APIs',
      'Python / TypeScript / Golang',
      'Cloud (Azure / AWS)',
      'Agile cross-functional leadership',
    ],
    roleLine:
      'Sephora / LVMH: integrations, middleware, and reliable partner connectivity at retail scale.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'twitch',
    docTitle: 'Twitch',
    summary: `Senior software engineer with <strong>distributed systems</strong> experience through high-traffic <strong>commerce platforms</strong> and <strong>API-first</strong> services. Hands-on <strong>Python and Golang</strong>; growing <strong>TypeScript</strong>; strong <strong>AWS</strong> exposure. Deep focus on <strong>reliability</strong>, <strong>observability</strong>, and safe rollout of customer-facing flows. Excited to apply integration and platform discipline to <strong>creator monetization</strong> and payouts-scale problems. <strong>BS CIS.</strong>`,
    competencies: [
      'Backend & platform services',
      'Python / Golang / TypeScript',
      'AWS cloud patterns',
      'High-traffic API design',
      'Observability & on-call mindset',
      'Microservices & integration',
      'Agile delivery',
      'Data-aware feature shipping',
    ],
    roleLine:
      'Monetization-adjacent: correctness, APIs, and scalable services; ramp on Go/TS depth as needed.',
    projects: projectsBlock(
      { t: 'High-scale API migration', b: 'Platform', d: 'Service boundaries and contracts for auth, orders, loyalty.' },
      { t: 'Email & comms pipelines', b: 'Reliability', d: 'Production integrations with monitoring and rollback discipline.' },
      { t: 'Performance & experimentation', b: 'Product', d: 'A/B testing and latency work on digital storefronts.' }
    ),
  },
  {
    slug: 'puzzle-io',
    docTitle: 'Puzzle.io EM',
    summary: `Engineering leader with a track record of <strong>cross-functional alignment</strong> and <strong>shipping complex programs</strong> across product, data, and operations. As IC, owned <strong>end-to-end integrations</strong>, <strong>migrations</strong>, and <strong>114-store</strong> rollouts; comfortable mentoring through code review and technical planning. Seeking <strong>Engineering Manager</strong> scope: hiring, roadmap partnership, and delivery predictability for <strong>fintech/accounting</strong> platform teams. <strong>BS CIS.</strong> Veteran.`,
    competencies: [
      'Team leadership & mentorship',
      'Technical roadmap partnership',
      'Enterprise delivery & migrations',
      'API & platform integrations',
      'Agile / cross-functional execution',
      'Python / JavaScript / Golang',
      'Cloud delivery (AWS / Azure)',
      'Stakeholder communication',
    ],
    roleLine:
      'EM track: people development, delivery cadence, and technical quality for platform teams.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'lyft-server',
    docTitle: 'Lyft Server',
    summary: `Senior <strong>backend-oriented</strong> engineer with production <strong>Python</strong> and <strong>Golang</strong> usage and strong <strong>API</strong> and <strong>microservices</strong> patterns from commerce scale. Experience with <strong>on-call</strong> culture via observability tools, performance work, and safe releases. Interested in <strong>marketplace</strong> rider/driver flows, reliability, and cross-team product partnership. <strong>BS CIS.</strong>`,
    competencies: [
      'Server-side development',
      'Python / Golang',
      'REST APIs & distributed systems',
      'Performance & reliability',
      'On-call & incident response mindset',
      'A/B testing & experimentation',
      'AWS cloud',
      'Agile collaboration',
    ],
    roleLine:
      'Lyft: product-focused server engineering, hybrid collaboration, marketplace-scale patterns.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'rula',
    docTitle: 'Rula Principal',
    summary: `Senior-to-staff level engineer with <strong>end-to-end ownership</strong> of platform migrations, <strong>integration architecture</strong>, and multi-team programs. Proven <strong>0-to-1 and scale</strong>: headless commerce, nationwide rollout, and high-trust customer data flows. Strong communicator for <strong>remote</strong> and distributed work; disciplined on <strong>documentation</strong> and <strong>operational excellence</strong>. Motivated by <strong>healthcare access</strong> and reliable care technology. <strong>BS CIS.</strong>`,
    competencies: [
      'Principal-level technical leadership',
      'System design & integrations',
      'Remote collaboration',
      'Platform migrations at scale',
      'Python / TypeScript / Golang stack',
      'Cloud (AWS / Azure)',
      'Compliance-aware engineering',
      'Mentorship & technical alignment',
    ],
    roleLine:
      'Behavioral health platform: architecture, reliability, and cross-org technical direction.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'snowflake-fe',
    docTitle: 'Snowflake Frontend',
    summary: `Senior engineer with strong <strong>JavaScript/TypeScript</strong> and <strong>full-stack</strong> delivery across <strong>React</strong>, mobile, and <strong>API-driven</strong> storefronts. Shipped <strong>performance</strong> and <strong>UX</strong> improvements, <strong>A/B tests</strong>, and production features with analytics instrumentation. Comfortable collaborating with design and backend on <strong>data-rich UIs</strong>. <strong>BS CIS.</strong> Salesforce certified (B2C).`,
    competencies: [
      'Frontend engineering (React, TS)',
      'Performance & accessibility awareness',
      'API integration & headless patterns',
      'A/B testing & analytics',
      'Mobile shipping (iOS pipeline)',
      'Collaboration with design',
      'Cloud-backed apps (AWS)',
      'Agile delivery',
    ],
    roleLine:
      'Data-cloud UI: component quality, performance, and integration with backend services.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'uber-earner-incentive',
    docTitle: 'Uber Marketplace',
    summary: `Senior software engineer with background in <strong>high-scale digital platforms</strong>, <strong>experimentation</strong>, and <strong>data-integrated</strong> product engineering. Strong <strong>Python and Golang</strong>; <strong>JavaScript/TypeScript</strong>; <strong>C#</strong> history. Deep experience with <strong>services</strong>, <strong>caching</strong>, <strong>analytics</strong>, and cross-functional work with data stakeholders. Excited by <strong>marketplace incentives</strong>, throughput, and reliability. <strong>BS CIS.</strong>`,
    competencies: [
      'Backend & distributed systems',
      'Python / Golang / TypeScript / JVM ramp',
      'High-throughput services',
      'A/B testing & metrics',
      'Cross-functional (product, data)',
      'AWS / Azure exposure',
      'Operational excellence',
      'Agile at scale',
    ],
    roleLine:
      'Marketplace: incentive systems, real-time serving, and collaboration with ML-adjacent teams.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'openai-infra',
    docTitle: 'OpenAI Infrastructure',
    summary: `Senior engineer with <strong>production operations</strong> mindset: <strong>observability</strong> (Splunk, DataDog, ServiceNow), <strong>CI/CD</strong>, and reliable releases on <strong>cloud</strong> platforms. Strong <strong>Python, Golang, JavaScript</strong> and <strong>automation</strong>; experience hardening <strong>customer-facing</strong> and <strong>integration</strong> paths. Eager to contribute to <strong>infrastructure scale</strong>, developer productivity, and incident culture. <strong>BS CIS.</strong>`,
    competencies: [
      'Infrastructure & reliability',
      'Observability & incident response',
      'Python / Golang automation',
      'CI/CD (GitHub, GitLab, Jenkins)',
      'AWS / Azure operations',
      'Distributed systems fundamentals',
      'Security-aware delivery',
      'Cross-team platform work',
    ],
    roleLine:
      'Infra: scale, tooling, and reliability for research and product engineering customers.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'zoox',
    docTitle: 'Zoox',
    summary: `Senior <strong>full-stack</strong> engineer: <strong>React</strong> apps, <strong>REST APIs</strong>, and end-to-end feature delivery from requirements to production. Experience with <strong>mobile</strong> pipelines, <strong>documentation</strong>, and <strong>cross-functional</strong> shipping in retail tech. Comfortable building <strong>internal tools</strong> and customer-facing flows with strong QA discipline. <strong>BS CIS.</strong>`,
    competencies: [
      'Full-stack delivery',
      'React & JavaScript/TypeScript',
      'REST APIs & integration',
      'Internal tools & ops UX',
      'Mobile release experience',
      'Python / Golang backend work',
      'AWS / Azure',
      'Agile collaboration',
    ],
    roleLine:
      'Operational applications: full-stack features for internal platforms and workflows.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'offerup',
    docTitle: 'OfferUp',
    summary: `Senior software engineer with <strong>search</strong>, <strong>catalog</strong>, and <strong>commerce platform</strong> experience: performance tuning, <strong>caching</strong>, <strong>CDN</strong>, and high-RPS paths. Strong <strong>object-oriented</strong> background (<strong>C#</strong>, enterprise .NET); active <strong>Python, Golang, JavaScript</strong>. Led <strong>large migrations</strong> and cross-team delivery. Ready to ramp on <strong>Java</strong> ecosystem where needed for staff-level ownership. <strong>BS CIS.</strong>`,
    competencies: [
      'Staff-level scope & mentorship',
      'Search & catalog-adjacent performance',
      'Microservices patterns',
      'Java ramp (strong OOP / C#)',
      'AWS cloud',
      'High RPS retail scale',
      'Technical strategy',
      'Agile execution',
    ],
    roleLine:
      'Consumer marketplace: Java microservices, search/catalog, and reliability at scale.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'bumble',
    docTitle: 'Bumble',
    summary: `Senior / lead-oriented engineer with <strong>cross-functional leadership</strong> and <strong>shipping record</strong> across web, mobile, and services. Columbia role: aligned <strong>product, pricing, and engineering</strong> for major outcomes. BBW: owned <strong>migrations</strong> and <strong>114-location</strong> programs. Strong <strong>Python, JavaScript, Golang</strong>; <strong>AWS</strong>. Comfortable with <strong>AI-assisted</strong> engineering workflows for code quality and speed. <strong>BS CIS.</strong> Veteran.`,
    competencies: [
      'Lead engineer scope',
      'Full-stack & mobile delivery',
      'Product partnership',
      'Python / JavaScript / Golang',
      'AWS & performance work',
      'A/B testing culture',
      'Mentorship & code quality',
      'Responsible AI tooling in daily work',
    ],
    roleLine:
      'Consumer social: lead technical delivery, hybrid Austin, pragmatic AI use in engineering.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'upstart-api',
    docTitle: 'Upstart API Enablement',
    summary: `Senior engineer with strong <strong>platform and integration</strong> orientation: <strong>API contracts</strong>, <strong>service boundaries</strong>, and safe rollout of cross-cutting changes. Experience with <strong>batch and pipeline</strong> workflows, <strong>observability</strong>, and <strong>Python/Golang/JavaScript</strong> services. Motivated by <strong>event-driven</strong> patterns, <strong>developer tooling</strong>, and <strong>fintech</strong> reliability. Quick study on <strong>Kafka</strong> and <strong>gRPC</strong> in production contexts. <strong>BS CIS.</strong>`,
    competencies: [
      'Platform & API enablement',
      'Event-driven & integration design',
      'Python / TypeScript / Golang',
      'Service-to-service patterns',
      'Observability & quality gates',
      'Fintech-scale discipline',
      'Kafka / gRPC learning velocity',
      'Agile cross-team delivery',
    ],
    roleLine:
      'Event bus, experimentation, gRPC: internal frameworks and safe feature rollout.',
    projects: projectsBlock(
      { t: 'API-first migration', b: 'Platform', d: 'Explicit contracts for auth, loyalty, orders across regions.' },
      { t: 'Operational pipelines', b: 'Events', d: 'Email and integration flows with monitoring and rollback.' },
      { t: 'Experimentation culture', b: 'Data', d: 'A/B testing and metrics-informed releases.' }
    ),
  },
  {
    slug: 'turo-api',
    docTitle: 'Turo API',
    summary: `Senior software engineer with <strong>microservices</strong> and <strong>API integration</strong> experience, <strong>monolith decomposition</strong> patterns via headless migration, and <strong>auth-sensitive</strong> flows (OAuth, tokens, encryption). Languages: <strong>Python, Golang, JavaScript, C#</strong>; motivated to deepen <strong>Kotlin/Java</strong> if required. Strong <strong>AWS</strong> background. Interested in <strong>marketplace</strong> APIs and reliability. <strong>BS CIS.</strong>`,
    competencies: [
      'API & microservices',
      'Auth & integration patterns',
      'Python / Golang / JVM ramp',
      'Distributed systems',
      'AWS cloud',
      'High-scale production',
      'Agile delivery',
      'Marketplace domain interest',
    ],
    roleLine:
      'API Services: monolith decomposition, auth/notifications, and scalable marketplace backends.',
    projects: DEFAULT_PROJECTS,
  },
  {
    slug: 'plaid-devrel',
    docTitle: 'Plaid DevRel',
    summary: `Senior engineer with a history of <strong>technical writing</strong>, <strong>client-facing delivery</strong>, and <strong>integration guidance</strong> (10+ docs and videos at C-LOGIC; enterprise stakeholder work at Columbia). Deep hands-on with <strong>REST APIs</strong>, <strong>OAuth</strong>, and <strong>fintech-adjacent</strong> commerce integrations. Interested in <strong>developer experience</strong>, samples, and helping partners ship faster on <strong>financial APIs</strong>. <strong>BS CIS.</strong>`,
    competencies: [
      'Developer advocacy & education',
      'REST & financial API patterns',
      'Technical writing & workshops',
      'Integration architecture',
      'Python / JavaScript / Golang',
      'OAuth & secure auth flows',
      'Cross-functional storytelling',
      'Community-minded support',
    ],
    roleLine:
      'DevRel: sample apps, docs, and partner success on API products (honest SWE-to-advocacy pivot).',
    projects: projectsBlock(
      { t: 'Integration documentation', b: 'Enablement', d: 'Technical docs and stakeholder training across enterprise systems.' },
      { t: 'API migration leadership', b: 'DX', d: 'Clear contracts and migration support for engineering teams.' },
      { t: 'Third-party ecosystem', b: 'Partners', d: 'Columbia: many vendor integrations and data workflows.' }
    ),
  },
];

function buildHtml(v) {
  const compHtml = v.competencies.map((c) => `      <span class="competency-tag">${esc(c)}</span>`).join('\n');
  return `${STYLES.replace('<title>Terry J. Mork — CV</title>', `<title>Terry J. Mork — CV (${esc(v.docTitle)})</title>`)}
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <div class="summary-text">${v.summary}</div>
  </div>

  <div class="section">
    <div class="section-title">Core Competencies</div>
    <div class="competencies-grid">
${compHtml}
    </div>
  </div>
${EXPERIENCE}
${v.projects}
${EDU}
${CERTS}
${skillsBlock(esc(v.roleLine))}
</div>
</body>
</html>`;
}

for (const v of variants) {
  const base = `cv-candidate-${v.slug}-${DATE}`;
  const { htmlPath, pdfPath, folder } = pathsForVariant(__dirname, v.slug, base);
  writeFileSync(htmlPath, buildHtml(v), 'utf8');
  console.log(`\n=== ${v.slug} → output/${folder}/ ===`);
  execSync(`node generate-pdf.mjs "${htmlPath}" "${pdfPath}" --format=letter`, {
    cwd: __dirname,
    stdio: 'inherit',
  });
}

console.log(`\nDone: ${variants.length} PDFs under output/<company>/`);
