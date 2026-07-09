import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ── Verified Cloudinary image URLs ──
const IMG = {
  // Category images
  phat: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/phat.jpg',
  boTat: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/boTat.jpg',
  tara: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/tara.jpg',
  dakini: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/dakini.jpg',
  guru: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/guru.jpg',
  thanTai: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/thanTai.jpg',
  garuda: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/garuda.jpg',

  // Hộ Pháp & Protectors
  mahakala4: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/mahakala4.jpg',
  whiteMahakala: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/whiteMahakala.jpg',
  mahakala6: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/mahakala6.jpg',
  achala: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/achala.jpg',
  chakrasamvara: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/chakrasamvara.jpg',
  hevajra: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/hevajra.jpg',
  kalachakra: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/kalachakra.jpg',

  // Phật Di Lặc
  maitreyaSeated: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/maitreyaSeated.jpg',
  maitreyaStanding: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/maitreyaStanding.jpg',
  maitreyaLarge: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/maitreyaLarge.jpg',
  amoghasiddhi: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/amoghasiddhi.jpg',

  // Đại Sư & Thánh Tăng
  milarepa1: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/milarepa1.jpg',
  milarepa2: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/milarepa2.jpg',
  tsongkhapa: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/tsongkhapa.jpg',

  // Kim Sí Điểu & Linh Vật
  garudaGold: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/garudaGold.jpg',

  // Bồ Tát & bổ sung
  ksitigarbha: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/ksitigarbha.jpg',
  vajrasattva: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrasattva.jpg',
  vajrayogini: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrayogini.jpg',
  chenrezig4arm: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/chenrezig4arm.jpg',

  // Thần Tài bổ sung
  vasudhara: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vasudhara.jpg',
  ganesha: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/ganesha.jpg',
  ganesha4arm: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/ganesha4arm.jpg',

  // Tara bổ sung
  greenTaraSmall: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/greenTaraSmall.jpg',
  tara21set: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/tara21set.jpg',

  // Product images
  shakyamuniGold: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/shakyamuniGold.jpg',
  shakyamuniOxidized: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/shakyamuniOxidized.jpg',
  vajrapaniGold: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrapaniGold.jpg',
  vajrapaniHC: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrapaniHC.jpg',
  vajrapaniSide: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrapaniSide.jpg',
  vajrapaniCloseup: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrapaniCloseup.jpg',
  guruRimpoche: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/guruRimpoche.jpg',
  taraGreen: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/taraGreen.jpg',
  taraColl: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/taraColl.jpg',
  tromaNagmoFront: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/tromaNagmoFront.jpg',
  tromaNagmoLarge: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/tromaNagmoLarge.jpg',
  tromaNagmoAngle: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/tromaNagmoAngle.jpg',
  tromaNagmoCloseup: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/tromaNagmoCloseup.jpg',
  vajrakilayaFront: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrakilayaFront.jpg',
  vajrakilayaSide: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrakilayaSide.jpg',
  vajrakilayaCloseup: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/vajrakilayaCloseup.jpg',
  dzambhalaThrone: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/dzambhalaThrone.jpg',
  dzambhalaBlack: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/dzambhalaBlack.jpg',
  jambhala: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/jambhala.jpg',
  amitabha: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/amitabha.jpg',
  medicineBuddha: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/medicineBuddha.jpg',
  manjushri1: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/manjushri1.jpg',
  manjushri2: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/manjushri2.jpg',
  largeCollection: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/largeCollection.jpg',
  threeBuddha: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/threeBuddha.jpg',
  f3Vajrapani: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/f3Vajrapani.jpg',
  f3Vajrakilaya: 'https://res.cloudinary.com/zgl5avbd/image/upload/mat-tong/f3Vajrakilaya.jpg',
}

