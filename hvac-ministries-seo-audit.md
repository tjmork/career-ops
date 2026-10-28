# HVAC Ministries — SEO Audit & Improvement Plan

**Site:** https://www.hvacministries.org/  
**Audit date:** June 27, 2026  
**Platform:** Wix  
**Business:** HVAC Ministries LLC — heating & cooling services in Oregon  

---

## Executive Summary

The site has a strong human story (faith-driven values, honest pricing, family-owned) but is currently optimized like a generic Wix template, not a local HVAC business. The biggest issues are a generic page title, weak keyword-focused headings, thin service content, no city-level targeting, and missing technical SEO basics (sitemap, schema).

**Current SEO estimate:** 4/10  
**Achievable with fixes below:** 7/10+ (no full redesign required)

---

## Critical Fixes (Do These First)

### 1. Fix the Page Title

**Current:** `HOME | My Site 1`

**Problem:** Google and searchers see a placeholder title. This hurts rankings and click-through rate.

**Recommended titles (pick one based on actual service area):**

- `HVAC Ministries | Heating & Cooling Services in Oregon`
- `HVAC Ministries | HVAC Repair & Installation in Salem, OR` *(if Salem is primary market)*

**Where to fix:** Wix → Pages → Home → SEO / Page Settings → Title tag

---

### 2. Add a Meta Description

**Current:** Likely missing or auto-generated.

**Recommended copy:**

> HVAC Ministries provides honest heating, cooling, ductwork, installation, repair, and maintenance services for Oregon families. Call 503-385-1432 for service or a free estimate.

**Where to fix:** Wix → Pages → Home → SEO → Meta description (keep under ~155 characters)

---

### 3. Fix the Main Headline (H1)

**Current:** Fragmented headings — "COMFORT / YOU CAN TRUST / SERVICE / WITH A PURPOSE"

**Problem:** Emotionally strong but weak for search. Google looks for a clear H1 with service + location keywords.

**Recommended structure:**

- **H1:** `Reliable HVAC Repair and Installation in Oregon`
- Keep tagline below as supporting copy: *"Comfort you can trust. Service with a purpose."*

---

### 4. Fix Typo in CTA

**Current:** `GET A FREE ESTMATE`  
**Fix to:** `GET A FREE ESTIMATE`

---

### 5. Create Separate Service Pages

**Current:** All services listed on homepage only.

**Problem:** One page cannot rank well for multiple service keywords (AC repair, heating installation, ductwork, etc.).

**Create these pages:**

| URL slug (suggested) | Page title |
|----------------------|------------|
| `/hvac-installation` | New HVAC System Installation in Oregon |
| `/ac-repair` | Air Conditioning Repair in Oregon |
| `/heating-repair` | Heating System Repair in Oregon |
| `/ductwork` | Whole-House Ductwork Services |
| `/hvac-maintenance` | HVAC Maintenance & Tune-Ups |
| `/retrofit-hvac-systems` | HVAC System Retrofitting |

**Each page should include:**

- 500–900 words of unique content
- Local keywords (Oregon + cities served)
- 2–4 FAQs
- Photos with alt text
- Clear CTA (Book Service / Free Estimate)
- Phone number: 503-385-1432

---

## Local SEO

### 6. Add Specific Service Area Keywords

**Current:** "Local Oregon HVAC Operator" — too vague.

**Add to homepage and contact/footer:**

> Serving Salem, Keizer, Albany, Woodburn, Silverton, Stayton, and surrounding Oregon communities.

**Important:** Only list cities/counties you actually serve.

### 7. Consistent NAP (Name, Address, Phone)

Display clearly in footer and contact section on every page:

```
HVAC Ministries LLC
Phone: 503-385-1432
Email: divineairandhome@gmail.com
CCB: 236663
Service Area: [list cities/counties]
```

Use the **exact same** business name, phone, and email everywhere (website, Google Business Profile, directories).

### 8. Google Business Profile

For a local HVAC company, Google Business Profile often matters **more than the website** for "near me" searches.

**Action items:**

- Claim or verify listing for HVAC Ministries LLC
- Add all services (installation, repair, maintenance, ductwork, etc.)
- Upload before/after photos, team photos, truck/logo
- Add business hours
- Set service area
- Ask satisfied customers for Google reviews
- Post updates periodically (seasonal tips, promotions)

---

## Structured Data (Schema)

Add **LocalBusiness** or **HVACBusiness** JSON-LD so Google understands the business type.

