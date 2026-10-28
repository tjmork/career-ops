#!/usr/bin/env node
/**
 * Tailored CV HTML + PDFs for applications.md rows dated 2026-04-09 with score > 3.5.
 * Run from career-ops/: node render-pdfs-2026-04-09.mjs
 */
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { buildVariants20260409 } from './pdf-variants-2026-04-09.mjs';
import { pathsForVariant } from './output-company-folders.mjs';
import { SKILLS_INVENTORY_COMPACT, SKILLS_INVENTORY_SALESFORCE } from './data/skills-inventory.mjs';
import { execSync } from 'child_process';
import { getCareerOpsRoot } from './path-resolver.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_ROOT = getCareerOpsRoot();
const DATE = process.env.PDF_DATE?.trim() || '2026-04-09';

/** Optional HTML block between Core Competencies and Work Experience (off unless variant sets includeOptionalCvFragment). See data/cv-fragments/README.md */
function optionalCvFragmentHtml(v) {
  if (!v.includeOptionalCvFragment) return '';
  const name = v.optionalCvFragmentFile || 'markets-founder-for-pdf.html';
  const p = join(DATA_ROOT, 'data', 'cv-fragments', name);
  if (!existsSync(p)) {
    console.warn(`optional CV fragment missing: ${p}`);
    return '';
  }
  return readFileSync(p, 'utf8');
}

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
  .skill-item { font-size: 10px; line-height: 1.35; color: #444; }
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
      <a href="https://github.com/tjmork">github.com/tjmork</a>
      <span class="separator">|</span>
      <a href="https://67dev.com/">67dev.com</a>
      <span class="separator">|</span>
      <span>Oregon, US</span>
    </div>
  </div>`;

const STORY_BANK_EXPERIENCE = `
  <div class="section">
    <div class="section-title">Work Experience</div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Bath &amp; Body Works</span>
        <span class="job-period">04/2023 – 11/2025</span>
      </div>
      <div class="job-role">Senior Applications Developer</div>
      <ul>
        <li><strong>Technical lead:</strong> Led ~5 engineers on Customer, Loyalty, and Data &amp; Analytics; sprint planning, PR reviews, mentoring, and on-call for checkout-impacting auth and store-data failures.</li>
        <li><strong>PWA Kit migration:</strong> Led SiteGenesis → PWA Kit (US + Canada): API contracts, shared utilities, <strong>60+ jobs</strong>, and parallel builds where headless APIs lagged legacy SiteGenesis; US/Canada merge for customer and loyalty.</li>
        <li><strong>Customer auth:</strong> Owned login, JWT/session, cart merge, and order history; restored forgot-password during hybrid cutover (<strong>dwsid vs SLAS JWT</strong>, cookie limits, Fastly/Human); validated email via MXToolbox and header analysis.</li>
        <li><strong>SFCC → SFMC email:</strong> Architected ~90% customer email migration via HTTP outbound REST → Journey Builder (credit-card prototype first); 3×/minute retries, DKIM/SPF/DMARC; OMS kept order confirm/BOPIS paths.</li>
        <li><strong>BOPIS &amp; store data:</strong> Launched Canada BOPIS for <strong>114 stores</strong>: Talend/Cleo SFTP, SAP/Radial integration layer, validated XML to SFCC (SAP not on SFCC ingest path); severity-1 ownership; guided planned US pipeline migration.</li>
        <li><strong>Loyalty &amp; programs:</strong> Shipped loyalty features with vendor coordination; delivered Points Accelerators, Preferred Store, and <strong>Attentive SMS</strong> integrations.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Saks OFF 5TH</span>
        <span class="job-period">04/2021 – 01/2023</span>
      </div>
      <div class="job-role">Senior Software Engineer</div>
      <ul>
        <li><strong>Performance:</strong> Cut page load ~6–7 seconds via checkout, cart, caching, wishlist, and analytics (SFCC web + mobile).</li>
        <li><strong>Returns UX:</strong> Led returns redesign: order-history modal with page-state preservation for multi-item returns; web/mobile E2E from Figma.</li>
        <li><strong>Mobile:</strong> Built category-scoped mobile menu imagery in SFCC; stepped in as secondary iOS release owner and ramped on <strong>Xcode, TestFlight/Bitrise, and App Store release</strong> with mobile engineering; ~10–20% mobile sales lift.</li>
        <li><strong>Growth &amp; quality:</strong> Led initial scope and integration of <strong>Optimizely</strong> A/B testing on SFCC; ADA search UX, SEO load reduction, Adobe Analytics; supplemental checkout fraud integrations.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Columbia Sportswear</span>
        <span class="job-period">12/2019 – 11/2020</span>
      </div>
      <div class="job-role">Business Systems Analyst (Engineering-focused)</div>
      <ul>
        <li><strong>Cross-team leadership:</strong> Led Product, Pricing, Promotions, and Browse &amp; Content; bridged business and engineering on SFRA delivery tied to a <strong>300% revenue increase</strong> on the initiative.</li>
        <li><strong>SFCC &amp; integrations:</strong> Delivered SFRA features; managed Order Dynamics, Channel Advisor, Bazaarvoice, DataLake, Splunk, Slack, Blue Triangle, and related analytics/order workflows.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Techsparq</span>
        <span class="job-period">01/2020 – 04/2021</span>
      </div>
      <div class="job-role">Senior Software Engineer (Contract, Columbia Sportswear)</div>
      <ul>
        <li><strong>Contract delivery:</strong> React internal app, Squarespace customizations, SFCC on-demand sandboxes.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">National Data Systems</span>
        <span class="job-period">05/2018 – 12/2019</span>
      </div>
      <div class="job-role">Software Engineer II</div>
      <ul>
        <li><strong>B2B platform:</strong> Integrated 6 companies on C#/ASP.NET B2B platform; retained at-risk client as primary liaison (~1 year).</li>
        <li><strong>Onboarding automation:</strong> Replaced manual onboarding with parameter-driven JavaScript + SQL Server stored procedures; improved performance and reduced manual overhead.</li>
        <li><strong>Mentorship:</strong> Mentored engineers on SQL and JavaScript until independent on production work.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">MyUSP 800 LLC</span>
        <span class="job-period">08/2017 – 04/2018</span>
      </div>
      <div class="job-role">Lead Software Architect</div>
      <ul>
        <li><strong>Greenfield delivery:</strong> Partnered with CEO to ship hybrid web DaaS in <strong>3 months</strong> with no prior Node/AWS production experience; ramped on full stack while meeting a fixed launch deadline.</li>
        <li><strong>Architecture &amp; security:</strong> Owned Node.js/Express, MySQL, AWS (EC2, RDS, Route 53, S3): ER-modeled schema, tiered subscriptions, auth, password recovery, encryption, HTTPS/SSL.</li>
        <li><strong>Mentorship:</strong> Mentored front-end developer on UI implementation and API integration until independent on production delivery while owning back-end architecture.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">C-LOGIC INC.</span>
        <span class="job-period">01/2015 – 05/2018</span>
      </div>
      <div class="job-role">Senior Software Developer</div>
      <ul>
        <li><strong>Enterprise dashboards:</strong> Locale/i18n system (FE keys + dictionary tables); supported Japan client; 10+ technical docs and training videos.</li>
      </ul>
    </div>
  </div>`;

const SALESFORCE_EXPERIENCE = `
  <div class="section">
    <div class="section-title">Work Experience</div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Bath &amp; Body Works</span>
        <span class="job-period">04/2023 – 11/2025</span>
      </div>
      <div class="job-role">Senior Applications Developer — Salesforce B2C Commerce</div>
      <ul>
        <li><strong>SFCC technical lead:</strong> Led ~5 engineers on Customer, Loyalty, and Data &amp; Analytics SFCC programs; sprint planning, PR reviews, and on-call for checkout, auth, and catalog ingest failures.</li>
        <li><strong>SiteGenesis → PWA Kit:</strong> Led headless migration (US + Canada): API contracts, shared utilities, <strong>60+ SFCC jobs</strong>, campaigns/promotions parity, and parallel builds where PWA Kit lagged SiteGenesis/SFRA behavior.</li>
        <li><strong>Customer auth (SLAS):</strong> Owned login, JWT/session, cart merge, and order history on SFCC; resolved hybrid <strong>dwsid vs SLAS JWT</strong> forgot-password during cutover (cookies, Fastly/Human).</li>
        <li><strong>SFCC → SFMC:</strong> Architected ~90% customer email off SFCC via HTTP outbound REST → Journey Builder; credit-card flow prototype; 3×/minute retries; DKIM/SPF/DMARC with network team.</li>
        <li><strong>BOPIS &amp; catalog data:</strong> Canada BOPIS for <strong>114 stores</strong> — validated XML store feeds into SFCC staging (Talend/Cleo SFTP, SAP/Radial layer); severity-1 ownership on destructive ingest jobs.</li>
        <li><strong>Loyalty &amp; programs:</strong> Loyalty vendor integrations, Points Accelerators, Preferred Store, and SMS on SFCC checkout paths.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Saks OFF 5TH</span>
        <span class="job-period">04/2021 – 01/2023</span>
      </div>
      <div class="job-role">Senior Software Engineer — SFCC</div>
      <ul>
        <li><strong>SFCC performance:</strong> Cut page load ~6–7 seconds via checkout, cart, caching, wishlist, and analytics on SFCC web and mobile storefronts.</li>
        <li><strong>SFCC returns &amp; mobile:</strong> Order-history returns modal on SFCC; category-scoped mobile menu imagery via SFCC static content pipeline; secondary iOS release owner validating SFCC sandbox in mobile tooling.</li>
        <li><strong>SFCC experimentation:</strong> Optimizely and SFCC A/B tests, ADA search UX, Adobe Analytics; supplemental checkout fraud integrations on SFCC.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Columbia Sportswear</span>
        <span class="job-period">12/2019 – 11/2020</span>
      </div>
      <div class="job-role">Business Systems Analyst (SFCC / Engineering-focused)</div>
      <ul>
        <li><strong>SFRA delivery:</strong> Product, Pricing, Promotions, and Browse &amp; Content on Salesforce B2C Commerce (SFRA).</li>
        <li><strong>SFCC integrations:</strong> Order Dynamics, Channel Advisor, Bazaarvoice, DataLake, Splunk, Slack, and Blue Triangle order/analytics workflows.</li>
      </ul>
    </div>

    <div class="job avoid-break">
      <div class="job-header">
        <span class="job-company">Techsparq</span>
        <span class="job-period">01/2020 – 04/2021</span>
      </div>
      <div class="job-role">Senior Software Engineer (Contract, Columbia Sportswear)</div>
      <ul>
        <li><strong>SFCC enablement:</strong> SFCC on-demand sandboxes, internal React tooling, and Squarespace customizations supporting Columbia engineering workflows.</li>
      </ul>
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

const EDU_AND_CREDS = `
  <div class="section avoid-break">
    <div class="section-title">Education &amp; Credentials</div>
    <div class="edu-item">
      <div class="edu-header">
        <span class="edu-title">BS, Computer Information Systems</span>
      </div>
      <div class="edu-org">California State Polytechnic University, Pomona</div>
    </div>
    <div class="cert-item">
      <span class="cert-title">Salesforce B2C Commerce Cloud Certified Developer</span>
      <span class="cert-year">2020</span>
    </div>
    <div class="edu-item" style="margin-top:6px;">
      <div class="edu-title">US Army National Guard — Heavy Artillery Mechanic</div>
      <div class="project-desc" style="margin-top:2px;">2010–2018 · Operated LMTV trucks; maintained M109 Paladin self-propelled howitzers (hydraulics, spring-loaded breech systems); repaired Humvees; ran diagnostics on fleet vehicles.</div>
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

function fullSkillsBlock(profile = 'generic') {
  const inventory =
    profile === 'salesforce' ? SKILLS_INVENTORY_SALESFORCE : SKILLS_INVENTORY_COMPACT;
  const rows = inventory.map(
    (s) => `
    <div class="skills-grid" style="margin-top:4px;">
      <span class="skill-item"><span class="skill-category">${esc(s.label)}:</span> ${s.items}</span>
    </div>`
  ).join('');
  return `
  <div class="section avoid-break">
    <div class="section-title">Technical Skills</div>${rows}
  </div>`;
}

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

const allVariants = buildVariants20260409(DEFAULT_PROJECTS, projectsBlock);
const onlySlug = process.env.ONLY_VARIANT?.trim();
const onlySlugs = process.env.ONLY_VARIANTS?.trim()
  ? process.env.ONLY_VARIANTS.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean)
  : null;
let variants = allVariants;
if (onlySlugs?.length) {
  variants = allVariants.filter((v) => onlySlugs.includes(v.slug));
} else if (onlySlug) {
  variants = allVariants.filter((v) => v.slug === onlySlug);
}
if (onlySlugs?.length && variants.length === 0) {
  console.error(
    `No variants matching ONLY_VARIANTS=${onlySlugs.join(',')}. Check slugs against pdf-variants.`
  );
  process.exit(1);
}
if (onlySlug && variants.length === 0) {
  console.error(`No variant with slug "${onlySlug}". Available: ${allVariants.map((v) => v.slug).join(', ')}`);
  process.exit(1);
}

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
${optionalCvFragmentHtml(v)}
${v.useSalesforceExperience ? SALESFORCE_EXPERIENCE : v.useStoryBankExperience ? STORY_BANK_EXPERIENCE : EXPERIENCE}
${v.projects}
${EDU_AND_CREDS}
${v.useFullSkills ? fullSkillsBlock(v.fullSkillsProfile || 'generic') : skillsBlock(esc(v.roleLine))}
</div>
</body>
</html>`;
}

for (const v of variants) {
  const base = v.misc
    ? `cv-terry-mork-${v.miscBaseName || 'generic'}-${DATE}`
    : `cv-candidate-${v.slug}-${DATE}`;
  const { htmlPath, pdfPath, folder } = pathsForVariant(__dirname, v.slug, base);
  writeFileSync(htmlPath, buildHtml(v), 'utf8');
  console.log(`\n=== ${v.slug} → output/${folder}/ ===`);
  execSync(`node generate-pdf.mjs "${htmlPath}" "${pdfPath}" --format=letter`, {
    cwd: __dirname,
    stdio: 'inherit',
  });
}

const filterHint = onlySlugs?.length
  ? ` (ONLY_VARIANTS=${onlySlugs.join(',')})`
  : onlySlug
    ? ` (ONLY_VARIANT=${onlySlug})`
    : '';
console.log(`\nDone: ${variants.length} PDF(s) under output/<company>/${filterHint}`);
