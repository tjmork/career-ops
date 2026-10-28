"""Generate Terry Mork resume v8 — 2 pages max, value-forward bullets.

Outputs:
  - career-ops/output/Terry Mork FS Resume v8.docx
  - career-ops/output/Terry Mork Resume v8.docx
"""

from __future__ import annotations

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

OUTPUT_DIR = Path(__file__).resolve().parents[1] / "output"

FONT_NAME = "Calibri"
BODY_SIZE = Pt(11)
NAME_SIZE = Pt(22)
TITLE_SIZE = Pt(12.5)
TAGLINE_SIZE = Pt(10)
SECTION_SIZE = Pt(11)
CONTACT_SIZE = Pt(10)
SKILL_SIZE = Pt(10)
MARGIN = Inches(0.65)
LINE_SPACING = 1.08
BULLET_INDENT = Inches(0.22)
BULLET_HANGING = Inches(-0.18)

HEADER_COLOR = RGBColor(0x1A, 0x1A, 0x1A)
ACCENT_COLOR = RGBColor(0x2C, 0x5F, 0x8A)
MUTED_COLOR = RGBColor(0x44, 0x44, 0x44)

VARIANTS = {
    "fs": {
        "filename": "Terry Mork FS Resume v8.docx",
        "title": "Senior Full-Stack Software Engineer",
        "tagline": "Commerce · integrations · auth · data pipelines  |  SFCC / PWA Kit · SFMC · BOPIS",
    },
    "se": {
        "filename": "Terry Mork Resume v8.docx",
        "title": "Senior Software Engineer",
        "tagline": "Commerce platforms · integrations · production reliability  |  SFCC · SFMC",
    },
    "sfcc": {
        "filename": "Terry Mork SFCC Resume v8.docx",
        "title": "Senior Salesforce B2C Commerce Developer",
        "tagline": "SiteGenesis · SFRA · PWA Kit · SFMC  |  SLAS auth · BOPIS · integrations",
    },
}

CORE_FOCUS = [
    "10+ years in commerce, APIs, and integrations where outages hit revenue and checkout",
    "Tech lead (~5 engineers) at BBW: Customer, Loyalty, and Data & Analytics",
    "SiteGenesis → PWA Kit (US + Canada), SFCC → SFMC (~90% email volume), Canada BOPIS (114 stores)",
    "Spare-time AI-assisted projects (Cursor, Claude/Opus); Salesforce B2C Certified (2020); US Army National Guard (2010–2018)",
]

CORE_STACK = (
    "JavaScript, Node.js, Python, Golang, C#, React · SFCC (SFRA, PWA Kit), SFMC · SQL Server, PostgreSQL, MySQL · "
    "REST/SOAP, Azure APIM · AWS (EC2, RDS, S3) · OAuth, JWT/SLAS, PKCE · Fastly, Tealium · Datadog, Splunk · Cursor, Claude"
)

SKILLS = [
    ("Languages", "JavaScript, HTML/CSS, Node.js, Python, Golang, C# / ASP.NET MVC, Perl, TypeScript, React"),
    (
        "Salesforce & commerce",
        "Visualforce, SFRA, SiteGenesis, PWA Kit, Services, Orders, campaigns/promotions, tax tables, SFMC Journey Builder",
    ),
    (
        "Data, cloud & integrations",
        "SQL Server, PostgreSQL, MySQL; AWS (EC2, RDS, S3, Route 53), Azure; REST/SOAP/JSON/XML, Azure APIM; SAP, Cleo, Talend, SFTP",
    ),
    (
        "Auth, network & CDN",
        "OAuth, JWT/SLAS, PKCE, encryption, Bcrypt, Okta, Ping; SSL/HTTPS, DKIM/SPF/DMARC, MXToolbox; Fastly, Human, Tealium",
    ),
    (
        "Mobile, analytics & observability",
        "Apple App Store, Xcode, TestFlight/Bitrise; Datadog, Quantum Metrics, Splunk, ServiceNow, Opsgenie; Adobe Analytics, Optimizely, Jest",
    ),
    (
        "Delivery, UX & AI",
        "Git, GitHub, GitLab, Bitbucket, Jenkins, Jira, Confluence; Figma, Miro, Visio; reCAPTCHA, Maps, ArcGIS; Cursor, Claude, Opus",
    ),
]

