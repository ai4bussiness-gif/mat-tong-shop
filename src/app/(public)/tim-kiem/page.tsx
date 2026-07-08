'use client'

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, SearchX } from "lucide-react"
import { ProductGrid } from "@/components/ui/ProductGrid"
import type { Product } from "@/types"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) { setLoading(false); return }
    setLoading(true)
    fetch(`/api/products?search=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || [])
        setLoading(false)
      })
  }, [query])

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2">Tìm Kiếm</h1>
      {query ? (
        <p className="text-sm text-gray-500 mb-8">
          Kết quả cho &ldquo;<span className="text-[#b8860b]">{query}</span>&rdquo; ({products.length} sản phẩm)
        </p>
      ) : (
        <p className="text-sm text-gray-500 mb-8">Nhập từ khóa để tìm kiếm sản phẩm</p>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-gray-800" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-gray-800 rounded w-3/4" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
                <div className="h-4 bg-gray-800 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 && query ? (
        <div className="text-center py-20 text-gray-500">
          <SearchX className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-gray-400 mb-1">Không tìm thấy sản phẩm nào</p>
          <p className="text-sm text-gray-600">Thử với từ khóa khác nhé</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </>
  )
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden animate-pulse">
          <div className="aspect-[3/4] bg-gray-800" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-800 rounded w-1/2" />
            <div className="h-4 bg-gray-800 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="bg-[#0b1120] min-h-screen">
      <div className="container-page py-8">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  )
}
