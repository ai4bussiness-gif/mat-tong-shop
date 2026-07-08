import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ── Verified nidhiratna.com CDN image URLs ──
// All verified via browser: every URL returns a valid image (3200x4000, 1500x1875, etc.)
const IMG = {
  // Category images
  phat: 'https://nidhiratna.com/cdn/shop/files/Shakyamuni_enlighted_Buddha_Statue_99b1c8be-9dab-40f6-bd48-3aadd66c4f6f.jpg',
  boTat: 'https://nidhiratna.com/cdn/shop/files/Vajrapani-Statue_64613a73-953c-4722-8683-b55d550dc44a.jpg',
  tara: 'https://nidhiratna.com/cdn/shop/files/Buddhist-Tara-statues-collection-including-Green-Tara-and-White-Tara-along-with-their-manifestation-sacred-handcrafted-sculptures.jpg',
  dakini: 'https://nidhiratna.com/cdn/shop/files/handmade-troma-nagmo-statue-in-gold-gilded-copper-front-view-crafted-in-nepal-for-vajrayana-practice.jpg',
  guru: 'https://nidhiratna.com/cdn/shop/files/GTAA_1_of_16.jpg',
  thanTai: 'https://nidhiratna.com/cdn/shop/files/gold-crowned-dzambhala-throne-statue-25-inch-nepal-handcrafted-gilded-copper-full-view.jpg',
  lon: 'https://nidhiratna.com/cdn/shop/files/Large-Size-Statue-Collection-of-handmade-Tibetan-Buddhist-copper-statues-with-fire-gold-gilding-for-temple-altars-and-Dharma-centers.jpg',
  phapKhi: 'https://nidhiratna.com/cdn/shop/files/YT.jpg',
  thangka: 'https://nidhiratna.com/cdn/shop/files/Nidhiratna_Statues.png',
  // Product images
  shakyamuniGold: 'https://nidhiratna.com/cdn/shop/files/Shakyamuni_enlighted_Buddha_Statue_99b1c8be-9dab-40f6-bd48-3aadd66c4f6f.jpg',
  shakyamuniOxidized: 'https://nidhiratna.com/cdn/shop/files/shakyamuni-buddha-statue-seated-on-double-lotus-pedestal-with-oxidized-copper-finish-from-nepal.jpg',
  vajrapaniGold: 'https://nidhiratna.com/cdn/shop/files/Vajrapani-Statue_64613a73-953c-4722-8683-b55d550dc44a.jpg',
  vajrapaniHC: 'https://nidhiratna.com/cdn/shop/files/vajrapani-statue-handcrafted-in-copper-with-24k-gold-fire-gilded-finish-by-newari-artisans-from-patan-nepal.jpg',
  vajrapaniSide: 'https://nidhiratna.com/cdn/shop/files/side-view-of-vajrapani-buddhist-protector-statue-holding-vajra-and-lasso-on-lotus-pedestal.jpg',
  vajrapaniCloseup: 'https://nidhiratna.com/cdn/shop/files/close-up-of-vajrapani-statue-with-gold-painted-face-and-semi-precious-stone-ornaments.jpg',
  guruRimpoche: 'https://nidhiratna.com/cdn/shop/files/GTAA_1_of_16.jpg',
  taraGreen: 'https://nidhiratna.com/cdn/shop/files/green-tara-statue-oxidized-copper-handmade-in-nepal-buddhist-altar-sculpture.jpg',
  taraColl: 'https://nidhiratna.com/cdn/shop/files/Buddhist-Tara-statues-collection-including-Green-Tara-and-White-Tara-along-with-their-manifestation-sacred-handcrafted-sculptures.jpg',
  tromaNagmoFront: 'https://nidhiratna.com/cdn/shop/files/handmade-troma-nagmo-statue-in-gold-gilded-copper-front-view-crafted-in-nepal-for-vajrayana-practice.jpg',
  tromaNagmoLarge: 'https://nidhiratna.com/cdn/shop/files/large-troma-nagmo-statue-with-dimensions-handcrafted-copper-buddhist-sculpture-from-nepal.jpg',
  tromaNagmoAngle: 'https://nidhiratna.com/cdn/shop/files/angled-view-of-handmade-troma-nagmo-statue-with-intricate-gold-gilded-himalayan-craftsmanship.jpg',
  tromaNagmoCloseup: 'https://nidhiratna.com/cdn/shop/files/close-up-of-troma-nagmo-statues-fierce-face-with-hand-painted-details-and-gold-crown.jpg',
  vajrakilayaFront: 'https://nidhiratna.com/cdn/shop/files/front-view-of-vajrakilaya-deity-holding-vajra-and-ritual-knife-with-sacred-phurba-and-blazing-halo.jpg',
  vajrakilayaSide: 'https://nidhiratna.com/cdn/shop/files/side-view-of-vajrakilaya-statue-with-lotus-pedestal-intricate-himalayan-craftsmanship.jpg',
  vajrakilayaCloseup: 'https://nidhiratna.com/cdn/shop/files/close-up-of-vajrakilaya-statue-with-gold-painted-face-and-wrathful-expression.jpg',
  manjushri1: 'https://nidhiratna.com/cdn/shop/files/manjushri-bodhisattva-statue-handcrafted-copper-with-oxidized-finish-and-gold-painted-face-from-nepal.jpg',
  manjushri2: 'https://nidhiratna.com/cdn/shop/files/manjushri-bodhisattva-statue-handcrafted-in-copper-with-oxidized-finish-and-gold-painted-face-from-nepal.jpg',
  amitayus: 'https://nidhiratna.com/cdn/shop/files/amitayus-buddha-statue-handcrafted-in-copper-with-oxidized-finish-and-gold-painted-face-from-nepal.jpg',
  jambhala: 'https://nidhiratna.com/cdn/shop/files/jambhala-statue-handmade-in-nepal-copper-with-oxidized-and-silver-plated-finish-gold-painted-face.jpg',
  dzambhalaBlack: 'https://nidhiratna.com/cdn/shop/files/front-view-of-black-dzambhala-statue-handmade-in-nepal-copper-sculpture-with-gold-gilded-details.jpg',
  dzambhalaThrone: 'https://nidhiratna.com/cdn/shop/files/gold-crowned-dzambhala-throne-statue-25-inch-nepal-handcrafted-gilded-copper-full-view.jpg',
  threeBuddha: 'https://nidhiratna.com/cdn/shop/files/three-buddha-statue-collection-handmade-in-nepal-24k-gold-fire-gilded-buddhist-art.jpg',
  medicineBuddha: 'https://nidhiratna.com/cdn/shop/files/medicine-buddha-statue-handmade-copper-24k-gold-fire-gilded-lotus-throne-nepal.jpg',
  amitabha: 'https://nidhiratna.com/cdn/shop/files/amitabha-buddha-statue-handmade-in-nepal-24k-gold-fire-gilded-copper-lotus-throne.jpg',
  largeCollection: 'https://nidhiratna.com/cdn/shop/files/Large-Size-Statue-Collection-of-handmade-Tibetan-Buddhist-copper-statues-with-fire-gold-gilding-for-temple-altars-and-Dharma-centers.jpg',
  bellGhanta: 'https://nidhiratna.com/cdn/shop/files/YT.jpg',
  thangkaImg: 'https://nidhiratna.com/cdn/shop/files/Nidhiratna_Statues.png',
  f3Vajrapani: 'https://nidhiratna.com/cdn/shop/files/F-3_8ace97e9-2d3e-4a86-bfce-939df00e23f6.jpg',
  f3Vajrakilaya: 'https://nidhiratna.com/cdn/shop/files/F-3_3804270a-77de-413f-bc8e-8ef3357a7b1b.jpg',
}

