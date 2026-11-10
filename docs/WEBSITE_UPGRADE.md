# Website upgrade prompt (job market)

## Your role and goal

You are a senior web engineer and academic-career editor. You have full access to the repository for my personal website, https://www.salehiyan.com (Next.js App Router, deployed on Vercel, Vercel Web Analytics, contact form via Formspree, CV served at /files/Ahmad-Salehiyan-CV.pdf).

I am Ahmad Salehiyan, a senior Ph.D. student in Industrial Engineering and Management at Oklahoma State University (OSU), advisor Dr. Akash Deep. I am entering the job market for three kinds of roles: postdoc, assistant professor, and industry data scientist / operations research scientist. I am available full time from June 2027 and willing to relocate anywhere in the U.S.

Goal: turn the site into a 10/10 job-market website that works for both an academic hiring committee and an industry recruiter. Each audience must find what it needs within two clicks. You must complete every task ID in PART 3 (there are 76). Do not skip, merge away, or silently drop any ID.

## How you must work

1. Save this prompt in the repo as `docs/WEBSITE_UPGRADE.md`. Re-read it whenever you lose context.
2. Before any edit, build a task list with every task ID from PART 3. Keep it updated.
3. Work on a new branch `job-market-upgrade`. Commit after each phase with a clear message.
4. Phase 1 is discovery. Find where content lives (data files, components, MDX, constants). Run the build. Record a Lighthouse and axe baseline for `/`, `/projects`, and one project page. Report what you found before you change content.
5. Change content in its data source, not by hardcoding copies in several components.
6. Keep every existing URL working. If you remove or rename a page, add a permanent (301) redirect in `next.config` to the closest new page.
7. In the pull request description, list every block of text you removed, word for word, so I can restore it.
8. Open a pull request and test on the Vercel preview URL. Do NOT merge to production. Stop and send me the preview URL, the final report (PART 5), and the list of open questions.

## Truth rules (most important)

- Never invent facts: no papers, dates, numbers, venues, awards, journal names, course evaluations, skills, or results. Use only PART 0, PART 1, the current site, the CV PDF, and paper PDFs I provide.
- If a PART 0 field is blank, leave that element off the live site. Never ship visible placeholder text like "TBD" or "[confirm]". Mark the task "Blocked: owner input" in the final report.
- A paper counts as "published" only if it has a journal or proceedings volume or a DOI. Submitted, under review, under revision, and preprint items go in separate groups.
- Skill levels must stay honest. Apache Spark/PySpark is coursework level. I have trained transformer models, but I have not built LLM applications. Do not imply otherwise.
- If the site, the CV, and PART 0 disagree on a fact, do not pick one. List the conflict in the final report.

## Writing rules for every word you add or touch

- Plain academic English. Short sentences. Active voice. First person is fine.
- No em dashes (U+2014) anywhere in visible text. Use a period, colon, or comma. For number ranges in prose, write "3.0% to 15.4%".
- Banned words: notably, leverage/leverages, robust, comprehensive, seamless, cutting-edge, delve, unlock, empower, passionate, journey, world-class, synergy, game-changer, "in today's fast-paced world".
- No hidden Unicode characters (zero-width spaces, non-breaking spaces in text, BOM, U+2028/U+2029).
- No consulting or sales language ("your operational challenge", "I will respond with a practical next-step framework", "short advisory engagements").
- The B.S. institution is always written "Azad University, Qazvin". Never "Islamic Azad".

---

## PART 0: Owner facts (I fill these in before running)

If a field is blank, follow the truth rules above.

