import Link from 'next/link'
import { prisma } from '@/lib/db'
import {
  ShoppingBag,
  Package,
  FileText,
  FolderTree,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react'

async function getStats() {
  const [productCount, orderCount, categoryCount, blogCount, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.category.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  const totalRevenue = await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: { not: 'cancelled' } },
  })

  return {
    productCount,
    orderCount,
    categoryCount,
    blogCount,
    totalRevenue: totalRevenue._sum.total || 0,
    recentOrders,
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    {
      label: 'Đơn hàng',
      value: stats.orderCount,
      icon: ShoppingBag,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      href: '/admin/don-hang',
    },
    {
      label: 'Sản phẩm',
      value: stats.productCount,
      icon: Package,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      href: '/admin/san-pham',
    },
    {
      label: 'Danh mục',
      value: stats.categoryCount,
      icon: FolderTree,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      href: '/admin/danh-muc',
    },
    {
      label: 'Bài viết',
      value: stats.blogCount,
      icon: FileText,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      href: '/admin/bai-viet',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Tổng quan</h1>
        <p className="text-sm text-gray-400 mt-1">Dashboard quản trị Mật Tông Shop</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className={`${card.color} border rounded-xl p-4 hover:opacity-80 transition-opacity`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs mt-1 opacity-80">{card.label}</p>
            </Link>
          )
        })}
      </div>

      {/* Revenue */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-4 h-4 text-[#b8860b]" />
          <h2 className="text-sm font-semibold text-white">Doanh thu</h2>
        </div>
        <p className="text-2xl font-bold text-[#b8860b]">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue)}
        </p>
        <p className="text-xs text-gray-500 mt-1">Tổng doanh thu (không tính đã hủy)</p>
      </div>

      {/* Recent orders */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Đơn hàng gần đây</h2>
          <Link
            href="/admin/don-hang"
            className="text-xs text-[#b8860b] hover:text-[#c9971a] transition-colors"
          >
            Xem tất cả →
          </Link>
        </div>
        {stats.recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Chưa có đơn hàng</p>
        ) : (
          <div className="space-y-2">
            {stats.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
              >
                <div>
                  <p className="text-sm text-white font-medium">#{order.id} — {order.customerName}</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#b8860b]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                  </p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    order.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400' :
                    order.status === 'shipping' ? 'bg-purple-500/10 text-purple-400' :
                    order.status === 'delivered' ? 'bg-green-500/10 text-green-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {order.status === 'pending' ? 'Chờ XN' :
                     order.status === 'confirmed' ? 'Đã XN' :
                     order.status === 'shipping' ? 'Đang giao' :
                     order.status === 'delivered' ? 'Đã giao' : 'Đã hủy'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
