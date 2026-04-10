 # Ahmad Salehiyan — Personal Website

 This repository contains the production code for `salehiyan.com` (portfolio + technical insights).

 The purpose of this README is to help you decide:
 - where to host,
 - how to launch safely,
 - what features are currently active vs intentionally disabled.

 ---

 ## 1) Executive Summary (What this site is)

 - **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind.
 - **Primary product**: Professional portfolio, project case studies, and insight articles.
 - **Main conversion path**: Contact via Formspree + direct professional links.
 - **Current public focus**: Fast, stable portfolio experience with strong SEO.

 ### Current public status
 - ✅ Core portfolio pages are active.
 - ✅ Insights and article pages are active.
 - ✅ Contact flow via Formspree is active.
 - ✅ Portfolio launch mode is active (polls/newsletter/admin are intentionally disabled for stability).

 ---

 ## 2) Website Architecture (What affects hosting decisions)

 ### Frontend
 - Route system under `app/`.
 - Shared layout + metadata in `app/layout.tsx`.
 - Reusable UI components under `components/`.
 - Content modeling under `lib/`.

 ### API / server capabilities present in repo
 The repo includes Next.js API route code under `app/api/**`.

 For the current public launch profile, backend-heavy modules are disabled and the site runs in portfolio-focused mode.

 ### Security and headers
 - Custom headers are configured in `next.config.mjs` (CSP, HSTS, referrer policy, etc.).
 - This is easiest to preserve on runtime-capable hosts (e.g., Vercel, Node hosting).

 ### Feature access model
 - Public portfolio routes are available to all visitors.
 - Polls/newsletter/admin routes are blocked in launch mode via `middleware.ts`.

 ---

 ## 3) Domain and Hosting Context

 - You already have IONOS hosting tied to `irsa-us.org`.
 - Your target personal domain is `salehiyan.com` (not registered in IONOS).

 This is fully fine. You can:
 1. keep domain registration wherever it is,
 2. point DNS to your hosting destination,
 3. launch without transferring registrar (optional).

 ---

 ## 4) Best Hosting Options for THIS Site

 ## Option A — Vercel (Recommended)

 ### Why this is best for your project
 - Native support for Next.js App Router and API routes.
 - Zero server/process management.
 - Fast global CDN + automatic HTTPS.
 - Easy previews, rollback, and future feature re-activation.

 ### Best for
 - Fastest reliable launch.
 - Lowest operational complexity.
 - Future flexibility if you re-enable backend features.

 ### Tradeoffs
 - Hosting is not inside IONOS billing.

 ---

 ## Option B — IONOS Node-capable hosting (Deploy Now / VPS)

 ### Why choose it
 - Keep infrastructure under IONOS ecosystem.
 - Supports full Next.js runtime if plan supports Node processes.

 ### Best for
 - Preference for IONOS-managed environment.
 - Comfortable with more server/admin setup.

 ### Tradeoffs
 - More maintenance: process management, logs, runtime updates, deployment scripting.

 ---

 ## Option C — IONOS static webspace only (Not preferred unless simplifying)

 ### When acceptable
 - If you intentionally keep site as mostly static pages + Formspree contact only.

 ### Tradeoffs
 - Runtime features and many APIs are not usable.
 - More constraints if you later re-enable interactive/server features.

 ---

 ## 5) Decision Matrix (Quick)

 - Choose **Vercel** if you want: easiest launch, best Next.js compatibility, least risk.
 - Choose **IONOS Node runtime** if you want: one provider + can handle infra complexity.
 - Choose **IONOS static only** if you want: minimal static deployment and accept feature limits.

 **Recommended for your current situation:** `Vercel + salehiyan.com DNS pointing`.

 ---

 ## 6) Required Environment Variables

 For your current production setup:

 ```env
 NEXT_PUBLIC_SITE_URL=https://salehiyan.com
 NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xbdparee
 NEXT_PUBLIC_PLAUSIBLE_DOMAIN=salehiyan.com
 NEXT_PUBLIC_CONTACT_USE_INTERNAL_API=false
 ```

 Notes:
 - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is already integrated in UI flow.
 - Keep `NEXT_PUBLIC_CONTACT_USE_INTERNAL_API=false` for static-friendly contact handling.

 ---

 ## 7) Local Development and Validation

 Install + run:

 ```bash
 npm ci
 npm run dev
 ```

 Quality/build checks:

 ```bash
 npm run lint
 npm run typecheck
 npm run test
 npm run build
 ```

 Favicon refresh workflow:

 ```bash
 npm run icons:refresh
 ```

 ---

 ## 8) Launch Playbook — Vercel (Recommended)

 1. Push repo to GitHub.
 2. In Vercel, import the repo.
 3. Add environment variables from section 6.
 4. Deploy once (preview + production).
 5. Add custom domain `salehiyan.com` in Vercel project.
 6. At your registrar DNS panel, add Vercel-required records.
 7. Wait for SSL issuance.
 8. Verify final checks (section 11).

 ### Typical DNS pattern (depends on registrar/Vercel UI)
 - Root (`@`) → A or ALIAS target provided by Vercel.
 - `www` → CNAME to Vercel target.

 Always use exact values shown in Vercel Domain settings.

 ---

 ## 9) Launch Playbook — IONOS Runtime Hosting

 Use this only if your IONOS plan supports Node app runtime.

 1. Create Node-capable app target in IONOS.
 2. Upload/deploy source.
 3. Set env vars from section 6.
 4. Build and start:

 ```bash
 npm ci
 npm run build
 npm run start
 ```

 5. Add/connect `salehiyan.com` to this app target.
 6. Point registrar DNS to IONOS target values.
 7. Enable SSL and validate.

 ---

 ## 10) Launch Playbook — External Domain + IONOS Host

 If `salehiyan.com` is not in IONOS registrar:

 1. Keep domain at current registrar.
 2. In IONOS, prepare destination (runtime app or webspace folder).
 3. In registrar DNS, point records to IONOS targets.
 4. In IONOS, map domain to correct destination.
 5. Validate DNS propagation and SSL.

 This does **not** affect `irsa-us.org` if mapped to a different destination.

 ---

 ## 11) Production Verification Checklist

 After deployment, verify all of these:

 - `https://salehiyan.com` loads correctly.
 - `https://www.salehiyan.com` redirects to canonical host (or vice versa).
 - Contact form submission reaches Formspree dashboard.
 - Key pages render: `/`, `/insights`, `/projects`, `/contact`, `/cv`.
 - Polls route is reachable: `/polls`.
 - Newsletter flow is reachable from `/insights`.
 - Admin routes require proper admin session (e.g., `/admin/operations`).
 - Metadata + social preview tags are present.
 - No console errors on homepage and insight pages.

 ---

 ## 12) Recommended Launch Strategy (Your Case)

 ### Best path now
 - Deploy on **Vercel**.
 - Point `salehiyan.com` DNS to Vercel.
 - Keep `irsa-us.org` unchanged on existing IONOS setup.

 ### Why this path wins
 - Lowest launch risk.
 - Preserves full Next.js compatibility.
 - Fastest to maintain.
 - Easy to scale and maintain all enabled features.

 ---

 ## 13) Repo Structure (High-level)

 - `app/` — routes and page composition
 - `components/` — reusable UI
 - `lib/` — content and utilities
 - `public/` — images, icons, downloadable assets
 - `scripts/` — maintenance/bootstrap utilities
 - `SQL/` — migrations/history
 - `tests/` — automated tests

 ---

 ## 14) Notes for Feature Maintenance

 To keep polls/newsletter/admin healthy:
 - Keep database migrations up to date.
 - Verify auth/session and CSRF configuration.
 - Confirm required env variables before release.
 - Re-run test/build validation before deployment.

 ---

 ## 15) Quick Commands

 ```bash
 # install
 npm ci

 # dev
 npm run dev

 # tests
 npm test

 # production build
 npm run build

 # start production server (runtime hosts)
 npm run start
 ```

 ---

 If you want, I can also add a **one-page “Launch Day Runbook”** section with exact copy/paste DNS entries once you tell me your registrar (Cloudflare, GoDaddy, Namecheap, etc.).
