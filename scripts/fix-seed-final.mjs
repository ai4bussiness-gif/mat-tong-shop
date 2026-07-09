import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const seedContent = readFileSync(resolve(process.cwd(), 'prisma/seed.ts'), 'utf-8');

const lines = seedContent.split('\n');
const fixedLines = [];
let fixes = 0;

for (const line of lines) {
  // Match: KEY: 'https://res.cloudinary.com/...'
  const m = line.match(/^(\s*)(\w+):\s*'(https:\/\/res\.cloudinary\.com\/[^']+)',?$/);
  if (m) {
    const indent = m[1];
    const key = m[2];
    const url = m[3];
    
    if (key === 'prisma' || key === 'PrismaClient') {
      fixedLines.push(line);
      continue;
    }
    
    // Extract the base key from the URL path
    const urlKeyMatch = url.match(/mat-tong\/(\w+)/);
    if (urlKeyMatch) {
      const urlKey = urlKeyMatch[1];
      const ext = (urlKey === 'thangka' || urlKey === 'thangkaImg') ? '.png' : '.jpg';
      const correctUrl = `https://res.cloudinary.com/zgl5avbd/image/upload/e_gen_remove:prompt_Nidhiratna/mat-tong/${urlKey}${ext}`;
      
      if (url !== correctUrl) {
        fixedLines.push(`${indent}${key}: '${correctUrl}',`);
        fixes++;
      } else {
        fixedLines.push(line);
      }
    } else {
      fixedLines.push(line);
    }
  } else {
    fixedLines.push(line);
  }
}

writeFileSync(resolve(process.cwd(), 'prisma/seed.ts'), fixedLines.join('\n'));
console.log(`Fixed ${fixes} URLs`);

// Verify
const finalContent = readFileSync(resolve(process.cwd(), 'prisma/seed.ts'), 'utf-8');
const wrongFormat = (finalContent.match(/e_e_gen_remove|\/v1\/mat-tong|\?_a=/g) || []).length;
const cloudyRefs = (finalContent.match(/res\.cloudinary\.com\/zgl5avbd/g) || []).length;
console.log(`Wrong-format URLs: ${wrongFormat}`);
console.log(`Cloudinary refs: ${cloudyRefs}`);
