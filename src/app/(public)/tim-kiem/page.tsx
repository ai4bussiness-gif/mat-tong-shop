'use client'

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
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
      <h1 className="text-2xl font-bold mb-2">Tìm Kiếm</h1>
      {query && <p className="text-sm text-gray-500 mb-8">Kết quả cho &quot;{query}&quot; ({products.length} sản phẩm)</p>}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Đang tìm kiếm...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="container-page py-8">
      <Suspense fallback={<div className="text-center py-20 text-gray-400">Đang tải...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  )
}