## Quality checks

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Favicon and OSU logo (single source)

- Canonical logo file: `public/brand/osu-system-logo.png`
- The header logo and all favicon/app-icon sizes are generated from that single file.
- After replacing the logo, run:
	- `npm run icons:refresh`

## Core structure

- `app/` - routes, metadata, and page composition
- `components/` - reusable UI building blocks
- `lib/` - content, helpers, and shared configuration
- `public/` - website assets such as images, icons, and downloadable files
- `.github/workflows/` - CI and quality automation

## Analytics

This site now prefers Plausible for lightweight, privacy-aware analytics.

- Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to enable it
- Leave it blank to ship without analytics

## Insights routing

- Canonical article URLs are under `app/insights/*` (e.g. `/insights/machine-learning`).
- Legacy `/blog/*` URLs still work, but canonical metadata points to `/insights/*`.

## Newsletter (double opt-in)

- Run migration: `SQL/migrations/20260408_007_newsletter_subscriptions.sql`
- Configure SMTP env vars for real confirmation emails:
	- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- API routes:
	- `POST /api/newsletter/subscribe`
	- `GET /api/newsletter/confirm?token=...`
- Optional send automation: `npm run newsletter:send` (requires `NEWSLETTER_SUBJECT`, `NEWSLETTER_TEXT`, optional `NEWSLETTER_HTML`).

## Project case-study PDF

- Each project has a downloadable PDF at `/projects/<slug>/case.pdf`.

## Legacy backend notes

The repo still contains optional backend routes, database helpers, and operational scripts from earlier iterations. Those can be used on a server deployment, but they are not required for the public portfolio experience.

## FAQ

**Q: How do I add a new blog post or project?**
A: Add a new file under `app/insights/` (canonical) or `app/projects/` and update the relevant section/component.

**Q: How do I add a new poll or badge?**
A: Use the admin dashboard (if admin) or add via API route (see Backend Handbook).

**Q: How do I reset the admin password?**
A: Use the bootstrap script with a new email, or add a manual DB update (see security notes).

**Q: How do I deploy to Vercel/Render?**
A: Set `NEXT_PUBLIC_SITE_URL`, add any required server env vars, and deploy with `npm run build && npm start`.

---

## Contribution Guidelines

- Use feature branches and PRs for all changes
- Run `npm run check` before pushing
- Add/extend tests for all backend changes
- Never commit secrets or `.env` files
- Use clear, descriptive commit messages

---

## Further Documentation

