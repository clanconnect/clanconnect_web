/**
 * Generates lib/generated/image-manifest.json: a map of every image under
 * public/ to its intrinsic [width, height].
 *
 * Why this exists: `next/image` needs intrinsic dimensions to reserve layout
 * space and build a srcset, and it can only infer them from *static imports*.
 * This codebase keeps ~700 image paths as plain strings in data/data.jsx and as
 * module-level consts, so a static import rewrite is impractical. Measuring the
 * files at build time gives next/image the same information without touching
 * the data layer.
 *
 * Runs from `prebuild`/`predev`, so it works on Vercel's Linux builders as well
 * as locally. Output is sorted for a stable diff.
 */
import { readdir, stat, writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_FILE = path.join(ROOT, "lib", "generated", "image-manifest.json");

const EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

async function measure(file) {
  const { width, height } = await sharp(file).metadata();
  if (!width || !height) return null;
  return [width, height];
}

async function main() {
  if (!existsSync(PUBLIC_DIR)) {
    console.warn("[image-manifest] no public/ directory; skipping");
    return;
  }

  const files = await walk(PUBLIC_DIR);
  const manifest = {};
  const failures = [];

  // Bounded concurrency: sharp opens a file descriptor per call and this walks
  // over a thousand files.
  const queue = [...files];
  const workers = Array.from({ length: 16 }, async () => {
    for (let file = queue.pop(); file; file = queue.pop()) {
      // Key by public-relative URL path, which is exactly what `src` looks like
      // in the components ("/assets/images/foo.jpg").
      const key = "/" + path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
      try {
        const dims = await measure(file);
        if (dims) manifest[key] = dims;
        else failures.push(key);
      } catch {
        failures.push(key);
      }
    }
  });
  await Promise.all(workers);

  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  const json = JSON.stringify(sorted);

  // Avoid rewriting (and busting the dev-server module graph) when unchanged.
  const previous = existsSync(OUT_FILE) ? await readFile(OUT_FILE, "utf8") : null;
  if (previous !== json) {
    await mkdir(path.dirname(OUT_FILE), { recursive: true });
    await writeFile(OUT_FILE, json);
  }

  const bytes = Buffer.byteLength(json);
  console.log(
    `[image-manifest] ${Object.keys(sorted).length} images measured (${(bytes / 1024).toFixed(1)} kB)` +
      (failures.length ? `, ${failures.length} unreadable` : "")
  );
  if (failures.length) console.warn("[image-manifest] unreadable:", failures.slice(0, 10).join(", "));
}

await main();
