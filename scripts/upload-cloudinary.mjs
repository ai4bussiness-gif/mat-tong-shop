import cloudinary from 'cloudinary';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

cloudinary.v2.config({
  cloud_name: 'zgl5avbd',
  api_key: '338483815376689',
  api_secret: 'fytK3pHWvMeAwB-e6Vvf-kBSGAE',
});

const seedContent = readFileSync(resolve(__dirname, '../prisma/seed.ts'), 'utf-8');
const urlRegex = /(\w+):\s*'(https:\/\/nidhiratna\.com[^']+)'/g;
const imgUrls = [];
let match;
while ((match = urlRegex.exec(seedContent)) !== null) {
  if (!['prisma', 'PrismaClient'].includes(match[1])) {
    const cleanUrl = match[2].split('?')[0];
    imgUrls.push({ key: match[1], url: cleanUrl });
  }
}

// Deduplicate by URL
const seen = new Set();
const unique = [];
for (const item of imgUrls) {
  if (!seen.has(item.url)) {
    seen.add(item.url);
    unique.push(item);
  }
}

console.log(`Uploading ${unique.length} unique images...\n`);

async function uploadImage(item) {
  const publicId = `mat-tong/${item.key}`;
  try {
    const result = await cloudinary.v2.uploader.upload(item.url, {
      public_id: publicId,
      overwrite: false, // don't re-upload if exists
    });
    // Generate the gen_remove URL
    const genRemoveUrl = cloudinary.v2.url(publicId, {
      effect: "e_gen_remove:prompt_Nidhiratna",
      secure: true,
    });
    return { key: item.key, success: true, url: result.secure_url, genRemoveUrl };
  } catch (err) {
    return { key: item.key, success: false, error: err.message };
  }
}

async function main() {
  const results = [];
  const batchSize = 3;
  
  for (let i = 0; i < unique.length; i += batchSize) {
    const batch = unique.slice(i, i + batchSize);
    console.log(`Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(unique.length/batchSize)}...`);
    const batchResults = await Promise.all(batch.map(uploadImage));
    results.push(...batchResults);
    for (const r of batchResults) {
      if (r.success) {
        console.log(`  ✅ ${r.key}`);
      } else {
        console.log(`  ❌ ${r.key}: ${r.error}`);
      }
    }
  }

  const mapping = results.filter(r => r.success).map(r => ({
    key: r.key,
    cloudinaryUrl: r.url,
    genRemoveUrl: r.genRemoveUrl,
  }));
  
  writeFileSync(
    resolve(__dirname, '../cloudinary-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  
  const succeeded = results.filter(r => r.success).length;
  console.log(`\n✅ Done! ${succeeded}/${unique.length} uploaded`);
  console.log(`📄 Mapping saved to cloudinary-mapping.json`);
}

main().catch(console.error);