JOBS = [
    {
        "company": "Bath & Body Works",
        "title": "Senior Applications Developer",
        "dates": "Apr 2023 – Nov 2025",
        "bullets": [
            (
                "Technical lead",
                "Led ~5 engineers on Customer, Loyalty, and Data & Analytics; sprint planning, PR reviews, mentoring, "
                "and on-call for checkout-impacting auth and store-data failures.",
            ),
            (
                "PWA Kit migration",
                "Led SiteGenesis → PWA Kit (US + Canada): API contracts, shared utilities, 60+ jobs, and parallel builds "
                "where headless APIs lagged legacy SiteGenesis; US/Canada merge for customer and loyalty.",
            ),
            (
                "Customer auth",
                "Owned login, JWT/session, cart merge, and order history; restored forgot-password during hybrid cutover "
                "(dwsid vs SLAS JWT, cookie limits, Fastly/Human); validated email via MXToolbox and header analysis.",
            ),
            (
                "SFCC → SFMC email",
                "Architected ~90% customer email migration via HTTP outbound REST → Journey Builder (credit-card prototype first); "
                "3×/minute retries, DKIM/SPF/DMARC with network team; OMS kept order confirm/BOPIS paths.",
            ),
            (
                "BOPIS & store data",
                "Launched Canada BOPIS for 114 stores: Talend/Cleo SFTP, SAP/Radial integration layer, validated XML to SFCC "
                "(SAP not on SFCC ingest path); severity-1 ownership; guided planned US pipeline migration.",
            ),
            (
                "Loyalty & programs",
                "Shipped loyalty features with vendor coordination; delivered Points Accelerators, Preferred Store, and SMS integrations.",
            ),
        ],
    },
    {
        "company": "Saks OFF 5TH",
        "title": "Senior Software Engineer",
        "dates": "Apr 2021 – Jan 2023",
        "bullets": [
            (
                "Performance",
                "Cut page load ~6–7 seconds via checkout, cart, caching, wishlist, and analytics (SFCC web + mobile).",
            ),
            (
                "Returns UX",
                "Led returns redesign: order-history modal with page-state preservation for multi-item returns; web/mobile E2E from Figma.",
            ),
            (
                "Mobile",
                "Built category-scoped mobile menu imagery in SFCC; secondary iOS release owner; ~10–20% mobile sales lift.",
            ),
            (
                "Growth & quality",
                "Optimizely A/B tests, ADA search UX, SEO load reduction, Adobe Analytics; supplemental checkout fraud integrations.",
            ),
        ],
    },
    {
        "company": "Columbia Sportswear",
        "title": "Business Systems Analyst (Engineering-focused)",
        "dates": "Dec 2019 – Nov 2020",
        "bullets": [
            (
                "SFCC & integrations",
                "Delivered SFRA features (Product, Pricing, Promotions, Browse & Content); managed Order Dynamics, "
                "Channel Advisor, Bazaarvoice, DataLake, Splunk, and related order/analytics workflows.",
            ),
        ],
    },
    {
        "company": "Techsparq",
        "title": "Senior Software Engineer (Contract, Columbia Sportswear)",
        "dates": "Jan 2020 – Apr 2021",
        "bullets": [
            ("Contract delivery", "React internal app, Squarespace customizations, SFCC on-demand sandboxes."),
        ],
    },
    {
        "company": "National Data Systems",
        "title": "Software Engineer II",
        "dates": "May 2018 – Dec 2019",
        "bullets": [
            (
                "B2B platform",
                "Integrated 6 companies on C#/ASP.NET B2B platform; retained at-risk client as primary liaison (~1 year).",
            ),
            (
                "Onboarding automation",
                "Replaced manual onboarding with parameter-driven JavaScript + SQL Server rules; mentored engineers to independent delivery.",
            ),
        ],
    },
    {
        "company": "MyUSP 800 LLC",
        "title": "Lead Software Architect",
        "dates": "Aug 2017 – Apr 2018",
        "bullets": [
            (
                "Greenfield ship",
                "Shipped hybrid DaaS in 3 months (no prior Node/AWS): auth, encryption, Node/Express, MySQL, AWS; mentored front-end dev.",
            ),
        ],
    },
    {
        "company": "C-LOGIC INC.",
        "title": "Senior Software Developer",
        "dates": "Jan 2015 – May 2018",
        "bullets": [
            (
                "Enterprise dashboards",
                "Locale/i18n system (FE keys + dictionary tables); supported Japan client; 10+ technical docs and training videos.",
            ),
        ],
    },
]

