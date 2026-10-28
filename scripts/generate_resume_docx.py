"""Generate Terry Mork resume — ATS-friendly, targets 2 pages on US Letter."""

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

DOWNLOADS = Path(r"C:\Users\terry\Downloads")
OUTPUT_PATHS = [
    DOWNLOADS / "Terry_Mork_Senior_Software_Engineer_2026_v7.docx",
    DOWNLOADS / "Terry_Mork_Senior_Software_Engineer_2026.docx",
]

# Standard 2-page layout (readable, not cramped)
FONT_NAME = "Calibri"
BODY_SIZE = Pt(11)
SKILL_SIZE = Pt(11)
NAME_SIZE = Pt(22)
TITLE_SIZE = Pt(13)
SECTION_SIZE = Pt(11.5)
CONTACT_SIZE = Pt(10.5)
MARGIN = Inches(0.75)
LINE_SPACING = 1.15  # multiple of line height
BULLET_INDENT = Inches(0.25)
BULLET_HANGING = Inches(-0.2)

HEADER_COLOR = RGBColor(0x1A, 0x1A, 0x1A)
ACCENT_COLOR = RGBColor(0x2C, 0x5F, 0x8A)

SUMMARY = (
    "Senior full-stack software engineer with 10+ years delivering end-to-end solutions across "
    "customer-facing web, APIs, data, and integrations, including commerce auth (JWT/session, cart merge), "
    "headless SFCC migrations, and store/data paths where production outages affected revenue. "
    "Technical lead for about 5 engineers across customer, loyalty, and data integrations at "
    "Bath & Body Works. Stack-flexible full-stack builder: productive in new stacks within weeks (greenfield "
    "Node/MySQL/AWS in 3 months at MyUSP; SiteGenesis to PWA Kit; Python/Golang services at BBW) "
    "while leading engineers and cross-functional delivery. Led SiteGenesis to PWA Kit (US and Canada), "
    "SFCC to SFMC email migration, and Canada BOPIS (114 stores). Strong across JavaScript, Node.js, Python, "
    "Golang, REST APIs, PostgreSQL, and Salesforce B2C Commerce (SFCC, PWA Kit). "
    "Salesforce B2C Commerce Cloud Certified Developer (2020). US Army National Guard (2010-2018)."
)

SKILLS = [
    (
        "Languages (production)",
        "JavaScript, Python, Golang, Node.js, TypeScript, C#, Perl, HTML/CSS",
    ),
    (
        "Commerce & platforms",
        "Salesforce B2C Commerce (SFCC, SFRA, SiteGenesis, PWA Kit), SFMC (Marketing Cloud APIs), "
        "React, Express.js, REST APIs, SOAP, Squarespace",
    ),
    (
        "Data & cloud",
        "PostgreSQL, Microsoft SQL Server, MySQL; AWS (EC2, RDS, S3, Route 53), Azure, Linux, "
        "Windows Server, IIS",
    ),
    (
        "Integrations & enterprise",
        "SAP, Cleo, SFTP, Order Dynamics, Channel Advisor, Bazaarvoice, DataLake, Slack, Splunk",
    ),
    (
        "Mobile & release",
        "Apple App Store, iOS release coordination, mobile E2E testing, CDN (Fastly)",
    ),
    (
        "Auth & security",
        "OAuth, OIDC concepts, JWT, session management, encryption, DKIM, SPF, DMARC, HTTPS, Okta, Ping",
    ),
    (
        "Observability & delivery",
        "Datadog, Splunk, ServiceNow, Opsgenie, Git, GitHub, GitLab, Jenkins, Agile, Jira, Confluence",
    ),
    (
        "Analytics, design & AI tools",
        "Adobe Analytics, Omniture, Optimizely A/B testing, Figma, Miro; Cursor, Claude",
    ),
]


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
        style.paragraph_format.space_before = Pt(0)
        style.paragraph_format.space_after = Pt(0)
    bullet = doc.styles["List Bullet"]
    bullet.paragraph_format.left_indent = BULLET_INDENT
    bullet.paragraph_format.first_line_indent = BULLET_HANGING


