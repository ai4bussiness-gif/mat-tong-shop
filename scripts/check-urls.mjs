import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let seedContent = readFileSync(resolve(__dirname, '../prisma/seed.ts'), 'utf-8');

// First, let's see ALL remaining nidhiratna URLs grouped by key
const regex = /(\w+):\s*'(https:\/\/nidhiratna\.com[^']+)'/g;
let match;
console.log("Remaining nidhiratna URLs in seed.ts:");
while ((match = regex.exec(seedContent)) !== null) {
  console.log(`  ${match[1]}: ${match[2].slice(0, 80)}`);
}
