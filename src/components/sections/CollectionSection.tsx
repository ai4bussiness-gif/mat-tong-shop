'use client'

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Product } from "@/types"
import { Carousel } from "@/components/ui/Carousel"
import { ProductCard } from "@/components/ui/ProductCard"

export function CollectionSection({
  title,
  viewAllHref,
  products,
}: {
  title: string
  viewAllHref: string
  products: Product[]
}) {
  if (products.length === 0) return null

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">{title}</h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center gap-1 text-sm text-[#b8860b] hover:text-[#a07608] transition-colors font-medium"
            >
              Xem tất cả <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
      <Carousel>
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] sm:min-w-[380px] w-[380px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