```
P0-1  Full list of PUBLISHED papers (authors, title, venue, volume/issue/pages, year, DOI, open PDF link if allowed):
      (The site shows 3: CMC 2026, Future Internet 2025, IISE 2025 proceedings. My record says 5. List all.)
P0-2  Current status of "Deviation-Informed Maintenance Planning" (submitted / under review / major revision / accepted) and journal name:
P0-3  Current status of HierPick ("A Hierarchical Deep Q-Learning Approach for Picker Routing in Two-Block Warehouses"): SSRN only / submitted to IJPE / other. Show the journal name publicly? (yes/no; it is under double-anonymized review)
P0-4  Did my proposal defense (Oct 19, 2026) pass? (yes/no). If yes, my title is "Ph.D. Candidate".
P0-5  Expected Ph.D. completion term to show (Spring 2027 / Summer 2027):
P0-6  Journals I have peer reviewed for (names and number of reviews):
P0-7  ORCID iD:
P0-8  Job market paper (choose one title):
P0-9  INFORMS 2026 talk: city and venue; may the slides PDF be public? (yes/no; file path)
P0-10 Missing talk titles: RAMS 2025 talk title: ; INFORMS 2024 (Seattle) talk title:
P0-11 Other awards, fellowships, travel grants (name, year):
P0-12 Industry resume PDF path (1 to 2 pages). If blank, draft one from the CV for my review only; do not publish it.
P0-13 Code I approve for public GitHub repos (project name, local path, license). Default license MIT.
P0-14 Teaching: 2 to 4 short points about how I teach, and any evaluation numbers I allow to show:
P0-15 Approve publishing the dissertation summary drafted in PART 1? (yes/no/edit):
P0-16 Headline to use everywhere (default: "Ph.D. Candidate | Reinforcement Learning and Optimization for Decision-Making Under Uncertainty"):
P0-17 Recent dated news items to show (date, one line each):
```

## PART 1: Verified facts you may use

- Name: Ahmad Salehiyan. Email: ahmad@salehiyan.com.
- Ph.D., Industrial Engineering and Management, Oklahoma State University, started Fall 2023. Advisor: Dr. Akash Deep. Dissertation proposal title: "Sequential Decision-Making Under Uncertainty in Smart Engineering Systems."
- M.S., Applied Statistics, Oklahoma State University, expected Fall 2026 (concurrent).
- M.S., Industrial Engineering, K. N. Toosi University of Technology, Tehran, 2019 to 2022. Thesis: "Predictive Maintenance of Advanced Industrial Machines Using AI Techniques." Advisor: Dr. Abdollah Aghaie.
- B.S., Industrial Engineering, Azad University, Qazvin, 2014 to 2019.
- Available full time from June 2027. Open to relocation anywhere in the U.S.
- Links: Google Scholar https://scholar.google.com/citations?user=_-hRiskAAAAJ ; LinkedIn https://www.linkedin.com/in/ahmad-salehiyan ; GitHub https://github.com/ahmadsalehiyan (currently 0 public repos; see task G1 to G6).
- Teaching to show (2026 only): ENGR 1412 Introductory Engineering Computer Programming, Spring 2026 and Fall 2026 (weekly Excel assignments, grading, help sessions for lab sections); Engineering Economics help sessions, Summer 2026, 50 students. Do not list the 2025 courses.
- Dissertation research (draft summary, publish only if P0-15 is yes): Multi-agent fleet maintenance. A two-phase hybrid safe multi-agent reinforcement learning (Safe-MARL) approach: soft constraints during exploration, hard constraints for enforcement, applied to maintenance scheduling for heterogeneous fleets. It studies the trade-off between safety and learning in decentralized MARL. Simulation stack: PettingZoo/Gymnasium, Ray RLlib with MAPPO. Longer-term direction: heterogeneous MARL with the resilience guarantees of fault-tolerant control and the constraint guarantees of safe RL; task allocation, resilient coordination, autonomous robotic systems. Do not claim results for this work.
- INFORMS 2026 Annual Meeting talk: "Hierarchical Decision-Making for Condition-Based Maintenance of Large-Scale Fleets with Shared Resources," Sunday, November 1, 2026, session SA20.
- Award: 3rd Place, OSU Student Research Symposium 2024 (poster).
- Leadership: President, Iranian Student Association (IRSA) at OSU (second year as of Fall 2026). Co-founder and executive, ISA-Alliance (national network of Iranian student associations).
- Tools I actually use (add where missing): PyTorch, Ray RLlib, MAPPO, PettingZoo, Gymnasium, DQN/DDQN, MDP/POMDP, Hawkes processes, R, SAS, Python, SQL/PostgreSQL, HPC cluster, GPU training, Pyomo, GAMS, Julia, Git, LaTeX.
- Project numbers already on the site may be reused exactly as written there (for example HierPick: 3.0% to 15.4% shorter total travel distance than S-shape and largest-gap heuristics; MIMIC-IV: 179,524 adult patients, 628 association rules with confidence above 50%). Any new number must come from a paper PDF I provide.

