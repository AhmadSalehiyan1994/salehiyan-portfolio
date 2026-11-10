# Search visibility

## Website changes, November 10, 2026

- Descriptive titles identify Ahmad Salehiyan and his reinforcement learning and optimization research.
- The homepage uses ProfilePage and Person structured data with the same author identity as articles and projects.
- Articles have visible author links, references, publication/update dates, and matching article-specific social images.
- Project pages describe the work with CreativeWork structured data and link to the corresponding publication entries. Journal schema includes volume/issue data and available open-access PDF links.
- Public pages permit indexing, full text snippets, and large image previews. Draft articles remain unlisted, excluded from the sitemap, and noindex for both general crawlers and Googlebot.
- Robots rules permit public content for Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, and Claude-SearchBot, with the same exclusions for disabled/admin/API routes. Search access does not require changing model-training preferences.
- `/index.html` redirects permanently to the homepage. `/cv_file/` URLs, including the old CV path appearing in search results, redirect permanently to `/cv`.
- The public `salehiyan-portfolio.vercel.app` alias redirects permanently to the custom domain. Branch preview hosts are unaffected by that exact-host rule.
- The existing academic CV PDF stays downloadable but is noindex, so search results can favor the maintained HTML CV page. This does not remove or rewrite information inside the PDF.
- The sitemap uses each article's actual update date.
- Google and Bing verification meta-tag support is available through `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` in Vercel. These are public verification codes, not account passwords.

## Google Search Console

The owner completed DNS domain verification for `salehiyan.com` on November 10, 2026. The sitemap at `https://www.salehiyan.com/sitemap.xml` was submitted and Search Console reported **Success**, with **17 discovered pages**. Discovery is not the same as indexing or ranking.

Use the domain property in [Search Console](https://search.google.com/search-console?resource_id=sc-domain%3Asalehiyan.com). Review Performance, Pages, and Core Web Vitals after Google finishes processing the new property. Use URL Inspection for the homepage, research page, and publications page when substantive changes are published. Request indexing only when needed; repeated requests do not guarantee faster inclusion.

## IndexNow

`public/indexnow-key.txt` is a public website ownership proof. After deployment, submit the public sitemap URLs to participating search engines with:

```sh
npm run seo:submit -- --dry-run
npm run seo:submit
```

The script checks that the deployed ownership file matches, submits only this site's sitemap URLs, and accepts only HTTP 200 or 202 responses. A receipt confirms submission, not indexing. Do not repeatedly submit unchanged URLs. Bing Webmaster Tools can be connected separately for monitoring; the IndexNow submission does not establish a Bing dashboard account.

## What to measure

Start with searches for `Ahmad Salehiyan`, `Ahmad Salehiyan reinforcement learning`, `Ahmad Salehiyan POMDP`, and the exact paper titles. Review impressions, clicks, query relevance, indexing, and referrals over time. A short set of real research queries is more useful than broad promises about ranking first for "machine learning".

Keep university, Google Scholar, LinkedIn, and future ORCID profiles consistent with the website. Obtain legitimate links through those profiles and published work; do not buy links or fabricate mentions. Add an ORCID link only after the owner supplies the correct iD. Publish substantial explanations from approved research when they are ready, with references and clear distinctions between published findings and ongoing work.

The downloadable CV still needs the separate content corrections identified in the earlier publication report. Neither hidden draft post was published by this SEO update.

## Guidance followed

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [OpenAI: search crawler documentation](https://developers.openai.com/api/docs/bots)
- [Perplexity: crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Anthropic: crawler documentation](https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [IndexNow: protocol and response codes](https://www.indexnow.org/documentation)

There is no guaranteed number-one position or guaranteed AI citation. Google says its normal search requirements apply to AI features and does not require special AI text files or special AI schema.