async function main() {
  // ── Idempotent: delete existing data ──
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.blogPost.deleteMany()

  console.log('🗑️  Cleared existing data')

  // ── 7 Categories (Phương án A) ──
  const catData = [
    { name: 'Phật', slug: 'phat', image: IMG.phat },
    { name: 'Bồ Tát', slug: 'bo-tat', image: IMG.boTat },
    { name: 'Phật Mẫu', slug: 'phat-mau', image: IMG.tara },
    { name: 'Hộ Pháp', slug: 'ho-phap', image: IMG.mahakala4 },
    { name: 'Đại Sư', slug: 'dai-su', image: IMG.guru },
    { name: 'Thần Tài', slug: 'than-tai', image: IMG.thanTai },
  ]

  const cats = await Promise.all(catData.map((c) => prisma.category.create({ data: c })))
  const [phat, boTat, phatMau, hoPhap, daiSu, thanTai] = cats

  console.log(`📂 Categories: ${cats.length}`)

  // ── Products (statues only) ──
  const products = [
    // ═══════════════════════════════════════════
    // PHẬT (12 products)
    // ═══════════════════════════════════════════
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
    {
      name: 'Tượng Phật Bất Không Thành Tựu (Amoghasiddhi)',
      slug: 'tuong-phat-bat-khong-thanh-tuu',
      description: 'Tượng Phật Bất Không Thành Tựu (Amoghasiddhi) — một trong Ngũ Trí Như Lai, cai quản phương Bắc. Ngài tay kết ấn vô úy, tọa trên đế sen xanh, biểu tượng cho sự thành tựu mọi công đức. Đồng mạ vàng 24K, chế tác Nepal.',
      price: 40034000,
      images: JSON.stringify([IMG.amoghasiddhi]),
      dimensions: '30cm x 20cm',
      weight: '4.0 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: true,
    },
    {
      name: 'Tượng Kim Cương Tát Đỏa (Vajrasattva)',
      slug: 'tuong-kim-cuong-tat-doa',
      description: 'Tượng Kim Cương Tát Đỏa (Vajrasattva) — vị Phật Mật Tông chủ trì pháp môn sám hối và tịnh hóa. Tay phải cầm chày kim cương (vajra) trước tim, tay trái cầm chuông (ghanta) ở hông. Biểu tượng của sự thanh tịnh và giác ngộ.',
      price: 26690000,
      images: JSON.stringify([IMG.vajrasattva]),
      dimensions: '22cm x 15cm',
      weight: '2.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: false,
    },
    // ── Phật Di Lặc (gộp vào Phật) ──
    {
      name: 'Tượng Phật Di Lặc Ngồi Thiền Trên Ngai',
      slug: 'tuong-phat-di-lac-ngoi-thien',
      description: 'Tượng Phật Di Lặc (Maitreya) — vị Phật tương lai, hiện đang tu tập tại cung trời Đâu Suất. Ngồi trên ngai cao, tay kết ấn chuyển pháp luân, thần thái từ bi trang nghiêm. Đồng mạ vàng 24K, chế tác thủ công tinh xảo. Thích hợp đặt trên bàn thờ Phật gia chính.',
      price: 53379000,
      images: JSON.stringify([IMG.maitreyaSeated]),
      dimensions: '35cm x 25cm',
      weight: '5.0 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: true,
    },
    {
      name: 'Tượng Phật Di Lặc Đứng',
      slug: 'tuong-phat-di-lac-dung',
      description: 'Tượng Phật Di Lặc đứng trên tòa sen — biểu tượng của tương lai Phật pháp. Hai tay kết ấn thuyết pháp. Phần đế sen được chạm khắc hoa văn tinh tế. Sản phẩm nhập khẩu Nepal, đồng mạ vàng 24K.',
      price: 37365000,
      images: JSON.stringify([IMG.maitreyaStanding]),
      dimensions: '28cm x 12cm',
      weight: '3.2 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: false,
    },
    {
      name: 'Tượng Phật Di Lặc Lớn Trên Ngai Cao',
      slug: 'tuong-phat-di-lac-lon-tren-ngai',
      description: 'Tượng Phật Di Lặc kích thước lớn trên ngai vàng chạm khắc công phu. Toàn thân mạ vàng 24K lửa (fire gilding), các chi tiết hoa văn trên ngai được chạm tay tỉ mỉ. Phù hợp cho chùa, thiền viện hoặc phòng thờ lớn.',
      price: 186825000,
      images: JSON.stringify([IMG.maitreyaLarge]),
      dimensions: '55cm x 38cm',
      weight: '12.8 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: true,
    },
    // ── Từ Tượng Lớn (đồ chuyển về Phật) ──
    {
      name: 'Bộ Sưu Tập Ba Tượng Phật Mạ Vàng',
      slug: 'bo-suu-tap-ba-tuong-phat-ma-vang',
      description: 'Bộ ba tượng Phật mạ vàng 24K lửa: Phật Thích Ca, Phật A Di Đà và Phật Dược Sư. Mỗi tượng cao 21cm, chế tác thủ công tại Nepal. Bộ sưu tập hoàn hảo cho phòng thờ lớn.',
      price: 80089000,
      images: JSON.stringify([IMG.threeBuddha, IMG.largeCollection]),
      dimensions: '21cm x 14cm (mỗi tượng)',
      weight: '9.0 kg (cả bộ)',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: true,
    },
    {
      name: 'Tượng Phật A Di Đà Cao Cấp Lớn',
      slug: 'tuong-phat-a-di-da-lon',
      description: 'Tượng Phật A Di Đà kích thước lớn, tay kết ấn thiền định ôm bình bát. Toàn thân mạ vàng 24K, đế sen chạm khắc tinh tế. Phù hợp đặt tại chánh điện, thiền viện. Nhập khẩu trực tiếp từ Nepal.',
      price: 80054000,
      images: JSON.stringify([IMG.threeBuddha]),
      dimensions: '18cm x 12cm',
      weight: '8.0 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phat.id,
      featured: false,
    },

    // ═══════════════════════════════════════════
    // BỒ TÁT (8 products)
    // ═══════════════════════════════════════════
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
    {
      name: 'Tượng Địa Tạng Vương Bồ Tát (Ksitigarbha)',
      slug: 'tuong-dia-tang-vuong-bo-tat',
      description: 'Tượng Địa Tạng Vương Bồ Tát (Kshitigarbha) — Nguyện "Địa Ngục Vị Không, Thệ Bất Thành Phật". Tay cầm tích trượng (khakkhara) và bảo châu như ý. Đầu trọc, thân khoác cà sa Phật giáo. Đồng mạ vàng, chế tác thủ công Nepal.',
      price: 37365000,
      images: JSON.stringify([IMG.ksitigarbha]),
      dimensions: '26cm x 16cm',
      weight: '3.0 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: boTat.id,
      featured: true,
    },
    {
      name: 'Tượng Quán Thế Âm Bồ Tát Bốn Tay (4-Arm Chenrezig)',
      slug: 'tuong-quan-the-am-bon-tay',
      description: 'Tượng Quán Thế Âm Bồ Tát bốn tay — hóa thân phổ biến nhất của Đức Quán Thế Âm trong Mật Tông. Hai tay chính chắp trước ngực, tay phụ cầm chuỗi hạt và sen trắng. Da màu trắng, ngồi trên tòa sen. Biểu tượng của lòng từ bi bất tận.',
      price: 29359000,
      images: JSON.stringify([IMG.chenrezig4arm]),
      dimensions: '22cm x 14cm',
      weight: '2.4 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: boTat.id,
      featured: false,
    },
    // ── Từ Tượng Lớn (đồ chuyển về Bồ Tát) ──
    {
      name: 'Tượng Kim Cương Thủ Vajrapani Cao 61cm',
      slug: 'tuong-kim-cuong-thu-61cm',
      description: 'Tượng Kim Cương Thủ Bồ Tát (Vajrapani) kích thước lớn 61.5cm. Chế tác từ đồng nguyên chất đặc, tay cầm chày kim cương và thòng lọng. Uy lực và oai nghiêm, phù hợp cho chánh điện.',
      price: 160107000,
      images: JSON.stringify([IMG.vajrapaniGold, IMG.f3Vajrapani]),
      dimensions: '61.5cm x 46.5cm',
      weight: '12 kg',
      material: 'Đồng nguyên chất',
      categoryId: boTat.id,
      featured: false,
    },
    {
      name: 'Tượng Quán Thế Âm Nghìn Tay Lớn',
      slug: 'tuong-quan-the-am-nghin-tay-lon',
      description: 'Tượng Quán Thế Âm Bồ Tát nghìn tay (Sahasrabhuja Avalokiteshvara) kích thước lớn. 11 đầu, 1000 cánh tay xếp thành vòng hào quang. Chế tác thủ công tại Nepal, mạ vàng 24K. Một kiệt tác điêu khắc Phật giáo hiếm có.',
      price: 186825000,
      images: JSON.stringify([IMG.chenrezig4arm]),
      dimensions: '50cm x 40cm',
      weight: '14.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: boTat.id,
      featured: true,
    },

    // ═══════════════════════════════════════════
    // PHẬT MẪU (8 products — Tara + Dakini + Vajrayogini)
    // ═══════════════════════════════════════════
    {
      name: 'Tượng Tara Xanh (Green Tara) Điêu Khắc Thủ Công',
      slug: 'tuong-tara-xanh-dieu-khac',
      description: 'Tượng Tara Xanh (Green Tara) — Phật Mẫu cứu khổ cứu nạn, được điêu khắc thủ công từ đồng nguyên chất. Mạ vàng 24K, đính bán quý. Gương mặt tượng được vẽ tay tỉ mỉ.',
      price: 53469000,
      images: JSON.stringify([IMG.taraGreen, IMG.taraColl]),
      dimensions: '33cm x 24cm',
      weight: '4.8 kg',
      material: 'Đồng mạ vàng 24K, đá bán quý',
      categoryId: phatMau.id,
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
      categoryId: phatMau.id,
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
      categoryId: phatMau.id,
      featured: false,
    },
    {
      name: 'Tượng Dakini Troma Nagmo Kích Thước Lớn',
      slug: 'tuong-dakini-troma-nagmo-lon',
      description: 'Tượng Dakini Troma Nagmo kích thước lớn — một trong những pháp môn cao cấp của Mật Tông. Đồng mạ vàng 24K, khuôn mặt dữ tợn với ba mắt, đội vương miện đầu lâu. Cao 64.5cm.',
      price: 186873000,
      images: JSON.stringify([IMG.tromaNagmoFront, IMG.tromaNagmoLarge, IMG.tromaNagmoAngle, IMG.tromaNagmoCloseup]),
      dimensions: '64.5cm x 46cm',
      weight: '15.2 kg',
      material: 'Đồng mạ vàng 24K, sơn màu',
      categoryId: phatMau.id,
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
      categoryId: phatMau.id,
      featured: false,
    },
    {
      name: 'Tượng Tara Xanh Nhỏ Bằng Đồng',
      slug: 'tuong-tara-xanh-nho',
      description: 'Tượng Tara Xanh (Green Tara) cỡ nhỏ, chế tác từ đồng nguyên chất. Phật Mẫu ngồi trên tòa sen, tay phải kết ấn ban phước lành. Phù hợp cho bàn thờ nhỏ tại gia hoặc làm quà tặng Phật tử.',
      price: 24021000,
      images: JSON.stringify([IMG.greenTaraSmall]),
      dimensions: '16cm x 11cm',
      weight: '1.5 kg',
      material: 'Đồng mạ vàng',
      categoryId: phatMau.id,
      featured: false,
    },
    {
      name: 'Tượng Bộ 21 Tara Mạ Vàng',
      slug: 'tuong-bo-21-tara',
      description: 'Bộ sưu tập 21 tượng Tara — 21 hóa thân của Phật Mẫu Tara theo truyền thống Tây Tạng. Mỗi tượng có sắc màu và pháp khí riêng. Bộ 21 tượng được chế tác tinh xảo, mạ vàng 24K. Thích hợp cho pháp đường và thiền viện lớn.',
      price: 240210000,
      images: JSON.stringify([IMG.tara21set]),
      dimensions: '12cm x 8cm (mỗi tượng)',
      weight: '8.5 kg (cả bộ)',
      material: 'Đồng mạ vàng 24K',
      categoryId: phatMau.id,
      featured: true,
    },
    {
      name: 'Tượng Kim Cương Du Già Mẫu (Vajrayogini)',
      slug: 'tuong-kim-cuong-du-gia-mau',
      description: 'Tượng Kim Cương Du Già Mẫu (Vajrayogini) — Dakini tối cao của Mật Tông, hóa thân nữ giới của trí tuệ. Thân màu đỏ, tay cầm dao cong và chén sọ, nhảy múa trên xác người. Biểu tượng của sự chuyển hóa vô minh thành trí tuệ.',
      price: 37365000,
      images: JSON.stringify([IMG.vajrayogini]),
      dimensions: '24cm x 16cm',
      weight: '2.8 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: phatMau.id,
      featured: true,
    },

    // ═══════════════════════════════════════════
    // HỘ PHÁP (7 products)
    // ═══════════════════════════════════════════
    {
      name: 'Tượng Hộ Pháp Mahakala Bốn Tay Mạ Vàng',
      slug: 'tuong-ho-phap-mahakala-bon-tay',
      description: 'Tượng Hộ Pháp Mahakala bốn tay (Chaturbhuja Mahakala) — vị hộ pháp uy mãnh nhất trong Mật Tông Tây Tạng. Chế tác từ đồng mạ vàng 24K, bốn tay cầm các pháp khí biểu tượng. Thần thái dữ tợn, đội vương miện đầu lâu, thân đeo xương người. Bảo vệ Phật pháp và hành giả.',
      price: 42703000,
      images: JSON.stringify([IMG.mahakala4]),
      dimensions: '30cm x 22cm',
      weight: '4.2 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: hoPhap.id,
      featured: true,
    },
    {
      name: 'Tượng Hộ Pháp Mahakala Trắng',
      slug: 'tuong-ho-phap-mahakala-trang',
      description: 'Tượng Mahakala Trắng (White Mahakala) — hóa thân từ bi của Đại Hắc Thiên. Khác với các tướng Mahakala khác, ngài hiện tướng hiền hòa với sắc trắng tinh khiết, tay cầm bảo châu và chày kim cương. Biểu tượng của tài lộc và che chở.',
      price: 9342000,
      images: JSON.stringify([IMG.whiteMahakala]),
      dimensions: '15cm x 10cm',
      weight: '0.8 kg',
      material: 'Đồng mạ vàng',
      categoryId: hoPhap.id,
      featured: false,
    },
    {
      name: 'Tượng Hộ Pháp Mahakala Sáu Tay',
      slug: 'tuong-ho-phap-mahakala-sau-tay',
      description: 'Tượng Mahakala sáu tay (Six-Armed Mahakala) — hộ pháp tối thượng của Mật Tông Tây Tạng. Mỗi tay cầm một pháp khí riêng: dao cong, xương chày, lasso, chày kim cương. Đứng trên xác người, tỏa hào quang lửa dữ dội.',
      price: 40034000,
      images: JSON.stringify([IMG.mahakala6]),
      dimensions: '28cm x 20cm',
      weight: '3.8 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: hoPhap.id,
      featured: true,
    },
    {
      name: 'Tượng Hộ Pháp Achala',
      slug: 'tuong-ho-phap-achala',
      description: 'Tượng Hộ Pháp Achala (Acalanatha) — vị hộ pháp bất động của Phật giáo Tây Tạng. Tay phải cầm kiếm trí tuệ chém vô minh, tay trái cầm thòng lọng trói buộc phiền não. Thân đen, mắt đỏ, phẫn nộ tướng uy mãnh. Đồng mạ vàng 24K chế tác thủ công.',
      price: 32028000,
      images: JSON.stringify([IMG.achala]),
      dimensions: '25cm x 18cm',
      weight: '3.2 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: hoPhap.id,
      featured: false,
    },
    {
      name: 'Tượng Hộ Pháp Chakrasamvara',
      slug: 'tuong-ho-phap-chakrasamvara',
      description: 'Tượng Chakrasamvara (Khorlo Demchog) — vị Mật Tông Yidam tối thượng của pháp môn Thời Luân. Đứng trong tư thế Yab-Yum với consort, biểu tượng của sự hợp nhất giữa đại lạc và tánh không. Đồng mạ vàng 24K, chạm khắc tinh xảo.',
      price: 34696000,
      images: JSON.stringify([IMG.chakrasamvara]),
      dimensions: '27cm x 20cm',
      weight: '3.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: hoPhap.id,
      featured: false,
    },
    {
      name: 'Tượng Hộ Pháp Hevajra Yab-Yum',
      slug: 'tuong-ho-phap-hevajra-yab-yum',
      description: 'Tượng Hevajra Yab-Yum — Mật Tông Yidam cao cấp nhất của phái Sakya. Mười sáu tay cầm đầy pháp khí biểu tượng, đứng trong tư thế hợp nhất với consort. Đồng mạ vàng 24K, chạm khắc thủ công tinh xảo từ Nepal.',
      price: 58717000,
      images: JSON.stringify([IMG.hevajra]),
      dimensions: '32cm x 24cm',
      weight: '5.6 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: hoPhap.id,
      featured: true,
    },
    // ── Từ Tượng Lớn (đồ chuyển về Hộ Pháp) ──
    {
      name: 'Tượng Vajrakilaya Kích Thước Lớn',
      slug: 'tuong-vajrakilaya-lon',
      description: 'Tượng Vajrakilaya (Kim Cương Tương) — hộ pháp Mật Tông với thần thái uy mãnh. Ba mặt sáu tay, chế tác thủ công tinh xảo. Kích thước lớn phù hợp cho pháp đường và thiền viện.',
      price: 45384000,
      images: JSON.stringify([IMG.vajrakilayaFront, IMG.vajrakilayaSide, IMG.vajrakilayaCloseup]),
      dimensions: '35.5cm x 24cm',
      weight: '6.5 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: hoPhap.id,
      featured: true,
    },

    // ═══════════════════════════════════════════
    // ĐẠI SƯ (5 products)
    // ═══════════════════════════════════════════
    {
      name: 'Tượng Liên Hoa Sinh Đại Sư Guru Rinpoche',
      slug: 'tuong-lien-hoa-sinh-dai-su',
      description: 'Tượng Liên Hoa Sinh Đại Sư — Guru Rinpoche, tổ sư Mật Tông Tây Tạng. Tượng đồng mạ vàng, tay cầm chày kim cương và bình cam lộ. Uy nghi và linh thiêng.',
      price: 80054000,
      images: JSON.stringify([IMG.guruRimpoche]),
      dimensions: '45cm x 32cm',
      weight: '7.8 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: daiSu.id,
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
      categoryId: daiSu.id,
      featured: false,
    },
    {
      name: 'Tượng Đại Sư Milarepa Cao Cấp',
      slug: 'tuong-dai-su-milarepa-cao-cap',
      description: 'Tượng Đại Sư Milarepa — vị thánh tăng vĩ đại nhất của Tây Tạng. Ngài ngồi trong tư thế thiền định với bàn tay phải đưa lên tai — tư thế "lắng nghe" huyền thoại. Chất liệu đồng mạ vàng 24K, chạm khắc chân dung tỉ mỉ. Biểu tượng của sự giác ngộ qua khổ hạnh.',
      price: 45372000,
      images: JSON.stringify([IMG.milarepa1]),
      dimensions: '26cm x 18cm',
      weight: '3.0 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: daiSu.id,
      featured: true,
    },
    {
      name: 'Tượng Đại Sư Milarepa Thiền Định',
      slug: 'tuong-dai-su-milarepa-thien',
      description: 'Tượng Milarepa thế ngồi thiền, tay phải đưa lên tai trong tư thế lắng nghe — ghi nhận khoảnh khắc ngài đạt giác ngộ. Đồng thủ công Nepal, lớp hoàn thiện oxidized cổ kính, khuôn mặt sơn vàng thủ công.',
      price: 26690000,
      images: JSON.stringify([IMG.milarepa2]),
      dimensions: '20cm x 14cm',
      weight: '2.2 kg',
      material: 'Đồng oxidized, sơn vàng',
      categoryId: daiSu.id,
      featured: false,
    },
    {
      name: 'Tượng Đại Sư Tsongkhapa',
      slug: 'tuong-dai-su-tsongkhapa',
      description: 'Tượng Đại Sư Tsongkhapa — tổ sư sáng lập phái Gelug (Mũ Vàng) của Phật giáo Tây Tạng. Ngài ngồi trên tòa sen, tay kết ấn thuyết pháp, đội mũ pandita đặc trưng. Đồng mạ vàng 24K, chạm khắc chân dung tinh tế — thích hợp cho hành giả phái Gelug.',
      price: 37365000,
      images: JSON.stringify([IMG.tsongkhapa]),
      dimensions: '24cm x 16cm',
      weight: '2.8 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: daiSu.id,
      featured: false,
    },

    // ═══════════════════════════════════════════
    // THẦN TÀI (6 products)
    // ═══════════════════════════════════════════
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
    {
      name: 'Tượng Thần Tài Vasudhara',
      slug: 'tuong-than-tai-vasudhara',
      description: 'Tượng Thần Tài Vasudhara — nữ thần tài lộc trong Phật giáo Tây Tạng. Sáu tay cầm các biểu tượng: bảo châu, bông lúa, bình báu và kinh sách. Ngồi trên tòa sen, trang phục lộng lẫy. Cầu tài lộc và thịnh vượng.',
      price: 32028000,
      images: JSON.stringify([IMG.vasudhara]),
      dimensions: '22cm x 15cm',
      weight: '2.6 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: thanTai.id,
      featured: false,
    },
    {
      name: 'Tượng Ganesha Đồng Cao Cấp',
      slug: 'tuong-ganesha-dong-cao-cap',
      description: 'Tượng Ganesha — vị thần đầu voi phổ biến trong cả Ấn Độ giáo và Phật giáo Tây Tạng. Ngài là vị thần khai mở trí tuệ, xóa bỏ chướng ngại. Tay phải cầm rìu, tay trái cầm dây thòng lọng, ngà voi gãy. Đồng chế tác thủ công Nepal.',
      price: 48041000,
      images: JSON.stringify([IMG.ganesha]),
      dimensions: '28cm x 18cm',
      weight: '3.8 kg',
      material: 'Đồng nguyên chất',
      categoryId: thanTai.id,
      featured: false,
    },
    {
      name: 'Tượng Ganesha Bốn Tay',
      slug: 'tuong-ganesha-bon-tay',
      description: 'Tượng Ganesha bốn tay ngồi trên tòa sen — hai tay chính cầm rìu và thòng lọng, hai tay phụ kết ấn. Vòi voi uốn cong, thân hình tròn đầy. Mạ vàng 24K, chạm khắc tinh xảo.',
      price: 37365000,
      images: JSON.stringify([IMG.ganesha4arm]),
      dimensions: '24cm x 16cm',
      weight: '3.0 kg',
      material: 'Đồng mạ vàng 24K',
      categoryId: thanTai.id,
      featured: false,
    },

    // ═══════════════════════════════════════════
    // LINH VẬT (2 products)
    // ═══════════════════════════════════════════
    {
      name: 'Tượng Kim Sí Điểu (Garuda) Đồng',
      slug: 'tuong-kim-si-dieu-garuda',
      description: 'Tượng Kim Sí Điểu (Garuda) — thần điểu hộ pháp trong Phật giáo Tây Tạng. Đầu và cánh đại bàng, thân người, tay cầm rắn rồng — biểu tượng của sức mạnh chế ngự phiền não. Đồng chế tác thủ công, thích hợp treo cao hoặc đặt bàn thờ Hộ Pháp.',
      price: 24021000,
      images: JSON.stringify([IMG.garuda]),
      dimensions: '20cm x 18cm',
      weight: '1.8 kg',
      material: 'Đồng nguyên chất',
      categoryId: hoPhap.id,
      featured: true,
    },
    {
      name: 'Tượng Kim Sí Điểu Mạ Vàng Nhỏ',
      slug: 'tuong-kim-si-dieu-ma-vang-nho',
      description: 'Tượng Kim Sí Điểu (Garuda) mạ vàng nhỏ xinh — thần điểu hộ pháp, tượng trưng cho sức mạnh và sự bảo hộ. Phù hợp đặt trên bàn thờ hoặc treo xe hơi. Chế tác thủ công tại Nepal.',
      price: 13345000,
      images: JSON.stringify([IMG.garudaGold]),
      dimensions: '12cm x 10cm',
      weight: '0.6 kg',
      material: 'Đồng mạ vàng',
      categoryId: hoPhap.id,
      featured: false,
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
  console.log(`   📂 Categories: ${cats.length} (Phật, Bồ Tát, Phật Mẫu, Hộ Pháp, Đại Sư, Thần Tài)`)
  console.log(`   📦 Products: ${products.length}`)
  console.log(`   📝 Blog posts: ${blogPosts.length}`)
  console.log(`   ❌ Removed: Pháp Khí (7), Tranh Thangka (2), Tượng Lớn (category)`)
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
