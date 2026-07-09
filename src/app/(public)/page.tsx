import Link from "next/link"
import { prisma } from "@/lib/db"
import { HeroSlider } from "@/components/ui/HeroSlider"
import { ProductCard } from "@/components/ui/ProductCard"
import { CollectionSection } from "@/components/sections/CollectionSection"
import { VideoSection } from "@/components/sections/VideoSection"
import { ChevronRight, Shield, Truck, HeadphonesIcon, CreditCard, CalendarDays } from "lucide-react"
import type { Product } from "@/types"

export const dynamic = "force-dynamic"

const COLLECTION_SECTIONS = [
  { slug: "phat", heading: "Chư Phật", desc: "Phật Thích Ca, Di Lặc, A Di Đà, Dược Sư — tinh hoa điêu khắc Phật giáo Nepal" },
  { slug: "bo-tat", heading: "Chư Bồ Tát", desc: "Tượng Quán Thế Âm, Văn Thù, Địa Tạng — từ bi và trí tuệ" },
  { slug: "phat-mau", heading: "Chư Phật Mẫu", desc: "Tara Xanh, Tara Trắng, Tara Đỏ — Phật Mẫu cứu khổ cứu nạn" },
  { slug: "ho-phap", heading: "Chư Hộ Pháp", desc: "Mahakala, Chakrasamvara, Hevajra — các vị hộ pháp uy mãnh" },
  { slug: "dai-su", heading: "Chư Đại Sư", desc: "Guru Rinpoche, Milarepa, Tsongkhapa — các bậc Đại Thành Tựu" },
  { slug: "than-tai", heading: "Chư Thần Tài", desc: "Dzambhala, Vasudhara, Ganesha — tài lộc và thịnh vượng" },
]

export default async function HomePage() {
  const [newArrivals, blogPosts, allCats, ...collectionProducts] =
    await Promise.all([
      prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" }, take: 16 }),
      prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 3 }),
      prisma.category.findMany({ where: { image: { not: "" } }, orderBy: { id: "asc" } }),
      ...COLLECTION_SECTIONS.map((col) =>
        prisma.product.findMany({ where: { category: { slug: col.slug } }, include: { category: true }, take: 12 })
      ),
    ])

  return (
    <>
      {/* ═══ HERO ═══ */}
      <HeroSlider />

      {/* ═══ OUR CATEGORIES ═══ */}
      {allCats.length > 0 && (
        <section className="py-10 sm:py-14 bg-[#0f172a]">
          <div className="container-page">
            <div className="text-center mb-8">
              <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
                Sản Phẩm Của Chúng Tôi
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2 heading-serif">
                Danh <span className="text-[#b8860b]">Mục</span>
              </h2>
              <div className="w-12 h-0.5 bg-[#b8860b] mx-auto mt-3 rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {allCats.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/danh-muc/${cat.slug}`}
                  className="group relative block aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden bg-gray-800"
                >
                  <img
                    src={cat.image!}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3 className="text-white font-bold text-sm sm:text-base drop-shadow-sm">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5 group-hover:text-[#b8860b] transition-colors">
                      Xem thêm →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ COLLECTION SECTIONS — ALL DARK ═══ */}
      {COLLECTION_SECTIONS.map((col, idx) => {
        const products = collectionProducts[idx]
        if (!products || products.length === 0) return null
        // Alternate subtly between dark and darker
        const bgClass = idx % 2 === 0 ? "bg-[#0f172a]" : "bg-[#0b1120]"

        return (
          <section key={col.slug} className={`py-10 sm:py-14 ${bgClass}`}>
            <div className="container-page">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 heading-serif">
                  <span className="text-gray-300">{col.heading.split(' ')[0]} </span>
                  <span className="text-[#b8860b]">{col.heading.split(' ').slice(1).join(' ')}</span>
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
                  {col.desc}
                </p>
                <div className="w-12 h-0.5 bg-[#b8860b] mx-auto mt-3 rounded-full" />
              </div>
              <CollectionSection
                title=""
                viewAllHref={`/danh-muc/${col.slug}`}
                products={products}
              />
            </div>
          </section>
        )
      })}

      {/* ═══ PHÁP ẤN — VIDEO ═══ */}
      <VideoSection />

      {/* ═══ NEW ARRIVALS ═══ */}
      {newArrivals.length > 0 && (
        <section className="py-10 sm:py-14 bg-[#0f172a]">
          <div className="container-page">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white heading-serif">
                Mới <span className="text-[#b8860b]">Nhất</span>
              </h2>
              <div className="w-12 h-0.5 bg-[#b8860b] mx-auto mt-3 rounded-full" />
            </div>
            <CollectionSection
              title=""
              viewAllHref="/tim-kiem?sort=newest"
              products={newArrivals}
            />
            <div className="text-center mt-6">
              <Link
                href="/tim-kiem?sort=newest"
                className="inline-flex items-center gap-1 px-6 py-3 border-2 border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Xem Tất Cả <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ TRUST BADGES ═══ */}
      <section className="py-12 bg-[#0f172a]">
        <div className="container-page">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, label: "Thanh Toán An Toàn", desc: "100% bảo mật thông tin" },
              { icon: Truck, label: "Vận Chuyển Toàn Cầu", desc: "Giao hàng tận nơi" },
              { icon: HeadphonesIcon, label: "Hỗ Trợ 24/7", desc: "Tư vấn nhiệt tình" },
              { icon: CreditCard, label: "Đa Dạng Thanh Toán", desc: "Chuyển khoản, VNPay" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-5 sm:p-6 rounded-xl bg-[#0b1120] border border-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#b8860b]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-[#b8860b]" />
                </div>
                <h4 className="font-semibold text-sm sm:text-base text-white">{item.label}</h4>
                <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BLOG ═══ */}
      {blogPosts.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#0b1120]">
          <div className="container-page">
            {/* Heading row: left-aligned title + right-aligned view all */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-1">
                  Kiến Thức
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white heading-serif">
                  Bài <span className="text-[#b8860b]">Viết</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20" />
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17" />
                </svg>
                Xem tất cả
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Blog cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl border border-gray-800 bg-[#0f172a] overflow-hidden hover:border-gray-600 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] bg-gray-800 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                        Mật Tông
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    {/* Date */}
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <time dateTime={post.publishedAt.toISOString()}>
                          {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                        </time>
                      </div>
                    )}
                    {/* Title */}
                    <h3 className="font-semibold text-sm sm:text-base text-white group-hover:text-[#b8860b] transition-colors line-clamp-2 leading-snug mb-auto">
                      {post.title}
                    </h3>
                    {/* Read more */}
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#b8860b] font-medium mt-4 group-hover:gap-2.5 transition-all">
                      Đọc thêm <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