- See `Backend Engineering Handbook` (below) for all backend, API, and operational details
- See `SQL/migrations/` for schema
- See `app/api/**` for API route code

This file consolidates the full end-to-end website strategy and execution plan (STEP 0–15) into one implementation reference.

---

## STEP 0 — MISSING INPUT CHECK

### What important inputs are missing
- Explicitly declared primary audience (e.g., “recruiters first”)
- Explicit primary goal (job interviews vs consulting leads vs collaborations)
- Explicit differentiator statement in your own words
- Preferred brand vibe and styles to avoid
- Preferred primary and secondary CTA choice
- Must-include and must-exclude section list

### What cannot be personalized yet
- Final hero messaging tuned to one audience
- CTA optimization for one conversion path
- Proof ranking per audience (recruiter vs client vs collaborator)

### What placeholders I must fill
- `[PRIMARY_AUDIENCE]`
- `[PRIMARY_GOAL]`
- `[SECONDARY_GOAL]`
- `[DIFFERENTIATOR]`
- `[PRIMARY_CTA]`
- `[SECONDARY_CTA]`
- `[BRAND_VIBE]`
- `[AVOID_STYLES]`

### What I can still build confidently
- Full website strategy, architecture, section plans, trust logic, CTA system, nav/footer, SEO/accessibility/performance, and anti-bloat rules grounded in current assets

---

## STEP 1 — STRATEGIC FOUNDATION

### Target audience interpretation
- Primary inferred: recruiters/hiring managers and technical collaborators in industrial engineering, reliability, data science, maintenance optimization
- Secondary inferred: readers seeking educational technical content (ML, Integer Programming, Maintenance)

### Primary website objective
- Convert qualified visitors into professional actions: interview/contact/collaboration, using proof-first positioning

### Strongest positioning direction
- Industrial Engineer + Data Scientist with applied maintenance/reliability focus, supported by academic depth (PhD track) and practical project work

### Strongest story the website should tell
- “I build data-driven engineering solutions for reliability and maintenance problems, with both research rigor and real-world implementation.”

### Conversion strategy
- First 10 seconds: who you are + what you do + proof teaser
- Next 30 seconds: flagship projects + trust strip + credentials
- Final action: strong CTA to contact or view full work/CV

---

## STEP 2 — WEBSITE SITEMAP

### Final sitemap
- Home
- Projects (new dedicated page)
- Project Detail Template (reused for each case study)
- Insights (existing technical writing hub; merges current topic pages)
- About (optional short page if homepage about remains condensed)
- Contact
- CV (download + optional web view)
- Legal/Privacy (minimal)

### Homepage vs secondary page logic
- Homepage: decision page (clarity, proof, trust, CTA)
- Secondary pages: depth (case studies, long-form technical content)

### What pages are optional
- About page (optional)
- Insights page (optional only if actively maintained)

### What pages are unnecessary
- Separate top-level pages for Skills, Certifications, Education, Experience
- Multiple fragmented topic landing pages that repeat boilerplate footers/navigation patterns

---

## STEP 3 — FINAL HOMEPAGE ARCHITECTURE

### Section: Strategic Hero
- Purpose: immediate clarity and conversion intent
- Why here: first-screen determines bounce vs engagement
- Content: role statement, core value, 1 proof line, primary + secondary CTA, professional image
- Proof: one strongest credential + one strongest project signal
- CTA: primary + secondary
- Avoid: welcome slogans, long personality paragraphs, icon clutter

### Section: Featured Work (2–3 projects)
- Purpose: prove capability, not claim it
- Why here: proof must come before biography
- Content: project cards with challenge, approach, result, proof metric/artifact
- Proof: outcomes, real company context, technical artifacts
- CTA: “View case study”
- Avoid: responsibility-only descriptions

### Section: Trust Strip
- Purpose: compress credibility
- Why here: reduces skepticism quickly
- Content: top credentials (PhD track, relevant certs, domain focus)
- Proof: highest signal items only
- CTA: none
- Avoid: full cert wall, low-value badges

### Section: Positioning About
- Purpose: explain your unique angle in 4–6 lines
- Why here: context after proof
- Content: domain, strengths, differentiator, current direction
- Proof: one educational/research anchor + one implementation anchor
- CTA: optional “Learn more” / “Contact”
- Avoid: full life-story bio

### Section: Condensed Credentials
- Purpose: credibility completeness
- Why here: supports trust without hijacking narrative
- Content: education timeline summary + selected experience + selected certifications
- Proof: only prestige/relevance
- CTA: “Download CV”
- Avoid: long paragraph cards

### Section: Insights Preview
- Purpose: authority + discoverability
- Why here: useful but secondary to conversion
- Content: 3 strongest insight articles
- Proof: technical depth indicators
- CTA: “Read insights”
- Avoid: generic encyclopedia text snippets

### Section: Contact Conversion Block
- Purpose: remove friction to action
- Why here: closes conversion path
- Content: direct email, LinkedIn, optional form
- Proof: response expectation + professional intent
- CTA: final primary CTA repeat
- Avoid: too many communication channels competing equally

### Section: Clean Footer
- Purpose: utility and trust
- Why here: final support layer
- Content: quick links, email, LinkedIn, copyright, legal
- Proof: none
- CTA: optional mini contact link
- Avoid: social feed noise and repeated blocks

---

## STEP 4 — HERO SECTION

### Hero structure
- Left: headline, subheadline, proof line, CTA row
- Right: professional portrait or contextual work visual

