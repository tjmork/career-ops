/**
 * Tailored CV variants for applications.md 2026-04-09, score > 3.5.
 * Used by render-pdfs-2026-04-09.mjs
 *
 * Optional prior-career block (markets / founder / TradingView): **off by default.**
 * Set `includeOptionalCvFragment: true` on a variant only when the JD makes it a selling point.
 * Fragment HTML: `data/cv-fragments/markets-founder-for-pdf.html` — see `data/cv-fragments/README.md`.
 */
import { linkedinBatchVariants20260407 } from './batch/linkedin-batch-variants-20260407.mjs';
import { scanHistoryUrlsVariants20260416 } from './batch/scan-history-urls-variants-20260416.mjs';
import { scanHistoryUrlsVariants20260418 } from './batch/batch-pasted-urls-2026-04-18-variants-20260418.mjs';
import { scanHistoryUrlsVariants20260407 } from './batch/batch-mixed-boards-2026-04-07-variants-20260407.mjs';
import { scanHistoryUrlsVariants20260423 } from './batch/batch-mixed-2026-04-23-variants-20260423.mjs';
import { scanHistoryUrlsVariants20260428 } from './batch/batch-2026-04-28-mixed-urls-variants-20260428.mjs';
import { scanHistoryUrlsVariants20260429 } from './batch/batch-2026-04-29-mixed-urls-variants-20260429.mjs';
import { scanHistoryUrlsVariants20260430 } from './batch/batch-2026-04-30-mixed-urls-variants-20260430.mjs';
import { scanHistoryUrlsVariants20260507 } from './batch/batch-2026-05-07-oregon-sor-urls-variants-20260507.mjs';
import { scanHistoryUrlsVariants20260520 } from './batch/batch-2026-05-20-emp-oregon-mixed-urls-variants-20260520.mjs';
import { scanHistoryUrlsVariants20260526 } from './batch/batch-2026-05-26-uber-urls-variants-20260526.mjs';
import { scanHistoryUrlsVariants20260526Oregon } from './batch/batch-2026-05-26-oregon-sor-urls-variants-20260526.mjs';

