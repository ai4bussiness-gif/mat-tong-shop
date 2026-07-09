import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let seedContent = readFileSync(resolve(__dirname, '../prisma/seed.ts'), 'utf-8');

const baseUrl = 'https://res.cloudinary.com/zgl5avbd/image/upload/e_gen_remove:prompt_Nidhiratna/mat-tong/';

// Find ALL Cloudinary URLs in seed.ts (not just in IMG constant)
const allCloudinaryUrls = seedContent.match(/https:\/\/res\.cloudinary\.com\/zgl5avbd[^'")\s]+/g) || [];
console.log(`Found ${allCloudinaryUrls.length} Cloudinary URLs in file`);

let fixed = 0;
for (const oldUrl of allCloudinaryUrls) {
  // Extract the key from the URL
  const keyMatch = oldUrl.match(/mat-tong\/(\w+)/);
  if (!keyMatch) {
    console.log(`  ⏭️ Could not extract key from: ${oldUrl.slice(0, 80)}`);
    continue;
  }
  const key = keyMatch[1];
  
  // Determine extension
  let ext = '.jpg';
  if (key === 'thangka' || key === 'thangkaImg') ext = '.png';
  if (key === 'promo-video') ext = '.mp4';
  
  // Build the correct URL (no version, single e_, with extension)
  const resourcePrefix = key === 'promo-video' ? 'video/upload' : 'image/upload';
  const correctUrl = `https://res.cloudinary.com/zgl5avbd/${resourcePrefix}/e_gen_remove:prompt_Nidhiratna/mat-tong/${key}${ext}`;
  
  if (oldUrl !== correctUrl) {
    seedContent = seedContent.replace(oldUrl, correctUrl);
    fixed++;
  }
}

writeFileSync(resolve(__dirname, '../prisma/seed.ts'), seedContent);

// Verify
const remainingWrong = (seedContent.match(/e_e_gen_remove|\/v1\/mat-tong|\?_a=/g) || []).length;
console.log(`✅ Fixed ${fixed} URLs`);
console.log(`Remaining wrong-format URLs: ${remainingWrong}`);

// Final check
const cloudinaryRefs = (seedContent.match(/res\.cloudinary\.com\/zgl5avbd/g) || []).length;
const nidhiratnaRefs = (seedContent.match(/nidhiratna\.com/g) || []).length;
console.log(`Cloudinary refs: ${cloudinaryRefs}, nidhiratna.com refs: ${nidhiratnaRefs}`);
