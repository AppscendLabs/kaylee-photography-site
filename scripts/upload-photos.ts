import { config } from "dotenv";
config({ path: ".env.local" });

import { put } from "@vercel/blob";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const PHOTOS_DIR = "C:/Users/Tyler/Downloads/kaysphotos";

async function main() {
  const files = readdirSync(PHOTOS_DIR).filter((f) =>
    /\.(jpe?g|png|webp)$/i.test(f)
  );

  console.log(`Uploading ${files.length} photos...\n`);

  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = join(PHOTOS_DIR, file);
    const buffer = readFileSync(filePath);
    const blob = new Blob([buffer], { type: "image/jpeg" });

    const { url } = await put(`photos/${file}`, blob, {
      access: "public",
      addRandomSuffix: false,
    });

    urls.push(url);
    console.log(`[${i + 1}/${files.length}] ${file}`);
    console.log(`  → ${url}`);
  }

  console.log("\n✅ Upload complete. Copy these URLs into lib/constants.ts:\n");
  console.log(JSON.stringify(urls, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
