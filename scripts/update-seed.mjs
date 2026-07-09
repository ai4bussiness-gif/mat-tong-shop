import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const mapping = JSON.parse(readFileSync(resolve(__dirname, '../cloudinary-mapping.json'), 'utf-8'));
let seedContent = readFileSync(resolve(__dirname, '../prisma/seed.ts'), 'utf-8');

// Build a map: key -> gen_remove URL
const keyMap = {};
for (const item of mapping) {
  keyMap[item.key] = item.genRemoveUrl.replace(/\?_a=[^&]*/, '');
}

// Find ALL key-value pairs (any URL, not just nidhiratna)
const pairs = seedContent.match(/(\w+):\s*'([^']+)'/g);
if (!pairs) process.exit(1);

let replaced = 0;
for (const pair of pairs) {
  const m = pair.match(/(\w+):\s*'([^']+)'/);
  if (!m) continue;
  const key = m[1];
  const url = m[2];
  
  // Skip non-IMG keys and already-replaced URLs
  if (key === 'prisma' || key === 'PrismaClient') continue;
  if (!url.includes('nidhiratna.com')) continue;
  
  // Find this key in the mapping
  if (keyMap[key]) {
    seedContent = seedContent.replace(url, keyMap[key]);
    replaced++;
    console.log(`  ✅ ${key}`);
  } else {
    // Key not in mapping directly. Find which mapped key has the same base URL.
    const baseUrl = url.split('?')[0];
    for (const [mappedKey, cloudUrl] of Object.entries(keyMap)) {
      // This mapped key's original URL was used to upload.
      // Find it in the seed content
      const mappedPair = seedContent.match(new RegExp(`${mappedKey}:\\s*'([^']+)'`));
      if (!mappedPair) continue;
      const mappedCurrentUrl = mappedPair[1];
      // The mapped key might already have been replaced with Cloudinary URL
      // Check if original had same base
      if (mappedCurrentUrl.split('?')[0] === baseUrl || 
          (!mappedCurrentUrl.includes('nidhiratna.com') && mappedCurrentUrl !== url)) {
        // Same base, use same Cloudinary URL
        seedContent = seedContent.replace(url, cloudUrl);
        replaced++;
        console.log(`  ✅ ${key} → using ${mappedKey}'s URL`);
        break;
      }
    }
  }
}

writeFileSync(resolve(__dirname, '../prisma/seed.ts'), seedContent);
const remaining = (seedContent.match(/nidhiratna\.com/g) || []).length;
console.log(`\n✅ Replaced: ${replaced}`);
console.log(`Remaining 'nidhiratna.com' refs: ${remaining}`);