---

## PART 2: Target structure

Main navigation (desktop and mobile): Research, Publications, Projects, Teaching, Writing, CV, Contact.

Home page order:
1. Hero: name, headline (P0-16), one-sentence research summary, job-market banner, photo, two buttons ("Academic CV", "Industry Resume") and one text link ("Publications").
2. Research themes (3 cards) with a link to /research.
3. Job market paper highlight.
4. Selected publications (published first) with a link to /publications.
5. Featured projects (4 cards) with a link to /projects.
6. Teaching summary.
7. Talks (latest 3) and News (latest 3 to 5 dated items).
8. Awards, Service and Leadership.
9. Experience and Education (short).
10. Skills (grouped, see K1).
11. Contact.

Dedicated pages: /research (new), /publications (new), /projects, /projects/[slug], /teaching (new), /insights (labeled "Writing" in nav; keep the URL), /cv (CV and resume), /contact, /legal/privacy, custom 404.

Keep the existing home anchors (#about, #experience, #education, #skills, #publications, #contact) working.

---

## PART 3: Tasks (complete every ID)

### Hero and positioning
- H1. Add a job-market banner in the hero: "On the 2026 to 2027 job market for postdoc, faculty, and industry research roles. Available June 2027."
- H2. Use "Ph.D. Candidate" everywhere if P0-4 is yes. Otherwise keep "Ph.D. Student".
- H3. Use one headline (P0-16) in the header subtitle, hero, page title, meta description, Open Graph, and JSON-LD. Remove "Industrial Engineer" as the header subtitle.
- H4. Remove the "Best skill on: Python, GAMS, Power BI, Excel" block from the hero.
- H5. Reduce the hero to two buttons and one text link (see PART 2). Remove "Explore My Approach" and "Contact Me" buttons from the hero.
- H6. Remove the label "Welcome to my world" and any other template eyebrow labels.

### Research (academic market)
- R1. Create /research with: a 120 to 180 word research statement, 3 themes (1. sequential decision-making for maintenance under partial observability: POMDP and fleet MARL; 2. reinforcement learning for logistics: warehouse picker routing; 3. machine learning for health data and industrial security: EHR analysis, transformer-based intrusion detection), each linking to its papers and project pages, and a short "Future research agenda" paragraph built only from PART 1.
- R2. Add the dissertation work (if P0-15 is yes) as a research theme and as a project page `/projects/multi-agent-fleet-maintenance`.
- R3. Add a "Job market paper" block (P0-8): title, authors, status, 3 to 4 sentence plain abstract from the paper, one figure, links.
- R4. Add a "Research summary" short version (2 sentences) to the home About section and keep the long version on /research.

### Publications
- PB1. Group publications: Journal articles, Conference proceedings, Under review / revision, Preprints. Fill from P0-1, P0-2, P0-3. Bold my name in author lists.
- PB2. Every item gets links where they exist: DOI, PDF (only if open access or allowed), preprint, code, slides. Use small labeled buttons ("DOI", "PDF", "Code", "Slides").
- PB3. Add ORCID (P0-7) and Google Scholar links at the top of /publications and in the footer.
- PB4. Add a "Talks" list with title, meeting, city, date, type: include INFORMS 2026 (PART 1 and P0-9), fill the missing titles from P0-10, link slides where allowed.
- PB5. Create /publications as a full page and keep a short "Selected publications" list on the home page.
- PB6. Add a "Cite" (BibTeX) copy button for each published item. Generate BibTeX only from P0-1 data.

### Projects
- P1. Add "Projects" to the main navigation and home page.
- P2. Fix /projects so the project list is rendered on the server. The raw HTML from `curl https://<preview>/projects` must contain every project title (today it shows "Loading projects...").
- P3. Rebuild each project page with this order: result first (one line with the key number), problem, method, a figure or diagram (from the paper or a clean SVG you draw from the method description), tech stack, my role, links (paper, preprint, code, slides). Add descriptive alt text to each figure.
- P4. Keep 4 to 5 strong projects (MIMIC-IV disease clusters, transformer intrusion detection, HierPick routing, multi-sensor POMDP maintenance, and the dissertation if R2 applies). Merge or remove "Maintenance Reporting System", "Integer Programming for Planning Decisions", and "Machine Learning for Maintenance and Decision Support" (or move them to a short "Earlier work" list). Add 301 redirects for any removed URL.
- P5. Remove the "View legacy archive" link to "/Machin%20learning/index.html" and remove or redirect that legacy folder.
- P6. For the MIMIC-IV project, state that code is shared but data is not, as required by the PhysioNet data use agreement. Never publish patient-level data or derived patient-level outputs.

### Teaching, service, leadership, awards
- T1. Create /teaching and a home teaching summary: 2026 courses only (PART 1), my role in each, number of students where known, and the teaching points from P0-14. Remove the 2025 course list from the Experience entry.
- S1. Add a "Service" section: peer reviewer for the journals in P0-6.
- S2. Add a "Leadership" section: IRSA president and ISA-Alliance co-founder and executive (PART 1), one line each on what I did, only from facts I provide.
- S3. Add an "Awards" section: 3rd Place, OSU Student Research Symposium 2024, plus P0-11.
- S4. Add a "News" list with dated items from P0-17 and verified events in PART 1 (for example the INFORMS 2026 talk). Newest first. Show the latest 3 to 5 on the home page.

### Industry market
- I1. Put two clearly labeled downloads on /cv, in the hero, and in the nav dropdown: "Academic CV (PDF)" and "Industry Resume (PDF)" (P0-12). Track both downloads as Vercel Analytics custom events.
- I2. On /cv, add a one-paragraph summary for recruiters: target roles, core methods, availability, relocation.
- I3. Add a short "What I bring to an industry team" block (4 bullets max) on the home page or /cv, built only from verified projects and skills, each bullet linking to evidence.

### Skills
- K1. Replace the skills section with these groups, in this order: Reinforcement learning and sequential decisions (DQN/DDQN, MAPPO, MDP/POMDP, value and policy iteration, Ray RLlib, PettingZoo, Gymnasium); Machine learning and deep learning (PyTorch, transformers, GANs, autoencoders, scikit-learn, anomaly detection, clustering, t-SNE, association rule mining); Optimization (mixed-integer and linear programming, Benders and Lagrangian decomposition, Monte Carlo simulation, Pyomo, GAMS); Statistics (R, SAS, experimental design, statistical inference, Hawkes processes); Data and compute (Python, SQL/PostgreSQL, Apache Spark/PySpark at coursework level, HPC cluster, GPU training, Git, LaTeX, Julia); Visualization (Power BI, Tableau, Excel).
- K2. Remove jQuery, Primavera P6, Anaconda, and ICDL from skills.
- K3. Rename "Research tools and existing tools" if any of that group remains.

### Content cleanup
- Q1. Remove the template labels "BEST SKILL ON", "EDUCATION QUALITY", "PROFESSIONAL SKILLS", "PROFESSIONAL CERTIFICATIONS" and replace them with plain section titles.
- Q2. Remove the duplicated "Latest Technical Insights" section. Keep one Writing section.
- Q3. Remove the Certifications section. If you keep anything, keep one line under Education: "Additional training: ISO 9001:2015 Quality Management Systems." Ask me before keeping more.
- Q4. Change "Islamic Azad University, Qazvin" to "Azad University, Qazvin" everywhere, including metadata and JSON-LD.
- Q5. Fix "Python (NumPy, SciPy, pandas, PyTorch, Gym)" to say Gymnasium.
- Q6. Make all dates consistent in one format (for example "Aug 2023 to present"). Check every date against the CV and report mismatches.
- Q7. Proofread every page against the writing rules. Run the grep checks in PART 4.

### Writing (insights)
- W1. Fix the read-time label: compute it as words / 220, rounded up. The machine-learning article is about 540 words but says "14 min read".
- W2. Edit the 3 existing articles: remove em dashes and banned words, remove consulting language, add 3 to 6 real references with links (only sources you have opened and confirmed), and add a "Related research" box linking to my matching paper and project.
- W3. Draft 2 new posts from my own papers (for example, design lessons from the hierarchical DDQN picker-routing agent; why multi-sensor POMDP policies use control limits). Use only content from the paper PDFs. Mark them as drafts (not listed, `noindex`) until I approve.
- W4. Rename the nav label from "Insights" to "Writing". Keep the /insights URLs.

### Contact and privacy
- C1. Rewrite the contact page heading and text for a researcher on the job market. Example heading: "Get in touch". Example text: "I am open to postdoc, faculty, and industry research positions, and to research collaboration. Email is the best way to reach me."
- C2. Delete the FAQPage JSON-LD on /contact (the "short advisory engagements" content).
- C3. Rewrite the home contact text "Share your reliability, maintenance, or analytics challenge and I will respond with a practical next-step framework." to match C1.
- C4. Remove the WhatsApp link (it exposes my personal phone number) and the Telegram link. Keep email, LinkedIn, Google Scholar, ORCID, and GitHub (GitHub only if G1 to G6 are done).
- C5. Update /legal/privacy to state accurately, based on the vendors' own documentation, that the site uses Vercel Web Analytics and that the contact form sends messages through Formspree. Add a "Last updated" date.
- C6. Keep the contact form working. Add a honeypot field against spam, a visible success and error message, and labels on every field.

### GitHub (industry credibility)
- G1. Create a GitHub profile README (repo `ahmadsalehiyan/ahmadsalehiyan`) with headline, research areas, links to the website, Scholar, and ORCID, and pinned project list. Show it to me before publishing.
- G2. For each project approved in P0-13, create a public repo with: README (problem, method, results figure, how to run, citation), requirements file, license, clean folder layout, no data files, no secrets, no absolute local paths.
- G3. HierPick is under double-anonymized review. Do not publish its code under my name until the review ends. If I need a code link for reviewers, use an anonymized repository service, and keep the public repo private until acceptance.
- G4. MIMIC-IV code: code only. No data, no patient-level outputs. Add a README note on credentialed PhysioNet access.
- G5. Pin up to 6 repos on the profile. Link each repo from its project page and publication entry.
- G6. If no repo is ready, remove the GitHub link from the site and footer until at least 2 repos exist, and list this as blocked.

### Search and metadata
- SEO1. Add Person JSON-LD on the home page: name, jobTitle (headline), email, url, image, affiliation (Oklahoma State University), alumniOf (K. N. Toosi University of Technology; Azad University, Qazvin), knowsAbout (main research topics), sameAs (Google Scholar, LinkedIn, ORCID, and GitHub if G6 does not apply).
- SEO2. Add WebSite JSON-LD on the home page and BreadcrumbList JSON-LD on all subpages.
- SEO3. Add ScholarlyArticle JSON-LD for each publication on /publications (headline, author list, datePublished, publisher or isPartOf, DOI as identifier and sameAs).
- SEO4. Give every page a unique title (under 60 characters, includes "Ahmad Salehiyan") and a unique meta description (under 155 characters).
- SEO5. Replace the Open Graph image. Today /images/first.png is a 1568 x 2698 portrait of about 4.3 MB, but the tags declare 1200 x 630. Create a 1200 x 630 card (name, headline, OSU, photo) under 300 KB, set correct width, height, and alt text. Use it as the default for every page.
- SEO6. Fix the canonical on /legal/privacy (it points to the home page). Every page must have a self-referencing canonical with the www host.
- SEO7. Fix the 404 page: title "Page not found | Ahmad Salehiyan", HTTP status 404, links to Home, Research, Publications, Contact.
- SEO8. Make sitemap.xml list every public page (including /research, /publications, /teaching, new project pages) and exclude drafts, redirects, and removed pages.
- SEO9. Keep robots.txt pointing to the sitemap. Add `noindex` to draft pages.
- SEO10. Google Search Console: if you have access, verify the domain and submit the sitemap. If not, add the step to my owner checklist with exact instructions.

### Layout, accessibility, performance
- UX1. Fix the header overlap at about 800 px width (the name "Salehiyan" runs into the "Welcome" nav item). Use a hamburger menu below the width where the full nav fits.
- UX2. Check every page at 360, 390, 768, 800, 1024, 1280, and 1440 px wide: no overlap, no horizontal scroll, readable font sizes, tap targets at least 44 x 44 px.
- UX3. Add a footer with: email, Scholar, ORCID, LinkedIn, GitHub (per G6), "Last updated" date, and copyright.
- A11Y1. Add a "Skip to main content" link, visible keyboard focus styles, and correct heading order (one h1 per page, no skipped levels).
- A11Y2. Meet WCAG 2.2 AA color contrast for all text, including the orange labels on the dark background.
- A11Y3. Respect `prefers-reduced-motion` for all animations.
- A11Y4. Every link and button must make sense out of context (no bare "Read Article" without the title in its accessible name).
- PERF1. Serve all images through next/image with correct `sizes`, modern formats, and lazy loading below the fold. Compress the hero photo.
- PERF2. Fonts: use `display: swap` and preload only the fonts used above the fold.
- PERF3. Add basic security headers in `next.config` (Content-Security-Policy compatible with Vercel Analytics and Formspree, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). Confirm nothing breaks.

---

## PART 4: Verification (run all, on the Vercel preview URL)

1. `npm run build` and `npm run lint` pass with zero errors. Type check passes.
2. Lighthouse (mobile) on /, /research, /publications, /projects, one project page, /cv: Accessibility 100, Best Practices 100, SEO 100, Performance at least 95 (explain anything below).
3. `npx @axe-core/cli` on the same pages: 0 violations.
4. `npx linkinator <preview-url> --recurse`: 0 broken internal or external links.
5. Paste the JSON-LD from each page type into https://validator.schema.org: 0 errors. Run Google's Rich Results Test on the home page.
6. `curl -s <preview-url>/projects` contains every project title (server rendering check).
7. OG image check: 1200 x 630 and under 300 KB. Preview the link in a social card validator.
8. Responsive screenshots (Playwright) at the 7 widths in UX2 for /, /publications, /projects: no overlap, no horizontal scroll. Attach them to the PR.
9. Text checks over all source and content files, each must return nothing:
   - `grep -rnP '\x{2014}' <content and component dirs>` (em dash)
   - `grep -rnP '[\x{200B}\x{200D}\x{FEFF}\x{2028}\x{2029}]' <dirs>` (hidden characters; U+200C is allowed only inside Persian text)
   - `grep -rniE 'notably|leverag|robust|comprehensive|seamless|cutting-edge|delve|unlock|empower|passionate|world-class|synergy' <dirs>`
   - `grep -rn 'Islamic Azad' .`
   - `grep -rniE 'wa\.me|t\.me|whatsapp|telegram' <dirs>`
   - `grep -rn 'Machin%20learning' .`
10. 404 check: `curl -I <preview-url>/does-not-exist` returns 404 with the new title.
11. Every redirect from P4 and P5 returns 301 to a live page.
12. Contact form: send a test message and confirm success and error states.
13. Keyboard-only walkthrough of the home page and nav menu at mobile width.

## PART 5: Final report (required format)

Send me:
1. The preview URL and the PR link.
2. A table with every task ID from PART 3 (all 76 rows): ID, status (Done / Blocked: owner input / Not done, with reason), files changed, how you verified it.
3. The results of every PART 4 check, with numbers.
4. Every fact conflict you found between the site, the CV, and PART 0.
5. All text you removed, word for word.
6. An owner checklist for things outside the repo: Search Console (if not done), update the LinkedIn headline to match P0-16, update the Google Scholar profile (affiliation, homepage link to salehiyan.com, verified email), create or update ORCID with the same links, review the GitHub README and repos, approve draft posts (W3), approve the dissertation summary (R2), merge to production.

Do not report the task as finished while any row is missing from the table.