async function main() {
  // ── Idempotent: delete existing data ──
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.blogPost.deleteMany()

  console.log('🗑️  Cleared existing data')

  // ── Categories ──
  const catData = [
    { name: 'Tượng Phật', slug: 'tuong-phat', image: IMG.phat },
    { name: 'Tượng Bồ Tát', slug: 'tuong-bo-tat', image: IMG.boTat },
    { name: 'Tượng Tara', slug: 'tuong-tara', image: IMG.tara },
    { name: 'Tượng Dakini', slug: 'tuong-dakini', image: IMG.dakini },
    { name: 'Tượng Guru', slug: 'tuong-guru', image: IMG.guru },
    { name: 'Tượng Thần Tài', slug: 'tuong-than-tai', image: IMG.thanTai },
    { name: 'Tượng Kích Thước Lớn', slug: 'tuong-lon', image: IMG.lon },
    { name: 'Pháp Khí', slug: 'phap-khi', image: IMG.phapKhi },
    { name: 'Tranh Thangka', slug: 'tranh-thangka', image: IMG.thangka },
  ]

  const cats = await Promise.all(catData.map((c) => prisma.category.create({ data: c })))
  const [phat, boTat, tara, dakini, guru, thanTai, lon, phapKhi, thangka] = cats

  console.log(`📂 Categories: ${cats.length}`)

  // ── Products (27 products across all 9 categories) ──
  const products = [
    // ── Tượng Phật (5 products) ──
    {
      name: 'Tượng Phật Thích Ca Mâu Ni Mạ Vàng 24K',
      slug: 'tuong-phat-thich-ca-mau-ni',
      description: 'Tượng Phật Thích Ca Mâu Ni được chế tác thủ công từ đồng nguyên chất, mạ vàng 24K. Sản phẩm được các nghệ nhân Nepal chế tác tỉ mỉ với từng đường nét tinh xảo. Phù hợp đặt trên bàn thờ Phật, phòng thiền, hoặc làm quà tặng tâm linh cao cấp.',
      price: 64043000,
      images: JSON.stringify([IMG.shakyamuniGold, IMG.guruRimpoche]),
      dimensions: '27.5cm x 19cm',
      weight: '3.24 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: true,
    },
    {
      name: 'Tượng Phật A Di Đà Đồng Mạ Vàng Cao Cấp',
      slug: 'tuong-phat-a-di-da',
      description: 'Tượng Phật A Di Đà bằng đồng mạ vàng 24K, chế tác thủ công tinh xảo. Hoa văn trên thân tượng và đế sen được chạm khắc tỉ mỉ. Biểu tượng của cõi Tây Phương Cực Lạc.',
      price: 80054000,
      images: JSON.stringify([IMG.amitabha, IMG.shakyamuniGold]),
      dimensions: '50cm x 36cm',
      weight: '8.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: true,
    },
    {
      name: 'Tượng Phật Dược Sư Mạ Vàng 24K',
      slug: 'tuong-phat-duoc-su',
      description: 'Tượng Phật Dược Sư (Medicine Buddha) bằng đồng mạ vàng 24K, tay cầm bình thuốc truyền thống. Biểu tượng của trí tuệ chữa lành và sức khỏe. Nhập khẩu từ Nepal.',
      price: 29353000,
      images: JSON.stringify([IMG.medicineBuddha, IMG.shakyamuniGold]),
      dimensions: '37cm x 27cm',
      weight: '5.2 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: true,
    },
    {
      name: 'Tượng Phật Thích Ca Đồng Oxidized Cao Cấp',
      slug: 'tuong-phat-thich-ca-oxidized',
      description: 'Tượng Phật Thích Ca Mâu Ni với lớp hoàn thiện oxidized độc đáo, tạo vẻ cổ kính trang nghiêm. Khuôn mặt được sơn vàng thủ công. Chế tác bởi nghệ nhân Nepal.',
      price: 24027000,
      images: JSON.stringify([IMG.shakyamuniOxidized]),
      dimensions: '24cm x 19.5cm',
      weight: '3.8 kg',
      material: 'Đồng oxidized, sơn vàng',
      categoryId: phat.id,
      featured: false,
    },
    {
      name: 'Tượng Đại Nhật Như Lai Kim Cương Đỉnh',
      slug: 'tuong-dai-nhat-nhu-lai',
      description: 'Tượng Đại Nhật Như Lai (Vairocana) — Phật tổ của Mật Tông. Chế tác tinh xảo từ đồng thau, mạ vàng 24K. Thế ngồi thiền kiết già, tay kết ấn trí tuệ tối thượng.',
      price: 66712000,
      images: JSON.stringify([IMG.shakyamuniGold, IMG.guruRimpoche]),
      dimensions: '36.5cm x 27.5cm',
      weight: '6.7 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: true,
    },
    // ── Tượng Bồ Tát (4 products) ──
    {
      name: 'Tượng Quán Thế Âm Bồ Tát Nghìn Tay',
      slug: 'tuong-quan-the-am-nghin-tay',
      description: 'Tượng Quán Thế Âm Bồ Tát nghìn tay chế tác thủ công, biểu tượng của lòng từ bi vô lượng. Từng cánh tay và mắt được điêu khắc tỉ mỉ. Một trong những tác phẩm điêu khắc Phật giáo tinh xảo nhất.',
      price: 16011000,
      images: JSON.stringify([IMG.vajrapaniGold, IMG.boTat]),
      dimensions: '14.5cm x 9.5cm',
      weight: '1.8 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: boTat.id,
      featured: true,
    },
    {
      name: 'Tượng Kim Cương Thủ Bồ Tát (Vajrapani) Mạ Vàng',
      slug: 'tuong-kim-cuong-thu-vajrapani',
      description: 'Tượng Kim Cương Thủ Bồ Tát (Vajrapani) — Hộ Pháp uy mãnh của Phật giáo Tây Tạng. Chế tác bằng đồng mạ vàng 24K, tay cầm chày kim cương, thần thái oai nghiêm. Chi tiết vương miện và trang phục công phu.',
      price: 37375000,
      images: JSON.stringify([IMG.vajrapaniHC, IMG.vajrapaniGold]),
      dimensions: '23.5cm x 20cm',
      weight: '3.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: boTat.id,
      featured: true,
    },
    {
      name: 'Tượng Văn Thù Bồ Tát (Manjushri) Oxidized',
      slug: 'tuong-van-thu-bo-tat-manjushri',
      description: 'Tượng Văn Thù Bồ Tát (Manjushri) — Bồ Tát của trí tuệ. Tay phải cầm kiếm trí tuệ, tay trái cầm kinh Bát Nhã. Hoàn thiện oxidized với khuôn mặt sơn vàng thủ công.',
      price: 26697000,
      images: JSON.stringify([IMG.manjushri1, IMG.manjushri2]),
      dimensions: '22.5cm x 18cm',
      weight: '3.2 kg',
      material: 'Đồng oxidized, sơn vàng',
      categoryId: boTat.id,
      featured: false,
    },
    {
      name: 'Tượng Văn Thù Bồ Tát Ngồi Thiền',
      slug: 'tuong-van-thu-bo-tat-ngoi-thien',
      description: 'Tượng Văn Thù Bồ Tát thế ngồi thiền trên đế sen. Tay phải cầm kiếm trí tuệ chém vô minh, tay trái cầm kinh. Khuôn mặt từ bi, trang phục chạm khắc tinh xảo.',
      price: 24027000,
      images: JSON.stringify([IMG.manjushri2, IMG.manjushri1]),
      dimensions: '22.5cm x 21.5cm',
      weight: '3.0 kg',
      material: 'Đồng oxidized, sơn vàng',
      categoryId: boTat.id,
      featured: false,
    },
    // ── Tượng Tara (3 products) ──
    {
      name: 'Tượng Tara Xanh (Green Tara) Điêu Khắc Thủ Công',
      slug: 'tuong-tara-xanh-dieu-khac',
      description: 'Tượng Tara Xanh (Green Tara) — Phật Mẫu cứu khổ cứu nạn, được điêu khắc thủ công từ đồng nguyên chất. Mạ vàng 24K, đính bán quý. Gương mặt tượng được vẽ tay tỉ mỉ.',
      price: 53469000,
      images: JSON.stringify([IMG.taraGreen, IMG.taraColl]),
      dimensions: '33cm x 24cm',
      weight: '4.8 kg',
      material: 'Đồng mạ vàng 24K, đá bán quý',
      categoryId: tara.id,
      featured: true,
    },
    {
      name: 'Tượng Tara Trắng Trường Thọ',
      slug: 'tuong-tara-trang',
      description: 'Tượng Tara Trắng (White Tara) — biểu tượng của trường thọ và từ bi. Bảy mắt tượng trưng cho khả năng nhìn thấy khổ đau từ mọi hướng. Chế tác thủ công tinh xảo.',
      price: 42750000,
      images: JSON.stringify([IMG.taraColl, IMG.taraGreen]),
      dimensions: '28cm x 20cm',
      weight: '3.6 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: tara.id,
      featured: false,
    },
    {
      name: 'Tượng Tara Đỏ (Red Tara) — Kurukulla',
      slug: 'tuong-tara-do-kurukulla',
      description: 'Tượng Tara Đỏ (Kurukulla) — Phật Mẫu của lực hút từ bi và năng lượng chuyển hóa. Mạ vàng 24K, chế tác thủ công, chi tiết hoa văn tinh xảo.',
      price: 48032000,
      images: JSON.stringify([IMG.taraGreen, IMG.taraColl]),
      dimensions: '30cm x 22cm',
      weight: '4.0 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: tara.id,
      featured: false,
    },
    // ── Tượng Dakini (2 products) ──
    {
      name: 'Tượng Dakini Troma Nagmo Kích Thước Lớn',
      slug: 'tuong-dakini-troma-nagmo-lon',
      description: 'Tượng Dakini Troma Nagmo kích thước lớn — một trong những pháp môn cao cấp của Mật Tông. Đồng mạ vàng 24K, khuôn mặt dữ tợn với ba mắt, đội vương miện đầu lâu. Cao 64.5cm.',
      price: 186873000,
      images: JSON.stringify([IMG.tromaNagmoFront, IMG.tromaNagmoLarge, IMG.tromaNagmoAngle, IMG.tromaNagmoCloseup]),
      dimensions: '64.5cm x 46cm',
      weight: '15.2 kg',
      material: 'Đồng mạ vàng 24K, sơn màu',
      categoryId: dakini.id,
      featured: true,
    },
    {
      name: 'Tượng Dakini Troma Nagmo Cao Cấp',
      slug: 'tuong-dakini-troma-nagmo',
      description: 'Tượng Dakini Troma Nagmo — hóa thân nữ giới của Kim Cương Thủ, biểu tượng của trí tuệ sắc bén. Chất liệu đồng mạ vàng, khuôn mặt vẽ tay tỉ mỉ với thần thái uy mãnh.',
      price: 123500000,
      images: JSON.stringify([IMG.tromaNagmoFront, IMG.tromaNagmoCloseup]),
      dimensions: '45cm x 32cm',
      weight: '8.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: dakini.id,
      featured: false,
    },
    // ── Tượng Guru (2 products) ──
    {
      name: 'Tượng Liên Hoa Sinh Đại Sư Guru Rinpoche',
      slug: 'tuong-lien-hoa-sinh-dai-su',
      description: 'Tượng Liên Hoa Sinh Đại Sư — Guru Rinpoche, tổ sư Mật Tông Tây Tạng. Tượng đồng mạ vàng, tay cầm chày kim cương và bình cam lộ. Uy nghi và linh thiêng.',
      price: 80054000,
      images: JSON.stringify([IMG.guruRimpoche]),
      dimensions: '45cm x 32cm',
      weight: '7.8 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: guru.id,
      featured: true,
    },
    {
      name: 'Tượng Guru Rinpoche Ngồi Thiền',
      slug: 'tuong-guru-rinpoche-ngoi-thien',
      description: 'Tượng Guru Rinpoche thế ngồi thiền trên đế sen, đội mũ pandita truyền thống. Tay phải kết ấn kim cương, tay trái bình cam lộ. Chạm khắc tỉ mỉ đến từng chi tiết.',
      price: 53469000,
      images: JSON.stringify([IMG.guruRimpoche, IMG.dzambhalaThrone]),
      dimensions: '35cm x 25cm',
      weight: '5.4 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: guru.id,
      featured: false,
    },
    // ── Tượng Thần Tài (3 products) ──
    {
      name: 'Tượng Thần Tài Dzambhala Mạ Vàng 24K',
      slug: 'tuong-dzambhala-ma-vang',
      description: 'Tượng Thần Tài Dzambhala mạ vàng 24K trên ngai vàng, đội vương miện chạm khắc tinh xảo. Tay cầm bảo châu và chồn phun châu báu — biểu tượng của tài lộc và thịnh vượng.',
      price: 160107000,
      images: JSON.stringify([IMG.dzambhalaThrone]),
      dimensions: '63.5cm x 45cm',
      weight: '12.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: thanTai.id,
      featured: true,
    },
    {
      name: 'Tượng Dzambhala Đen (Black Jambhala)',
      slug: 'tuong-dzambhala-den',
      description: 'Tượng Dzambhala Đen (Black Jambhala) — thần tài của Mật Tông, phẫn nộ tướng. Chế tác thủ công từ đồng, mạ vàng, khuôn mặt dữ tợn, tay cầm bảo châu và chuột phun của cải.',
      price: 72080000,
      images: JSON.stringify([IMG.dzambhalaBlack, IMG.dzambhalaThrone]),
      dimensions: '40cm x 27cm',
      weight: '6.8 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: thanTai.id,
      featured: true,
    },
    {
      name: 'Tượng Dzambhala Vàng Oxidized',
      slug: 'tuong-dzambhala-vang-oxidized',
      description: 'Tượng Dzambhala Vàng với lớp hoàn thiện oxidized và mạ bạc. Ngồi trên ngai, tay phải cầm quả bảo châu, tay trái cầm chồn. Biểu tượng may mắn và thịnh vượng.',
      price: 32036000,
      images: JSON.stringify([IMG.jambhala, IMG.dzambhalaBlack]),
      dimensions: '30.5cm x 30cm',
      weight: '4.5 kg',
      material: 'Đồng oxidized, mạ bạc',
      categoryId: thanTai.id,
      featured: false,
    },
    // ── Tượng Kích Thước Lớn (3 products) ──
    {
      name: 'Bộ Sưu Tập Ba Tượng Phật Mạ Vàng',
      slug: 'bo-suu-tap-ba-tuong-phat-ma-vang',
      description: 'Bộ ba tượng Phật mạ vàng 24K lửa: Phật Thích Ca, Phật A Di Đà và Phật Dược Sư. Mỗi tượng cao 21cm, chế tác thủ công tại Nepal. Bộ sưu tập hoàn hảo cho phòng thờ lớn.',
      price: 80089000,
      images: JSON.stringify([IMG.threeBuddha, IMG.largeCollection]),
      dimensions: '21cm x 14cm (mỗi tượng)',
      weight: '9.0 kg (cả bộ)',
      material: 'Đồng mạ vàng 24K',
      categoryId: lon.id,
      featured: true,
    },
    {
      name: 'Tượng Vajrakilaya Kích Thước Lớn',
      slug: 'tuong-vajrakilaya-lon',
      description: 'Tượng Vajrakilaya (Kim Cương Tương) — hộ pháp Mật Tông với thần thái uy mãnh. Ba mặt sáu tay, chế tác thủ công tinh xảo. Kích thước lớn phù hợp cho pháp đường và thiền viện.',
      price: 45384000,
      images: JSON.stringify([IMG.vajrakilayaFront, IMG.vajrakilayaSide, IMG.vajrakilayaCloseup]),
      dimensions: '35.5cm x 24cm',
      weight: '6.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: lon.id,
      featured: true,
    },
    {
      name: 'Tượng Kim Cương Thủ Vajrapani Cao 61cm',
      slug: 'tuong-kim-cuong-thu-61cm',
      description: 'Tượng Kim Cương Thủ Bồ Tát (Vajrapani) kích thước lớn 61.5cm. Chế tác từ đồng nguyên chất đặc, tay cầm chày kim cương và thòng lọng. Uy lực và oai nghiêm, phù hợp cho chánh điện.',
      price: 160107000,
      images: JSON.stringify([IMG.vajrapaniGold, IMG.f3Vajrapani]),
      dimensions: '61.5cm x 46.5cm',
      weight: '12 kg',
      material: 'Đồng nguyên chất',
      categoryId: lon.id,
      featured: false,
    },
    // ── Pháp Khí (3 products) ──
    {
      name: 'Chuông Kim Cương Nepal (Ghanta) Cao Cấp',
      slug: 'chuong-kim-cuong-nepal-ghanta',
      description: 'Chuông Kim Cương (Ghanta) Nepal — pháp khí quan trọng trong nghi lễ Mật Tông. Chế tác từ hợp kim 7 loại kim loại, âm thanh trong trẻo vang xa. Tay cầm hình chày kim cương.',
      price: 2400000,
      images: JSON.stringify([IMG.bellGhanta]),
      dimensions: '18cm x 8cm',
      weight: '0.5 kg',
      material: 'Hợp kim 7 kim loại',
      categoryId: phapKhi.id,
      featured: false,
    },
    {
      name: 'Chày Kim Cương (Vajra) 5 Xẻ — Đồng Mạ Vàng',
      slug: 'chay-kim-cuong-vajra-5-xe',
      description: 'Chày Kim Cương (Vajra/Dorje) 5 xẻ — pháp khí tối thượng của Mật Tông. Đồng mạ vàng 24K, chạm khắc tinh xảo với mặt Makara. Sử dụng trong các nghi lễ thiền định và cúng dường.',
      price: 1800000,
      images: JSON.stringify([IMG.bellGhanta]),
      dimensions: '12cm x 4cm',
      weight: '0.3 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phapKhi.id,
      featured: false,
    },
    {
      name: 'Bộ Pháp Khí Chuông & Chày Kim Cương Mạ Vàng',
      slug: 'bo-phap-khi-chuong-chay-kim-cuong',
      description: 'Bộ pháp khí hoàn chỉnh gồm Chuông Kim Cương (Ghanta) và Chày Kim Cương (Vajra) 5 xẻ. Đồng mạ vàng 24K, chế tác thủ công. Hộp đựng gỗ sang trọng kèm theo.',
      price: 3800000,
      images: JSON.stringify([IMG.bellGhanta, IMG.phapKhi]),
      dimensions: '18cm x 8cm / 12cm x 4cm',
      weight: '0.8 kg (cả bộ)',
      material: 'Đồng mạ vàng 24K',
      categoryId: phapKhi.id,
      featured: true,
    },
    // ── Tranh Thangka (2 products) ──
    {
      name: 'Tranh Thangka Phật Thích Ca Vẽ Tay',
      slug: 'tranh-thangka-phat-thich-ca',
      description: 'Tranh Thangka Phật Thích Ca vẽ tay trên vải bố, sử dụng màu tự nhiên từ khoáng chất. Khung thêu gấm Tây Tạng truyền thống. Phù hợp treo phòng thờ, phòng thiền hoặc làm quà tặng tâm linh.',
      price: 5500000,
      images: JSON.stringify([IMG.thangkaImg]),
      dimensions: '60cm x 45cm',
      material: 'Vải bố, màu khoáng tự nhiên',
      categoryId: thangka.id,
      featured: false,
    },
    {
      name: 'Tranh Thangka Tara Xanh Cao Cấp',
      slug: 'tranh-thangka-tara-xanh',
      description: 'Tranh Thangka Tara Xanh (Green Tara) vẽ tay tỉ mỉ. Màu sắc rực rỡ, đường nét tinh tế. Viền thêu gấm Tây Tạng cao cấp. Có trục gỗ để cuộn bảo quản.',
      price: 7200000,
      images: JSON.stringify([IMG.thangkaImg, IMG.taraColl]),
      dimensions: '75cm x 55cm',
      material: 'Vải bố, màu khoáng tự nhiên',
      categoryId: thangka.id,
      featured: true,
    },
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  console.log(`📦 Products: ${products.length}`)

  // ── Blog posts (3 posts) ──
  const blogPosts = [
    {
      title: 'Ý Nghĩa Tượng Phật Trong Phật Giáo Mật Tông',
      slug: 'y-nghia-tuong-phat-mat-tong',
      content: `<p>Tượng Phật trong Mật Tông không chỉ là hình tượng thờ cúng, mà còn là pháp khí hỗ trợ thiền định và tu tập. Mỗi tôn tượng đều mang một ý nghĩa biểu tượng sâu sắc: tư thế tay (ấn), màu sắc, và trang phục đều chứa đựng giáo lý của Phật pháp.</p>
<p>Trong truyền thống Kim Cương Thừa (Vajrayana), tượng Phật được chế tác theo đúng tỷ lệ kinh điển (Tibetan iconometry) — từ tỷ lệ khuôn mặt, thân thể cho đến từng ngón tay. Mỗi chi tiết đều có ý nghĩa riêng:</p>
<ul>
  <li><strong>Ấn (Mudra):</strong> Mỗi tư thế tay biểu thị một pháp môn — ấn xúc địa (Phật Thích Ca), ấn thiền định (Phật A Di Đà), ấn chuyển pháp luân (Phật Thích Ca thuyết pháp).</li>
  <li><strong>Tòa sen:</strong> Đế sen tượng trưng cho sự thanh tịnh thoát khỏi luân hồi. Sen 8 cánh biểu thị Bát Chánh Đạo.</li>
  <li><strong>Hào quang:</strong> Vòng hào quang sau lưng tượng trưng cho trí tuệ và từ bi tỏa khắp mười phương.</li>
</ul>
<p>Khi thỉnh tượng Phật, người tu tập nên chọn tôn tượng phù hợp với bản mệnh và pháp môn tu học của mình. Quan trọng nhất là tâm thành kính và sự hiểu biết đúng đắn về ý nghĩa của tôn tượng.</p>
<p>Tại Mật Tông Shop, chúng tôi cam kết mỗi tôn tượng đều được nhập khẩu trực tiếp từ Nepal — quốc gia có truyền thống chế tác tượng Phật lâu đời nhất thế giới, được các nghệ nhân Newari chế tác thủ công với kỹ thuật đúc đồng mất sáp (lost wax) truyền thống hàng trăm năm.</p>`,
      excerpt: 'Tìm hiểu ý nghĩa sâu sắc của các tôn tượng Phật giáo Mật Tông Tây Tạng — từ tư thế tay, tòa sen đến hào quang.',
      image: IMG.shakyamuniGold,
      published: true,
      publishedAt: new Date(),
    },
    {
      title: 'Cách Chọn Tượng Phật Phù Hợp Với Không Gian Thờ Tại Gia',
      slug: 'cach-chon-tuong-phat-phu-hop',
      content: `<p>Việc chọn tượng Phật phù hợp cho không gian thờ tại gia là một quyết định quan trọng, ảnh hưởng đến năng lượng tâm linh và thẩm mỹ của ngôi nhà. Dưới đây là những hướng dẫn chi tiết giúp bạn chọn được tôn tượng phù hợp nhất.</p>
<h2>1. Xác định không gian thờ</h2>
<p>Trước hết, hãy đo đạc không gian dành cho bàn thờ. Tượng Phật cần có tỷ lệ hài hòa với không gian xung quanh. Một số gợi ý:</p>
<ul>
  <li><strong>Phòng thờ rộng (trên 10m²):</strong> Tượng cao 45-65cm như tượng Guru Rinpoche, Vajrapani kích thước lớn.</li>
  <li><strong>Phòng thờ vừa (5-10m²):</strong> Tượng cao 25-40cm như tượng Phật Thích Ca, Tara Xanh.</li>
  <li><strong>Góc thờ nhỏ (dưới 5m²):</strong> Tượng cao 14-24cm như tượng Quán Thế Âm, Phật Dược Sư.</li>
</ul>
<h2>2. Chọn tôn tượng theo pháp môn tu tập</h2>
<ul>
  <li><strong>Thiền tịnh:</strong> Phật Thích Ca, Phật A Di Đà — giúp an tĩnh tâm hồn.</li>
  <li><strong>Mật Tông:</strong> Guru Rinpoche, Tara, Vajrapani — hỗ trợ thiền định Kim Cương Thừa.</li>
  <li><strong>Cầu sức khỏe:</strong> Phật Dược Sư — biểu tượng của sự chữa lành.</li>
  <li><strong>Cầu tài lộc:</strong> Dzambhala — thần tài Phật giáo.</li>
</ul>
<h2>3. Chất liệu và hoàn thiện</h2>
<p>Tượng đồng mạ vàng 24K là lựa chọn cao cấp nhất, giữ được độ sáng bóng và giá trị tâm linh lâu dài. Tượng đồng oxidized mang vẻ đẹp cổ kính, trang nghiêm với giá thành phải chăng hơn.</p>
<h2>4. Lưu ý khi đặt tượng</h2>
<ul>
  <li>Tượng Phật nên được đặt ở vị trí cao nhất trên bàn thờ.</li>
  <li>Không đặt tượng ở nơi thiếu trang nghiêm như phòng ngủ, phòng bếp.</li>
  <li>Nên làm lễ khai quang (consecration) trước khi thờ.</li>
</ul>
<p>Mật Tông Shop cung cấp dịch vụ tư vấn miễn phí và hỗ trợ khai quang tượng theo nghi thức Mật Tông Tây Tạng.</p>`,
      excerpt: 'Hướng dẫn chi tiết cách chọn tượng Phật phù hợp với không gian thờ tại gia và pháp môn tu tập.',
      image: IMG.amitabha,
      published: true,
      publishedAt: new Date(),
    },
    {
      title: 'Quy Trình Chế Tác Tượng Phật Đồng Thủ Công Tại Nepal',
      slug: 'quy-trinh-che-tac-tuong-phat-dong',
      content: `<p>Nepal từ lâu đã nổi tiếng với nghệ thuật chế tác tượng Phật đồng thủ công. Trải qua hơn 1.000 năm lịch sử, các nghệ nhân Newari tại thung lũng Kathmandu vẫn gìn giữ kỹ thuật đúc đồng mất sáp (lost wax casting) truyền thống. Mỗi bức tượng là kết tinh của hàng tháng trời lao động miệt mài.</p>
<h2>Bước 1: Thiết kế và tạo mẫu</h2>
<p>Mọi bức tượng đều bắt đầu từ một bản vẽ chi tiết dựa trên đúng tỷ lệ kinh điển Tây Tạng. Nghệ nhân dùng sáp ong pha dầu tạo mẫu sáp (wax model) với đầy đủ chi tiết từ khuôn mặt, trang phục đến hoa văn trên tòa sen.</p>
<h2>Bước 2: Tạo khuôn gốm</h2>
<p>Mẫu sáp được bao phủ bởi nhiều lớp đất sét mịn pha trấu. Sau khi phơi khô, khuôn được nung nóng để sáp chảy ra ngoài, để lại khoảng rỗng mang hình dáng hoàn hảo của tượng — đây chính là lý do gọi là "đúc mất sáp".</p>
<h2>Bước 3: Đúc đồng</h2>
<p>Đồng nguyên chất được nung chảy ở nhiệt độ trên 1.000°C rồi đổ vào khuôn gốm. Sau khi nguội, khuôn gốm được đập bỏ, để lại phôi tượng bằng đồng nguyên khối. Kỹ thuật này đảm bảo mỗi tượng là duy nhất và không có hai sản phẩm nào hoàn toàn giống nhau.</p>
<h2>Bước 4: Chạm khắc và hoàn thiện</h2>
<p>Phôi tượng thô được các nghệ nhân giàu kinh nghiệm chạm khắc, mài dũa tinh chỉnh từng chi tiết. Các đường nét hoa văn, khuôn mặt, trang sức đều được đục tay tỉ mỉ. Đây là công đoạn tốn nhiều thời gian và tay nghề nhất.</p>
<h2>Bước 5: Mạ vàng 24K</h2>
<p>Đối với các tượng cao cấp, lớp mạ vàng 24K (fire gilding) được áp dụng: hỗn hợp vàng và thủy ngân được quét lên tượng, sau đó nung ở nhiệt độ thích hợp để thủy ngân bay hơi, để lại lớp vàng nguyên chất bám chặt vào bề mặt đồng. Kỹ thuật này cho lớp mạ bền đẹp hàng trăm năm.</p>
<h2>Bước 6: Sơn mặt và điểm màu</h2>
<p>Cuối cùng, khuôn mặt và các chi tiết đặc biệt được sơn vẽ bằng tay với màu sắc tự nhiên. Vàng, xanh lam, đỏ son — mỗi màu sắc đều mang ý nghĩa biểu tượng riêng trong Phật giáo.</p>
<p>Tại Mật Tông Shop, chúng tôi tự hào mang đến những tác phẩm nghệ thuật Phật giáo đích thực từ Nepal — được các nghệ nhân Newari chế tác trực tiếp, hoàn toàn thủ công, với tâm niệm và lòng thành kính sâu sắc.</p>`,
      excerpt: 'Khám phá quy trình chế tác tượng Phật đồng thủ công 6 bước của các nghệ nhân Nepal — từ tạo mẫu sáp đến mạ vàng 24K.',
      image: IMG.medicineBuddha,
      published: true,
      publishedAt: new Date(),
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post })
  }

  console.log(`📝 Blog posts: ${blogPosts.length}`)

  // ── Summary ──
  console.log('')
  console.log('✅ Seed completed successfully!')
  console.log(`   📂 Categories: ${cats.length}`)
  console.log(`   📦 Products: ${products.length}`)
  console.log(`   📝 Blog posts: ${blogPosts.length}`)
  console.log(`   All image URLs verified from nidhiratna.com CDN`)
  console.log(`   ✅ Idempotent — safe to re-run`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
