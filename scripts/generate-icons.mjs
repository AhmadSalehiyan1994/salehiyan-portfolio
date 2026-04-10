import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const srcPath = path.join(
  projectRoot,
  "public",
  "brand",
  "osu-system-logo.png",
);

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function makeSquarePng({ outPath, size, insetRatio = 0.86 }) {
  const inset = Math.max(1, Math.round(size * insetRatio));

  const resized = sharp(srcPath).resize(inset, inset, {
    fit: "inside",
    withoutEnlargement: true,
  });

  const { data, info } = await resized.png().toBuffer({ resolveWithObject: true });

  const left = Math.floor((size - info.width) / 2);
  const top = Math.floor((size - info.height) / 2);

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: data, left, top }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);
}

async function main() {
  if (!(await fileExists(srcPath))) {
    console.error(`Missing source image: ${srcPath}`);
    process.exit(1);
  }

  const outputs = [
    { out: path.join(projectRoot, "public", "favicon-16.png"), size: 16 },
    { out: path.join(projectRoot, "public", "favicon-32.png"), size: 32 },
    { out: path.join(projectRoot, "public", "favicon-48.png"), size: 48 },
    { out: path.join(projectRoot, "public", "favicon-64.png"), size: 64 },
    // Back-compat: some pages/tools may still reference /favicon.png.
    { out: path.join(projectRoot, "public", "favicon.png"), size: 64 },
    { out: path.join(projectRoot, "public", "icon.png"), size: 512 },
    { out: path.join(projectRoot, "public", "apple-touch-icon.png"), size: 180 },
    { out: path.join(projectRoot, "public", "apple-icon.png"), size: 180 },
    { out: path.join(projectRoot, "public", "manifest-icon-192.png"), size: 192 },
    { out: path.join(projectRoot, "public", "manifest-icon-512.png"), size: 512 },
  ];

  for (const { out, size } of outputs) {
    await fs.mkdir(path.dirname(out), { recursive: true });
    await makeSquarePng({ outPath: out, size });
  }

  console.log("Generated icons:");
  for (const { out, size } of outputs) {
    console.log(`- ${path.relative(projectRoot, out)} (${size}x${size})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
