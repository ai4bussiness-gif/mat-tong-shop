'use client'

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { formatPrice, parseImages } from "@/lib/utils"
import type { Product } from "@/types"

export function ProductCard({ product }: { product: Product }) {
  const images = parseImages(product.images)
  const imgSrc = images[0] || '/placeholder.svg'

  return (
    <div className="product-card group bg-[#1a1f2e] rounded-lg border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-colors">
      <Link href={`/san-pham/${product.slug}`} className="block aspect-[3/4] bg-gray-800 relative overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            Mật Tông
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full border border-gray-700">
              Hết hàng
            </span>
          </div>
        )}
      </Link>
      <div className="p-3.5">
        {product.category && (
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
            {product.category.name}
          </p>
        )}
        <Link
          href={`/san-pham/${product.slug}`}
          className="block text-sm font-medium leading-snug line-clamp-2 text-gray-100 hover:text-[#b8860b] transition-colors mb-2"
        >
          {product.name}
        </Link>
        {product.dimensions && (
          <p className="text-[11px] text-gray-500 mb-2">{product.dimensions}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#b8860b]">{formatPrice(product.price)}</span>
          <button
            onClick={(e) => {
              e.preventDefault()
              document.dispatchEvent(
                new CustomEvent('add-to-cart', {
                  detail: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: imgSrc,
                    slug: product.slug,
                  },
                })
              )
            }}
            className="p-2 bg-[#b8860b] text-white rounded-lg hover:bg-[#a07608] transition-colors"
            aria-label="Thêm vào giỏ"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
