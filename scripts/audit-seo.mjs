import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";
import puppeteer from "puppeteer-core";
import { Launcher } from "chrome-launcher";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const urlArg = process.argv.indexOf("--url");
const base = urlArg < 0 ? "http://127.0.0.1:3237" : process.argv[urlArg + 1]?.replace(/\/$/, "");
assert(base && /^https?:\/\//.test(base), "Use --url with a complete website URL.");
const canonical = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.salehiyan.com").replace(/\/$/, "");
const failures = [];
const report = { base, pages: [], internalLinks: 0, drafts: [], failures };
const check = (condition, message) => { if (!condition) failures.push(message); };
let server;
let browser;
let serverLog = "";

async function get(path, options = {}) {
  return fetch(new URL(path, base), { signal: AbortSignal.timeout(30000), ...options });
}

// Use longest matching path rules, including specific user-agent groups.
function crawlerAllows(text, bot, path) {
  const groups = [];
  let group = { agents: [], rules: [] };
  for (const line of text.split(/\r?\n/)) {
    const [field, ...rest] = line.split("#")[0].split(":");
    const value = rest.join(":").trim();
    if (field.trim().toLowerCase() === "user-agent") {
      if (group.rules.length) { groups.push(group); group = { agents: [], rules: [] }; }
      group.agents.push(value.toLowerCase());
    } else if (["allow", "disallow"].includes(field.trim().toLowerCase()) && value) {
      group.rules.push({ path: value, allow: field.trim().toLowerCase() === "allow" });
    }
  }
  groups.push(group);
  const matches = groups.map((item) => ({ ...item, specificity: Math.max(-1, ...item.agents.map((agent) => agent === "*" ? 0 : bot.toLowerCase().includes(agent) ? agent.length : -1)) }));
  const specificity = Math.max(...matches.map((item) => item.specificity));
  const rules = matches.filter((item) => item.specificity === specificity).flatMap((item) => item.rules).filter((rule) => path.startsWith(rule.path));
  rules.sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow));
  return !rules.length || rules[0].allow;
}

