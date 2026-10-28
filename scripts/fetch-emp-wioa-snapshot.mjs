/**
 * One-off: load Oregon EMP WIOA job display pages with Playwright and print title/employer heuristics.
 * Usage: node scripts/fetch-emp-wioa-snapshot.mjs [comma-separated ord list]
 */
import { chromium } from 'playwright';

const defaultOrds = [
  4473319, 4473223, 4473225, 4473168, 4473059, 4473028, 4472344, 4472471, 4471784,
  4472188, 4472265, 4472268, 4471476, 4469242, 4468956, 4468958, 4468905, 4468686,
  4468344, 4469230, 4470707,
];

function url(ord, system = 'WIOA') {
  return `https://secure.emp.state.or.us/jobs/index.cfm?location_content=jobdisplay.cfm&ord=${ord}&system=${system}&type=N&lang=E`;
}

async function main() {
  const ords =
    process.argv[2]?.split(',').map((s) => Number(s.trim(), 10)).filter(Boolean) || defaultOrds;
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120' });
  const page = await ctx.newPage();
  const out = [];
  for (const ord of ords) {
    const u = url(ord);
    try {
      await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 90000 });
      await page.waitForTimeout(4000);
      const title = await page.title();
      const body = await page.evaluate(() => document.body?.innerText?.slice(0, 4000) || '');
      out.push({ ord, url: u, pageTitle: title, bodySnippet: body.replace(/\s+/g, ' ').trim().slice(0, 1500) });
    } catch (e) {
      out.push({ ord, url: u, error: String(e.message || e) });
    }
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