### Headline formula
- `[What you do] for [who] with [proof-backed outcome]`

### 3 headline options
- “Industrial Engineering and Data Science for Reliable, Data-Driven Operations”
- “From Predictive Maintenance Research to Applied Engineering Impact”
- “Building Practical Optimization and Reliability Solutions for Real Systems”

### Subheadline formula
- `[Current role/background] + [domain focus] + [credibility anchor]`

### 3 subheadline options
- “PhD-track Industrial Engineer focused on reliability, stochastic modeling, and decision-focused analytics.”
- “I combine industrial engineering, AI, and optimization to solve maintenance and performance problems.”
- “Academic rigor plus applied project execution across maintenance, optimization, and data science.”

### Primary CTA
- View Projects

### Secondary CTA
- Download CV

### Recommended visual direction
- Clean professional portrait or high-quality engineering context image; dark premium background; no decorative overload

### What to avoid above the fold
- “WELCOME TO MY WORLD”
- long generic soft-skill paragraph
- social icon bars
- certification logos
- multiple competing buttons

---

## STEP 5 — PROJECTS / PORTFOLIO SYSTEM

### Homepage featured project structure
- Card layout: Title → Problem → Your Role → Approach → Result/Proof → CTA

### Ideal project card fields
- Project name
- Context (company/domain)
- Problem statement (1 line)
- What you built/did (1 line)
- Outcome/proof (metric, artifact, decision impact)
- Thumbnail
- View Case Study

### Ideal case study page structure
- Snapshot (title, role, domain, timeline)
- Problem
- Constraints
- Approach (methods/tools)
- Implementation
- Results (quant or concrete outputs)
- Artifacts (code/files/screens)
- Reflection + next steps
- CTA (Contact for collaboration)

### What makes a project strong enough to feature
- Real stakeholder context
- Specific technical method
- Clear outcome or practical output
- Your ownership is explicit

### What project content to exclude
- Pure definitions/tutorials without original work
- Responsibility-only summaries
- Projects without identifiable problem and result

---

## STEP 6 — PROOF / TRUST ARCHITECTURE

### Proof hierarchy from strongest to weakest
1. Outcome-focused project case studies
2. Real organization-linked work experience
3. Research credibility (PhD track + thesis relevance)
4. Technical artifacts (downloadable models/files)
5. Certifications
6. Education history details

### What proof appears early
- 1 flagship project + one high-credibility anchor (PhD track / applied project)

### What proof appears later
- condensed education and certification summaries

### What proof moves to secondary pages
- full education details, full cert details, long technical theory pages

### What proof is weak and should not be emphasized
- generic skill lists
- non-differentiated software icon clusters
- long certification text with no relevance tie

---

## STEP 7 — EXPERIENCE / EDUCATION / CERTIFICATIONS STRATEGY

### What stays on homepage
- compact “Credentials Snapshot” (education + selected roles + selected certs)

### What gets condensed
- all education cards to short timeline bullets
- all cert cards to single-line grouped list
- experience cards to impact summaries

### What moves off homepage
- full role descriptions
- advisor/thesis details (optional deeper page/CV)
- complete certification descriptions

### What should be removed or de-emphasized
- repetitive formatting cards
- content that does not improve trust or conversion

---

## STEP 8 — CTA / CONVERSION SYSTEM

### Best CTA strategy
- Primary: View Projects
- Secondary: Download CV
- Final conversion CTA in contact block: Contact Me

### Visitor flow toward action
- Hero → Featured Work → Trust Strip → Positioning About → Credentials Snapshot → Contact

### CTA placement across the site
- Hero (primary + secondary)
- End of Featured Work
- End of About
- Contact section
- Footer quick link

### Best contact method priority
1. Email
2. LinkedIn
3. Optional contact form

Phone and messaging apps de-emphasized for primary professional conversion.

---

## STEP 9 — NAVIGATION / FOOTER

### Final navbar items
- Home
- Projects
- Insights
- About (optional)
- Contact
- CV

### Items to exclude
- Skills
- Certifications
- Education
- Experience
- Social icons in primary nav

### Footer structure
- Column 1: Name + short role line
- Column 2: Quick links (Projects, Insights, Contact, CV)
- Column 3: Contact (email + LinkedIn)
- Bottom: copyright + legal link

### Footer content priorities
- utility first
- trust and professionalism second
- minimalism always

---

## STEP 10 — CONTENT / MESSAGING DIRECTION

### Tone/voice direction
- precise, concise, technical-but-accessible, proof-led, outcome-led

### Section naming suggestions
- Featured Work
- Proof
- Positioning
- Credentials
- Insights
- Contact

### Messaging formulas
- Hero: `I help [audience] achieve [outcome] through [method], backed by [proof].`
- About: `I’m [role] with focus on [domains], known for [differentiator].`
- Projects: `Problem → Method → Outcome → Evidence.`
- Contact: `If you’re hiring/collaborating on [domain], reach me at [contact].`

### Wording styles to avoid
- generic ambition language
- “passionate about…”
- long broad claims with no evidence
- filler intro slogans

---

## STEP 11 — DESIGN DIRECTION

### Layout direction
- modular grid, high whitespace, deliberate section rhythm, single strong visual language

### Spacing rules
- consistent section spacing scale; remove manual `<br>` spacing hacks

### Hierarchy rules
- H1 clarity > proof > CTA > detail

