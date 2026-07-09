'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, Loader, LogIn } from "lucide-react"
import { formatPrice } from "@/lib/utils"

const STATUS_MAP: Record<string, { label: string; icon: any; color: string }> = {
  pending:    { label: "Chờ xác nhận", icon: Clock,     color: "text-yellow-400" },
  confirmed:  { label: "Đã xác nhận",  icon: CheckCircle, color: "text-blue-400" },
  shipping:   { label: "Đang giao",    icon: Truck,     color: "text-purple-400" },
  delivered:  { label: "Đã giao",      icon: CheckCircle, color: "text-green-400" },
  cancelled:  { label: "Đã hủy",       icon: XCircle,   color: "text-red-400" },
}

export default function DonHangPage() {
  const { data: session, status: authStatus } = useSession()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authStatus === "authenticated") {
      fetch("/api/orders/mine")
        .then((r) => r.json())
        .then((data) => {
          setOrders(data.orders || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else if (authStatus === "unauthenticated") {
      setLoading(false)
    }
  }, [authStatus])

  if (authStatus === "loading" || (authStatus === "authenticated" && loading)) {
    return (
      <div className="bg-[#0b1120] min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (authStatus === "unauthenticated") {
    return (
      <div className="bg-[#0b1120] min-h-screen">
        <div className="container-page py-20 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h1 className="text-2xl font-bold text-white mb-2">Đơn Hàng Của Tôi</h1>
          <p className="text-gray-400 mb-6">Vui lòng đăng nhập để xem đơn hàng của bạn.</p>
          <button
            onClick={() => {
              const { signIn } = require("next-auth/react")
              signIn("google")
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-lg transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Đăng nhập bằng Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0b1120] min-h-screen">
      <div className="container-page py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-6 h-6 text-[#b8860b]" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Đơn Hàng Của Tôi</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 mb-4">Chưa có đơn hàng nào.</p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 bg-[#b8860b] text-white text-sm font-medium rounded-lg hover:bg-[#a07608] transition-colors"
            >
              Mua Sắm Ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo = STATUS_MAP[order.status] || STATUS_MAP.pending
              const StatusIcon = statusInfo.icon
              const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items
              const itemCount = items?.reduce((s: number, i: any) => s + i.quantity, 0) || 0

              return (
                <div
                  key={order.id}
                  className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-semibold">
                        {order.orderCode || `#${order.id}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-sm ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="font-medium">{statusInfo.label}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {items?.slice(0, 3).map((item: any, i: number) => (
                      <div key={i} className="w-10 h-10 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {itemCount > 3 && (
                      <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center text-xs text-gray-500">
                        +{itemCount - 3}
                      </div>
                    )}
                    <div className="ml-auto text-right">
                      <p className="text-[#b8860b] font-bold">{formatPrice(order.total)}</p>
                      <p className="text-xs text-gray-500">{itemCount} sản phẩm</p>
                    </div>
                  </div>

                  {order.paymentProof && (
                    <div className="text-xs text-green-400 mb-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Đã gửi ảnh xác nhận thanh toán
                    </div>
                  )}

                  <details className="group">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition-colors list-none flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
                      Chi tiết giao hàng
                    </summary>
                    <div className="mt-2 text-xs text-gray-400 space-y-1 pl-4">
                      <p>{order.customerName} — {order.customerPhone}</p>
                      <p>{order.customerAddress}</p>
                      {order.note && <p className="text-gray-500">Ghi chú: {order.note}</p>}
                    </div>
                  </details>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