**Example schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "HVAC Ministries LLC",
  "telephone": "503-385-1432",
  "email": "divineairandhome@gmail.com",
  "url": "https://www.hvacministries.org/",
  "areaServed": "Oregon",
  "description": "Faith-driven HVAC repair, installation, and maintenance for Oregon families."
}
```

**Where to add in Wix:** Settings → SEO → Structured data, or custom code/embed if available on your plan.

---

## Content Improvements

### 9. Expand Homepage & Service Copy

**Strengths to leverage (already on site):**

- Faith-driven values
- Eliseo Cortes — dad of 8, local operator
- Honest pricing, quality workmanship
- 1 year free maintenance + labor warranty
- Up to 10-year manufacturer warranties for loyal customers
- Licensed (CCB: 236663)

**Add SEO-friendly sections:**

- HVAC Repair in Oregon
- Air Conditioning Installation and Repair
- Heating System Maintenance
- Why Homeowners Choose HVAC Ministries
- Licensed Oregon HVAC Contractor
- Frequently Asked Questions

### 10. FAQ Ideas (good for SEO + schema)

- How often should I service my HVAC system?
- Do you offer free estimates?
- Do you install new heating and cooling systems?
- What areas in Oregon do you serve?
- Are you licensed and insured?
- What warranties do you offer?

Consider FAQ schema markup if Wix supports it.

---

## Technical SEO

### 11. Sitemap

**Finding:** `https://www.hvacministries.org/sitemap.xml` returned **404 Not Found**.

**Fix:** Wix → Marketing & SEO → SEO Tools → enable sitemap / connect Search Console. Wix usually provides a sitemap at a Wix-specific URL — submit that URL in Google Search Console.

### 12. Wix SEO Checklist

| Item | Action |
|------|--------|
| Custom title tag | Every page — not "My Site 1" |
| Meta description | Every page — unique, under 155 chars |
| Image alt text | All images — descriptive, include HVAC + Oregon where natural |
| Mobile layout | Verify buttons and text readable on phone |
| Google Search Console | Connect site, submit sitemap |
| Indexing | Ensure site is not set to "hidden from search engines" |
| Favicon | Add branded icon |
| Social share image | Set OG image for homepage |

### 13. robots.txt

Verify in Wix that the site allows crawling (`Allow: /` for public pages). Check after publishing any SEO changes.

---

## Image SEO

**Current issues:** Generic filenames visible in content (e.g. `Image-1 (1).jpg`, `sdfghjkl.png`).

**Before upload (when possible), rename files:**

- Bad: `Image-1 (1).jpg`
- Better: `hvac-ministries-ac-installation-oregon.jpg`

**Alt text examples:**

- `HVAC Ministries technician installing residential air conditioning system in Oregon`
- `Before and after HVAC system installation by HVAC Ministries`
- `Eliseo Cortes, owner of HVAC Ministries LLC`

---

## Priority Action List

| Priority | Task | Effort |
|----------|------|--------|
| P0 | Change homepage title from "My Site 1" | 5 min |
| P0 | Add meta description | 5 min |
| P0 | Fix "ESTMATE" → "ESTIMATE" | 2 min |
| P1 | Add clear H1 with HVAC + Oregon | 15 min |
| P1 | Add service area cities to footer/home | 15 min |
| P1 | Connect Google Search Console + submit sitemap | 30 min |
| P1 | Claim/optimize Google Business Profile | 1–2 hrs |
| P2 | Create 6 service pages | 2–4 hrs |
| P2 | Add LocalBusiness/HVACBusiness schema | 30 min |
| P2 | Alt text on all images | 30 min |
| P3 | FAQ section + review request campaign | Ongoing |

---

## What This Audit Could Not Verify

Use these tools for the rest:

| Need | Tool |
|------|------|
| Page speed / Core Web Vitals | [PageSpeed Insights](https://pagespeed.web.dev/) |
| Indexation, queries, errors | Google Search Console |
| Full site crawl | Screaming Frog (free up to 500 URLs) |
| Rankings & competitors | Manual Google searches: "HVAC repair Salem OR", etc. |

---

## Quick Reference — Business Info

| Field | Value |
|-------|-------|
| Business name | HVAC Ministries LLC |
| Website | https://www.hvacministries.org/ |
| Phone | 503-385-1432 |
| Email | divineairandhome@gmail.com |
| CCB | 236663 |
| Tagline | Comfort you can trust. Service with a purpose. |

---

*Document generated for personal use. Update service areas and titles to match actual business operations before publishing.*
