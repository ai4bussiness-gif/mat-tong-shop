'use client'

import { useEffect, useState } from "react"
import { ShoppingBag, Package, FileText, LogOut } from "lucide-react"
import Link from "next/link"
import type { Order, Product } from "@/types"
import { formatPrice } from "@/lib/utils"
import { orderStatusMap } from "@/lib/constants"

export default function AdminPage() {
  const [tab, setTab] = useState<string>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/orders').then(r => r.json()).then(d => setOrders(d.orders || []))
    fetch('/api/products').then(r => r.json()).then(d => setProducts(d.products || []))
  }, [])

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const tabs = [
    { id: 'orders', label: 'Đơn Hàng', icon: ShoppingBag, count: orders.length },
    { id: 'products', label: 'Sản Phẩm', icon: Package, count: products.length },
    { id: 'blog', label: 'Bài Viết', icon: FileText },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-lg">MẬT TÔNG</Link>
            <span className="text-xs bg-[#b8860b]/20 text-[#b8860b] px-2 py-0.5 rounded">Admin</span>
          </div>
          <Link href="/" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
            <LogOut className="w-3.5 h-3.5" /> Về trang chủ
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab bar */}
        <div className="flex gap-2 mb-6 border-b border-[#e2e8f0] pb-3">
          {tabs.map(t => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  tab === t.id ? 'bg-[#0f172a] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
                {'count' in t && <span className="text-xs opacity-60">({t.count})</span>}
              </button>
            )
          })}
        </div>

        {/* Orders tab */}
        {tab === 'orders' && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="text-center py-20 text-gray-400">Chưa có đơn hàng</div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white rounded-lg border border-[#e2e8f0] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">#{order.id} — {order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerPhone} | {order.customerEmail}</p>
                      <p className="text-sm text-gray-400">{order.customerAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#b8860b]">{formatPrice(order.total)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'shipping' ? 'bg-purple-100 text-purple-700' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {orderStatusMap[order.status] || order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-xs border border-[#e2e8f0] rounded px-2 py-1"
                    >
                      {Object.entries(orderStatusMap).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                    {order.note && <p className="text-xs text-gray-400">Ghi chú: {order.note}</p>}
                  </div>
                  <details className="mt-3">
                    <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">Xem sản phẩm</summary>
                    <div className="mt-2 space-y-1">
                      {JSON.parse(order.items).map((item: any, i: number) => (
                        <p key={i} className="text-xs text-gray-600">{item.name} x{item.quantity} — {formatPrice(item.price * item.quantity)}</p>
                      ))}
                    </div>
                  </details>
                </div>
              ))
            )}
          </div>
        )}

        {/* Products tab */}
        {tab === 'products' && (
          <div>
            <p className="text-sm text-gray-500 mb-4">{products.length} sản phẩm</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white rounded-lg border border-[#e2e8f0] p-4">
                  <p className="font-medium text-sm line-clamp-2 mb-1">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category?.name} | {p.dimensions || ''}</p>
                  <p className="text-sm font-bold text-[#b8860b] mt-2">{formatPrice(p.price)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog tab */}
        {tab === 'blog' && (
          <div className="text-center py-20 text-gray-400">
            <p>Quản lý bài viết — đang phát triển</p>
          </div>
        )}
      </div>
    </div>
  )
}
