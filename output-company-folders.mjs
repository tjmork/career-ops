/**
 * Company subfolders under output/ — one folder per employer for tailored PDFs/HTML.
 * Add a new entry whenever you introduce a new variant slug in render-batch-pdfs.mjs
 * or pdf-variants-2026-04-09.mjs.
 */
import { mkdirSync } from 'fs';
import { resolve } from 'path';
import { LINKEDIN_BATCH_20260407_FOLDERS } from './batch/linkedin-batch-company-folders-20260407.mjs';
import { SCAN_HISTORY_URLS_20260416_FOLDERS } from './batch/scan-history-urls-folders-20260416.mjs';
import { SCAN_HISTORY_URLS_20260418_FOLDERS } from './batch/batch-pasted-urls-2026-04-18-folders-20260418.mjs';
import { SCAN_HISTORY_URLS_20260407_FOLDERS } from './batch/batch-mixed-boards-2026-04-07-folders-20260407.mjs';
import { SCAN_HISTORY_URLS_20260423_FOLDERS } from './batch/batch-mixed-2026-04-23-folders-20260423.mjs';
import { SCAN_HISTORY_URLS_20260428_FOLDERS } from './batch/batch-2026-04-28-mixed-urls-folders-20260428.mjs';
import { SCAN_HISTORY_URLS_20260429_FOLDERS } from './batch/batch-2026-04-29-mixed-urls-folders-20260429.mjs';
import { SCAN_HISTORY_URLS_20260430_FOLDERS } from './batch/batch-2026-04-30-mixed-urls-folders-20260430.mjs';
import { SCAN_HISTORY_URLS_20260507_FOLDERS } from './batch/batch-2026-05-07-oregon-sor-urls-folders-20260507.mjs';
import { SCAN_HISTORY_URLS_20260520_FOLDERS } from './batch/batch-2026-05-20-emp-oregon-mixed-urls-folders-20260520.mjs';
import { SCAN_HISTORY_URLS_20260526_FOLDERS } from './batch/batch-2026-05-26-uber-urls-folders-20260526.mjs';
import { SCAN_HISTORY_URLS_20260526_OREGON_FOLDERS } from './batch/batch-2026-05-26-oregon-sor-urls-folders-20260526.mjs';

