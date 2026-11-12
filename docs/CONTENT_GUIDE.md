# Content guide

All text on the site lives in four data files. Edit the data file, not the page components.

| What | File |
| --- | --- |
| Name, headline, links, experience, education, skills, teaching, service, leadership, awards, news, contact text | `lib/content.ts` |
| Research statement, themes, publications, talks, dissertation, job market paper | `lib/research.ts` |
| Project pages and the "Earlier work" list | `lib/projects.ts` |
| Writing (articles and drafts) | `lib/articles.ts` |

Rule: an empty field is not rendered. Nothing on the site shows a placeholder. To turn an element on, fill its field.

## Add a photo to a conference talk

Each talk in `lib/research.ts` has an optional `image` field. The photo appears next to the talk on `/publications#talks`. Talks without a photo look the same as before.

1. Put the photo in `public/images/talks/`. Use a JPG or WebP, about 1200 px wide. Example: `public/images/talks/informs-2026.jpg`.
2. Find the talk in the `talks` list in `lib/research.ts` and add the `image` field:

```ts
{
  id: "informs-2026",
  title: "Hierarchical Decision-Making for Condition-Based Maintenance of Large-Scale Fleets with Shared Resources",
  meeting: "INFORMS Annual Meeting",
  sortDate: "2026-11-01",
  displayDate: "Nov 1, 2026",
  type: "Talk",
  note: "Session SA20",
  image: {
    src: "/images/talks/informs-2026.jpg",
    alt: "Ahmad Salehiyan presenting at the INFORMS 2026 Annual Meeting",
    width: 1200,
    height: 800,
  },
},
```

`width` and `height` are the real pixel size of the file. `alt` is one sentence that describes the photo. Talk ids: `informs-2026`, `informs-2025`, `iise-2025`, `rams-2025`, `informs-2024`, `osu-symposium-2024`.

The same entry also accepts `city` (for example `"Atlanta, GA"`) and `slides` (a PDF path under `/files/`).

## Fill the items that wait for owner input

| Item | Where | Field |
| --- | --- | --- |
| ORCID iD | `lib/content.ts` | `person.orcid`, as a full URL (`https://orcid.org/0000-...`) |
| GitHub link (after two public repos exist) | `lib/content.ts` | `person.github` |
| Industry resume PDF | put the file in `public/files/`, then `lib/content.ts` | `documents.industryResume`, for example `"/files/Ahmad-Salehiyan-Resume.pdf"` |
| Journals reviewed for | `lib/content.ts` | `service.journals`, one string per journal |
| Teaching approach points | `lib/content.ts` | `teaching.approach`, two to four strings |
| More awards | `lib/content.ts` | `awards` |
| News | `lib/content.ts` | `news`, newest items sort first by `sortDate` |
| INFORMS 2026 city and slides | `lib/research.ts` | `city` and `slides` on the `informs-2026` talk |
| More published papers | `lib/research.ts` | add to `publications` with `group: "journal"` or `"conference"` |
| Code links | `lib/research.ts` | `code` on a publication; `lib/projects.ts` `links` on a project |

The ORCID, GitHub, and resume links appear in the header, hero, footer, `/cv`, `/contact`, and JSON-LD as soon as the field is filled.

## Publish a draft article

Draft articles in `lib/articles.ts` have `draft: true`. A draft is not listed on `/insights`, is not in the sitemap, and has a `noindex` tag. You can still open it by URL to review it. To publish, delete the `draft: true` line.

## After any content change

Update `lastUpdated` at the top of `lib/content.ts`. It feeds the footer, the privacy page, and the sitemap.

Run `npm run check`, `npm run build`, and `npm run seo:audit` before you push. The SEO audit needs Chrome installed; set `CHROME_PATH` if it is not detected automatically.

The audit checks every sitemap page with JavaScript disabled, unique titles and descriptions, canonicals, author markup, structured data, image accessibility, social previews, internal links and anchors, mobile and desktop overflow, crawler access, draft exclusions, legacy redirects, and real 404 responses. CI runs it after the production build and saves `.next/seo-audit.json` as an artifact. To audit production against the current build's route manifest, run `npm run seo:audit -- --url https://www.salehiyan.com`.

Published articles automatically get a 1200 × 630 sharing image at `/insights/[slug]/share-image`, built from their title, author, domain, and hero image. Check the generated card when adding an article, especially if its title is long. Draft articles do not generate public sharing images.

The separate Lighthouse workflow runs on pull requests and production pushes. Its seven representative pages must score 100/100 for Lighthouse SEO; other Lighthouse categories remain advisory. These checks measure technical eligibility, not search rankings or AI citations. Maintain accurate researcher profiles, original research content, and publication links as well.
