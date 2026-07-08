import Link from "next/link"
import { prisma } from "@/lib/db"
import { ChevronRight, CalendarDays } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div className="bg-[#0b1120] min-h-screen">
      <div className="container-page py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-1">
            Kiến Thức
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Blog <span className="text-[#b8860b]">Posts</span>
          </h1>
          <div className="w-12 h-0.5 bg-[#b8860b] mt-3 rounded-full" />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Chưa có bài viết nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
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
                        {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  )}
                  {/* Title */}
                  <h2 className="font-semibold text-sm sm:text-base text-white group-hover:text-[#b8860b] transition-colors line-clamp-2 leading-snug mb-auto">
                    {post.title}
                  </h2>
                  {/* Read more */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#b8860b] font-medium mt-4 group-hover:gap-2.5 transition-all">
                    Đọc thêm <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