SFCC_CORE_FOCUS = [
    "10+ years on Salesforce B2C Commerce: SiteGenesis, SFRA, and PWA Kit at enterprise retail scale",
    "SFCC technical lead (~5 engineers) at BBW: Customer, Loyalty, and Data & Analytics",
    "SiteGenesis → PWA Kit (US + Canada), SFCC → SFMC (~90% email), Canada BOPIS (114 stores), 60+ SFCC jobs",
    "Salesforce B2C Commerce Certified Developer (2020)  ·  US Army National Guard (2010–2018)",
]

SFCC_CORE_STACK = (
    "SFCC (SiteGenesis, SFRA, PWA Kit) · SFMC Journey Builder · SLAS JWT · HTTP outbound REST · "
    "Orders, checkout, loyalty, promotions · SAP · Cleo/Talend SFTP · Radial OMS"
)

SFCC_SKILLS = [
    (
        "B2C Commerce (SFCC)",
        "SiteGenesis, SFRA, PWA Kit, Visualforce patterns, Services, Orders, campaigns/promotions, tax tables, 60+ jobs",
    ),
    (
        "Marketing Cloud (SFMC)",
        "Journey Builder, HTTP outbound REST, API key → JWT, deliverability (DKIM, SPF, DMARC), MXToolbox",
    ),
    (
        "Integrations & catalog data",
        "REST/SOAP, JSON/XML feeds, SAP, Cleo/Talend SFTP, Radial OMS, Order Dynamics, Channel Advisor, Bazaarvoice",
    ),
    ("Auth & storefront", "SLAS JWT/session, cart merge, dwsid hybrid cutover, OAuth, Okta, Fastly/Human CDN"),
    (
        "Delivery",
        "Git, GitHub, GitLab, Jenkins; SFCC sandboxes, Optimizely/SFCC A/B tests, Adobe Analytics; Agile, Jira",
    ),
]