def add_section_heading(doc, text):
    p = doc.add_paragraph()
    apply_paragraph_format(p, space_before=10, space_after=4)
    set_run_font(p.add_run(text.upper()), size=SECTION_SIZE, bold=True, color=ACCENT_COLOR)


def add_job_header(doc, company, title, dates):
    p = doc.add_paragraph()
    apply_paragraph_format(p, space_before=7, space_after=3)
    set_run_font(p.add_run(company), size=BODY_SIZE, bold=True)
    set_run_font(p.add_run("  |  "), size=BODY_SIZE)
    set_run_font(p.add_run(title), size=BODY_SIZE, bold=True)
    set_run_font(p.add_run("  |  "), size=BODY_SIZE)
    set_run_font(p.add_run(dates), size=BODY_SIZE)


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    apply_paragraph_format(p, space_after=3)
    set_run_font(p.add_run(text), size=BODY_SIZE)


def add_body(doc, text, size=None, space_after=4):
    p = doc.add_paragraph()
    apply_paragraph_format(p, space_after=space_after)
    set_run_font(p.add_run(text), size=size or BODY_SIZE)


def add_skills_block(doc, label, items):
    p = doc.add_paragraph()
    apply_paragraph_format(p, space_after=3)
    set_run_font(p.add_run(label + ": "), size=SKILL_SIZE, bold=True)
    set_run_font(p.add_run(items), size=SKILL_SIZE)