try {
  if (urlArg < 0) {
    server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", "3237"], { stdio: ["ignore", "pipe", "pipe"] });
    for (const stream of [server.stdout, server.stderr]) stream.on("data", (data) => { serverLog = (serverLog + data).slice(-4000); });
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (server.exitCode !== null) throw new Error(`Server stopped: ${serverLog}`);
      try { if ((await get("/robots.txt")).ok) { ready = true; break; } } catch { /* server is starting */ }
      await delay(200);
    }
    assert(ready, `Server did not start: ${serverLog}`);
  }

  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.status, 200, "Sitemap must return 200.");
  const sitemapText = await sitemap.text();
  const locations = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace(/&amp;/g, "&"));
  assert(locations.length, "Sitemap must contain public URLs.");
  check(new Set(locations).size === locations.length, "Sitemap contains duplicate URLs.");
  for (const location of locations) check(new URL(location).origin === canonical, `Wrong sitemap host: ${location}`);
  const paths = locations.map((location) => new URL(location).pathname);
  const chrome = process.env.CHROME_PATH || Launcher.getInstallations()[0];
  assert(chrome, "Install Chrome or set CHROME_PATH to run the SEO audit.");
  browser = await puppeteer.launch({ executablePath: chrome, headless: "new", args: ["--no-first-run", "--no-default-browser-check"] });
  const page = await browser.newPage();
  // A crawler must receive useful content even without JavaScript execution.
  await page.setJavaScriptEnabled(false);
  const titles = new Set();
  const descriptions = new Set();
  const links = new Set();
  const ids = new Map();
  const images = new Set();

  for (const path of paths) {
    try {
      const response = await page.goto(base + path, { waitUntil: "networkidle0", timeout: 30000 });
      check(response.status() === 200, `${path}: expected HTTP 200, got ${response.status()}.`);
      const data = await page.evaluate(() => {
        const meta = (name) => document.head.querySelector(`meta[name="${name}"],meta[property="${name}"]`)?.content || "";
        return {
          title: document.title, description: meta("description"), canonical: document.querySelector('link[rel="canonical"]')?.href,
          robots: meta("robots"), googlebot: meta("googlebot"), ogImage: meta("og:image"), twitterImage: meta("twitter:image"),
          ogAlt: meta("og:image:alt"), twitterAlt: meta("twitter:image:alt"), h1: document.querySelectorAll("h1").length,
          lang: document.documentElement.lang, viewport: meta("viewport"), author: Boolean(document.querySelector('a[rel="author"]')),
          json: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((script) => { const data = JSON.parse(script.textContent); return Array.isArray(data) ? data : [data]; }),
          ids: [...document.querySelectorAll("[id]")].map((element) => element.id), links: [...document.querySelectorAll("a[href]")].map((link) => link.href),
          missingAlt: [...document.images].some((image) => !image.hasAttribute("alt")),
        };
      });
      check(data.title.includes("Ahmad Salehiyan") && data.title.length <= 60, `${path}: missing name or overlong title.`);
      check(!titles.has(data.title), `${path}: duplicate title.`); titles.add(data.title);
      check(data.description.length >= 50 && data.description.length <= 160, `${path}: missing or overlong description.`);
      check(!descriptions.has(data.description), `${path}: duplicate description.`); descriptions.add(data.description);
      check(data.canonical === new URL(path, canonical).href, `${path}: incorrect canonical.`);
      check(!/noindex/.test(data.robots + data.googlebot), `${path}: public page is noindex.`);
      check(data.googlebot.includes("max-image-preview:large"), `${path}: large image previews disabled.`);
      check(data.h1 === 1 && data.lang && data.viewport.includes("width=device-width"), `${path}: heading, language, or viewport missing.`);
      check(!data.missingAlt, `${path}: an image is missing its alt attribute.`);
      check(data.ogImage && data.ogImage === data.twitterImage && data.ogAlt && data.twitterAlt, `${path}: inconsistent or inaccessible social preview.`);
      check(data.json.length > 0, `${path}: missing structured data.`);
      if (path === "/") check(data.json.some((item) => item["@type"] === "ProfilePage" && item.mainEntity?.["@type"] === "Person"), "Homepage must identify its author with ProfilePage/Person.");
      if (path.startsWith("/insights/")) {
        const article = data.json.find((item) => item["@type"] === "Article");
        check(data.author && article?.author?.name === "Ahmad Salehiyan", `${path}: article authorship missing.`);
        check([article?.image].flat().includes(data.ogImage), `${path}: article schema and preview image disagree.`);
      }
      ids.set(path, new Set(data.ids)); images.add(data.ogImage);
      for (const href of data.links) {
        const link = new URL(href);
        if ([canonical, new URL(base).origin].includes(link.origin)) links.add(link.pathname + link.search + link.hash);
      }
      for (const width of [390, 1440]) {
        await page.setViewport({ width, height: 900 });
        check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path}: horizontal overflow at ${width}px.`);
      }
      report.pages.push({ path, title: data.title, titleLength: data.title.length, descriptionLength: data.description.length, structuredData: data.json.map((item) => item["@type"]) });
    } catch (error) { failures.push(`${path}: ${error.message}`); }
  }

  for (const href of links) {
    const link = new URL(href, base);
    const response = await get(link.pathname + link.search, { redirect: "manual" });
    check(response.status === 200, `Broken or redirected internal link: ${href} (${response.status}).`);
    if (link.hash && ids.has(link.pathname)) check(ids.get(link.pathname).has(decodeURIComponent(link.hash.slice(1))), `Missing link target: ${href}.`);
  }
  report.internalLinks = links.size;
  for (const image of images) {
    const response = await get(new URL(image).pathname);
    check(response.ok && response.headers.get("content-type")?.startsWith("image/"), `Social image is not accessible: ${image}.`);
    if (response.ok) {
      const metadata = await sharp(Buffer.from(await response.arrayBuffer())).metadata();
      check(metadata.width >= 1200 && metadata.height >= 630, `Social image is too small: ${image} (${metadata.width}x${metadata.height}).`);
    }
  }
  const manifest = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"));
  for (const path of Object.keys(manifest.routes).filter((path) => path.startsWith("/insights/") && !path.endsWith("/share-image") && !paths.includes(path))) {
    await page.goto(base + path, { waitUntil: "domcontentloaded" });
    check(await page.evaluate(() => document.querySelector('meta[name="robots"]')?.content.includes("noindex")), `Unlisted article must be noindex: ${path}.`);
    report.drafts.push(path);
  }
  const robots = await (await get("/robots.txt")).text();
  for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot", "PerplexityBot", "Claude-SearchBot"]) {
    for (const path of paths) check(crawlerAllows(robots, bot, path), `${bot} blocked from ${path}.`);
    for (const path of ["/admin/operations", "/api/contact", "/polls"]) check(!crawlerAllows(robots, bot, path), `${bot}: disabled route unexpectedly crawlable: ${path}.`);
  }
  for (const [path, destination] of [["/index.html", "/"], ["/cv_file/AhmadSalehiyan_CV.pdf", "/cv"], ["/blog/machine-learning", "/insights/machine-learning"]]) {
    const response = await get(path, { redirect: "manual" });
    check(response.status === 301 && response.headers.get("location") === destination, `Legacy redirect failed: ${path}.`);
  }
  const missing = await get("/seo-audit-missing-page");
  check(missing.status === 404, "Unknown URLs must return 404, not a soft 404.");
  const cv = await get("/files/Ahmad-Salehiyan-CV.pdf");
  check(cv.ok && cv.headers.get("x-robots-tag") === "noindex", "CV download/indexing policy regressed.");
} catch (error) { failures.push(error.message); }
finally {
  await browser?.close();
  server?.kill("SIGTERM");
  await writeFile(".next/seo-audit.json", JSON.stringify(report, null, 2));
}

console.log(`SEO audit: ${report.pages.length} public pages, ${report.internalLinks} internal links, ${report.drafts.length} draft exclusions, ${failures.length} failures.`);
for (const failure of failures) console.error(`- ${failure}`);
if (failures.length) process.exitCode = 1;
