'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"

export function CartDrawer() {
  const [open, setOpen] = useState(false)
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  useEffect(() => {
    const openHandler = () => setOpen(true)
    const toggleHandler = () => setOpen((prev) => !prev)
    document.body.addEventListener('open-cart', openHandler)
    document.body.addEventListener('toggle-cart', toggleHandler)
    return () => {
      document.body.removeEventListener('open-cart', openHandler)
      document.body.removeEventListener('toggle-cart', toggleHandler)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0f172a] border-l border-gray-800 shadow-xl shadow-black/40 cart-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#b8860b]" />
            <span className="font-semibold text-lg text-white">Giỏ Hàng ({items.length})</span>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm text-gray-400">Giỏ hàng trống</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-800 last:border-0">
                <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/san-pham/${item.slug}`}
                    className="text-sm font-medium text-gray-200 line-clamp-2 hover:text-[#b8860b] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm font-semibold text-[#b8860b] mt-1">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-700 rounded-md bg-[#1a2236]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-medium text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                      aria-label="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-800 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Tạm tính</span>
              <span className="font-bold text-lg text-white">{formatPrice(getTotal())}</span>
            </div>
            <Link
              href="/gio-hang"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3 bg-[#1a2236] text-white text-sm font-medium rounded-lg hover:bg-[#253048] transition-colors"
            >
              Xem Giỏ Hàng
            </Link>
            <Link
              href="/thanh-toan"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3 bg-[#b8860b] text-white text-sm font-medium rounded-lg hover:bg-[#a07608] transition-colors"
            >
              Thanh Toán
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