def build_document():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = MARGIN
    section.bottom_margin = MARGIN
    section.left_margin = MARGIN
    section.right_margin = MARGIN
    configure_styles(doc)

    p_name = doc.add_paragraph()
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    apply_paragraph_format(p_name, space_after=2)
    set_run_font(p_name.add_run("TERRY J. MORK"), size=NAME_SIZE, bold=True, color=HEADER_COLOR)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    apply_paragraph_format(p_title, space_after=4)
    set_run_font(
        p_title.add_run("Senior Full-Stack Software Engineer"),
        size=TITLE_SIZE,
        bold=True,
        color=ACCENT_COLOR,
    )

    p_contact = doc.add_paragraph()
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    apply_paragraph_format(p_contact, space_after=10)
    set_run_font(
        p_contact.add_run(
            "909-973-9479  |  tmork.dev@gmail.com  |  linkedin.com/in/terryjmork"
        ),
        size=CONTACT_SIZE,
    )

    add_section_heading(doc, "Professional Summary")
    add_body(doc, SUMMARY, space_after=6)

    add_section_heading(doc, "Technical Skills")
    for label, items in SKILLS:
        add_skills_block(doc, label, items)

    add_section_heading(doc, "Professional Experience")

    add_job_header(
        doc,
        "Bath & Body Works",
        "Senior Applications Developer",
        "Apr 2023 - Nov 2025",
    )
    for b in [
        "Technical lead for about 5 engineers across Customer, Loyalty, and Data & Analytics; "
        "sprint planning with Product, PR reviews, mentoring, and on-call when store or auth "
        "integrations affected checkout.",
        "Owned customer authentication: login, passwords, JWT/session handling, guest-to-authenticated "
        "flows, cart merge, and order history; improved logging and error handling for complex auth edge cases.",
        "Led SiteGenesis to PWA Kit migration for Customer, Loyalty, and D&A (US and Canada): API contracts, "
        "shared utilities, error/logging standards, and 60+ scheduled jobs; closed critical gaps where headless "
        "APIs lagged legacy SiteGenesis behavior.",
        "Architected SFCC to SFMC email migration (about 90% of customer/SFCC email volume); implemented DKIM, "
        "SPF, and DMARC with infrastructure partners for Google/Yahoo deliverability.",
        "Directed Canada BOPIS across 114 stores (SAP/data feeds, Cleo/SFTP, store ops); delivered Points "
        "Accelerators, Preferred Store, and SMS integrations; owned production data paths with severity-1 "
        "revenue exposure.",
    ]:
        add_bullet(doc, b)

    add_job_header(doc, "Saks OFF 5TH", "Senior Software Engineer", "Apr 2021 - Jan 2023")
    for b in [
        "Improved site performance 6-7 seconds via checkout, cart, caching, wishlist, and analytics across SFCC web and mobile.",
        "Led returns UX redesign: order-history modal preserving page state for multi-item returns; full web and mobile E2E testing from Figma specs.",
        "Directed mobile feature delivery and Apple App Store release coordination; contributed to 10-20% mobile sales lift.",
        "Implemented Optimizely A/B testing, ADA-focused search UX, SEO load reduction, and Adobe Analytics/Omniture reporting.",
        "Built supplemental SFCC checkout fraud-check integrations alongside existing vendor fraud stack.",
    ]:
        add_bullet(doc, b)

    add_job_header(
        doc,
        "Columbia Sportswear",
        "Business Systems Analyst (Engineering-focused)",
        "Dec 2019 - Nov 2020",
    )
    for b in [
        "Partnered with engineering to deliver SFCC (SFRA) features across Product, Pricing, Promotions, and Browse & Content; bridged business requirements and technical execution.",
        "Managed integrations: Order Dynamics, Channel Advisor, Bazaarvoice, DataLake, Splunk, Slack, Blue Triangle, and related analytics and order workflows.",
        "Directed on-time SFCC feature delivery with engineering teams.",
    ]:
        add_bullet(doc, b)

    add_job_header(
        doc,
        "Techsparq",
        "Senior Software Engineer (Contract, Columbia Sportswear)",
        "Jan 2020 - Apr 2021",
    )
    add_bullet(
        doc,
        "Built internal React application, Squarespace customizations, and SFCC on-demand sandboxes for Columbia Sportswear.",
    )

    add_job_header(doc, "National Data Systems", "Software Engineer II", "May 2018 - Dec 2019")
    for b in [
        "Ramped on C#/ASP.NET in production; integrated six new companies onto the B2B platform; primary client liaison for at-risk account retention (about 1 year).",
        "Refactored onboarding to parameter-driven, config-style business rules (JavaScript + SQL Server stored procedures), improving performance and reducing manual overhead.",
        "Mentored engineers on SQL and JavaScript until independent on production work.",
    ]:
        add_bullet(doc, b)

    add_job_header(doc, "MyUSP 800 LLC", "Lead Software Architect", "Aug 2017 - Apr 2018")
    for b in [
        "No prior Node/AWS production experience; shipped hybrid web DaaS in 3 months with authentication, encryption, HTTPS, and password recovery on Node.js/Express, MySQL, and AWS.",
        "Designed database schema (ER modeling), subscription tiers, and SEO-oriented data model; mentored front-end developer to independent delivery.",
    ]:
        add_bullet(doc, b)

    add_job_header(doc, "C-LOGIC INC.", "Senior Software Developer", "Jan 2015 - May 2018")
    for b in [
        "Built locale/i18n translation system (front-end keys + dictionary tables) for multi-language enterprise dashboards.",
        "Supported international clients (including Japan); created 10+ technical documents and training videos.",
    ]:
        add_bullet(doc, b)

    # Page break ensures credentials land on page 2 when content fills most of page 1
    doc.add_page_break()

    add_section_heading(doc, "Education & Credentials")
    add_body(
        doc,
        "California State Polytechnic University, Pomona - B.S., Computer Information Systems",
        space_after=4,
    )
    add_body(doc, "Salesforce B2C Commerce Cloud Certified Developer (2020)", space_after=4)
    add_body(doc, "US Army National Guard, 2010 - 2018", space_after=0)

    return doc


def main():
    doc = build_document()
    for path in OUTPUT_PATHS:
        path.parent.mkdir(parents=True, exist_ok=True)
        doc.save(str(path))
        print(f"Saved: {path}")


if __name__ == "__main__":
    main()
