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

const assets = [
  {
    key: 'hero-banner',
    url: 'https://nidhiratna.com/cdn/shop/files/Green_Tara_Statues_Banner.jpg',
  },
  {
    key: 'video-poster',
    url: 'https://nidhiratna.com/cdn/shop/files/preview_images/998756c0488a47149b677dce72f49e96.thumbnail.0000000000.jpg',
  },
  {
    key: 'promo-video',
    url: 'https://nidhiratna.com/cdn/shop/videos/c/vp/998756c0488a47149b677dce72f49e96/998756c0488a47149b677dce72f49e96.HD-1080p-4.8Mbps-45620052.mp4',
  },
];

async function main() {
  for (const asset of assets) {
    const publicId = `mat-tong/${asset.key}`;
    const isVideo = asset.key === 'promo-video';
    
    try {
      const result = await cloudinary.v2.uploader.upload(asset.url, {
        public_id: publicId,
        resource_type: isVideo ? 'video' : 'image',
        overwrite: true,
      });
      console.log(`  ✅ ${asset.key}: ${result.secure_url}`);
    } catch (err) {
      console.log(`  ❌ ${asset.key}: ${err.message}`);
    }
  }
  console.log('\n✅ Done!');
}

main().catch(console.error);
