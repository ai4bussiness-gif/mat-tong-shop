import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const seedContent = readFileSync(resolve(process.cwd(), 'prisma/seed.ts'), 'utf-8');

const lines = seedContent.split('\n');
const resultLines = [];
let fixes = 0;

for (const line of lines) {
  const m = line.match(/^(\s*)(\w+):\s*'(https:\/\/res\.cloudinary\.com\/[^']+)',?$/);
  if (m) {
    const indent = m[1];
    const key = m[2];
    const url = m[3];
    
    if (key === 'prisma' || key === 'PrismaClient') {
      resultLines.push(line);
      continue;
    }
    
    // Replace the gen_remove URL with the plain upload URL
    // From: .../upload/e_gen_remove:prompt_Nidhiratna/mat-tong/KEY.jpg
    // To:   .../upload/v1/mat-tong/KEY.jpg
    const newUrl = url.replace(/\/e_gen_remove:prompt_\w+/, '');
    
    if (newUrl !== url) {
      resultLines.push(`${indent}${key}: '${newUrl}',`);
      fixes++;
    } else {
      resultLines.push(line);
    }
  } else {
    resultLines.push(line);
  }
}

writeFileSync(resolve(process.cwd(), 'prisma/seed.ts'), resultLines.join('\n'));
console.log(`✅ Removed gen_remove from ${fixes} URLs`);

// Spot check
const final = readFileSync(resolve(process.cwd(), 'prisma/seed.ts'), 'utf-8');
const g = final.match(/e_gen_remove|gen_remove/g);
console.log(`Remaining gen_remove refs: ${g ? g.length : 0}`);
