import { readFile } from "node:fs/promises";

// This public ownership proof permits submissions only for this website.
const site = new URL("https://www.salehiyan.com");
const key = (await readFile(new URL("../public/indexnow-key.txt", import.meta.url), "utf8")).trim();
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error("Invalid IndexNow ownership key.");

const response = await fetch(new URL("/sitemap.xml", site), { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`Sitemap returned HTTP ${response.status}.`);
const xml = await response.text();
const urlList = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((match) => match[1].trim().replace(/&amp;/g, "&"));
if (!urlList.length || urlList.length > 10000) throw new Error("Sitemap URL count is outside IndexNow limits.");
if (urlList.some((url) => new URL(url).origin !== site.origin)) throw new Error("Sitemap contains a different website.");

if (process.argv.includes("--dry-run")) {
  console.log(`Validated ${urlList.length} public sitemap URLs. No submission sent.`);
} else {
  const keyLocation = new URL("/indexnow-key.txt", site).href;
  const proof = await fetch(keyLocation, { signal: AbortSignal.timeout(30000) });
  if (!proof.ok || (await proof.text()).trim() !== key) throw new Error("Deploy the matching ownership file before submitting.");
  const result = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: site.host, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(30000),
  });
  if (result.status !== 200 && result.status !== 202) throw new Error(`IndexNow returned HTTP ${result.status}: ${await result.text()}`);
  console.log(`IndexNow received ${urlList.length} URLs (HTTP ${result.status}).${result.status === 202 ? " Ownership validation is pending." : ""} Indexing is not guaranteed.`);
}