### Typography behavior
- 2-family system; clear scale; high contrast; restrained bold use

### Card usage guidance
- cards for projects and insights only; credentials as concise list/timeline

### Icon usage guidance
- utility-only icons (contact, metadata); no decorative icon walls

### Animation guidance
- subtle transitions only; avoid heavy scroll-trigger animation dependence

### Mobile-first guidance
- compact hero, visible primary CTA above fold, stacked proof modules, simplified nav drawer

---

## STEP 12 — SEO / ACCESSIBILITY / PERFORMANCE ESSENTIALS

### Must-have SEO setup
- unique title + meta description per page
- semantic heading structure (single H1/page)
- canonical tags
- Open Graph + Twitter cards
- XML sitemap + robots
- clean internal linking between Home/Projects/Insights/Contact

### Must-have accessibility setup
- semantic landmarks (`header/main/nav/footer`)
- alt text quality
- keyboard-accessible nav/menu
- visible focus states
- sufficient contrast
- reduced motion support

### Must-have performance setup
- remove duplicate JS/CSS includes
- defer non-critical scripts
- compress and correctly size images
- minimize render-blocking assets
- avoid loading multiple Bootstrap/jQuery versions together

### Must-have analytics/monitoring setup
- privacy-aware analytics (GA4 or Plausible)
- uptime monitor
- error logging
- basic event tracking (CTA clicks, contact clicks, CV downloads)

### Trust/technical polish checklist
- HTTPS live
- no broken links
- proper favicon and social previews
- consistent contact info
- custom 404 and legal page

---

## STEP 13 — BUILD ORDER

### Define first
- audience priority, primary goal, CTA priority, differentiator sentence

### Write first
- hero copy, project summaries, trust strip, about block, contact copy

### Design first
- homepage wireframe, card system, typography scale, spacing tokens

### Build first
- homepage
- projects index + one case study template
- contact section
- cleaned nav/footer

### Polish later
- insights cleanup
- SEO metadata refinement
- accessibility audit pass
- analytics events

### Postpone
- advanced animations
- extra pages not tied to conversion
- low-signal visual experiments

---

## STEP 14 — ANTI-BLOAT RULES

### What to cut
- long generic intro copy
- repeated spacing hacks
- duplicate library imports
- oversized certification displays

### What to avoid
- resume-dump architecture
- top-heavy nav with low-signal categories
- theory-first homepage sections

### What not to build
- separate pages for skills/certs/experience
- decorative sections with no conversion or trust value
- carousel-heavy testimonial UI without real testimonials

### What usually makes personal websites weaker
- vague messaging
- no proof hierarchy
- too many equal CTAs
- outdated cluttered tech stack
- no clear conversion endpoint

---

## STEP 15 — FINAL DELIVERABLES

### 1) Clean final sitemap
- Home
- Projects
- Project Detail Template
- Insights
- About (optional)
- Contact
- CV
- Legal/Privacy

### 2) Clean final homepage structure
- Strategic Hero
- Featured Work (2–3 projects)
- Trust Strip
- Positioning About
- Condensed Credentials
- Insights Preview
- Contact Conversion Block
- Clean Footer

### 3) Best primary CTA
- View Projects

### 4) Best secondary CTA
- Download CV

### 5) Top 3 proof elements to emphasize
- Outcome-focused project case studies
- Real organization-linked experience (Farandish/Karin context)
- Research credibility + technical artifacts

### 6) Top 5 things to remove or avoid
- Generic welcome messaging
- Long non-proof intro paragraphs
- Resume-like section-heavy nav
- Certification overload on homepage
- Duplicate scripts/libraries

### 7) Top 5 things to build first
- Hero rewrite with proof + CTA
- Projects page + case study template
- Featured work section on homepage
- Trust strip + condensed credentials
- Clean conversion-focused contact block

### 8) One-sentence website strategy
- Lead with high-signal proof of engineering impact, frame it with clear positioning, and drive one focused conversion path within 30–60 seconds.

---

# Backend Engineering Handbook

This section is an archive/reference for the optional server-side features in the repository. It is not required for the default portfolio deployment path.

This section documents how the backend is implemented today, how to run it safely, and how to extend it without breaking authentication, poll integrity, or moderation workflows.

## 1) Backend Stack and Runtime

- Framework: Next.js App Router route handlers under `app/api/**`
- Runtime: Node.js 20+ (aligned with CI workflows)
- Database: PostgreSQL via `pg` connection pool
- Auth: JWT session cookie (`member_session`) + CSRF double-submit token (`csrf_token`)
- Passwords: `bcryptjs` with cost factor 12
- Testing: `vitest`
- CI quality gates: lint, typecheck, tests, build, Lighthouse CI

## 2) Repository Areas (Backend-Relevant)

- API routes: `app/api/**`
- Security/session helpers: `lib/auth.ts`, `lib/member-session.ts`, `lib/csrf.ts`
- Database pool: `lib/db.ts`
- SQL migrations: `SQL/migrations/*.sql`
- Bootstrap utility: `scripts/bootstrap-admin.mjs`
- CI workflows: `.github/workflows/ci.yml`, `.github/workflows/lighthouse.yml`

## 3) Environment Variables

Use `.env.example` as the baseline.

Required:

- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: JWT signing secret
- `BOOTSTRAP_ADMIN_KEY`: one-time protected header key for bootstrap API route

