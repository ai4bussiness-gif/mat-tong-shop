import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { ProductGrid } from "@/components/ui/ProductGrid"

export const dynamic = "force-dynamic"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })

  if (!category) notFound()

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="bg-[#0b1120] min-h-screen">
      <div className="container-page py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#b8860b] transition-colors">Trang Chủ</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300 font-medium">{category.name}</span>
        </nav>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="text-[#b8860b]">{category.name}</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} sản phẩm</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Chưa có sản phẩm trong danh mục này</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  )
}
