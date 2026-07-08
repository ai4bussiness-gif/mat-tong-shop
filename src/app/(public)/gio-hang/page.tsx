'use client'

import Link from "next/link"
import { Trash2, Minus, Plus, ShoppingBag, ChevronRight } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()

  return (
    <div className="container-page py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#b8860b] transition-colors">Trang Chủ</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Giỏ Hàng</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-8">Giỏ Hàng</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">Giỏ hàng trống</p>
          <p className="text-sm mb-6">Hãy thêm sản phẩm vào giỏ để tiếp tục</p>
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-6 py-3 bg-[#b8860b] text-white text-sm font-medium rounded-lg hover:bg-[#a07608] transition-colors"
          >
            Mua Sắm Ngay <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-[#e2e8f0] rounded-lg">
                <Link href={`/san-pham/${item.slug}`} className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image || '/placeholder.svg'} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/san-pham/${item.slug}`}
                    className="text-sm font-medium line-clamp-2 hover:text-[#b8860b] transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm font-bold text-[#b8860b] mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#e2e8f0] rounded-md">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-50 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm font-medium min-w-[40px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-50 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border border-[#e2e8f0] rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Tổng Đơn Hàng</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Tạm tính ({getItemCount()} sản phẩm)</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
                <div className="border-t border-[#e2e8f0] pt-3 flex justify-between font-bold text-base">
                  <span>Tổng cộng</span>
                  <span className="text-[#b8860b]">{formatPrice(getTotal())}</span>
                </div>
              </div>
              <Link
                href="/thanh-toan"
                className="block w-full text-center py-3 mt-6 bg-[#b8860b] text-white text-sm font-semibold rounded-lg hover:bg-[#a07608] transition-colors"
              >
                Tiến Hành Thanh Toán
              </Link>
              <Link href="/" className="block w-full text-center py-2 mt-3 text-sm text-gray-500 hover:text-[#b8860b] transition-colors">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
