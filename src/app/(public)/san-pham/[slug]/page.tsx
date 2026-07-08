'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, Check, Share2, ChevronLeft, ChevronRight, Package } from "lucide-react"
import { formatPrice, parseImages } from "@/lib/utils"
import { useCartStore } from "@/lib/store"
import { ShareButton } from "@/components/ui/ShareButton"
import type { Product } from "@/types"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImg, setCurrentImg] = useState(0)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    fetch(`/api/products?search=${params.slug}`)
      .then((r) => r.json())
      .then((data) => {
        const p = data.products?.find((p: any) => p.slug === params.slug)
        setProduct(p || null)
        setLoading(false)
      })
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120]">
        <div className="container-page py-20 text-center text-gray-500">
          <div className="animate-pulse space-y-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto" />
            <p className="text-gray-500">Đang tải...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b1120]">
        <div className="container-page py-20 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h1 className="text-2xl font-bold text-white mb-2">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-400 text-sm mb-6">Sản phẩm này không tồn tại hoặc đã bị xóa</p>
          <Link href="/" className="inline-flex items-center gap-1 px-6 py-3 bg-[#b8860b] text-white text-sm font-medium rounded-lg hover:bg-[#a07608] transition-colors">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const images = parseImages(product.images)

  const handleAddToCart = () => {
    if (!images[0]) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
      slug: product.slug,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    document.body.dispatchEvent(new CustomEvent('open-cart'))
  }

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <div className="container-page py-6 sm:py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#b8860b] transition-colors">Trang Chủ</Link>
          <span className="text-gray-700">/</span>
          {product.category && (
            <>
              <Link href={`/danh-muc/${product.category.slug}`} className="hover:text-[#b8860b] transition-colors">
                {product.category.name}
              </Link>
              <span className="text-gray-700">/</span>
            </>
          )}
          <span className="text-gray-300 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ─── Image gallery ─── */}
          <div>
            {images.length > 0 ? (
              <>
                <div className="aspect-square bg-gray-800 rounded-xl overflow-hidden mb-3 relative">
                  <img
                    key={currentImg}
                    src={images[currentImg]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImg((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                        aria-label="Ảnh trước"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentImg((i) => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                        aria-label="Ảnh sau"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {/* Image counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                      {currentImg + 1} / {images.length}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        i === currentImg
                          ? 'border-[#b8860b] ring-1 ring-[#b8860b]/30'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                <Package className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* ─── Product info ─── */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 sm:p-8">
            {product.vendor && (
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{product.vendor}</p>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">{product.name}</h1>

            <div className="text-3xl font-bold text-[#b8860b] mb-6">{formatPrice(product.price)}</div>

            {/* Specs */}
            <div className="space-y-3 mb-8">
              {product.dimensions && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 w-24 flex-shrink-0">Kích thước:</span>
                  <span className="text-gray-300 font-medium">{product.dimensions}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 w-24 flex-shrink-0">Trọng lượng:</span>
                  <span className="text-gray-300 font-medium">{product.weight}</span>
                </div>
              )}
              {product.material && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 w-24 flex-shrink-0">Chất liệu:</span>
                  <span className="text-gray-300 font-medium">{product.material}</span>
                </div>
              )}
              {product.category && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 w-24 flex-shrink-0">Danh mục:</span>
                  <Link href={`/danh-muc/${product.category.slug}`} className="text-[#b8860b] hover:underline font-medium">
                    {product.category.name}
                  </Link>
                </div>
              )}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                added
                  ? "bg-green-600 text-white"
                  : product.inStock
                  ? "bg-[#b8860b] text-white hover:bg-[#a07608] active:bg-[#8e6507]"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Đã thêm vào giỏ
                </>
              ) : product.inStock ? (
                <>
                  <ShoppingBag className="w-4 h-4" /> Thêm Vào Giỏ Hàng
                </>
              ) : (
                "Tạm hết hàng"
              )}
            </button>

            {/* Share */}
            <div className="mt-4">
              <ShareButton className="w-full" />
            </div>

            {/* Description */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h2 className="text-lg font-semibold text-white mb-4">Mô Tả</h2>
              <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
