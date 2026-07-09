import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let seedContent = readFileSync(resolve(__dirname, '../prisma/seed.ts'), 'utf-8');

// These keys need their URLs fixed (they got mapped to wrong Cloudinary URLs earlier)
const fixes = {
  mahakala6: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/mahakala6',
  hevajra: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/hevajra',
  kalachakra: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/kalachakra',
  maitreyaStanding: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/maitreyaStanding',
  maitreyaLarge: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/maitreyaLarge',
  milarepa2: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/milarepa2',
  tsongkhapa: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/tsongkhapa',
  garudaGold: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/garudaGold',
  vajrasattva: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/vajrasattva',
  vasudhara: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/vasudhara',
  ganesha: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/ganesha',
  butterLampSmall: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/butterLampSmall',
  prayerWheel: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/prayerWheel',
  shakyamuniGold: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/shakyamuniGold',
  vajrapaniGold: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/vajrapaniGold',
  guruRimpoche: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/guruRimpoche',
  taraGreen: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/taraGreen',
  taraColl: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/taraColl',
  tromaNagmoFront: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/tromaNagmoFront',
  vajrakilayaFront: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/vajrakilayaFront',
  dzambhalaBlack: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/dzambhalaBlack',
  dzambhalaThrone: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/dzambhalaThrone',
  largeCollection: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/largeCollection',
  bellGhanta: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/bellGhanta',
  thangkaImg: 'e_e_gen_remove:prompt_Nidhiratna/v1/mat-tong/thangkaImg',
};

const baseUrl = 'https://res.cloudinary.com/zgl5avbd/image/upload/';

for (const [key, path] of Object.entries(fixes)) {
  const correctUrl = baseUrl + path;
  // Find the line with this key and any URL
  const regex = new RegExp(`(${key}:\\s*)'([^']+)'`);
  const match = seedContent.match(regex);
  if (match) {
    const currentUrl = match[2];
    if (currentUrl !== correctUrl) {
      seedContent = seedContent.replace(match[0], `${match[1]}'${correctUrl}'`);
      console.log(`  ✅ ${key}: fixed`);
    } else {
      console.log(`  ⏭️ ${key}: already correct`);
    }
  } else {
    console.log(`  ❌ ${key}: not found`);
  }
}

writeFileSync(resolve(__dirname, '../prisma/seed.ts'), seedContent);
console.log('\n✅ All fixes applied');