Used by one-command local bootstrap script:

- `BOOTSTRAP_ADMIN_NAME`
- `BOOTSTRAP_ADMIN_EMAIL`
- `BOOTSTRAP_ADMIN_PASSWORD`

Optional analytics:

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

Optional alerting and delivery hardening:

- `ALERT_WEBHOOK_URL`
- `ALERT_WEBHOOK_SECRET`
- `ALERT_RETRY_ATTEMPTS`
- `ALERT_TIMEOUT_MS`
- `ALERT_DEDUP_WINDOW_MS`

Production guidance:

- Set strong random values for `AUTH_SECRET` and `BOOTSTRAP_ADMIN_KEY`.
- Rotate `BOOTSTRAP_ADMIN_KEY` or remove it after first admin creation.
- Keep `.env` out of version control.

## 4) Local Setup and Runbook

1. Install dependencies:

```bash
npm ci
```

2. Create env file:

```bash
cp .env.example .env
```

3. Ensure PostgreSQL exists and `DATABASE_URL` points to it.

4. Run SQL migrations in order:

```bash
psql "$DATABASE_URL" -f "SQL/migrations/20260322_001_poll_phase1.sql"
psql "$DATABASE_URL" -f "SQL/migrations/20260322_002_members_engagement_phase2.sql"
psql "$DATABASE_URL" -f "SQL/migrations/20260323_003_contact_submissions.sql"
psql "$DATABASE_URL" -f "SQL/migrations/20260323_004_client_error_events.sql"
psql "$DATABASE_URL" -f "SQL/migrations/20260323_005_poll_notifications_metadata_gin.sql"
psql "$DATABASE_URL" -f "SQL/migrations/20260323_006_backend_hardening.sql"
```

5. Start dev server:

```bash
npm run dev
```

6. Run quality checks:

```bash
npm run check
```

## 5) Database Schema (Current)

### Phase 1 polling core

From `20260322_001_poll_phase1.sql`:

- `polls`
- `poll_options`
- `poll_targets`
- `poll_topics`
- `poll_ballots`
- `poll_ballot_choices`

Enums:

- `poll_status`: `draft | scheduled | active | closed | archived`
- `poll_visibility`: `public | members`
- `poll_results_visibility`: `public | after_vote | after_close`
- `poll_target_type`: `global | article | topic`

### Phase 2 members and engagement

From `20260322_002_members_engagement_phase2.sql`:

- `members`
- `poll_comments`
- `poll_topic_follows`
- `poll_notifications`
- `poll_badges`
- `member_badges`

Seed content:

- One default poll slug: `next-deep-dive-topic`
- Two default badges: `early-voter`, `top-contributor`

### Phase 3 website operations data

From `20260323_003_contact_submissions.sql` and `20260323_004_client_error_events.sql`:

- `contact_submissions` (contact form persistence)
- `client_error_events` (frontend error telemetry persistence)

From `20260323_005_poll_notifications_metadata_gin.sql`:

- `idx_poll_notifications_metadata_gin` (GIN index for `poll_notifications.metadata`)

From `20260323_006_backend_hardening.sql`:

- `members.session_version` + `members.token_revoked_before` (session revocation/versioning)
- `admin_audit_logs` (structured admin action logs)
- `request_rate_limits` (DB-backed distributed throttling)
- `backend_job_runs` (maintenance job observability)

### JSONB + GIN coverage checklist

- `poll_notifications.metadata` -> `idx_poll_notifications_metadata_gin`
- `client_error_events.metadata` -> `idx_client_error_events_metadata_gin`

## 6) Authentication and Session Model

Core flow:

1. `POST /api/auth/register` or `POST /api/auth/login`
2. Server signs JWT (`issuer: ahmad-portfolio`, expiry: 30d)
3. Server sets:
	 - `member_session` (`httpOnly`, `sameSite=lax`, secure in production)
	 - `csrf_token` (readable cookie for double-submit CSRF)
4. Protected write routes validate `x-csrf-token`/`csrf-token` header equals `csrf_token` cookie.

Session roles:

- `guest`: no valid session
- `member`: authenticated non-admin
- `admin`: authenticated admin

Role extraction is implemented in `lib/member-session.ts` via decoded JWT payload from `lib/auth.ts`.

## 7) CSRF and Write-Route Requirements

`validateCsrf(request)` enforces double-submit protection.

Client requirement for protected POST endpoints:

- Include session cookie (`credentials: "include"` in fetch)
- Send header `x-csrf-token` (or `csrf-token`) with value from `csrf_token` cookie

Routes currently enforcing CSRF include:

- `/api/polls/[pollId]/vote`
- `/api/polls/[pollId]/comments` (POST)
- `/api/polls/comments/[commentId]/moderate`
- `/api/polls/topics/follow`
- `/api/polls/notifications/[id]/read`
- `/api/polls/admin/create`

## 8) API Surface (Current)

### Auth

- `POST /api/auth/register`: create member + login + set cookies
- `POST /api/auth/login`: login + set cookies
- `POST /api/auth/logout`: clear auth cookies
- `POST /api/auth/change-password`: rotate password and revoke old sessions
- `GET /api/auth/me`: return authenticated member payload
- `POST /api/auth/bootstrap-admin`: one-time admin creation protected by `x-bootstrap-key`
- Session hardening: JWT now includes `sessionVersion`; server verifies version/revocation against DB

