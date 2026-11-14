// HTTP-only audit: verifies what crawlers receive without executing client JavaScript.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base = (process.argv[2] || 'http://localhost:3237').replace(/\/$/, '');
const canonical = 'https://www.salehiyan.com';
const get = (path, opts) => fetch(new URL(path, base), { signal: AbortSignal.timeout(30000), ...opts });
const xml = await (await get('/sitemap.xml')).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert(paths.length >= 17);
const titles = new Set(), descriptions = new Set(), report = { base, checkedAt: new Date().toISOString(), pages: [], redirects: [], bots: [] };
for (const path of paths) {
  const r = await get(path); assert.equal(r.status, 200, path);
  const html = await r.text();
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const url = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `Missing/duplicate title: ${path}`); titles.add(title);
  assert(description && !descriptions.has(description), `Missing/duplicate description: ${path}`); descriptions.add(description);
  assert.equal(url?.replace(/\/$/, ''), (canonical+path).replace(/\/$/, ''), `Canonical: ${path}`);
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, `h1: ${path}`);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `Noindex: ${path}`);
  const structured = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));
  assert(structured.length, `Schema: ${path}`);
  if (['multi-agent-fleet-maintenance','multi-sensor-pomdp-maintenance','hierarchical-ddqn-warehouse-routing'].some(s=>path.endsWith(s))) {
    for (const heading of ['How the approach works','Scope and limitations','Research questions, explained','Related research']) assert(html.includes(heading), `${heading}: ${path}`);
  }
  report.pages.push({path,status:r.status,title,canonical:url,jsonLdBlocks:structured.length});
}
for (const [path,destination] of [['/index.html','/'],['/cv_file/AhmadSalehiyan_CV.pdf','/cv']]) {
 const r=await get(path,{redirect:'manual'});assert([301,308].includes(r.status));assert.equal(new URL(r.headers.get('location'),base).pathname,destination);report.redirects.push({path,status:r.status,destination});
}
const pdf=await get('/files/Ahmad-Salehiyan-CV.pdf');assert.equal(pdf.status,200);assert(pdf.headers.get('content-type')?.includes('pdf'));assert(pdf.headers.get('x-robots-tag')?.includes('noindex'));
assert.equal((await get('/this-page-must-not-exist-seo-check')).status,404);
const robots=await (await get('/robots.txt')).text();
for(const bot of ['Googlebot','Bingbot','OAI-SearchBot','PerplexityBot','Claude-SearchBot']) {
 assert(robots.includes(bot));const r=await get('/research',{headers:{'User-Agent':bot}});assert.equal(r.status,200);report.bots.push({bot,status:r.status});
}
await writeFile('.next/search-content-audit.json',JSON.stringify(report,null,2));
console.log(`PASS: ${paths.length} server-rendered pages, unique metadata, canonical URLs, JSON-LD, research content, legacy redirects, CV, 404, and five crawler user agents.`);