JOBS_SFCC = [
    {
        "company": "Bath & Body Works",
        "title": "Senior Applications Developer — Salesforce B2C Commerce",
        "dates": "Apr 2023 – Nov 2025",
        "bullets": [
            (
                "SFCC technical lead",
                "Led ~5 engineers on Customer, Loyalty, and Data & Analytics SFCC programs; on-call for checkout, auth, and catalog ingest.",
            ),
            (
                "SiteGenesis → PWA Kit",
                "Headless migration US + Canada: API contracts, 60+ SFCC jobs, campaigns/promotions parity, parallel builds for SFRA gaps.",
            ),
            (
                "Customer auth (SLAS)",
                "Login, JWT/session, cart merge, order history; hybrid dwsid vs SLAS JWT forgot-password cutover.",
            ),
            (
                "SFCC → SFMC",
                "Architected ~90% email off SFCC via HTTP outbound REST → Journey Builder; DKIM/SPF/DMARC with network team.",
            ),
            (
                "BOPIS & catalog",
                "Canada BOPIS 114 stores: validated XML to SFCC staging (Talend/Cleo SFTP, SAP/Radial); severity-1 ingest ownership.",
            ),
            (
                "Loyalty & programs",
                "Loyalty vendor integrations; Points Accelerators, Preferred Store, SMS on SFCC checkout.",
            ),
        ],
    },
    {
        "company": "Saks OFF 5TH",
        "title": "Senior Software Engineer — SFCC",
        "dates": "Apr 2021 – Jan 2023",
        "bullets": [
            (
                "SFCC performance",
                "Cut page load ~6–7 seconds via checkout, cart, caching, wishlist on SFCC web and mobile.",
            ),
            (
                "SFCC returns & mobile",
                "Returns modal on order history; category mobile menu imagery via SFCC; iOS release owner for SFCC sandbox validation.",
            ),
            (
                "SFCC experimentation",
                "Optimizely/SFCC A/B tests, Adobe Analytics; supplemental checkout fraud integrations on SFCC.",
            ),
        ],
    },
    {
        "company": "Columbia Sportswear",
        "title": "Business Systems Analyst (SFCC / Engineering-focused)",
        "dates": "Dec 2019 – Nov 2020",
        "bullets": [
            (
                "SFRA & integrations",
                "Product, Pricing, Promotions, Browse & Content on SFRA; Order Dynamics, Channel Advisor, Bazaarvoice, DataLake, Splunk.",
            ),
        ],
    },
    {
        "company": "Techsparq",
        "title": "Senior Software Engineer (Contract, Columbia Sportswear)",
        "dates": "Jan 2020 – Apr 2021",
        "bullets": [
            ("SFCC enablement", "SFCC on-demand sandboxes, internal React tooling, Squarespace customizations."),
        ],
    },
]

VARIANT_CONTENT = {
    "sfcc": {
        "core_focus": SFCC_CORE_FOCUS,
        "core_stack": SFCC_CORE_STACK,
        "skills": SFCC_SKILLS,
        "jobs": JOBS_SFCC,
    },
}


def apply_paragraph_format(paragraph, space_before=0, space_after=0):
    pf = paragraph.paragraph_format
    pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    pf.line_spacing = LINE_SPACING
    pf.space_before = Pt(space_before)
    pf.space_after = Pt(space_after)


def set_run_font(run, size=None, bold=False, color=None, italic=False):
    run.font.name = FONT_NAME
    run._element.rPr.rFonts.set(qn("w:eastAsia"), FONT_NAME)
    if size:
        run.font.size = size
    run.font.bold = bold
    run.font.italic = italic
    if color:
        run.font.color.rgb = color


def configure_styles(doc):
    for name in ("Normal", "List Bullet", "List Paragraph"):
        style = doc.styles[name]
        style.font.name = FONT_NAME
        style.font.size = BODY_SIZE
        style.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        style.paragraph_format.line_spacing = LINE_SPACING
    bullet = doc.styles["List Bullet"]
    bullet.paragraph_format.left_indent = BULLET_INDENT
    bullet.paragraph_format.first_line_indent = BULLET_HANGING


def add_section_heading(doc, text):
    p = doc.add_paragraph()
    apply_paragraph_format(p, space_before=8, space_after=3)
    set_run_font(p.add_run(text.upper()), size=SECTION_SIZE, bold=True, color=ACCENT_COLOR)


def add_job_header(doc, company, title, dates):
    p = doc.add_paragraph()
    apply_paragraph_format(p, space_before=5, space_after=2)
    set_run_font(p.add_run(company), size=BODY_SIZE, bold=True)
    set_run_font(p.add_run("  |  "), size=BODY_SIZE, color=MUTED_COLOR)
    set_run_font(p.add_run(title), size=BODY_SIZE, bold=True)
    set_run_font(p.add_run("  |  "), size=BODY_SIZE, color=MUTED_COLOR)
    set_run_font(p.add_run(dates), size=BODY_SIZE)