/** @type {Record<string, string>} slug -> human-readable folder name (sanitized before use) */
export const SLUG_TO_COMPANY_FOLDER = {
  // render-batch-pdfs.mjs (2026-04-07)
  'delta-air-lines': 'Delta-Air-Lines',
  ohsu: 'OHSU',
  'sephora-integrations': 'Sephora',
  twitch: 'Twitch',
  'puzzle-io': 'Puzzle-io',
  'lyft-server': 'Lyft',
  rula: 'Rula',
  'snowflake-fe': 'Snowflake',
  'uber-earner-incentive': 'Uber',
  'openai-infra': 'OpenAI',
  zoox: 'Zoox',
  offerup: 'OfferUp',
  bumble: 'Bumble',
  'upstart-api': 'Upstart',
  'turo-api': 'Turo',
  'plaid-devrel': 'Plaid',

  // pdf-variants-2026-04-09.mjs
  'benchling-developer-enablement': 'Benchling',
  'nordstrom-checkout-wishlist': 'Nordstrom',
  'adobe-sde-experience-platform': 'Adobe',
  'airbnb-staff-fullstack-marketing-tech': 'Airbnb',
  'truckstop-salesforce-developer': 'Truckstop',
  'crowdstrike-sr-ecommerce-it': 'CrowdStrike',
  'amazon-aws-salesforce-afx': 'Amazon-Web-Services',
  'trimble-software-engineer-ai-construction': 'Trimble',
  'cambia-health-senior-swe-r6476': 'Cambia-Health-Solutions',
  'akamai-global-web-security-2836': 'Akamai',
  'capital-one-shopping-lead-full-stack': 'Capital-One',
  'serco-na-software-engineer-nlx': 'Serco-North-America',
  'accenture-full-stack-engineering-manager-nlx': 'Accenture',
  'oregon-doe-senior-full-stack-data-integration-req-197645':
    'Oregon-Department-of-Energy',
  'irobot-senior-salesforce-service-cloud': 'iRobot',
  'affirm-senior-backend-affirm-card': 'Affirm',
  'quanata-senior-backend-engineer-remote-indeed': 'Quanata',
  'monster-sr-software-engineer-salesforce-remote-or': 'Monster',
  'monster-sr-software-engineer-salesforce-remote-newark-55923485': 'Monster',
  'monster-lead-web-developer-technical-lead-remote-ma': 'Monster',
  'kforce-senior-software-engineer-2167439-eqg': 'Kforce',
  'kforce-senior-mobile-software-engineer-2171748-wqg': 'Kforce',
  'monster-servicenow-application-dev-tech-lead-camas-wa': 'Monster',
  'marriott-oracle-cx-requisition-26042882': 'Marriott',
  'included-health-senior-swe-remote': 'Included-Health',
  'samsara-full-stack-safety-invehicle': 'Samsara',
  'samsara-staff-engineer-platform': 'Samsara',
  'clover-principal-technologist-octo': 'Clover-Health',
  'mozilla-firefox-monitor-senior-swe': 'Mozilla',
  'leolabs-senior-fullstack-insights': 'LeoLabs',
  'gotofoods-principal-software-engineer-2313': 'GoTo-Foods',
  'gotofoods-principal-web-engineer-2311': 'GoTo-Foods',
  'discord-senior-swe-notifications-8352070002': 'Discord',
  'upstart-principal-swe-cash-line-7531113': 'Upstart',
  'upstart-senior-swe-cash-line-7531105': 'Upstart',
  'upstart-swe-borrower-experience-7779161': 'Upstart',
  'anthropic-fullstack-swe-reinforcement-learning-5186067008': 'Anthropic',
  'ezcater-senior-swe-customer-service-5015631007': 'EzCater',
  'mercury-salesforce-developer-5857783004': 'Mercury',

  // LinkedIn batch 2026-04-15 (score ≥ 3.5 PDFs)
  'doordash-applications-engineer-full-stack-people-7733002': 'DoorDash',
  'nutanix-senior-salesforce-developer-31296': 'Nutanix',
  'lululemon-senior-swe-cms-57185': 'lululemon',
  'realtor-martech-senior-swe-7517824003': 'Realtor-com',
  'gradial-senior-integrations-engineer-4216107009': 'Gradial',
  'adobe-sr-martech-engineer-ADOBUSR164053': 'Adobe',
  'zoox-senior-swe-enterprise-apps-lever': 'Zoox',
  'workday-gh-senior-salesforce-engineer-r100442': 'Workday-GH-Posting',
  'amazon-sde-iii-builderworks-3039243': 'Amazon',
  'microsoft-apply-1970393556753224': 'Microsoft',
  'autodesk-principal-backend-commerce-portland-26WD96337': 'Autodesk',
  'instacart-senior-swe-tech-search-visibility-7656204': 'Instacart',
  'betterup-senior-solutions-engineer-ashby': 'BetterUp',
  'leaflink-senior-salesforce-developer-8466853002': 'LeafLink',
  'gm-senior-swe-salesforce-warren-JR-202516350': 'General-Motors',
  'gm-senior-swe-austin-JR-202516674': 'General-Motors',
  'teradyne-sr-swe-oregon-4473319': 'Teradyne',
  'noblis-software-engineer-developer-4473168': 'Noblis',
  'govcio-software-engineer-4473059': 'GovCIO',
  'verint-sr-engineer-software-4471476': 'Verint',
  'nike-principal-software-engineer-R-81956': 'Nike',

  ...LINKEDIN_BATCH_20260407_FOLDERS,

  ...SCAN_HISTORY_URLS_20260416_FOLDERS,

  ...SCAN_HISTORY_URLS_20260418_FOLDERS,

  ...SCAN_HISTORY_URLS_20260407_FOLDERS,

  ...SCAN_HISTORY_URLS_20260423_FOLDERS,

  ...SCAN_HISTORY_URLS_20260428_FOLDERS,

  ...SCAN_HISTORY_URLS_20260429_FOLDERS,

  ...SCAN_HISTORY_URLS_20260430_FOLDERS,

  ...SCAN_HISTORY_URLS_20260507_FOLDERS,

  ...SCAN_HISTORY_URLS_20260520_FOLDERS,
  ...SCAN_HISTORY_URLS_20260526_FOLDERS,
  ...SCAN_HISTORY_URLS_20260526_OREGON_FOLDERS,

  // CVS Health (generated outside batch scripts; same employer folder)
  'cvs-health': 'CVS-Health',
  'cvs-minuteclinic-r0795945': 'CVS-Health',
  'cvs-r0860253': 'CVS-Health',
  'cvs-r0871164': 'CVS-Health',
  'cvs-r0857897': 'CVS-Health',

  // Generic / story-bank resume (output/Misc/, cv-terry-mork-* naming)
  'terry-mork-generic-full-stack': 'Misc',
  'terry-mork-salesforce-commerce': 'Misc',
};

export const MISC_OUTPUT_FOLDER = 'Misc';

export function sanitizeFolderName(name) {
  return (
    String(name)
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, '-')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/[. ]+$/g, '') || 'Unknown-Company'
  );
}

export function companyFolderForSlug(slug) {
  const raw = SLUG_TO_COMPANY_FOLDER[slug];
  if (!raw) {
    throw new Error(
      `[output] Unknown variant slug "${slug}". Add SLUG_TO_COMPANY_FOLDER["${slug}"] in output-company-folders.mjs.`
    );
  }
  return sanitizeFolderName(raw);
}

/**
 * @param {string} repoRoot - __dirname of career-ops package
 * @param {string} slug - variant slug (e.g. benchling-developer-enablement)
 * @param {string} base - filename without path or extension (e.g. cv-candidate-benchling-developer-enablement-2026-04-09)
 */
export function pathsForVariant(repoRoot, slug, base) {
  const folder = companyFolderForSlug(slug);
  const dir = resolve(repoRoot, 'output', folder);
  mkdirSync(dir, { recursive: true });
  return {
    dir,
    folder,
    htmlPath: resolve(dir, `${base}.html`),
    pdfPath: resolve(dir, `${base}.pdf`),
    /** Path relative to repo root, forward slashes */
    pdfRelative: `output/${folder}/${base}.pdf`,
  };
}

/**
 * Parse cv-candidate-{slug}-{YYYY-MM-DD} basename (no extension).
 * @returns {{ slug: string, date: string } | null}
 */
export function parseCandidateBaseName(base) {
  const m = base.match(/^cv-candidate-(.+)-(\d{4}-\d{2}-\d{2})$/);
  if (!m) return null;
  return { slug: m[1], date: m[2] };
}
