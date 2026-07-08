'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FileText,
  FolderTree,
  LogOut,
  ChevronLeft,
  Menu,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/admin/don-hang', label: 'Đơn hàng', icon: ShoppingBag },
  { href: '/admin/san-pham', label: 'Sản phẩm', icon: Package },
  { href: '/admin/danh-muc', label: 'Danh mục', icon: FolderTree },
  { href: '/admin/bai-viet', label: 'Bài viết', icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0b1120] flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-60' : 'w-0 -ml-60'
        } bg-[#0f172a] border-r border-gray-800 flex-shrink-0 transition-all duration-200 overflow-hidden lg:w-60 lg:ml-0`}
      >
        <div className="w-60">
          {/* Logo */}
          <div className="h-14 flex items-center px-4 border-b border-gray-800">
            <Link href="/admin" className="font-bold text-lg text-white">
              MẬT TÔNG
            </Link>
            <span className="ml-2 text-[10px] bg-[#b8860b]/20 text-[#b8860b] px-1.5 py-0.5 rounded">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-[#b8860b]/10 text-[#b8860b] border border-[#b8860b]/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Bottom */}
          <div className="absolute bottom-0 w-60 p-3 border-t border-gray-800">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-800/50"
            >
              <ChevronLeft className="w-4 h-4" />
              Về trang chủ
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-red-500/10 w-full"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar mobile */}
        <header className="h-14 bg-[#0f172a] border-b border-gray-800 flex items-center px-4 gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white p-1"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-white font-semibold text-sm">MẬT TÔNG Admin</span>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
