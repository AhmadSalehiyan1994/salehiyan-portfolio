import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();

const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
]);

function shouldExcludeDir(dirName) {
  return EXCLUDED_DIRS.has(dirName);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (shouldExcludeDir(entry.name)) continue;
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function buildIconBlock(indent) {
  const lines = [
    `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />`,
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />`,
    `<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />`,
    `<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />`,
    `<link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/apple-touch-icon.png" />`,
  ];

  return lines.map((l) => `${indent}${l}`).join("\n");
}

function guessIndent(html) {
  const headCloseMatch = html.match(/\n([\t ]*)<\/head>/i);
  if (headCloseMatch?.[1] != null) return headCloseMatch[1];
  const anyLinkMatch = html.match(/\n([\t ]*)<link\b/i);
  if (anyLinkMatch?.[1] != null) return anyLinkMatch[1];
  return "  ";
}

function normalizeFavicons(html) {
  // Remove existing favicon/touch icon tags.
  // Covers rel="icon", rel="shortcut icon", rel="apple-touch-icon" (any attribute order).
  const tagRegex = /\n?[\t ]*<link\b[^>]*\brel=(?:"|')?(?:icon|shortcut icon|apple-touch-icon)(?:"|')?[^>]*>\s*/gi;
  const withoutExisting = html.replace(tagRegex, "\n");

  const indent = guessIndent(withoutExisting);
  const block = buildIconBlock(indent);

  if (/<\/head>/i.test(withoutExisting)) {
    return withoutExisting.replace(/\n([\t ]*)<\/head>/i, `\n${block}\n$1</head>`);
  }

  // If no </head>, just prepend the block.
  return `${block}\n${withoutExisting}`;
}

async function main() {
  const htmlFiles = await walk(projectRoot);

  let changed = 0;
  for (const filePath of htmlFiles) {
    const before = await fs.readFile(filePath, "utf8");
    const after = normalizeFavicons(before);
    if (after !== before) {
      await fs.writeFile(filePath, after, "utf8");
      changed += 1;
    }
  }

  console.log(`Normalized favicons in ${changed} HTML file(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
