import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const iconPath = path.join(
    process.cwd(),
    "public",
    "favicon-32.png",
  );

  const iconBytes = await readFile(iconPath);

  return new Response(iconBytes, {
    headers: {
      // Many browsers (incl. Safari) accept PNG bytes at /favicon.ico.
      "Content-Type": "image/png",
      // Avoid sticky caching while iterating on icons.
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