### Polls and engagement

- `GET /api/polls`: list polls, supports `topic`, `articleSlug`, `scope=active|closed|featured`
- `POST /api/polls/[pollId]/vote`: submit vote (single or multi-choice based on poll rules)
- `GET /api/polls/[pollId]/results`: return results based on poll visibility rules + role
- `GET /api/polls/[pollId]/comments`: approved comments list
- `POST /api/polls/[pollId]/comments`: create pending comment
- `GET /api/polls/comments/pending`: admin queue of pending comments
- `POST /api/polls/comments/[commentId]/moderate`: admin action `approve|reject|hide`
- `GET /api/polls/activity`: member activity (`votes`, `badges`, `notifications`)
- `POST /api/polls/topics/follow`: follow topic
- `POST /api/polls/notifications/[id]/read`: mark notification read
- `POST /api/polls/admin/create`: admin creates poll with options/topics/targets

### Other site APIs

- `POST /api/contact`: anti-spam guarded contact intake + inserts into `contact_submissions`
- `POST /api/client-errors`: client-side error ingest + inserts into `client_error_events`

### Admin operations APIs

- `GET /api/admin/ops/contact`: paginated/filtered contact submissions (admin only)
- `GET /api/admin/ops/client-errors`: paginated/filtered client errors (admin only)
- `POST /api/admin/jobs/run`: run retention/badge maintenance job (admin + CSRF)

## 8.1) Frontend vs Website vs Backend (Responsibility Map)

This map clarifies what code belongs to UI behavior, website pages, and backend infrastructure.

- Frontend UI (what users see/interact with):
	- `components/**` (forms, widgets, sections, cards, nav, language switcher)
	- `app/**/page.tsx` (screen composition and rendering)

- Website layer (routing/content/SEO shell):
	- `app/layout.tsx`, `app/page.tsx`, `app/insights/page.tsx`, blog/project pages
	- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, metadata blocks
	- `public/**` assets used by rendered pages

- Backend core (data/security/business logic):
	- `app/api/**` route handlers
	- `lib/db.ts`, `lib/auth.ts`, `lib/csrf.ts`, `lib/member-session.ts`
	- `SQL/migrations/**` schema source of truth

- How frontend is connected to backend in this website:
	- Contact form UI -> `POST /api/contact` -> `contact_submissions`
	- Error monitor component -> `POST /api/client-errors` -> `client_error_events`
	- Poll widget/admin/auth UIs -> `app/api/polls/**` + `app/api/auth/**` -> poll/member tables

## 9) Admin Bootstrap (Two Safe Paths)

### A) Route-based bootstrap (remote-friendly)

Endpoint:

- `POST /api/auth/bootstrap-admin`

Security conditions:

- `BOOTSTRAP_ADMIN_KEY` must be configured
- request header `x-bootstrap-key` must match
- fails if any existing admin already exists

Example:

```bash
curl -X POST "http://localhost:3000/api/auth/bootstrap-admin" \
	-H "Content-Type: application/json" \
	-H "x-bootstrap-key: $BOOTSTRAP_ADMIN_KEY" \
	-d '{"fullName":"Admin User","email":"admin@example.com","password":"strongPass123"}'
```

### B) Script-based bootstrap (local/operator workflow)

Command:

```bash
npm run admin:bootstrap
```

Required script env vars:

- `DATABASE_URL`
- `BOOTSTRAP_ADMIN_NAME`
- `BOOTSTRAP_ADMIN_EMAIL`
- `BOOTSTRAP_ADMIN_PASSWORD` (minimum 8 chars)

The script is idempotent-safe (aborts if admin already exists or email is taken).

## 10) Security Controls Implemented

### Application-level

- Password hashing (`bcryptjs`, cost 12)
- JWT session signing + issuer validation
- JWT session versioning/revocation validation against DB (`session_version`, `token_revoked_before`)
- Cookie hardening (`httpOnly` session cookie, secure in prod, `sameSite=lax`)
- CSRF double-submit checks on protected POST routes
- Role-based authorization for admin endpoints
- Distributed DB-backed rate limiting on auth/contact/client-error ingestion
- Structured admin audit logs for critical admin actions

### HTTP headers (`next.config.mjs`)

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restricts camera/microphone/geolocation
- `Strict-Transport-Security`
- `Content-Security-Policy` for scripts/styles/images/connect/frame ancestors

### Caching policy

- Long-lived immutable cache for `/_next/static/*` and `/images/*`
- 7-day cache for icons

## 11) CI/CD Quality Gates

### `CI` workflow

File: `.github/workflows/ci.yml`

