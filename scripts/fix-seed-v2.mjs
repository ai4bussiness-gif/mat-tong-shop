import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const seedContent = readFileSync(resolve(process.cwd(), 'prisma/seed.ts'), 'utf-8');

const lines = seedContent.split('\n');
const fixedLines = [];
let fixes = 0;

for (const line of lines) {
  // Match: KEY: 'https://res.cloudinary.com/...'
  const m = line.match(/^(\s*)(\w+):\s*'(https:\/\/res\.cloudinary\.com\/zgl5avbd\/[^']+)',?$/);
  if (m) {
    const indent = m[1];
    const key = m[2];
    const url = m[3];
    
    if (key === 'prisma' || key === 'PrismaClient') {
      fixedLines.push(line);
      continue;
    }
    
    // USE THE KEY from the IMG constant, NOT from URL
    const ext = (key === 'thangka' || key === 'thangkaImg') ? '.png' : '.jpg';
    const correctUrl = `https://res.cloudinary.com/zgl5avbd/image/upload/e_gen_remove:prompt_Nidhiratna/mat-tong/${key}${ext}`;
    
    if (url !== correctUrl) {
      // Check if the URL already has the correct path (just wrong format)
      const urlKey = url.match(/mat-tong\/(\w+)/)?.[1];
      if (urlKey !== key) {
        console.log(`  ❌ ${key}: URL has wrong key '${urlKey}' => correcting to '${key}'`);
      }
      fixedLines.push(`${indent}${key}: '${correctUrl}',`);
      fixes++;
    } else {
      fixedLines.push(line);
    }
  } else {
    fixedLines.push(line);
  }
}

writeFileSync(resolve(process.cwd(), 'prisma/seed.ts'), fixedLines.join('\n'));
console.log(`\n✅ Fixed ${fixes} URLs`);

// Verify
const finalContent = readFileSync(resolve(process.cwd(), 'prisma/seed.ts'), 'utf-8');
const wrongFormat = (finalContent.match(/e_e_gen_remove|\/v1\/mat-tong|\?_a=/g) || []).length;
console.log(`Wrong-format URLs: ${wrongFormat}`);

// Check specific broken ones
for (const key of ['maitreyaStanding', 'maitreyaLarge', 'milarepa2', 'shakyamuniGold', 'vajrapaniGold']) {
  const match = finalContent.match(new RegExp(`${key}:\\s*'([^']+)'`));
  if (match) {
    const ok = match[1].includes(key);
    console.log(`  ${ok ? '✅' : '❌'} ${key}: ${match[1].slice(0, 100)}`);
  }
}
