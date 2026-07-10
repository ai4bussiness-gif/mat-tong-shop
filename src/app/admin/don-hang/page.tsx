'use client'

import { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { orderStatusMap } from '@/lib/constants'
import type { Order } from '@/types'

const STATUS_FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ XN' },
  { key: 'confirmed', label: 'Đã XN' },
  { key: 'shipping', label: 'Đang giao' },
  { key: 'delivered', label: 'Đã giao' },
  { key: 'cancelled', label: 'Đã hủy' },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filter !== 'all') params.set('status', filter)
    params.set('page', String(page))
    params.set('limit', '20')

    fetch(`/api/orders?${params}`)
      .then(r => r.json())
      .then(d => {
        setOrders(d.orders || [])
        setTotal(d.total || 0)
        setTotalPages(d.totalPages || 1)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchOrders() }, [filter, page])

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    fetchOrders()
  }

  const togglePaid = async (id: number, paid: boolean) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, paid }),
    })
    fetchOrders()
  }

  // Reset page khi đổi filter
  const changeFilter = (key: string) => {
    setFilter(key)
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Đơn hàng</h1>
          <p className="text-sm text-gray-400 mt-1">Tổng số: {total} đơn</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {STATUS_FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => changeFilter(f.key)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === f.key
                ? 'bg-[#b8860b] text-white'
                : 'bg-[#1a2236] text-gray-400 hover:text-white hover:bg-[#243044] border border-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 bg-[#0f172a] border border-gray-800 rounded-xl">
          <p>Đang tải...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-[#0f172a] border border-gray-800 rounded-xl">
          <p>Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-white">
                    {order.orderCode || `#${order.id}`}
                    <span className="text-sm font-normal text-gray-400 ml-2">— {order.customerName}</span>
                  </p>
                  <p className="text-sm text-gray-400">{order.customerPhone} | {order.customerEmail}</p>
                  <p className="text-sm text-gray-500">{order.customerAddress}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#b8860b] text-lg">{formatPrice(order.total)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                    order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                    order.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    order.status === 'shipping' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    order.status === 'delivered' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {orderStatusMap[order.status] || order.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap mt-3">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="text-xs bg-[#1a2236] border border-gray-700 text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#b8860b]"
                >
                  {Object.entries(orderStatusMap).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>

                <label className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={order.paid}
                    onChange={(e) => togglePaid(order.id, e.target.checked)}
                    className="accent-[#b8860b]"
                  />
                  Đã thanh toán
                </label>

                <span className="text-xs text-gray-500">
                  {new Date(order.createdAt as string).toLocaleDateString('vi-VN', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              </div>

              {order.note && (
                <div className="mt-3 text-xs text-gray-400 bg-[#1a2236] p-2 rounded-lg">
                  Ghi chú: {order.note}
                </div>
              )}

              {order.transferContent && (
                <div className="mt-2 text-xs text-gray-400 bg-[#1a2236] p-2 rounded-lg">
                  Nội dung CK: <span className="text-[#b8860b] font-mono">{order.transferContent}</span>
                </div>
              )}

              {order.paymentProof && (
                <div className="mt-2">
                  <details className="group">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition-colors flex items-center gap-1.5">
                      <span>📷 Xem ảnh xác nhận thanh toán</span>
                    </summary>
                    <div className="mt-2">
                      <img
                        src={order.paymentProof}
                        alt="Xác nhận thanh toán"
                        className="w-full max-w-sm rounded-lg border border-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(order.paymentProof!, '_blank')}
                      />
                    </div>
                  </details>
                </div>
              )}

              <details className="mt-3">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition-colors">
                  Chi tiết sản phẩm ({JSON.parse(order.items).length} món)
                </summary>
                <div className="mt-2 space-y-2 bg-[#1a2236] rounded-lg p-3">
                  {JSON.parse(order.items).map((item: any, i: number) => (
                    <div key={i} className="border-b border-gray-700/50 last:border-0 pb-2 last:pb-0">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{item.name} × {item.quantity}</span>
                        <span className="text-[#b8860b] font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      {(item.dimensions || item.material || item.weight) && (
                        <div className="flex gap-3 mt-1 text-xs text-gray-500">
                          {item.dimensions && <span>📏 {item.dimensions}</span>}
                          {item.material && <span>🧱 {item.material}</span>}
                          {item.weight && <span>⚖️ {item.weight}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3.5 py-1.5 text-xs font-medium bg-[#1a2236] text-gray-400 rounded-lg border border-gray-700 hover:text-white hover:bg-[#243044] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 text-xs font-medium rounded-lg transition-colors ${
                page === p
                  ? 'bg-[#b8860b] text-white'
                  : 'bg-[#1a2236] text-gray-400 border border-gray-700 hover:text-white hover:bg-[#243044]'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-3.5 py-1.5 text-xs font-medium bg-[#1a2236] text-gray-400 rounded-lg border border-gray-700 hover:text-white hover:bg-[#243044] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  )
}