def add_lead_bullet(doc, lead: str, rest: str):
    p = doc.add_paragraph(style="List Bullet")
    apply_paragraph_format(p, space_after=2)
    set_run_font(p.add_run(lead + ": "), size=BODY_SIZE, bold=True)
    set_run_font(p.add_run(rest), size=BODY_SIZE)


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    apply_paragraph_format(p, space_after=2)
    set_run_font(p.add_run(text), size=BODY_SIZE)


def add_body(doc, text, size=None, space_after=3, bold=False, color=None, align=None):
    p = doc.add_paragraph()
    if align:
        p.alignment = align
    apply_paragraph_format(p, space_after=space_after)
    set_run_font(p.add_run(text), size=size or BODY_SIZE, bold=bold, color=color)


def add_skills_block(doc, label, items):
    p = doc.add_paragraph()
    apply_paragraph_format(p, space_after=2)
    set_run_font(p.add_run(label + ": "), size=SKILL_SIZE, bold=True)
    set_run_font(p.add_run(items), size=SKILL_SIZE)


def build_document(variant_key: str) -> Document:
    meta = VARIANTS[variant_key]
    content = VARIANT_CONTENT.get(variant_key, {})
    core_focus = content.get("core_focus", CORE_FOCUS)
    core_stack = content.get("core_stack", CORE_STACK)
    skills = content.get("skills", SKILLS)
    jobs = content.get("jobs", JOBS)
    doc = Document()
    section = doc.sections[0]
    section.top_margin = MARGIN
    section.bottom_margin = MARGIN
    section.left_margin = MARGIN
    section.right_margin = MARGIN
    configure_styles(doc)

    p_name = doc.add_paragraph()
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    apply_paragraph_format(p_name, space_after=1)
    set_run_font(p_name.add_run("TERRY J. MORK"), size=NAME_SIZE, bold=True, color=HEADER_COLOR)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    apply_paragraph_format(p_title, space_after=2)
    set_run_font(p_title.add_run(meta["title"]), size=TITLE_SIZE, bold=True, color=ACCENT_COLOR)

    add_body(
        doc,
        meta["tagline"],
        size=TAGLINE_SIZE,
        color=MUTED_COLOR,
        align=WD_ALIGN_PARAGRAPH.CENTER,
        space_after=2,
    )

    p_contact = doc.add_paragraph()
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    apply_paragraph_format(p_contact, space_after=8)
    set_run_font(
        p_contact.add_run("909-973-9479  |  tmork.dev@gmail.com  |  linkedin.com/in/terryjmork"),
        size=CONTACT_SIZE,
    )

    add_section_heading(doc, "Core Focus")
    for line in core_focus:
        add_bullet(doc, line)

    add_section_heading(doc, "Core Stack")
    add_body(doc, core_stack, size=SKILL_SIZE, space_after=4)

    add_section_heading(doc, "Technical Skills")
    for label, items in skills:
        add_skills_block(doc, label, items)

    add_section_heading(doc, "Professional Experience")
    for job in jobs:
        add_job_header(doc, job["company"], job["title"], job["dates"])
        for bullet in job["bullets"]:
            if isinstance(bullet, tuple):
                add_lead_bullet(doc, bullet[0], bullet[1])
            else:
                add_bullet(doc, bullet)

    add_section_heading(doc, "Education & Credentials")
    add_body(
        doc,
        "California State Polytechnic University, Pomona — B.S., Computer Information Systems",
        space_after=2,
    )
    add_body(doc, "Salesforce B2C Commerce Cloud Certified Developer (2020)", space_after=2)
    add_body(doc, "US Army National Guard, 2010 – 2018", space_after=0)

    return doc


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for key in VARIANTS:
        path = OUTPUT_DIR / VARIANTS[key]["filename"]
        build_document(key).save(str(path))
        print(f"Saved: {path}")


if __name__ == "__main__":
    main()