export function buildVariants20260409(DEFAULT_PROJECTS, projectsBlock) {
  return [
    {
      slug: 'benchling-developer-enablement',
      docTitle: 'Benchling Developer Enablement',
      summary: `Senior engineer with <strong>API platform</strong> and <strong>integration</strong> depth: <strong>REST</strong> contracts, high-scale <strong>retail</strong> migrations, and <strong>third-party ecosystems</strong>. Built internal <strong>React</strong> tooling; strong <strong>Python, JavaScript, Golang</strong>. Interested in <strong>developer-facing APIs</strong>, <strong>GraphQL</strong> ramp, and optional <strong>AI agent / MCP</strong>-style interfaces. Eager to learn <strong>life-sciences SaaS</strong>. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Developer platform & external APIs',
        'REST & integration patterns',
        'Scalable services & performance',
        'React & full-stack web',
        'Python / JavaScript / Golang',
        'CI/CD, code review, mentorship',
        'Enterprise SaaS delivery',
        'GraphQL / bulk API ramp (honest)',
      ],
      roleLine:
        'Benchling: SDKs, REST/GraphQL, event delivery, hybrid SF 3x; platform quality for scientific developers.',
      projects: projectsBlock(
        { t: 'API-first migration', b: 'Platform', d: 'Explicit REST contracts for auth, loyalty, orders across regions.' },
        { t: 'Partner integrations', b: 'Ecosystem', d: 'SFMC, SAP, analytics vendors; reliable production handoffs.' },
        { t: 'Internal React tooling', b: 'DX', d: 'Columbia-era developer workflows and sandbox automation.' }
      ),
    },
    {
      slug: 'nordstrom-checkout-wishlist',
      docTitle: 'Nordstrom Checkout & Wishlist',
      summary: `Senior <strong>full-stack</strong> engineer with deep <strong>digital commerce</strong>: checkout, cart, wishlists, <strong>loyalty</strong>, and <strong>high-traffic</strong> storefronts. Strong <strong>JavaScript/TypeScript</strong> path; <strong>AWS</strong> exposure; <strong>event-driven</strong> and <strong>REST</strong> integration patterns from <strong>PWA Kit</strong> and SFCC. Comfortable with <strong>on-call</strong> culture and cross-functional retail teams. <strong>Salesforce B2C Commerce Certified Developer.</strong>`,
      competencies: [
        'Checkout & omnichannel commerce',
        'Full-stack web (JS/TS, React ramp)',
        'REST & event-driven systems',
        'AWS & cloud patterns',
        'Performance & A/B experimentation',
        'Retail scale & reliability',
        'Agile, product partnership',
        'Hybrid Seattle / PNW',
      ],
      roleLine:
        'Nordstrom: conversion funnel, checkout platform, Node/React/Go stack per team norms.',
      projects: projectsBlock(
        { t: 'Checkout & performance', b: 'Commerce', d: 'Saks: cart, checkout, ~6-7s latency improvements, A/B tests.' },
        { t: 'Headless commerce migration', b: 'Platform', d: 'PWA Kit with service boundaries for US & Canada.' },
        { t: 'Nationwide BOPIS', b: 'Scale', d: '114 stores; operational and customer-facing coordination.' }
      ),
    },
    {
      slug: 'adobe-sde-experience-platform',
      docTitle: 'Adobe Experience Platform',
      summary: `Senior engineer with <strong>microservices</strong>, <strong>public HTTP APIs</strong>, and <strong>data governance</strong>-adjacent delivery (auth, integrations, encryption). Strong <strong>JavaScript</strong>; <strong>Java</strong> and <strong>Python</strong> in stack; <strong>Kubernetes</strong> and <strong>cloud</strong> (AWS/Azure). Comfortable with <strong>CI/CD</strong>, <strong>on-call</strong>, and <strong>AI-assisted development</strong> workflows. <strong>BS CIS.</strong>`,
      competencies: [
        'Microservices & HTTP APIs',
        'Java (OO) & JavaScript',
        'Kubernetes & cloud (AWS/Azure)',
        'CI/CD & production support',
        'Data platforms & integrations',
        'Testing: unit, integration, E2E mindset',
        'Cross-functional product delivery',
        'Trust, security & compliance awareness',
      ],
      roleLine:
        'Adobe AEP: governance, access, encryption, consent; large-scale distributed systems.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'airbnb-staff-fullstack-marketing-tech',
      docTitle: 'Airbnb Marketing Technology',
      summary: `Staff-oriented <strong>full-stack</strong> profile: <strong>lifecycle messaging</strong>, <strong>email and SMS</strong> integrations, <strong>deliverability</strong> (DKIM, SPF, DMARC), and <strong>marketing technology</strong> at enterprise scale. Led <strong>SFCC-SFMC</strong> migration and <strong>headless</strong> platform change. Strong <strong>JavaScript</strong>; <strong>React</strong> experience; cross-org programs (<strong>BOPIS</strong> 114 stores). <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Lifecycle & marketing engineering',
        'Email/SMS integrations & deliverability',
        'Full-stack platform delivery',
        'Staff-level scope & mentoring',
        'React & modern JS',
        'REST APIs & cloud (Azure/AWS)',
        'Remote US collaboration',
        'Content & low-code platform interest',
      ],
      roleLine:
        'Airbnb Content Platform: marketing tech, lifecycle comms, staff IC leadership.',
      projects: projectsBlock(
        { t: 'SFMC email migration', b: 'Lifecycle', d: 'End-to-end SFCC through SFMC APIs; deliverability programs.' },
        { t: 'Headless commerce', b: 'Platform', d: 'PWA Kit migration; auth, loyalty, orders across regions.' },
        { t: 'BOPIS nationwide', b: 'Scale', d: '114 stores; cross-functional execution.' }
      ),
    },
    {
      slug: 'truckstop-salesforce-developer',
      docTitle: 'Truckstop Salesforce',
      summary: `Senior <strong>Salesforce B2C Commerce</strong> engineer: <strong>Apex</strong>-adjacent patterns on SFCC, <strong>LWC</strong> ramp, <strong>REST/SOAP</strong> integrations, <strong>CI/CD</strong> (Git, Jenkins). Deep <strong>order, checkout, and B2B-style</strong> commerce experience. <strong>Salesforce B2C Commerce Cloud Certified Developer.</strong> Strong <strong>remote</strong> delivery. <strong>BS CIS.</strong>`,
      competencies: [
        'Salesforce B2C Commerce (SFCC)',
        'Apex / LWC (platform ramp)',
        'REST & SOAP integrations',
        'Sales Cloud / Revenue Cloud adjacent',
        'Git, CI/CD, testing discipline',
        'Governor limits & security mindset',
        'Remote enterprise delivery',
        'TDD & code review',
      ],
      roleLine:
        'Truckstop: Salesforce dev, B2C Commerce, integrations; US remote.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'crowdstrike-sr-ecommerce-it',
      docTitle: 'CrowdStrike IT eCommerce',
      summary: `Senior <strong>Salesforce</strong> ecosystem engineer: <strong>integrations</strong>, <strong>order-to-cash</strong>-adjacent flows, and <strong>commerce</strong> at scale. <strong>Apex/LWC</strong> ramp from SFCC background; <strong>L3</strong> production mindset; <strong>mentoring</strong> and <strong>Agile</strong> ceremonies. <strong>Quote-to-cash</strong> narrative from checkout, orders, and enterprise retail. <strong>USA remote.</strong> <strong>BS CIS.</strong>`,
      competencies: [
        'Salesforce development (SFCC + CRM ramp)',
        'Quote-to-cash & O2C adjacent',
        'Ecommerce on Salesforce',
        'REST integrations & L3 support',
        'CI/CD & deployment hygiene',
        'Mentoring & code review',
        'Agile sprint delivery',
        'Enterprise security culture fit',
      ],
      roleLine:
        'CrowdStrike Alliances IT: Salesforce eComm, O2C quality, remote US.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'amazon-aws-salesforce-afx',
      docTitle: 'AWS AFX Salesforce',
      summary: `Senior <strong>Salesforce</strong> developer: <strong>Force.com, Apex, LWC</strong> patterns via <strong>SFCC</strong> depth; <strong>large-scale migrations</strong> and <strong>integrations</strong> (SFMC, SAP). <strong>CI/CD</strong> and operational excellence. <strong>Python, Golang, JavaScript</strong> for automation. Interested in <strong>AWS</strong> + CRM for <strong>field sales</strong> systems. Open to <strong>Seattle or Dallas</strong>. <strong>Certified B2C Commerce Developer.</strong>`,
      competencies: [
        'Salesforce development & integrations',
        'Apex & Lightning Web Components ramp',
        'AWS & cloud (with Azure experience)',
        'CI/CD & release management',
        'Quote-to-cash / CRM workflows',
        'Python / Golang automation',
        'Cross-functional sales ops partnership',
        'SMGS-scale operational excellence',
      ],
      roleLine:
        'AWS AFX: Salesforce CRM for field org, integrations, Seattle/Dallas.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'trimble-software-engineer-ai-construction',
      docTitle: 'Trimble AI / Construction Platforms',
      summary: `Senior engineer with <strong>TypeScript</strong>, <strong>Python</strong>, and production <strong>REST/OpenAPI</strong> integrations at enterprise scale; <strong>React</strong> app delivery; historical <strong>C# / .NET</strong> (multi-tenant services). Daily <strong>AI-assisted development</strong> (Copilot-class tools). Strong interest in shipping <strong>frontier LLM APIs</strong>, <strong>Azure</strong> patterns, and <strong>observability</strong> for safe production AI — honest ramp on <strong>LangGraph</strong>, <strong>MCP</strong>, and <strong>RAG</strong> depth. <strong>Oregon-based;</strong> aligns with <strong>Lake Oswego onsite</strong>. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'TypeScript / Python production services',
        'REST APIs & OpenAPI integrations',
        'React & modern web (Vite ramp)',
        'C# / .NET (prior .NET role)',
        'Azure & AWS cloud exposure',
        'CI/CD: Jenkins, GitHub, GitLab',
        'AI-assisted dev & LLM API experimentation',
        'Testing, code review, mentorship',
      ],
      roleLine:
        'Trimble: production AI on Azure, Claude/GPT/Gemini APIs, agent workflows, construction cloud platforms.',
      projects: projectsBlock(
        {
          t: 'Headless API platform migration',
          b: 'Scale',
          d: 'PWA Kit with explicit service contracts; auth, orders, loyalty across regions.',
        },
        {
          t: 'Fraud & production hardening',
          b: 'Safety',
          d: 'Supplemental components in critical checkout paths; operational rigor.',
        },
        {
          t: 'Internal React & .NET delivery',
          b: 'Full stack',
          d: 'Columbia React tooling; NDS C#/ASP.NET/SQL Server multi-tenant flows.',
        }
      ),
    },
    {
      slug: 'cambia-health-senior-swe-r6476',
      docTitle: 'Cambia Health Senior SWE',
      summary: `Senior engineer with <strong>10+ years</strong> shipping production systems across <strong>multiple stacks</strong> and <strong>cloud</strong> environments. Strong in <strong>Python, Golang, JavaScript/Node, C#</strong>, <strong>REST</strong> integrations, <strong>Postgres/SQL Server</strong>, and <strong>AWS</strong> + <strong>Azure</strong>. Led <strong>company-wide migrations</strong>, <strong>mentoring</strong>, and <strong>cross-functional</strong> programs (Product, ops, stores). Daily <strong>AI-assisted development</strong>; interest in <strong>responsible</strong> automation and <strong>secure, scalable</strong> patterns for regulated domains. <strong>Hybrid Oregon</strong> aligns with posting. <strong>BS CIS.</strong> Open to <strong>AWS cert</strong> path. Honest ramp on <strong>Java</strong> recency and <strong>Kubernetes</strong> depth.`,
      competencies: [
        'Microservices & integration-heavy delivery',
        'Python / Golang / JavaScript / C#',
        'AWS & Azure cloud services',
        'CI/CD, Git, Jenkins, code review',
        'Data modeling & SQL (Postgres, SQL Server)',
        'Mentoring & player-coach delivery',
        'Secure code & production troubleshooting',
        'AI-assisted engineering workflows',
      ],
      roleLine:
        'Cambia: modernization, hybrid integrations, agentic/AI-accelerated workflows, health care member impact.',
      projects: projectsBlock(
        {
          t: 'Enterprise platform migration',
          b: 'Modernization',
          d: 'Headless transition with API contracts; auth, loyalty, orders at national scale.',
        },
        {
          t: 'Cross-functional technical leadership',
          b: 'Delivery',
          d: 'BOPIS 114 stores; stakeholder alignment across Product, D&A, and operations.',
        },
        {
          t: 'Multi-tenant .NET & data',
          b: 'Foundation',
          d: 'NDS C#/ASP.NET/SQL Server onboarding pipeline and integration work.',
        }
      ),
    },
    {
      slug: 'akamai-global-web-security-2836',
      docTitle: 'Akamai Global Web Security',
      summary: `Senior engineer with <strong>high-traffic web</strong> and <strong>security-adjacent</strong> delivery: <strong>fraud</strong> and supplemental systems in <strong>checkout</strong>, <strong>JWT/session</strong> and <strong>guest-to-auth</strong> flows with <strong>cart merge</strong>, and <strong>targeted logging</strong> for hard-to-reproduce failures. Strong <strong>TypeScript</strong> (with deep <strong>JavaScript/Node</strong>), <strong>REST</strong>, <strong>SQL</strong>, <strong>Linux</strong>-era ops habits; <strong>QA</strong> and <strong>ops escalation</strong> partnership. <strong>Severity-1</strong> data and store integrations at retail scale. Honest ramp on <strong>Java/Scala</strong> where the team is JVM-heavy. <strong>U.S. citizen</strong> (National Guard veteran); clearance-eligible to confirm. <strong>BS CIS.</strong>`,
      competencies: [
        'Web security & fraud-hardening patterns',
        'TypeScript / JavaScript / Node.js',
        'Auth: OAuth, JWT, session, tokenization',
        'SQL, Postgres, SQL Server',
        'Distributed web at retail scale',
        'Production debugging & instrumentation',
        'QA collaboration & regression mindset',
        'Linux / cloud (AWS, Azure)',
      ],
      roleLine:
        'Akamai Global Web Security: secure transactions, stability, customer escalations, Java or Scala or TypeScript stack.',
      projects: projectsBlock(
        {
          t: 'Fraud & checkout hardening',
          b: 'Security',
          d: 'Architecture for fraud supplemental components in critical commerce paths.',
        },
        {
          t: 'Sensitive auth & observability',
          b: 'Platform',
          d: 'Session, guest merge, targeted logs for ambiguous auth failures; SFCC-scale traffic.',
        },
        {
          t: 'High-stakes data integrations',
          b: 'Operations',
          d: 'Store/BOPIS and vendor sync; severity-1 correctness and cross-team incident response.',
        }
      ),
    },
    {
      slug: 'capital-one-shopping-lead-full-stack',
      docTitle: 'Capital One Shopping — Lead Full Stack',
      summary: `Senior <strong>full-stack</strong> engineer and <strong>technical lead</strong>: <strong>JavaScript/TypeScript</strong>, <strong>Node</strong>, <strong>Python</strong>, and <strong>Golang</strong> in production; <strong>REST</strong> and integration-heavy <strong>commerce</strong> platforms (<strong>SFCC</strong>, <strong>PWA Kit</strong>). Led <strong>cross-functional</strong> programs (<strong>BOPIS</strong> 114 stores), <strong>email and identity</strong> at scale, and <strong>~5-person</strong> engineering leadership. Strong <strong>AWS</strong> and <strong>Azure</strong> exposure; <strong>Docker/Kubernetes</strong> concepts with honest depth calibration in interview. Excited by <strong>consumer savings</strong> products, <strong>data-informed</strong> feature delivery, and <strong>mentoring</strong> in a high-trust engineering culture. <strong>BS CIS.</strong> Veteran. Open on <strong>Java</strong> pairing where the team is JVM-heavy.`,
      competencies: [
        'Full-stack web: JavaScript, TypeScript, Node',
        'Python & Golang service delivery',
        'Cloud: AWS, Azure (1+ yr formal cloud)',
        'Microservices & distributed systems mindset',
        'Technical leadership & mentoring',
        'Agile, iterative delivery with product',
        'Retail & consumer-scale integrations',
        'SQL, Postgres, operational rigor',
      ],
      roleLine:
        'Capital One Shopping: lead full-stack squad, cloud-native services, regulatory-aware consumer experiences.',
      projects: projectsBlock(
        {
          t: 'Headless commerce & APIs',
          b: 'Platform',
          d: 'PWA Kit migration; explicit contracts for auth, loyalty, orders (US & Canada).',
        },
        {
          t: 'High-traffic storefront delivery',
          b: 'Commerce',
          d: 'Checkout, cart, performance; fraud-adjacent hardening in critical paths.',
        },
        {
          t: 'Team lead & stakeholder bridge',
          b: 'Leadership',
          d: 'BBW: customer/loyalty/D&A; Columbia BSA-style cross-team alignment.',
        }
      ),
    },
    {
      slug: 'serco-na-software-engineer-nlx',
      docTitle: 'Serco NA — Software Engineer',
      summary: `Senior <strong>software engineer</strong> with <strong>10+ years</strong> delivering production systems across <strong>JavaScript, Node, Python, Golang, C#</strong>, and <strong>SQL</strong>; strong <strong>integration</strong>, <strong>API</strong>, and <strong>data</strong> discipline. <strong>U.S. citizen</strong> (<strong>Army National Guard</strong> veteran); comfortable with <strong>security-sensitive</strong>, <strong>audit-friendly</strong> delivery and <strong>stakeholder</strong> communication. Experience with <strong>federal-adjacent rigor</strong> via enterprise retail and regulated workflows; honest ramp if the program stack emphasizes <strong>Java</strong> or <strong>cleared</strong> environments—confirm requisition details on <strong>Serco NA careers</strong>. <strong>BS CIS.</strong>`,
      competencies: [
        'Full-stack: JavaScript, Node, Python, Golang, C#',
        'REST APIs & system integration',
        'SQL Server, Postgres, data correctness',
        'Production support & incident response',
        'Cross-functional & documentation discipline',
        'Security & reliability mindset',
        'U.S. citizen; clearance status per employer',
        'Agile delivery, code review, mentorship',
      ],
      roleLine:
        'Serco NA: software engineering for government / mission programs — align stack and clearance to live posting.',
      projects: projectsBlock(
        {
          t: 'Enterprise integration delivery',
          b: 'Systems',
          d: 'Multi-vendor integrations, SFCC/SFMC, SAP, analytics — contract-grade handoffs.',
        },
        {
          t: 'High-stakes production paths',
          b: 'Operations',
          d: 'Fraud-adjacent checkout, auth, store data; severity-1 style correctness.',
        },
        {
          t: 'Stakeholder-driven requirements',
          b: 'Delivery',
          d: 'Columbia BSA + NDS POC: translate needs into shippable software.',
        }
      ),
    },
    {
      slug: 'accenture-full-stack-engineering-manager-nlx',
      docTitle: 'Accenture — Full Stack Engineering Manager',
      summary: `Engineering <strong>leader</strong> and <strong>full-stack</strong> practitioner: led <strong>~5 developers</strong> on <strong>customer, loyalty, and data</strong> programs; shipped <strong>large-scale web</strong> and <strong>mobile-adjacent</strong> commerce. Strong in <strong>JavaScript/Node</strong>, <strong>Python</strong>, <strong>Golang</strong>, <strong>REST</strong>, and <strong>cloud</strong> (<strong>AWS</strong>, <strong>Azure</strong>). Comfortable <strong>planning</strong>, <strong>scrum</strong>-style delivery, and <strong>technical review</strong> across teams. <strong>Java / Spring</strong> and <strong>Angular</strong> positioned as <strong>ramp or pairing</strong> where Accenture’s client stack requires it. <strong>BS CIS.</strong> Open on <strong>travel</strong> scope—confirm against the specific <strong>Beaverton / multi-location</strong> requisition.`,
      competencies: [
        'Team leadership & delivery oversight',
        'Full-stack web & integration solutions',
        'JavaScript, Node, Python, Golang',
        'REST, microservices-oriented design',
        'Agile / scrum collaboration',
        'Client & stakeholder communication',
        'Cloud: AWS, Azure',
        'Java / Spring / React — ramp as needed',
      ],
      roleLine:
        'Accenture: manage and lead full-stack delivery for consulting engagements — verify travel % on official JD.',
      projects: projectsBlock(
        {
          t: 'Program-scale technical leadership',
          b: 'Leadership',
          d: 'BBW: team lead for customer/loyalty/D&A; cross-functional roadmaps.',
        },
        {
          t: 'Large-scale web platforms',
          b: 'Delivery',
          d: 'Headless migration, PWA Kit, nationwide BOPIS — integration-heavy.',
        },
        {
          t: 'Vendor & client coordination',
          b: 'Consulting-adjacent',
          d: 'Columbia: bridge business, engineering, and third-party systems.',
        }
      ),
    },
    {
      slug: 'oregon-doe-senior-full-stack-data-integration-req-197645',
      docTitle: 'Oregon DOE — Senior Full Stack / Data & Integration',
      summary: `Senior <strong>full-stack</strong> engineer with <strong>10+ years</strong> shipping <strong>integrations</strong>, <strong>REST APIs</strong>, and <strong>data-heavy</strong> platforms at enterprise scale. Led <strong>company-wide migrations</strong> (headless commerce, email systems), <strong>requirements</strong> and <strong>cross-functional</strong> programs (<strong>BOPIS</strong> 114 stores), and <strong>database</strong> work across <strong>SQL Server</strong>, <strong>Postgres</strong>, and <strong>MySQL</strong>. Strong <strong>JavaScript/Node</strong>, <strong>Python</strong>, <strong>Golang</strong>, <strong>React</strong>; disciplined on <strong>security</strong>, <strong>documentation</strong>, and <strong>production support</strong>. <strong>Oregon-based</strong>; comfortable with <strong>Salem hybrid</strong> (minimal onsite cadence). Honest ramp on agency-specific <strong>non-relational</strong> stores and <strong>state enterprise</strong> standards alongside <strong>EIS</strong>. <strong>BS Computer Information Systems.</strong> <strong>U.S. Army National Guard</strong> veteran.`,
      competencies: [
        'Data integration & API-connected systems',
        'Full-stack web (JavaScript, Node, React)',
        'SQL databases: design, performance, reliability',
        'Requirements, documentation & technical mentorship',
        'Security, governance & quality practices (honest scope)',
        'IT project delivery & stakeholder alignment',
        'Cloud & integration patterns (AWS, Azure)',
        'Public-sector mission: energy, equity, resilience',
      ],
      roleLine:
        'ODOE ISS 7: architecture and sustainment of software, DB, and integration solutions; hybrid Salem.',
      projects: projectsBlock(
        {
          t: 'Platform & integration migration',
          b: 'Data & apps',
          d: 'Headless transition with explicit service contracts; SFMC and vendor APIs across regions.',
        },
        {
          t: 'Nationwide operational rollout',
          b: 'Scale',
          d: 'BOPIS 114 stores — cross-team requirements, testing mindset, production support.',
        },
        {
          t: 'Stakeholder-facing technical authority',
          b: 'Delivery',
          d: 'Columbia BSA + NDS POC: translate needs into shippable systems and clear docs.',
        }
      ),
    },
    {
      slug: 'irobot-senior-salesforce-service-cloud',
      docTitle: 'iRobot — Senior Salesforce (Service Cloud / Agentforce)',
      summary: `Senior <strong>Salesforce</strong> engineer with <strong>10+ years</strong> shipping <strong>B2C Commerce (SFCC)</strong>, <strong>REST integrations</strong>, and <strong>enterprise</strong> programs. Strong <strong>JavaScript</strong>, <strong>Apex-adjacent</strong> SFCC patterns, <strong>Git</strong> and release discipline. Positioning honest ramp on <strong>Service Cloud</strong>, <strong>Lightning Web Components</strong> on Core, <strong>Agentforce</strong>, <strong>OMS</strong>, and <strong>Data Cloud</strong> with fast certification path. <strong>AI-assisted development</strong> daily; interest in <strong>conversational</strong> and <strong>knowledge-grounded</strong> support automation. <strong>BS CIS.</strong> Veteran. Open to <strong>Bedford hybrid</strong> if relocation aligns.`,
      competencies: [
        'Salesforce platform (SFCC depth → Core ramp)',
        'REST APIs & integration design',
        'Service operations mindset (care, warranty adj.)',
        'Git, CI/CD, documentation discipline',
        'Cross-functional requirements translation',
        'Python / Golang automation adjacent',
        'Security & production support habits',
        'AI/chatbot workflows — honest ramp on Agentforce',
      ],
      roleLine:
        'iRobot: Service Cloud, OMS, Agentforce chatbot, Data Cloud — confirm PD I/II path in interview.',
      projects: projectsBlock(
        {
          t: 'Commerce & care-adjacent integrations',
          b: 'Salesforce',
          d: 'SFCC orders, loyalty, customer data; SFMC APIs and deliverability programs.',
        },
        {
          t: 'High-trust production changes',
          b: 'Quality',
          d: 'Checkout/fraud-adjacent paths; testing and operational rigor.',
        },
        {
          t: 'Stakeholder-led delivery',
          b: 'Alignment',
          d: 'Columbia BSA + BBW programs across Product, ops, and stores.',
        }
      ),
    },
    {
      slug: 'affirm-senior-backend-affirm-card',
      docTitle: 'Affirm — Senior Backend (Affirm Card)',
      summary: `Senior engineer with <strong>distributed systems</strong> delivery via <strong>commerce</strong> and <strong>integration</strong> platforms: <strong>REST</strong>, high-scale <strong>web</strong>, and <strong>data</strong>-heavy workflows. Strong <strong>Python</strong> and <strong>JavaScript/Node</strong>; <strong>AWS</strong> and <strong>Azure</strong> exposure; <strong>SQL</strong> depth. Led <strong>cross-functional</strong> initiatives (<strong>BOPIS</strong> 114 stores) and <strong>mentoring</strong>. Excited by <strong>money movement</strong>, <strong>correctness</strong>, and <strong>event-driven</strong> patterns — honest ramp on <strong>Kotlin</strong> if the team is JVM-heavy. <strong>Remote US.</strong> <strong>BS CIS.</strong>`,
      competencies: [
        'Backend & API design at scale',
        'Python, JavaScript, Node, Golang',
        'SQL, Postgres, SQL Server',
        'AWS & Azure cloud services',
        'Event-driven & microservice mindset',
        'Mentoring, code review, Agile',
        'Fintech-adjacent rigor (commerce, payments flows)',
        'Kotlin / JVM — pairing ramp as needed',
      ],
      roleLine:
        'Affirm Card: money movement, bank/merchant data, remote US — confirm stack in loop.',
      projects: projectsBlock(
        {
          t: 'Integration-heavy platform',
          b: 'Systems',
          d: 'Headless SFCC, SAP, SFMC, analytics — reliable production contracts.',
        },
        {
          t: 'Operational correctness',
          b: 'Scale',
          d: 'Checkout, auth, fraud-adjacent paths; severity-1 style discipline.',
        },
        {
          t: 'Team multiplier',
          b: 'Leadership',
          d: 'Mentorship at NDS; technical POC for stakeholders.',
        }
      ),
    },
    {
      slug: 'monster-sr-software-engineer-salesforce-remote-or',
      docTitle: 'Monster — Sr. Software Engineer – Salesforce (Remote OR)',
      summary: `Senior <strong>Salesforce</strong> engineer with depth in <strong>B2C Commerce (SFCC)</strong>, <strong>PWA Kit</strong>, <strong>SFRA / SiteGenesis</strong>, and <strong>enterprise integrations</strong>. Strong <strong>REST</strong> and explicit service contracts; <strong>Python</strong> and <strong>JavaScript/Node</strong>; <strong>Salesforce B2C Commerce Cloud Certified Developer.</strong> Led <strong>headless migrations</strong>, <strong>order and loyalty</strong> workflows, and <strong>SFMC</strong> email programs. Ready to align narrative to <strong>Core CRM</strong> or <strong>Marketing Cloud</strong> if the employer confirms — honest scope calibration in screen. <strong>Remote</strong> (Oregon-area listing). <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Salesforce B2C Commerce (SFCC)',
        'PWA Kit, SFRA, SiteGenesis',
        'REST APIs & integration design',
        'Sales / Service Cloud — ramp per JD',
        'Python, JavaScript, Node, Golang',
        'Azure, AWS, Git, CI/CD',
        'Mentoring & cross-functional programs',
        'Remote US delivery',
      ],
      roleLine:
        'Sr. SWE Salesforce (Monster listing, Remote OR): confirm Commerce vs Core CRM with employer.',
      projects: projectsBlock(
        {
          t: 'Headless commerce migration',
          b: 'Platform',
          d: 'PWA Kit; auth, loyalty, orders across US & Canada.',
        },
        {
          t: 'Commerce & lifecycle integrations',
          b: 'APIs',
          d: 'SFMC, SAP, analytics vendors; deliverability (DKIM, SPF, DMARC).',
        },
        {
          t: 'Program-scale delivery',
          b: 'Leadership',
          d: 'BOPIS 114 stores; stakeholder alignment from BSA + lead engineer roles.',
        }
      ),
    },
    {
      slug: 'monster-sr-software-engineer-salesforce-remote-newark-55923485',
      docTitle: 'Monster — Sr. Software Engineer – Salesforce (Remote, Newark NJ)',
      summary: `Senior <strong>Salesforce</strong> engineer: <strong>B2C Commerce (SFCC)</strong>, <strong>PWA Kit</strong>, <strong>SFRA / SiteGenesis</strong>, and <strong>enterprise integrations</strong>. Strong <strong>REST</strong>, <strong>Python</strong>, <strong>JavaScript/Node</strong>; <strong>Salesforce B2C Commerce Cloud Certified Developer.</strong> Comfortable with <strong>Eastern-time</strong> collaboration and <strong>NY / NJ metro</strong> stakeholder rhythms when roles are remote-with-state anchor. Ready to align to <strong>Sales / Service / Financial Services Cloud</strong> if the posting is CRM-heavy — honest calibration on <strong>Apex / LWC</strong> depth in loop. <strong>Remote</strong> (Newark NJ-tagged listing). <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Salesforce B2C Commerce (SFCC)',
        'PWA Kit, SFRA, SiteGenesis',
        'REST APIs & enterprise integrations',
        'Sales / Service / FSC — scope per employer',
        'Python, JavaScript, Node, Golang',
        'Azure, AWS, Git, CI/CD',
        'Eastern-time collaboration',
        'Mentoring & Agile delivery',
      ],
      roleLine:
        'Sr. SWE Salesforce (Monster, remote + Newark NJ): confirm cloud, onsite cadence, and employer on live JD.',
      projects: projectsBlock(
        {
          t: 'Headless commerce migration',
          b: 'Platform',
          d: 'PWA Kit; auth, loyalty, orders across US & Canada.',
        },
        {
          t: 'Lifecycle & integrations',
          b: 'APIs',
          d: 'SFMC, SAP, analytics; email authentication programs.',
        },
        {
          t: 'Cross-functional programs',
          b: 'Delivery',
          d: 'BOPIS 114 stores; migrations with Product, D&A, and stores.',
        }
      ),
    },
    {
      slug: 'monster-lead-web-developer-technical-lead-remote-ma',
      docTitle: 'Monster — Lead Web Developer (Technical Lead, remote MA)',
      summary: `Senior <strong>web</strong> engineer and <strong>technical lead</strong> with <strong>full-stack</strong> delivery: <strong>JavaScript</strong>, <strong>Node</strong>, <strong>Python</strong>, <strong>Golang</strong>, and enterprise <strong>APIs</strong>. Deep <strong>digital commerce</strong> and <strong>headless</strong> experience (<strong>PWA Kit</strong>, <strong>SFCC</strong>); strong <strong>performance</strong>, <strong>SEO</strong>, and <strong>cross-functional</strong> ownership. Comfortable leading workstreams without overstating people-management scope. <strong>Remote</strong>-friendly. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Technical leadership & hands-on delivery',
        'JavaScript, Node, Python, Golang',
        'REST APIs & integration design',
        'Web performance, SEO, accessibility',
        'React & modern storefront patterns',
        'Azure, AWS, CI/CD',
        'Agile, mentoring, code review',
        'Remote US collaboration',
      ],
      roleLine:
        'Lead Web Developer / Technical Lead (Monster listing): confirm employer stack and team shape in screen.',
      projects: projectsBlock(
        {
          t: 'Headless & API-first platforms',
          b: 'Architecture',
          d: 'PWA Kit migration; explicit contracts for auth, orders, loyalty.',
        },
        {
          t: 'High-traffic web',
          b: 'Performance',
          d: 'Saks: checkout, cart, ~6–7s improvements, A/B testing.',
        },
        {
          t: 'Program delivery',
          b: 'Scale',
          d: 'BOPIS 114 stores; stakeholder alignment across Product and ops.',
        }
      ),
    },
    {
      slug: 'kforce-senior-software-engineer-2167439-eqg',
      docTitle: 'Kforce — Senior Software Engineer (2167439-EQG)',
      summary: `Senior <strong>software engineer</strong> with <strong>full-stack</strong> and <strong>integration-heavy</strong> background: <strong>JavaScript</strong>, <strong>Node</strong>, <strong>Python</strong>, <strong>Golang</strong>, <strong>SQL</strong>, <strong>AWS</strong> and <strong>Azure</strong>. Proven on <strong>enterprise migrations</strong>, <strong>commerce platforms</strong> (<strong>SFCC</strong>, <strong>PWA Kit</strong>), and <strong>third-party APIs</strong>. Strong <strong>mentoring</strong>, <strong>Agile</strong> delivery, and <strong>production</strong> ownership — calibrate to <strong>client stack</strong> once Kforce discloses assignment. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Senior IC: design, build, ship',
        'JavaScript, Node, Python, Golang',
        'REST APIs & enterprise integrations',
        'SQL Server, Postgres, MySQL',
        'AWS, Azure, Git, CI/CD',
        'Mentoring & code review',
        'Staffing-friendly: fast ramp on client norms',
      ],
      roleLine:
        'Kforce 2167439-EQG: Senior SWE — align bullets to end-client JD after recruiter screen.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'kforce-senior-mobile-software-engineer-2171748-wqg',
      docTitle: 'Kforce — Senior Mobile Software Engineer (2171748-WQG)',
      summary: `Senior engineer with <strong>mobile</strong> and <strong>full-stack web</strong> delivery: <strong>iOS</strong> app store releases, <strong>mobile UX</strong>, and <strong>JavaScript</strong> / platform work at <strong>retail scale</strong>. Strong <strong>APIs</strong>, <strong>integrations</strong>, and <strong>cross-functional</strong> programs; <strong>Python</strong> and <strong>Node</strong> for services. Ready to deepen <strong>native Swift/Kotlin</strong> narrative once client stack is known. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Mobile product engineering (iOS-adjacent)',
        'JavaScript, Node, web-to-mobile patterns',
        'REST APIs & integrations',
        'Performance, analytics, A/B testing',
        'Python, Golang — service-side',
        'Agile, mentoring, documentation',
        'Kforce2171748-WQG — client TBD',
      ],
      roleLine:
        'Kforce 2171748-WQG: Senior Mobile SWE — confirm native vs React Native with client.',
      projects: projectsBlock(
        {
          t: 'Mobile enhancements',
          b: 'Product',
          d: 'Saks: mobile features, documentation, E2E testing; measurable sales lift.',
        },
        {
          t: 'Commerce & APIs',
          b: 'Platform',
          d: 'SFCC, checkout, integrations — transferable patterns to mobile backends.',
        },
        {
          t: 'Cross-functional delivery',
          b: 'Execution',
          d: 'Stakeholder alignment; lead engineer habits.',
        }
      ),
    },
    {
      slug: 'monster-servicenow-application-dev-tech-lead-camas-wa',
      docTitle: 'Monster — Application Development Technical Lead (ServiceNow, Camas WA)',
      summary: `Senior engineer with <strong>enterprise integration</strong>, <strong>workflow</strong>, and <strong>full-stack</strong> discipline: <strong>REST APIs</strong>, <strong>JavaScript</strong>, <strong>Python</strong>, <strong>SQL</strong>, and <strong>cloud</strong> (<strong>AWS</strong>, <strong>Azure</strong>). Honest positioning: <strong>ServiceNow platform</strong> is a <strong>focused ramp</strong> — strong on <strong>delivery rigor</strong>, <strong>stakeholder alignment</strong>, and <strong>technical leadership</strong> for complex IT programs. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Technical leadership & solution delivery',
        'Enterprise integrations & APIs',
        'JavaScript, Python, SQL',
        'ITSM / workflow mindset — ServiceNow ramp',
        'AWS, Azure, Git',
        'Agile, documentation, mentoring',
        'Camas WA / hybrid — confirm on posting',
      ],
      roleLine:
        'ServiceNow Technical Lead (Monster listing): platform depth to calibrate honestly in process.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'marriott-oracle-cx-requisition-26042882',
      docTitle: 'Marriott — Oracle CX requisition 26042882',
      summary: `Senior engineer with <strong>enterprise-scale</strong> <strong>integrations</strong>, <strong>APIs</strong>, and <strong>cloud</strong> delivery: <strong>Python</strong>, <strong>JavaScript</strong>, <strong>SQL</strong>, <strong>AWS</strong>, <strong>Azure</strong>. Deep <strong>digital</strong> and <strong>commerce</strong> programs (<strong>SFCC</strong>, <strong>PWA Kit</strong>); <strong>cross-functional</strong> leadership. If this requisition is <strong>Oracle ERP / Fusion</strong>-heavy, treat profile as <strong>integration and delivery</strong> strength with <strong>honest domain ramp</strong> — confirm <strong>actual title</strong> on live posting. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Enterprise integrations & APIs',
        'Python, JavaScript, Node, Golang',
        'SQL, Postgres, SQL Server',
        'AWS, Azure, CI/CD',
        'Program leadership & stakeholder partnership',
        'Oracle / Fusion — scope TBD from JD',
        'Hospitality tech interest',
      ],
      roleLine:
        'Marriott Oracle CX 26042882 — verify role family (ERP vs digital) before final apply.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'quanata-senior-backend-engineer-remote-indeed',
      docTitle: 'Quanata — Senior Back End Engineer (Remote US)',
      summary: `Senior engineer with <strong>production APIs</strong>, <strong>integration-heavy</strong> systems, and <strong>Python</strong> / <strong>Golang</strong> delivery. Strong <strong>SQL</strong> (<strong>Postgres</strong>, SQL Server), <strong>AWS</strong> and <strong>Azure</strong>, and <strong>cross-functional</strong> ownership at enterprise scale. Interested in <strong>insurtech</strong> and <strong>financial</strong> backend correctness; comfortable with <strong>messaging</strong> and <strong>event-driven</strong> patterns. <strong>Mentoring</strong> and technical lead habits. Honest calibration on <strong>idiomatic Go</strong> services depth in loop. <strong>Remote US.</strong> <strong>BS CIS.</strong>`,
      competencies: [
        'Backend APIs & service design',
        'Python, Golang, JavaScript/Node',
        'Postgres, SQL Server, relational modeling',
        'AWS & Azure; CI/CD production discipline',
        'Kafka / messaging — calibrate in interview',
        'Security, testing, observability mindset',
        'Mentoring and technical leadership',
        'Insurance/fintech domain ramp',
      ],
      roleLine:
        'Quanata: underwriting/financial services, client + internal APIs, remote US (core PT hours).',
      projects: projectsBlock(
        {
          t: 'Integration-heavy platform',
          b: 'APIs',
          d: 'Headless SFCC, SAP, SFMC, analytics — reliable production contracts.',
        },
        {
          t: 'High-trust operational paths',
          b: 'Reliability',
          d: 'Checkout, auth, fraud-adjacent flows; severity-1 style discipline.',
        },
        {
          t: 'Team multiplier',
          b: 'Leadership',
          d: 'Mentorship at NDS; milestone ownership (BOPIS, migrations).',
        }
      ),
    },
    {
      slug: 'included-health-senior-swe-remote',
      docTitle: 'Included Health — Senior Software Engineer',
      summary: `Senior engineer with <strong>production APIs</strong>, <strong>integration-heavy</strong> systems, and <strong>Python</strong> / <strong>Golang</strong> delivery. Deep experience with <strong>relational data</strong> (<strong>Postgres</strong>, <strong>SQL Server</strong>), <strong>cloud</strong> (<strong>AWS</strong>, <strong>Azure</strong>), and <strong>cross-functional</strong> programs at enterprise scale. Strong on <strong>reliability</strong>, <strong>security-minded</strong> flows (auth, email, fraud-adjacent paths), and <strong>mentoring</strong>. Excited by <strong>healthcare</strong> outcomes and <strong>remote-first</strong> execution. <strong>BS CIS.</strong> Veteran. Honest ramp on <strong>Ruby</strong> stack depth if the team uses it alongside <strong>Go/Python</strong>.`,
      competencies: [
        'Backend APIs & distributed service patterns',
        'Python & Golang production experience',
        'SQL: Postgres, SQL Server, MySQL',
        'Docker/Kubernetes concepts — calibrate depth in interview',
        'Healthcare-adjacent data & integration discipline',
        'Microservices & cross-team delivery',
        'Mentoring, code review, documentation',
        'Remote US collaboration',
      ],
      roleLine:
        'Included Health: platform + member-facing services; integrations across healthcare data sources.',
      projects: projectsBlock(
        {
          t: 'Enterprise integration delivery',
          b: 'APIs',
          d: 'SFCC, SFMC, SAP, analytics vendors — contract-grade, production handoffs.',
        },
        {
          t: 'High-traffic customer paths',
          b: 'Reliability',
          d: 'Checkout, loyalty, auth; operational rigor and observability habits.',
        },
        {
          t: 'Stakeholder-led programs',
          b: 'Ownership',
          d: 'BOPIS 114 stores; Columbia BSA-style alignment across Product and ops.',
        }
      ),
    },
    {
      slug: 'samsara-full-stack-safety-invehicle',
      docTitle: 'Samsara — Full Stack (Safety In-Vehicle)',
      summary: `Senior <strong>full-stack</strong> engineer with <strong>JavaScript</strong>, <strong>Node</strong>, and <strong>React</strong> delivery; <strong>TypeScript</strong> ramp; <strong>Python</strong> and <strong>Golang</strong> for services and automation. Shipped <strong>customer-facing</strong> features at <strong>retail scale</strong> (commerce, mobile-adjacent). Strong <strong>production ownership</strong>, <strong>on-call</strong>-style mindset, and <strong>cross-functional</strong> work with Product and ops. Interested in <strong>IoT</strong>-scale systems and <strong>safety</strong>-critical UX; honest ramp on <strong>Go</strong> and <strong>GraphQL</strong> where the team standardizes. <strong>Remote US.</strong> <strong>BS CIS.</strong>`,
      competencies: [
        'Full-stack web: JavaScript, Node, React',
        'TypeScript — production ramp',
        'Python & Golang service patterns',
        'MySQL / SQL family databases',
        'Customer-facing feature delivery at scale',
        'Mobile-adjacent (iOS/store releases)',
        'Operational health & iterative delivery',
        'Go / GraphQL — align to team stack in loop',
      ],
      roleLine:
        'Samsara In-Vehicle Experience: full-stack product for drivers; remote US; IoT scale.',
      projects: projectsBlock(
        {
          t: 'Commerce platform features',
          b: 'Product',
          d: 'Checkout, cart, performance, A/B testing — measurable customer impact.',
        },
        {
          t: 'Headless & API boundaries',
          b: 'Architecture',
          d: 'PWA Kit migration; explicit contracts for auth, orders, loyalty.',
        },
        {
          t: 'Cross-functional execution',
          b: 'Delivery',
          d: 'BBW customer programs; stakeholder communication from BSA experience.',
        }
      ),
    },
    {
      slug: 'samsara-staff-engineer-platform',
      docTitle: 'Samsara — Staff Engineer, Platform',
      summary: `Senior / staff-oriented engineer with <strong>10+ years</strong> shipping <strong>large-scale web</strong> and <strong>integration</strong> platforms. Strong <strong>system decomposition</strong>, <strong>API design</strong>, and <strong>cross-org</strong> coordination from <strong>migration</strong> and <strong>program</strong> leadership (<strong>BOPIS</strong>, <strong>PWA Kit</strong>). <strong>Python</strong>, <strong>JavaScript/Node</strong>, <strong>Golang</strong>, <strong>SQL</strong>; <strong>AWS</strong> and <strong>Azure</strong>. Acts as <strong>multiplier</strong> through <strong>mentoring</strong>, <strong>design review</strong>, and <strong>clear technical writing</strong>. Interested in <strong>platform primitives</strong> (identity, workflows, notifications) at <strong>IoT</strong> scale; calibrate <strong>stream processing</strong> depth honestly in staff loop. <strong>Remote US.</strong> <strong>BS CIS.</strong>`,
      competencies: [
        'Platform & large-scale distributed mindset',
        'APIs, data modeling, service boundaries',
        'Technical leadership without title dependency',
        'Python, Go, JavaScript/TypeScript',
        'SQL & operational excellence',
        'Cross-org programs & stakeholder alignment',
        'Mentoring and code review at senior bar',
        'Stream/event systems — interview calibration',
      ],
      roleLine:
        'Samsara Platform: alerts, workflows, billing-adjacent foundations — staff scope, remote US.',
      projects: projectsBlock(
        {
          t: 'Company-wide platform migration',
          b: 'Scale',
          d: 'Headless transition; multi-team API contracts and rollout governance.',
        },
        {
          t: 'Production-critical paths',
          b: 'Operations',
          d: 'Fraud-adjacent checkout, auth, store data — ownership culture.',
        },
        {
          t: 'Team multiplier',
          b: 'Leadership',
          d: 'Mentorship at NDS; lead engineer on customer/loyalty initiatives at BBW.',
        }
      ),
    },
    {
      slug: 'clover-principal-technologist-octo',
      docTitle: 'Clover Health — Principal Technologist (Office of the CTO)',
      summary: `Principal-level <strong>hands-on technologist</strong>: ship <strong>pragmatic</strong> integrations, <strong>automations</strong>, and <strong>lightweight applications</strong> that unblock operations — not boil-the-ocean architecture. Strong <strong>full-stack</strong> delivery (<strong>Python</strong>, <strong>JavaScript/TypeScript</strong>, <strong>SQL</strong>), <strong>cloud</strong> (<strong>AWS</strong>, <strong>Azure</strong>), and <strong>enterprise integration</strong> discipline from <strong>commerce</strong> and <strong>marketing technology</strong> at scale. Comfortable <strong>context-switching</strong>, <strong>stakeholder-facing</strong> scoping, and <strong>mentoring</strong> engineers without needing a management title. Excited by <strong>Medicare / health outcomes</strong> and <strong>OCTO-style</strong> problem solving. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Pragmatic shipping & scope judgment',
        'Integrations, APIs, and workflow automation',
        'Python, JavaScript/TypeScript, SQL',
        'Cloud patterns (AWS/Azure) — GCP ramp honest',
        'Stakeholder partnership & technical writing',
        'Healthcare mission — domain ramp with integration rigor',
        'Mentoring and cross-team mobilization',
        'Remote US execution',
      ],
      roleLine:
        'Clover Health OCTO: tactical solutions across ops; converge with long-term technical vision.',
      projects: projectsBlock(
        {
          t: 'Cross-system delivery',
          b: 'Integrations',
          d: 'SFCC, SFMC, SAP, analytics — contract-grade APIs and production ownership.',
        },
        {
          t: 'Program-scale change',
          b: 'Execution',
          d: 'Headless migration, BOPIS 114 stores — stakeholder alignment under pressure.',
        },
        {
          t: 'Operational reliability',
          b: 'Production',
          d: 'Checkout, auth, fraud-adjacent paths; observability and incident mindset.',
        }
      ),
    },
    {
      slug: 'mozilla-firefox-monitor-senior-swe',
      docTitle: 'Mozilla — Firefox Monitor (Senior SWE)',
      summary: `Senior engineer for <strong>privacy-first</strong>, <strong>cloud-native</strong> services: <strong>Node.js</strong> and <strong>TypeScript</strong> backend in a <strong>Next.js</strong> context; <strong>PostgreSQL</strong>; <strong>event-driven</strong> patterns (<strong>Pub/Sub</strong>); <strong>GCP</strong> (<strong>GKE</strong>) and <strong>AWS</strong> (S3, SES); <strong>Redis</strong>; <strong>Terraform</strong>; <strong>OpenTelemetry</strong> / <strong>Prometheus</strong> / <strong>Grafana</strong>. Strong <strong>integration</strong> experience with external data providers and <strong>security-minded</strong> handling of sensitive data. <strong>React</strong> collaboration; <strong>Playwright</strong> / <strong>Vitest</strong> testing mindset. Deep <strong>production</strong> ownership and <strong>on-call</strong>-style triage. <strong>BS CIS.</strong> Veteran. Honest ramp where stack depth differs (e.g. deep Knex vs ORM habits).`,
      competencies: [
        'Node.js & TypeScript backend',
        'PostgreSQL, query tuning, caching (Redis)',
        'Kubernetes (GKE) & Terraform IaC',
        'GCP Pub/Sub & event-driven design',
        'Observability: OTel, Sentry, Prometheus, Grafana',
        'Security, privacy, and breach-adjacent data handling',
        'React/Next.js collaboration & API contracts',
        'Mentoring and code review',
      ],
      roleLine:
        'Firefox Monitor: breach notifications, HIBP-style integrations, millions of users, open mission.',
      projects: projectsBlock(
        {
          t: 'High-scale customer data paths',
          b: 'Privacy',
          d: 'Email, auth, loyalty integrations with strict reliability and abuse awareness.',
        },
        {
          t: 'Platform migrations',
          b: 'Architecture',
          d: 'Headless commerce; explicit service boundaries and rollout governance.',
        },
        {
          t: 'Cross-functional ownership',
          b: 'Delivery',
          d: 'BSA-style alignment; mentoring; production support culture.',
        }
      ),
    },
    {
      slug: 'leolabs-senior-fullstack-insights',
      docTitle: 'LeoLabs — Senior Full-Stack (Insights)',
      summary: `Senior engineer for <strong>mission-critical</strong> <strong>distributed backend</strong> and customer-facing analytics: <strong>Python</strong> (required depth), <strong>APIs</strong>, <strong>Postgres</strong>, <strong>Kafka</strong> / message brokers, <strong>Kubernetes</strong>, multi-cloud (<strong>AWS</strong>/<strong>GCP</strong>/<strong>Azure</strong>). Strong <strong>CI/CD</strong>, <strong>observability</strong>, and <strong>on-call</strong> for critical systems. <strong>TypeScript/JavaScript</strong> and modern UI frameworks as differentiator. Background in <strong>defense-adjacent</strong> or regulated environments is a plus; <strong>clearance eligibility</strong> noted in posting. <strong>BS CIS.</strong> Veteran. Honest ramp on <strong>orbital mechanics</strong> / <strong>space domain</strong> specifics — integration and reliability discipline transfer.`,
      competencies: [
        'Python services at scale',
        'Distributed systems, APIs, message-driven workflows',
        'Postgres, Kafka/SQS-class patterns',
        'Kubernetes & cloud deployments',
        'CI/CD, testing, SRE-style operations',
        'TypeScript/JS full-stack collaboration',
        'Security and mission-critical mindset',
        'Cross-team architecture influence',
      ],
      roleLine:
        'LeoLabs Insights: analytics, APIs, integrations, data lake interfaces for LEO / SDA customers.',
      projects: projectsBlock(
        {
          t: 'Enterprise integrations',
          b: 'APIs',
          d: 'Multi-vendor commerce and marketing stacks; production contracts.',
        },
        {
          t: 'Operational scale',
          b: 'Reliability',
          d: 'Checkout, high-traffic storefront paths; incident response habits.',
        },
        {
          t: 'Technical leadership',
          b: 'Impact',
          d: 'Lead engineer initiatives; mentoring; cross-org programs (BOPIS, migrations).',
        }
      ),
    },
    {
      slug: 'gotofoods-principal-software-engineer-2313',
      docTitle: 'Go To Foods — Principal Software Engineer (#2313)',
      summary: `Principal-oriented <strong>backend</strong> and <strong>platform</strong> engineer: <strong>REST</strong> and <strong>service-boundary</strong> design from <strong>headless commerce</strong> (<strong>PWA Kit</strong>), <strong>authentication</strong> and customer data paths, and <strong>enterprise integrations</strong> (SAP, SFMC, analytics). Strong <strong>JavaScript</strong>/<strong>TypeScript</strong> (honest depth on TS), <strong>Node.js</strong> including <strong>Express</strong> history; <strong>Python</strong> and <strong>Golang</strong> in recent production. <strong>AWS</strong> and <strong>Azure</strong>; <strong>CI/CD</strong> (Jenkins, GitHub/GitLab); <strong>Agile</strong>. Eager to deepen <strong>Nest.js</strong>, <strong>Kubernetes</strong>, and <strong>Terraform</strong> in a <strong>multi-brand digital platform</strong>. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Backend APIs & platform architecture',
        'Node.js / Express; TypeScript ramp to team standard',
        'REST, integrations, microservice-style boundaries',
        'Cloud: AWS & Azure; CI/CD pipelines',
        'Auth patterns: OAuth, Okta, Ping, PKCE-adjacent',
        'Technical leadership & mentorship',
        'Retail / high-volume digital (QSR-adjacent narrative)',
        'Honest ramp: Nest, K8s, Terraform where required',
      ],
      roleLine:
        'Go To Foods: principal backend for digital platform APIs; Nest/Express-class services, K8s, multi-brand scale.',
      projects: projectsBlock(
        {
          t: 'Headless API migration',
          b: 'Platform',
          d: 'PWA Kit: explicit contracts for auth, loyalty, orders across regions.',
        },
        {
          t: 'Integrations at scale',
          b: 'Enterprise',
          d: 'SFMC, SAP, deliverability and marketing pipelines; operational correctness.',
        },
        {
          t: 'Cross-functional programs',
          b: 'Leadership',
          d: 'Nationwide BOPIS (114 stores); migration leadership for Customer & D&A teams.',
        }
      ),
    },
    {
      slug: 'gotofoods-principal-web-engineer-2311',
      docTitle: 'Go To Foods — Principal Web Engineer (#2311)',
      summary: `Senior <strong>digital commerce</strong> engineer with <strong>storefront performance</strong>, <strong>SEO</strong>, and <strong>experimentation</strong> (<strong>Optimizely</strong>/<strong>A/B</strong>): measurable <strong>latency</strong> wins and <strong>conversion</strong>-focused delivery. Deep <strong>Salesforce B2C Commerce</strong> (<strong>SFRA</strong>, <strong>PWA Kit</strong>) — <strong>React</strong>-oriented <strong>headless</strong> paths; <strong>mobile</strong> and <strong>checkout</strong> initiatives. Strong <strong>REST</strong> consumption; <strong>Figma</strong> and cross-functional design partnership. Eager to align with <strong>Next.js</strong>, <strong>Tailwind</strong>, and <strong>design-system</strong> standards for <strong>multi-brand</strong> web. <strong>Salesforce B2C Commerce Certified Developer.</strong> <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'High-performance web & SEO',
        'React & headless commerce (PWA Kit)',
        'A/B testing & experimentation',
        'Checkout, cart, mobile UX at scale',
        'REST APIs & integration-heavy front ends',
        'CI/CD, Git, Jira, Confluence',
        'Technical leadership on web initiatives',
        'Ramp: Next.js, Tailwind, GraphQL per team norms',
      ],
      roleLine:
        'Go To Foods: principal web for brand sites; performance, SEO, payments/social UX partnership with platform APIs.',
      projects: projectsBlock(
        {
          t: 'Site performance & SEO',
          b: 'Growth',
          d: 'Saks: latency improvements, SEO, ADA; Optimizely experiments.',
        },
        {
          t: 'Headless & mobile',
          b: 'Platform',
          d: 'PWA Kit migration; mobile sales lift; checkout/cart enhancements.',
        },
        {
          t: 'Customer-facing features',
          b: 'Engagement',
          d: 'Loyalty, preferred store, SMS; BBW nationwide programs.',
        }
      ),
    },
    {
      slug: 'discord-senior-swe-notifications-8352070002',
      docTitle: 'Discord — Senior SWE, Notifications',
      summary: `Senior engineer with <strong>full-stack</strong> and <strong>platform</strong> delivery: <strong>Python</strong>, <strong>TypeScript</strong>, <strong>APIs</strong>, and <strong>high-signal</strong> customer-facing systems. Strong <strong>integrations</strong>, <strong>observability</strong>, and <strong>cross-functional</strong> work with Product and Design. Experience with <strong>notification</strong>, <strong>messaging</strong>, or <strong>lifecycle</strong> patterns from commerce and marketing stacks. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Full-stack & platform services',
        'Python / TypeScript / APIs',
        'Product sense & UX quality',
        'Distributed systems & reliability',
        'Collaboration with ML-adjacent teams',
        'Metrics-driven delivery',
        'Code review & mentoring',
        'High-scale consumer tech ramp',
      ],
      roleLine:
        'Discord Notifications: high-signal notifications, infra + client, ML partnership; Bay Area hybrid.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'upstart-principal-swe-cash-line-7531113',
      docTitle: 'Upstart — Principal SWE, Cash Line',
      summary: `Principal-oriented engineer for <strong>fintech</strong> <strong>credit</strong> products: <strong>distributed systems</strong>, <strong>event-driven</strong> architecture, <strong>APIs</strong>, and <strong>consumer</strong>-facing reliability. Strong <strong>Python</strong>, <strong>JavaScript</strong>/<strong>Node</strong>, <strong>SQL</strong>, <strong>cloud</strong> patterns from enterprise commerce. Comfortable with <strong>ambiguous</strong> greenfield scope, <strong>compliance-adjacent</strong> delivery, and <strong>Gen AI</strong> tooling in engineering. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Distributed & event-driven systems',
        'Python / JVM-class languages',
        'API design & data modeling',
        'Fintech / regulated delivery',
        'Cross-functional: product, finance, risk',
        'Observability & operational rigor',
        'Greenfield architecture influence',
        'Gen AI–aware engineering',
      ],
      roleLine:
        'Upstart Cash Line: revolving credit backend; underwriting, pricing, servicing; remote + quarterly travel.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'upstart-senior-swe-cash-line-7531105',
      docTitle: 'Upstart — Senior SWE, Cash Line',
      summary: `Senior engineer for <strong>consumer fintech</strong>: <strong>distributed</strong> <strong>backend</strong>, <strong>event-driven</strong> flows, <strong>APIs</strong>, and <strong>production Gen AI</strong> integration. Strong <strong>Python</strong>, <strong>polyglot</strong> background, <strong>SQL</strong>, and <strong>cloud</strong> from retail and integrations work. Ships <strong>end-to-end</strong> features with focus on <strong>correctness</strong> and <strong>latency</strong>. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Backend & distributed systems',
        'Event-driven & idempotent design',
        'Python / OO languages',
        'Consumer-facing reliability',
        'Gen AI in production workflows',
        'Fintech-adjacent regulated shipping',
        'Autonomous project leadership',
        'Partner with ML & mobile teams',
      ],
      roleLine:
        'Upstart Cash Line: senior backend for new revolving credit; AI underwriting; remote + quarterly onsite.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'upstart-swe-borrower-experience-7779161',
      docTitle: 'Upstart — SWE, Borrower Experience',
      summary: `Senior <strong>full-stack</strong> engineer: <strong>borrower-facing</strong> web and mobile surfaces, <strong>APIs</strong>, <strong>experimentation</strong>, and <strong>servicing</strong> workflows. Strong <strong>JavaScript</strong>, <strong>integrations</strong>, and <strong>analytics</strong>-driven optimization from <strong>ecommerce</strong>. Interest in <strong>LLM</strong>/<strong>agentic</strong> UX where appropriate. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Full-stack web & mobile partnership',
        'APIs & microservices',
        'A/B testing & analytics',
        'Fintech customer experiences',
        'Reliability & self-serve flows',
        'Cross-team delivery',
        'LLM-powered UX ramp',
        'Remote US with periodic onsite',
      ],
      roleLine:
        'Upstart Borrower Experience: post-origination servicing, payments, AI channels; digital-first.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'anthropic-fullstack-swe-reinforcement-learning-5186067008',
      docTitle: 'Anthropic — Full-Stack SWE, Reinforcement Learning',
      summary: `Senior <strong>full-stack</strong> engineer: <strong>Python</strong>, <strong>JavaScript</strong>/<strong>TypeScript</strong>, and <strong>APIs</strong> for <strong>internal</strong> <strong>platforms</strong> and <strong>operator-facing</strong> UIs. Strong <strong>end-to-end</strong> delivery, <strong>integrations</strong>, <strong>mentoring</strong>, and <strong>cross-functional</strong> programs at enterprise scale. Comfortable with <strong>ambiguous</strong> scope, <strong>reliability</strong>, and <strong>fast</strong> iteration alongside research-oriented partners. Eager to deepen <strong>React</strong>/<strong>TypeScript</strong> product polish and <strong>ML-adjacent</strong> tooling. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Python & polyglot backend',
        'Full-stack: APIs, data models, web surfaces',
        'Internal platforms & workflow tools',
        'Integrations & production operations',
        'Mentoring & technical leadership',
        'High-agency execution in fast cycles',
        'Ramp: RL training UX, vendor-scale labeling',
        'Hybrid SF/NYC collaboration',
      ],
      roleLine:
        'Anthropic RL: environments, human data collection, evaluation UIs, vendor tooling; Python + modern web.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'ezcater-senior-swe-customer-service-5015631007',
      docTitle: 'ezCater — Senior SWE, Customer Service',
      summary: `Senior <strong>backend</strong> / <strong>platform</strong> engineer: <strong>APIs</strong>, <strong>PostgreSQL</strong>, <strong>Python</strong>, <strong>Golang</strong>, <strong>Node</strong>, and <strong>enterprise integrations</strong>. Deep <strong>Salesforce ecosystem</strong> delivery (<strong>B2C Commerce</strong> certified) plus <strong>cross-functional</strong> programs with Product and Operations. Strong <strong>mentoring</strong>, <strong>CI/CD</strong> discipline, and <strong>AI-assisted</strong> engineering workflows. Eager to deepen <strong>Service Cloud</strong> patterns alongside Staff Engineers. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Backend services & REST APIs',
        'PostgreSQL / SQL reliability',
        'Salesforce ecosystem & Service Cloud ramp',
        'Integrations & safe rollouts',
        'Customer service / ops-adjacent platforms',
        'Mentoring & code quality',
        'AI tooling in daily delivery',
        'Remote-first collaboration + quarterly travel',
      ],
      roleLine:
        'ezCater: modern CS stack, Service Cloud integration, AI-enabled tooling, Fulfillment Experience.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'mercury-salesforce-developer-5857783004',
      docTitle: 'Mercury — Salesforce Developer',
      summary: `Senior <strong>Salesforce</strong> engineer: <strong>B2C Commerce Cloud Certified Developer</strong>; multi-year <strong>enterprise</strong> <strong>integrations</strong>, <strong>API contracts</strong>, and <strong>migration-scale</strong> programs. Strong <strong>JavaScript</strong>/<strong>Node</strong>, <strong>Python</strong>, <strong>SQL</strong>, and <strong>production debugging</strong> across stakeholder-heavy GTM-adjacent stacks. Comfortable <strong>reducing tool sprawl</strong>, improving <strong>durability</strong>, and partnering on <strong>data quality</strong>. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Salesforce platform & integrations',
        'API design & idempotent integrations',
        'Enterprise migrations & technical leadership',
        'GTM / revenue stack collaboration',
        'Reliability, incidents, maintainability',
        'Cross-functional communication',
        'Fintech-adjacent regulated delivery',
        'Ramp: Data Cloud, core CRM nuances',
      ],
      roleLine:
        'Mercury: Salesforce GTM engineering — flows, objects, permissions, API integrations, durable foundations.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'doordash-applications-engineer-full-stack-people-7733002',
      docTitle: 'DoorDash — Applications Engineer, Full Stack (People)',
      summary: `Senior <strong>full-stack</strong> engineer: <strong>TypeScript</strong>/<strong>Node</strong>, <strong>Python</strong> (FastAPI-class), <strong>React</strong>, <strong>Postgres</strong>, and <strong>multi-cloud</strong> (<strong>AWS</strong>/<strong>GCP</strong>/<strong>Azure</strong>). Deep <strong>REST</strong> and <strong>integration</strong> discipline from enterprise commerce; <strong>Docker</strong>/<strong>Kubernetes</strong> concepts with honest depth calibration. Comfortable on <strong>internal</strong> <strong>HR/People</strong> product surfaces — stakeholder partnership from BSA + lead habits. <strong>Hybrid</strong> cadence per posting. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'TypeScript, Node, React',
        'Python services (FastAPI-class)',
        'Postgres & relational modeling',
        'AWS / GCP / Azure patterns',
        'REST APIs & service integration',
        'Docker / K8s — calibrate in loop',
        'Internal product & HR-tech domain ramp',
        'Agile, code review, mentoring',
      ],
      roleLine:
        'DoorDash People Applications: full-stack talent/employee experiences; TS/Node, Python, React, Postgres, cloud.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'nutanix-senior-salesforce-developer-31296',
      docTitle: 'Nutanix — Senior Salesforce Developer',
      summary: `Senior <strong>Salesforce</strong> developer: <strong>Lightning</strong>, <strong>integrations</strong>, and <strong>enterprise</strong> delivery from <strong>B2C Commerce (SFCC)</strong> depth. Strong <strong>JavaScript</strong>, <strong>REST</strong>, <strong>Git</strong>, and <strong>CI/CD</strong>; <strong>Salesforce B2C Commerce Cloud Certified Developer.</strong> Honest ramp on <strong>Core CRM</strong> nuances and <strong>Nutanix</strong> product context in interview. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Salesforce platform & integrations',
        'Lightning & LWC ramp from SFCC',
        'REST APIs & enterprise patterns',
        'Certified B2C Commerce Developer',
        'Production debugging & governance mindset',
        'Cross-functional delivery',
        'Cloud & SaaS integration discipline',
        'Confirm location & team on live JD',
      ],
      roleLine:
        'Nutanix: Senior Salesforce Developer — Lightning, integrations, enterprise SaaS; align to live posting.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'lululemon-senior-swe-cms-57185',
      docTitle: 'lululemon — Senior SWE, Content Management Systems',
      summary: `Senior engineer with <strong>digital commerce</strong> and <strong>content platform</strong> experience: <strong>headless</strong> and <strong>CMS</strong>-adjacent delivery, <strong>JavaScript</strong>/<strong>TypeScript</strong>, <strong>React</strong>, and <strong>API-first</strong> integrations. Led <strong>large-scale web</strong> programs (<strong>PWA Kit</strong>, <strong>SFCC</strong>) with performance and cross-functional ownership. Strong <strong>AWS</strong>/<strong>Azure</strong> exposure; <strong>mentoring</strong> and <strong>Agile</strong> delivery. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'CMS & content-delivery patterns',
        'React & modern JavaScript/TypeScript',
        'REST APIs & integration design',
        'Retail / digital commerce scale',
        'Cloud: AWS, Azure',
        'Performance, SEO, experimentation mindset',
        'Stakeholder partnership',
        'Confirm stack on live lululemon JD',
      ],
      roleLine:
        'lululemon: Senior SWE CMS — content systems for retail digital; modern web + integrations.',
      projects: projectsBlock(
        {
          t: 'Headless & API boundaries',
          b: 'Platform',
          d: 'PWA Kit migration; explicit contracts for auth, orders, loyalty across regions.',
        },
        {
          t: 'High-traffic storefront',
          b: 'Commerce',
          d: 'Checkout, cart, performance; measurable customer impact.',
        },
        {
          t: 'Cross-functional programs',
          b: 'Delivery',
          d: 'BOPIS 114 stores; alignment across Product, ops, and stores.',
        }
      ),
    },
    {
      slug: 'realtor-martech-senior-swe-7517824003',
      docTitle: 'Realtor.com — MarTech Senior Software Engineer',
      summary: `Senior engineer for <strong>MarTech</strong> and <strong>data-heavy</strong> backends: <strong>TypeScript</strong>/<strong>Node</strong>, <strong>Python</strong>, <strong>Java</strong>, <strong>AWS</strong>, <strong>Snowflake</strong>, <strong>Kafka</strong>, and <strong>CI/CD</strong> (CircleCI, GitHub, Argo-class). Daily <strong>AI-assisted development</strong>; strong <strong>integration</strong> and <strong>operational</strong> rigor from commerce scale. <strong>Hybrid Austin</strong> per posting. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Backend & data integrations',
        'TypeScript, Node, Python, Java',
        'AWS, Snowflake, Kafka-class streaming',
        'CI/CD & platform engineering habits',
        'AI-assisted engineering workflows',
        'MarTech / lifecycle data patterns',
        'Hybrid collaboration',
        'Testing & production ownership',
      ],
      roleLine:
        'Realtor.com MarTech: backend + data, AWS/Snowflake/Kafka, AI-assisted delivery; hybrid Austin.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'gradial-senior-integrations-engineer-4216107009',
      docTitle: 'Gradial — Senior Integrations Engineer',
      summary: `Senior <strong>integrations</strong> engineer: <strong>ESP</strong>, <strong>CDP</strong>, <strong>CMS</strong>/<strong>DAM</strong>, <strong>REST</strong>, <strong>webhooks</strong>, <strong>OAuth</strong>, and enterprise <strong>MarTech</strong> stacks. Deep <strong>commerce</strong> and <strong>marketing technology</strong> narrative from <strong>SFCC</strong> + <strong>SFMC</strong> programs. <strong>AI-native</strong> company; comfortable with fast iteration. <strong>Seattle in-office</strong> cadence per posting — confirm. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Enterprise MarTech integrations',
        'REST, webhooks, OAuth',
        'CDP / ESP / CMS ecosystem patterns',
        'Salesforce & migration-scale delivery',
        'Production reliability & documentation',
        'Customer-facing integration quality',
        'Seattle onsite — confirm schedule',
        'Python / Node / polyglot services',
      ],
      roleLine:
        'Gradial: Senior Integrations Engineer — MarTech connectors, webhooks, OAuth; AI company; Seattle.',
      projects: projectsBlock(
        {
          t: 'SFMC & lifecycle integrations',
          b: 'MarTech',
          d: 'Email migration via APIs; deliverability (DKIM, SPF, DMARC); operational reliability.',
        },
        {
          t: 'Headless commerce APIs',
          b: 'Platform',
          d: 'Explicit REST contracts for auth, loyalty, orders across regions.',
        },
        {
          t: 'Vendor & partner handoffs',
          b: 'Integrations',
          d: 'SAP, analytics, third-party ecosystems — contract-grade production.',
        }
      ),
    },
    {
      slug: 'adobe-sr-martech-engineer-ADOBUSR164053',
      docTitle: 'Adobe — Sr MarTech Engineer',
      summary: `Senior engineer with <strong>marketing technology</strong> and <strong>integration-heavy</strong> delivery: <strong>lifecycle</strong> systems, <strong>campaign</strong> and <strong>data</strong> stacks, <strong>REST</strong> APIs, and <strong>enterprise SaaS</strong>. Strong <strong>JavaScript</strong>/<strong>TypeScript</strong>, <strong>Python</strong>, <strong>cloud</strong> (<strong>AWS</strong>, <strong>Azure</strong>), and <strong>cross-functional</strong> programs. Excited to deepen <strong>Adobe Experience Cloud</strong> ecosystem alignment in role. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'MarTech & data integrations',
        'JavaScript, TypeScript, Python',
        'REST APIs & enterprise workflows',
        'Cloud: AWS, Azure',
        'CI/CD, testing, production support',
        'Stakeholder & marketing partnership',
        'Adobe stack ramp — honest calibration',
        'Scale & reliability mindset',
      ],
      roleLine:
        'Adobe: Sr MarTech Engineer — marketing technology, integrations, enterprise delivery.',
      projects: projectsBlock(
        {
          t: 'SFMC email & data migration',
          b: 'Lifecycle',
          d: 'End-to-end SFCC through SFMC APIs; deliverability programs.',
        },
        {
          t: 'Headless commerce platform',
          b: 'Data',
          d: 'PWA Kit; auth, loyalty, orders — integration discipline.',
        },
        {
          t: 'Program leadership',
          b: 'Scale',
          d: 'BOPIS 114 stores; cross-org execution.',
        }
      ),
    },
    {
      slug: 'zoox-senior-swe-enterprise-apps-lever',
      docTitle: 'Zoox — Senior SWE, Enterprise Applications',
      summary: `Senior engineer for <strong>enterprise applications</strong>: <strong>Workday</strong>, <strong>ServiceNow</strong>, identity, and <strong>integrations</strong>. Strong <strong>Python</strong>, <strong>JavaScript</strong>, <strong>Java</strong>, <strong>Go</strong> (honest depth per stack); <strong>8+ years</strong> production delivery. Comfortable with <strong>hybrid</strong> <strong>Foster City</strong> and Amazon-adjacent equity structures per posting. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Enterprise apps & integrations',
        'Python, JavaScript, Java, Go',
        'Workday / ServiceNow — delivery & ramp',
        'REST APIs & identity patterns',
        'Security & compliance awareness',
        'Hybrid execution (Foster City)',
        'Senior IC ownership & mentoring',
        'Calibrate compensation structures in loop',
      ],
      roleLine:
        'Zoox: Enterprise Applications — Workday, ServiceNow, integrations; hybrid Foster City.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'workday-gh-senior-salesforce-engineer-r100442',
      docTitle: 'Senior Salesforce Engineer (Workday board gh)',
      summary: `Senior <strong>Salesforce</strong> engineer: <strong>Apex</strong>/<strong>LWC</strong> ramp from <strong>SFCC</strong> depth, <strong>integrations</strong>, and <strong>enterprise</strong> programs. <strong>Certified B2C Commerce Developer;</strong> strong <strong>Git</strong>, <strong>CI/CD</strong>, and production ownership. <strong>Confirm employer name</strong> on live Workday posting (board gh) before final apply. <strong>Palo Alto</strong> listing. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Salesforce development & integrations',
        'Apex & Lightning Web Components ramp',
        'Enterprise delivery & migrations',
        'REST APIs & data quality',
        'Palo Alto / Bay Area collaboration',
        'Verify employer on posting',
        'Mentoring & code review',
        'Operational excellence',
      ],
      roleLine:
        'Workday gh board: Senior Salesforce Engineer — confirm company on live requisition; Palo Alto.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'amazon-sde-iii-builderworks-3039243',
      docTitle: 'Amazon — SDE III, BuilderWorks',
      summary: `Senior <strong>software development engineer</strong> with <strong>distributed systems</strong>, <strong>APIs</strong>, and <strong>large-scale</strong> delivery from commerce and integrations. Strong <strong>JavaScript</strong>/<strong>Node</strong>, <strong>Python</strong>, <strong>SQL</strong>, <strong>AWS</strong> and <strong>Azure</strong>; <strong>operational excellence</strong> and <strong>mentoring</strong>. Ready for <strong>Amazon</strong> bar — honest ramp on org-specific stacks in loop. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Large-scale distributed systems',
        'API design & service ownership',
        'Python, JavaScript, polyglot backend',
        'AWS & cloud operations',
        'Testing, metrics, operational rigor',
        'Cross-functional product delivery',
        'SDE III scope — influence without title',
        'BuilderWorks — align to JD in process',
      ],
      roleLine:
        'Amazon SDE III BuilderWorks: large-scale software; confirm org/location on amazon.jobs posting.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'microsoft-apply-1970393556753224',
      docTitle: 'Microsoft — Software Engineering (apply portal)',
      summary: `Senior engineer with <strong>10+ years</strong> shipping <strong>production</strong> systems: <strong>APIs</strong>, <strong>integrations</strong>, <strong>cloud</strong> (<strong>Azure</strong>, <strong>AWS</strong>), and <strong>full-stack</strong> patterns. Strong <strong>TypeScript</strong>/<strong>JavaScript</strong>, <strong>Python</strong>, <strong>C#</strong>, <strong>SQL</strong>; <strong>CI/CD</strong> and <strong>mentoring</strong>. Eager to align to <strong>Microsoft</strong> product group once requisition details are confirmed. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Software engineering at scale',
        'Azure & AWS cloud patterns',
        'TypeScript, JavaScript, Python, C#',
        'REST APIs & microservice mindset',
        'SQL & data correctness',
        'Agile, code review, documentation',
        'Customer-obsessed delivery',
        'Confirm team/stack on live Microsoft JD',
      ],
      roleLine:
        'Microsoft: engineering role via apply.careers — confirm product group, stack, and location on posting.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'autodesk-principal-backend-commerce-portland-26WD96337',
      docTitle: 'Autodesk — Principal Engineer, Backend (Commerce Platform)',
      summary: `Principal-oriented <strong>backend</strong> engineer: <strong>commerce platform</strong>, <strong>service boundaries</strong>, and <strong>integration-heavy</strong> systems. Deep <strong>digital commerce</strong> (<strong>SFCC</strong>, <strong>PWA Kit</strong>), <strong>REST</strong>, <strong>Python</strong>/<strong>Node</strong>/<strong>polyglot</strong> services, <strong>AWS</strong>/<strong>Azure</strong>. Strong <strong>technical leadership</strong>, <strong>mentoring</strong>, and <strong>cross-org</strong> programs (<strong>BOPIS</strong>, migrations). <strong>Portland OR</strong> per posting. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Principal backend & platform scope',
        'Commerce & subscription-adjacent systems',
        'REST, integrations, microservices mindset',
        'Python, JavaScript, Node, polyglot',
        'Cloud: AWS, Azure; CI/CD',
        'Technical leadership & architecture influence',
        'Portland OR — hybrid/onsite per JD',
        'Stakeholder & product partnership',
      ],
      roleLine:
        'Autodesk: Principal Backend, Commerce Platform — Portland; commerce + cloud at scale.',
      projects: projectsBlock(
        {
          t: 'Headless API migration',
          b: 'Commerce',
          d: 'PWA Kit; explicit contracts for auth, loyalty, orders.',
        },
        {
          t: 'High-traffic operational paths',
          b: 'Reliability',
          d: 'Checkout, fraud-adjacent components; severity-1 discipline.',
        },
        {
          t: 'Cross-functional leadership',
          b: 'Programs',
          d: 'BOPIS 114 stores; migration governance across teams.',
        }
      ),
    },
    {
      slug: 'instacart-senior-swe-tech-search-visibility-7656204',
      docTitle: 'Instacart — Senior SWE, Technical Search Visibility',
      summary: `Senior engineer for <strong>search</strong>, <strong>SEO-technical</strong>, and <strong>marketplace</strong> surfaces: <strong>APIs</strong>, <strong>data</strong>, and <strong>full-stack</strong> patterns. Strong <strong>JavaScript</strong>/<strong>TypeScript</strong>, <strong>Python</strong>, <strong>SQL</strong>, <strong>cloud</strong>, and <strong>experimentation</strong> from retail scale. Comfortable with <strong>hybrid-remote</strong> culture per posting. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Search & technical SEO patterns',
        'Backend APIs & data pipelines',
        'JavaScript, TypeScript, Python',
        'Experimentation & metrics',
        'Marketplace / commerce scale',
        'Cloud & CI/CD',
        'Hybrid-remote collaboration',
        'Calibrate search stack in interview',
      ],
      roleLine:
        'Instacart: Technical Search Visibility — marketplace search/SEO-adjacent engineering.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'betterup-senior-solutions-engineer-ashby',
      docTitle: 'BetterUp — Senior Solutions Engineer',
      summary: `Senior <strong>Solutions Engineer</strong> / <strong>technical sales</strong> profile: <strong>scoping</strong>, <strong>integrations</strong>, <strong>APIs</strong>, and <strong>enterprise</strong> customer delivery. Strong <strong>storytelling</strong> from <strong>BSA</strong> and <strong>lead engineer</strong> roles; deep <strong>platform</strong> and <strong>migration</strong> experience. Honest positioning vs pure <strong>product IC</strong> — emphasize <strong>customer-facing technical</strong> wins. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Technical discovery & scoping',
        'APIs & integration architecture',
        'Enterprise stakeholder communication',
        'Proof-of-concept & demo discipline',
        'Sales engineering / solutions mindset',
        'Python, JavaScript, cloud patterns',
        'Remote-friendly collaboration',
        'Calibrate SE vs eng IC with hiring manager',
      ],
      roleLine:
        'BetterUp: Senior Solutions Engineer — enterprise technical scoping, integrations, customer trust.',
      projects: projectsBlock(
        {
          t: 'Stakeholder technical alignment',
          b: 'Solutions',
          d: 'Columbia BSA + lead habits: translate needs into feasible architecture.',
        },
        {
          t: 'Integration-heavy platforms',
          b: 'Enterprise',
          d: 'SFCC, SFMC, SAP — reliable production contracts.',
        },
        {
          t: 'Program-scale delivery',
          b: 'Trust',
          d: 'BOPIS 114 stores; cross-functional execution under pressure.',
        }
      ),
    },
    {
      slug: 'leaflink-senior-salesforce-developer-8466853002',
      docTitle: 'LeafLink — Senior Salesforce Developer',
      summary: `Senior <strong>Salesforce</strong> developer: <strong>Apex</strong>, <strong>Lightning</strong>, <strong>Service</strong>/<strong>Sales</strong>/<strong>Experience Cloud</strong>, <strong>REST</strong>, <strong>Platform Events</strong>. <strong>B2C Commerce Certified Developer;</strong> regulated <strong>B2B</strong> and <strong>integrations</strong> narrative from enterprise retail. <strong>Remote</strong> per posting. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Salesforce Apex & Lightning',
        'Service / Sales / Experience Cloud',
        'REST & Platform Events',
        'B2C Commerce certified',
        'Regulated industry delivery',
        'Remote US execution',
        'Integrations & data quality',
        'Cannabis B2B domain — quick ramp',
      ],
      roleLine:
        'LeafLink: Senior Salesforce Developer — Apex, Lightning, clouds, integrations; remote.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'gm-senior-swe-salesforce-warren-JR-202516350',
      docTitle: 'General Motors — Senior Software Engineer, Salesforce (Warren)',
      summary: `Senior <strong>Salesforce</strong> engineer: enterprise <strong>Service</strong> / <strong>Sales Cloud</strong>, <strong>Apex</strong>, <strong>Lightning</strong>, integrations. <strong>B2C Commerce Certified Developer;</strong> retail and regulated-industry delivery. Automotive IT — confirm GM digital stack vs pure SFDC with hiring manager. <strong>Warren MI</strong> posting; confirm RTO. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Salesforce Apex & Lightning',
        'Service / Sales Cloud implementations',
        'REST & enterprise integrations',
        'B2C Commerce certified',
        'Stakeholder & requirements alignment',
        'Automotive / large-enterprise context',
        'On-site / hybrid (Warren)',
        'Production quality & code review',
      ],
      roleLine:
        'GM: Senior Software Engineer — Salesforce (Warren); confirm team charter and stack.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'gm-senior-swe-austin-JR-202516674',
      docTitle: 'General Motors — Senior Software Engineer (Austin)',
      summary: `Senior <strong>software engineer</strong> with <strong>distributed systems</strong>, <strong>REST</strong> / event patterns, and <strong>full-stack</strong> delivery from <strong>commerce</strong> and <strong>platform</strong> roles. Strong <strong>JavaScript</strong>; enterprise <strong>integrations</strong> (SFCC, SFMC, SAP). <strong>Austin TX</strong>; confirm embedded vs application focus with GM recruiter. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Full-stack & API development',
        'JavaScript / TypeScript',
        'Cloud & integration patterns',
        'Enterprise scale & reliability',
        'Agile delivery & mentorship',
        'Austin hub collaboration',
        'Automotive software — domain ramp',
        'CI/CD and production support',
      ],
      roleLine:
        'GM: Senior Software Engineer (Austin); verify stack from live JD.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'teradyne-sr-swe-oregon-4473319',
      docTitle: 'Teradyne — Sr. Software Engineer (Oregon)',
      summary: `Senior <strong>software engineer</strong> with <strong>enterprise integration</strong>, <strong>APIs</strong>, and <strong>full-stack</strong> delivery. Teradyne builds test &amp; automation for semiconductors and electronics — calibrate resume narrative to <strong>instrumentation software</strong>, <strong>reliability</strong>, and <strong>cross-functional</strong> product teams vs pure web commerce. <strong>Tualatin OR</strong> area; confirm RTO and stack (often C++, Python, or similar in ATE). <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Software design & implementation',
        'APIs & system integration',
        'Test / automation domain ramp',
        'Performance & reliability mindset',
        'Agile delivery & code review',
        'Hardware-adjacent software collaboration',
        'Oregon / PNW on-site or hybrid',
        'Enterprise stakeholder alignment',
      ],
      roleLine:
        'Teradyne: Sr. Software Engineer — semiconductor test & automation; confirm JD stack on careers site.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'noblis-software-engineer-developer-4473168',
      docTitle: 'Noblis — Software Engineer/Developer',
      summary: `Senior <strong>software engineer</strong> with <strong>distributed systems</strong>, <strong>APIs</strong>, and <strong>data-intensive</strong> delivery. Noblis supports <strong>NASA</strong> Ames–adjacent programs; JD emphasizes <strong>analytics</strong>, <strong>NLP</strong>/<strong>LLM</strong> research and prototyping — calibrate honest ramp on ML depth vs your platform/integration strengths. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Software engineering & design',
        'APIs & service integration',
        'Data pipelines & analytics mindset',
        'Research collaboration — domain ramp',
        'Security & compliance awareness',
        'Agile delivery & documentation',
        'Public-sector / mission context',
        'Python / modern stack — confirm on posting',
      ],
      roleLine:
        'Noblis: Software Engineer/Developer — NASA-related programs; verify ML vs platform balance with recruiter.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'govcio-software-engineer-4473059',
      docTitle: 'GovCIO — Software Engineer',
      summary: `Senior <strong>software engineer</strong> with <strong>enterprise modernization</strong>, <strong>integration</strong>, and <strong>full-stack</strong> experience. GovCIO federal IT roles often require <strong>suitability</strong> / <strong>public trust</strong>; NLx snippet references legacy <strong>document-centric</strong> systems and incremental architecture evolution. Emphasize reliability, security awareness, and cross-team delivery. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Legacy modernization & refactoring',
        'Enterprise integrations & APIs',
        'JavaScript / full-stack patterns',
        'Security & compliance mindset',
        'Collaboration in cleared environments',
        'Testing & production support',
        'Agile / incremental delivery',
        'Remote federal delivery — confirm reqs',
      ],
      roleLine:
        'GovCIO: Software Engineer — mission systems modernization; confirm clearance and stack.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'verint-sr-engineer-software-4471476',
      docTitle: 'Verint — Sr. Engineer, Software',
      summary: `Senior <strong>software engineer</strong> with <strong>full-stack</strong> ownership, <strong>enterprise B2B</strong> delivery, and <strong>integration</strong> depth. Verint focuses on <strong>customer experience</strong> automation and <strong>quality management</strong> platforms — map to large-scale product features, APIs, and cross-functional leadership. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Full-stack platform development',
        'Enterprise SaaS delivery',
        'REST & integration patterns',
        'Mentorship & technical ownership',
        'Performance & scalability',
        'Agile product partnership',
        'CX / contact-center domain — ramp',
        'Remote or hybrid — confirm posting',
      ],
      roleLine:
        'Verint: Sr. Engineer, Software — QM/CX platform; emphasize end-to-end feature ownership.',
      projects: DEFAULT_PROJECTS,
    },
    {
      slug: 'nike-principal-software-engineer-R-81956',
      docTitle: 'Nike — Principal Software Engineer (R-81956)',
      summary: `<strong>Principal</strong>-level engineer: <strong>roadmaps</strong> with product and engineering leadership, <strong>cross-domain</strong> alignment, and delivery of major capabilities across value streams. <strong>Architecture</strong>, evaluation, and hands-on build of sophisticated solutions; <strong>mentorship</strong> via code review and standards. JD cites <strong>AWS</strong>, <strong>Azure</strong>, <strong>Java</strong>, <strong>JavaScript</strong>, <strong>SQL</strong>, <strong>CI/CD</strong>, <strong>CDN</strong> and <strong>WAF</strong>, <strong>Splunk</strong>, <strong>SEO</strong> — calibrate depth honestly vs posting. <strong>Telecommuting</strong> available from most U.S. states (see Nike listing for exclusions). <strong>Master's degree</strong> and experience per posting. <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Technical leadership & roadmaps',
        'Java & JavaScript at scale',
        'AWS & Azure cloud patterns',
        'CI/CD & production excellence',
        'SQL & data-aware systems',
        'CDN / WAF & web platform',
        'Splunk / observability mindset',
        'Mentorship & code review culture',
      ],
      roleLine:
        'Nike R-81956: Principal Software Engineer — Beaverton HQ; remote-eligible per posting; confirm Job# on careers site.',
      projects: DEFAULT_PROJECTS,
    },
    ...linkedinBatchVariants20260407(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260416(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260418(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260407(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260423(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260428(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260429(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260430(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260507(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260520(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260526(DEFAULT_PROJECTS, projectsBlock),
    ...scanHistoryUrlsVariants20260526Oregon(DEFAULT_PROJECTS, projectsBlock),
    {
      slug: 'terry-mork-generic-full-stack',
      docTitle: 'Senior Full-Stack Software Engineer (Generic)',
      misc: true,
      miscBaseName: 'senior-full-stack',
      useStoryBankExperience: true,
      useFullSkills: true,
      summary: `Senior <strong>full-stack</strong> engineer with <strong>10+ years</strong> in commerce, <strong>integrations</strong>, and production systems where outages hit revenue and checkout. <strong>Technical lead</strong> (~5 engineers) at Bath &amp; Body Works across <strong>Customer</strong>, <strong>Loyalty</strong>, and <strong>Data &amp; Analytics</strong>. Led <strong>SiteGenesis → PWA Kit</strong> (US + Canada), <strong>SFCC → SFMC</strong> email (~90% volume), and <strong>Canada BOPIS</strong> (<strong>114 stores</strong>) with upstream data validation. Deep <strong>auth</strong> (JWT/SLAS, hybrid migration), <strong>REST APIs</strong>, MarTech deliverability, and <strong>severity-1</strong> data pipelines. Builds <strong>spare-time AI-assisted projects</strong> with <strong>Cursor</strong> and <strong>Claude/Opus</strong>. <strong>Salesforce B2C Commerce Certified Developer.</strong> <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Commerce & headless platforms',
        'Integrations & REST APIs',
        'Auth, JWT/session, deliverability',
        'Data pipelines & BOPIS',
        'Technical leadership & mentoring',
        'Production reliability & on-call',
        'Full-stack (React, Node, Python, Golang)',
        'AI-assisted dev & side projects',
      ],
      roleLine:
        'Senior full-stack / integrations: commerce platforms, auth, MarTech, data pipelines, production reliability.',
      projects: projectsBlock(
        {
          t: 'PWA Kit + SFMC + BOPIS',
          b: 'Platform',
          d: 'Headless migration (US/Canada, 60+ jobs); ~90% email to SFMC; Canada BOPIS 114 stores with validated data pipelines.',
        },
        {
          t: 'Auth & deliverability',
          b: 'Production',
          d: 'Hybrid dwsid/SLAS JWT cutover, Fastly/Human; DKIM/SPF/DMARC via MXToolbox and header validation.',
        },
        {
          t: 'AI side projects',
          b: 'Learning',
          d: 'Spare-time automation and integration prototypes with Cursor and Claude/Opus; own architecture and validation.',
        }
      ),
    },
    {
      slug: 'terry-mork-salesforce-commerce',
      docTitle: 'Senior Salesforce B2C Commerce Developer (Generic)',
      misc: true,
      miscBaseName: 'salesforce-commerce',
      useSalesforceExperience: true,
      useFullSkills: true,
      fullSkillsProfile: 'salesforce',
      summary: `Senior <strong>Salesforce B2C Commerce</strong> engineer with <strong>10+ years</strong> on enterprise retail storefronts: <strong>SiteGenesis</strong>, <strong>SFRA</strong>, and <strong>PWA Kit</strong> across US and Canada. <strong>Technical lead</strong> (~5 engineers) at Bath &amp; Body Works for Customer, Loyalty, and Data &amp; Analytics on SFCC. Led <strong>SiteGenesis → PWA Kit</strong> with <strong>60+ jobs</strong>, <strong>SLAS JWT</strong> auth, <strong>SFCC → SFMC</strong> migration (~90% email via HTTP outbound REST and Journey Builder), and <strong>Canada BOPIS</strong> (<strong>114 stores</strong>) with validated XML catalog feeds. Deep <strong>checkout, orders, loyalty, promotions</strong>, and vendor integrations (SAP, Cleo/Talend, Radial). Prior SFCC delivery at <strong>Saks OFF 5TH</strong> and <strong>Columbia Sportswear (SFRA)</strong>. <strong>Salesforce B2C Commerce Cloud Certified Developer (2020).</strong> <strong>BS CIS.</strong> Veteran.`,
      competencies: [
        'Salesforce B2C Commerce (SFCC)',
        'PWA Kit & headless commerce',
        'SFMC / Journey Builder',
        'SLAS JWT & customer auth',
        'Orders, checkout & loyalty',
        'SFCC jobs & catalog/BOPIS feeds',
        'REST/SOAP integrations',
        'Certified B2C Developer (2020)',
      ],
      roleLine:
        'Senior Salesforce commerce developer: SFCC, PWA Kit, SFMC, integrations, production reliability.',
      projects: projectsBlock(
        {
          t: 'PWA Kit migration',
          b: 'SFCC',
          d: 'SiteGenesis → PWA Kit US/Canada: API contracts, 60+ jobs, campaigns/promotions, parallel builds for SFRA gaps.',
        },
        {
          t: 'SFCC → SFMC email',
          b: 'MarTech',
          d: '~90% customer email via HTTP outbound REST → Journey Builder; DKIM/SPF/DMARC; OMS kept order/BOPIS paths.',
        },
        {
          t: 'BOPIS catalog feeds',
          b: 'Data',
          d: '114-store Canada launch: validated XML to SFCC staging; Talend/Cleo SFTP, SAP/Radial integration layer.',
        }
      ),
    },
  ];
}
