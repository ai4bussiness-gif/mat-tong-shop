import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { CalendarDays, ChevronRight, Clock } from "lucide-react"
import { ProductCard } from "@/components/ui/ProductCard"
import { ShareButton } from "@/components/ui/ShareButton"
import TestimonialSection from "@/components/sections/TestimonialSection"

export const dynamic = "force-dynamic"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })

  if (!post || !post.published) notFound()

  // Fetch related products
  const relatedProducts = await prisma.product.findMany({
    where: { inStock: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  })

  const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 300))

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <div className="bg-[#0b1120] min-h-screen">
      {/* ═══ Featured image hero ═══ */}
      {post.image && (
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[620px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/30 to-transparent" />
        </div>
      )}

      <div className="container-page pb-12 sm:pb-16">
        <div className={`${post.image ? "-mt-20 sm:-mt-28" : "pt-8"} relative z-10`}>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#b8860b] transition-colors">Trang Chủ</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <Link href="/blog" className="hover:text-[#b8860b] transition-colors">Bài Viết</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-gray-300 font-medium truncate max-w-[280px]">{post.title}</span>
            </nav>

            {/* Article card */}
            <article className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/20">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
                {post.publishedAt && (
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" />
                    <time dateTime={post.publishedAt.toISOString()}>{formattedDate}</time>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} phút đọc</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8">
                {post.title}
              </h1>

              {/* Content */}
              {post.excerpt && (
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 pb-6 border-b border-gray-800">
                  {post.excerpt}
                </p>
              )}
              <div
                className="prose prose-sm sm:prose-base max-w-none text-gray-300 leading-relaxed
                  prose-headings:text-white prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                  prose-a:text-[#b8860b] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-blockquote:border-l-[#b8860b] prose-blockquote:text-gray-400 prose-blockquote:bg-[#b8860b]/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                  prose-code:text-gray-300 prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-img:rounded-xl prose-img:my-8 prose-img:w-full
                  prose-hr:border-gray-800 prose-hr:my-8
                  prose-ul:space-y-2 prose-li:text-gray-400
                  prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10
                  prose-h3:text-xl prose-h3:text-[#b8860b]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share & Back */}
              <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-[#b8860b] hover:text-[#a07608] transition-colors font-medium group"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Quay lại bài viết
                </Link>
                <ShareButton />
              </div>
            </article>
          </div>{/* end max-w-4xl */}

          {/* ═══ Related Products — full-width ═══ */}
          {relatedProducts.length > 0 && (
            <section className="mt-12 sm:mt-16">
              <div className="max-w-4xl mx-auto mb-8">
                <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-1">
                  Gợi Ý
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  Sản Phẩm <span className="text-[#b8860b]">Liên Quan</span>
                </h2>
                <div className="w-12 h-0.5 bg-[#b8860b] mt-3 rounded-full" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ═══ Testimonials — outside relative container để mobile ko lỗi ═══ */}
      <TestimonialSection />
    </div>
  )
}