Runs on push and PR:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build` (with `AUTH_SECRET=test-secret`)

### `Lighthouse` workflow

File: `.github/workflows/lighthouse.yml`

Runs on PR/manual dispatch:

- `npm run build`
- `npm run lighthouse:ci`

Thresholds defined in `lighthouserc.json`:

- Performance >= 0.85
- Accessibility >= 0.90
- Best Practices >= 0.90
- SEO >= 0.90

## 12) Backend Operations Checklist

Before deployment:

- Apply both SQL migrations in order.
- Set `DATABASE_URL`, `AUTH_SECRET`, and bootstrap env vars.
- Run `npm run check` locally or in CI.
- Verify `/api/auth/me` and `/api/polls` return healthy responses.

After first deploy:

- Create first admin (route or script path).
- Remove/rotate `BOOTSTRAP_ADMIN_KEY`.
- Validate admin-only endpoints reject non-admin sessions.
- Validate CSRF-protected POSTs fail without token header.

Recurring operations:

- Run maintenance once: `npm run jobs:run`
- Run maintenance scheduler: `npm run jobs:daemon`
- Confirm rows in `backend_job_runs` and `admin_audit_logs`

Retention env controls:

- `RETENTION_CLIENT_ERRORS_DAYS`
- `RETENTION_CONTACT_SUBMISSIONS_DAYS`
- `RETENTION_NOTIFICATIONS_DAYS`
- `RETENTION_RATE_LIMIT_DAYS`
- `RETENTION_ADMIN_AUDIT_DAYS`
- `RETENTION_BACKEND_JOB_RUNS_DAYS`
- `BACKEND_JOB_INTERVAL_MINUTES`

## 12.1) API Quick Smoke Tests

Run these after `npm run dev` to verify critical auth + polls flow.

```bash
# 1) Register
curl -i -c cookies.txt -X POST "http://localhost:3000/api/auth/register" \
	-H "Content-Type: application/json" \
	-d '{"fullName":"Test User","email":"test.user@example.com","password":"StrongPass123"}'

# 2) Check session
curl -i -b cookies.txt "http://localhost:3000/api/auth/me"

# 3) List active polls
curl -i -b cookies.txt "http://localhost:3000/api/polls?scope=active"
```

To test CSRF-protected POST APIs, extract `csrf_token` from browser cookies and send it as `x-csrf-token` header while keeping session cookies.

```bash
curl -i -b cookies.txt -X POST "http://localhost:3000/api/polls/<poll-id>/vote" \
	-H "Content-Type: application/json" \
	-H "x-csrf-token: <csrf_token_value>" \
	-d '{"optionIds":[1]}'
```

## 13) Extension Guide (How to Add Backend Features)

For each new backend capability:

1. Add SQL migration under `SQL/migrations` (never mutate old migration files).
2. Add/extend API route under `app/api/**`.
3. Enforce auth + CSRF + role checks where relevant.
4. Return consistent JSON shape:
	 - success: `{ ok: true, data: ... }`
	 - failure: `{ ok: false, error: { code, message, details? } }`
4.1 For list endpoints, return pagination contract:
	 - `pagination: { page, pageSize, total, totalPages }`
5. Add tests or update existing tests.
6. Run `npm run check` before merging.

## 13.1) Validation Standard

- Request body validation is centralized with `zod` schemas in `lib/validation.ts`.
- New write endpoints should use `parseBody(request, schema)` and reject invalid payloads with `400`.

## 14) Troubleshooting

- `AUTH_SECRET is not configured`:
	- Set `AUTH_SECRET` in environment and restart server.
- `DATABASE_URL is not configured`:
	- Set valid PostgreSQL URL; confirm DB is reachable.
- `INVALID_CSRF` on POST APIs:
	- Send `x-csrf-token` header matching `csrf_token` cookie and include credentials.
- `ADMIN_ALREADY_EXISTS` during bootstrap:
	- Expected once initial admin is created; use normal auth after that.
- Build failure in CI due to secrets:
	- Keep `AUTH_SECRET` set during build, as in workflow examples.

## 15) Current Backend Maturity Snapshot

Implemented now:

- Auth with secure cookies and role-aware session parsing
- Poll lifecycle APIs (listing, voting, results visibility)
- Community features (comments, moderation, follows, notifications, badges)
- Admin poll creation and one-time admin bootstrap
- Structured admin audit logging and operational admin APIs
- DB-backed distributed rate limiting + webhook alerting for high-severity client errors
- Retention/background maintenance jobs with persisted job-run records
- Security headers, CI gates, and Lighthouse quality checks

Remaining optional enhancements for future iterations:

- Email delivery integration for contact and notification workflows

## 17) Lint Pipeline Readiness

- Added explicit lint config files: `.eslintrc.json`, `.eslintignore`.
- Added pinned lint dev dependencies in `package.json` compatible with `next@14.2.5`.
- `npm run lint` no longer requires interactive setup.

## 18) Backup / Restore / Rollback SOP

Automated backup/maintenance:

- GitHub workflow: `.github/workflows/backend-ops.yml` (hourly schedule + manual dispatch)
- Jobs run command: `npm run jobs:run`
- Backup command: `npm run db:backup`

Backup database:

```bash
pg_dump "$DATABASE_URL" --format=custom --file=backup_$(date +%F_%H%M%S).dump
```

Restore backup:

```bash
pg_restore --clean --if-exists --no-owner --dbname="$DATABASE_URL" backup_file.dump
```

Schema-only safety backup before migration:

```bash
pg_dump "$DATABASE_URL" --schema-only --file=schema_before_migration.sql
```

Rollback guidance:

- If a migration causes issues, restore from latest backup.
- For additive migrations, prefer forward-fix migrations over editing old files.
- Record migration/rollback activity in deployment logs.

## 16) Known Operational Notes

- `contact` and `client-errors` APIs persist data in PostgreSQL and also log to server output.
- Bootstrap admin creation is intentionally one-time; once an admin exists, the bootstrap API rejects additional creations.
- Build/runtime requires `AUTH_SECRET` to be set; CI currently injects `AUTH_SECRET=test-secret` for build validation only.
