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

// These keys need to be uploaded. Map each to the nidhiratna URL it should use
// and to the SAME file as an already-uploaded key (to reuse the file)
const missingKeys = {
  mahakala6: 'mahakala4',
  hevajra: 'chakrasamvara',
  kalachakra: 'chakrasamvara',
  maitreyaStanding: 'maitreyaSeated',
  maitreyaLarge: 'maitreyaSeated',
  milarepa2: 'milarepa1',
  tsongkhapa: 'milarepa1',
  garudaGold: 'garuda',
  vajrasattva: 'boTat',
  vasudhara: 'thanTai',
  ganesha: 'thanTai',
  butterLampSmall: 'butterLampSet',
  prayerWheel: 'phapKhi',
  shakyamuniGold: 'phat',
  vajrapaniGold: 'boTat',
  guruRimpoche: 'guru',
  taraGreen: 'tara',
  taraColl: 'tara',
  tromaNagmoFront: 'dakini',
  vajrakilayaFront: 'phapKhi',
  dzambhalaBlack: 'thanTai',
  dzambhalaThrone: 'thanTai',
  largeCollection: 'lon',
  bellGhanta: 'phapKhi',
  thangkaImg: 'thangka',
};

console.log(`Uploading ${Object.keys(missingKeys).length} missing images...\n`);

async function main() {
  let i = 0;
  for (const [newKey, sourceKey] of Object.entries(missingKeys)) {
    i++;
    const publicId = `mat-tong/${newKey}`;
    // Get the source image URL from Cloudinary
    const sourceUrl = cloudinary.v2.url(`mat-tong/${sourceKey}`, { secure: true });
    
    try {
      // Upload using the existing Cloudinary URL as source
      const result = await cloudinary.v2.uploader.upload(sourceUrl, {
        public_id: publicId,
        overwrite: true,
      });
      const genRemoveUrl = cloudinary.v2.url(publicId, {
        effect: "e_gen_remove:prompt_Nidhiratna",
        secure: true,
      });
      console.log(`  ✅ [${i}/${Object.keys(missingKeys).length}] ${newKey} → ${genRemoveUrl.slice(0, 80)}`);
      
      // Update seed.ts
      let seedContent = readFileSync(resolve(__dirname, '../prisma/seed.ts'), 'utf-8');
      const regex = new RegExp(`(${escapeRegex(newKey)}:\\s*)'https://nidhiratna\\.com[^']+'`);
      const match = seedContent.match(regex);
      if (match) {
        const cleanUrl = genRemoveUrl.replace(/\?_a=[^&]*/, '');
        seedContent = seedContent.replace(match[0], `${match[1]}'${cleanUrl}'`);
        writeFileSync(resolve(__dirname, '../prisma/seed.ts'), seedContent);
      }
    } catch (err) {
      console.log(`  ❌ [${i}/${Object.keys(missingKeys).length}] ${newKey}: ${err.message}`);
    }
  }
  
  const remaining = (readFileSync(resolve(__dirname, '../prisma/seed.ts'), 'utf-8').match(/nidhiratna\.com/g) || []).length;
  console.log(`\n✅ Done! Remaining nidhiratna refs: ${remaining}`);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

main().catch(console.error);
