# Search and AI visibility monitoring

Use `queries.json` as the fixed comparison set. Review on December 12, 2026, then every 28 days. This is a review plan, not an installed scheduled automation.

## Google

In the verified salehiyan.com Search Console property, select Performance > Search results. Compare the latest complete 28 days against the preceding 28 days. Keep search type, country, and device consistent. Export Queries and Pages, including clicks, impressions, CTR, and average position. Record exact-name queries separately from broad topic queries. An average position is not a universal rank; privacy filtering can omit low-volume queries.

Inspect changed research pages after publication. Record index status, last crawl, user-declared canonical, and Google-selected canonical. A successful sitemap or indexing request does not prove that a URL was indexed or moved up in ranking.

## AI services

Run the four fixed prompts in fresh conversations on each available service, with search enabled when supported. Record the service/model/date and cited URLs. Separate correct mentions from direct citations. Keep a copy of each answer and flag incorrect affiliation, publication status, dates, or results. No baseline is invented for services that have not been tested.

## Technical checks

Run `npm run seo:content-audit -- https://www.salehiyan.com` after a release. It checks crawler-visible HTML, metadata, canonical URLs, JSON-LD, three research explanations, redirects, the downloadable CV, 404 status, and crawler user agents. The report is `.next/search-content-audit.json`. This HTTP check does not simulate crawler IP reputation or measure rankings. Existing CI provides additional rendering and Lighthouse checks.

## Profile text ready for account updates

Name: Ahmad Salehiyan

Headline: Ph.D. Candidate at Oklahoma State University | Reinforcement Learning & Optimization

Website: https://www.salehiyan.com

Biography: I am a Ph.D. Candidate in Industrial Engineering and Management at Oklahoma State University. I develop reinforcement learning and optimization methods for sequential decisions under uncertainty, with applications in maintenance planning, warehouse logistics, and health data. My work includes POMDP models for condition-based maintenance, hierarchical deep Q-learning for picker routing, and ongoing multi-agent fleet maintenance research.

Use the existing ORCID https://orcid.org/0009-0009-2877-8715. Keep Google Scholar and LinkedIn linked to the same site. GitHub account verified on November 14; account-profile update pending: https://github.com/AhmadSalehiyan1994.

## Academic links and public research artifacts

For a university/lab biography or conference speaker profile, use the name, affiliation, biography, and URL above. Ask the profile editor to link the name to the website only when the profile accurately represents the work. No outreach message has been sent by this task.

Only publish research code that is actually available and permitted to share. Include a README with paper citation, environment versions, data-access requirements, a small reproducible example, experiment configuration, and limitations. Do not upload private patient data or invent a code repository for an unpublished method. Link accepted papers to publisher/DOI records, preprints to their actual repository, and manuscripts in preparation to a clearly labeled project page.

The owner confirmed on November 14 that they do not own asalehiyan.com. Its DNS/redirect cannot be repaired from this project. If an obsolete URL is still visible in Google, use Google's Refresh Outdated Content process for that exact URL; this does not transfer domain ownership or improve rank by itself.
