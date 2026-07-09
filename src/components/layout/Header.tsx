'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Search, User, ShoppingBag, X, ChevronDown } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { categories } from "@/lib/constants"
import { siteConfig } from "@/lib/constants"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const itemCount = useCartStore((s) => s.getItemCount())
  const router = useRouter()

  useEffect(() => { setMounted(true) }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      <header className="bg-[#0b1120] border-b border-gray-800 sticky top-0 z-40">
        <div className="container-page flex items-center justify-between h-16 lg:h-18">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="logo-shimmer">
              <img
                src="https://res.cloudinary.com/zgl5avbd/image/upload/v1783574851/mat-tong/logo.png"
                alt="Mật Tông"
                className="logo-gold"
                style={{ height: '48px', maxWidth: 'none' }}
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2.5 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
            >
              Trang Chủ
            </Link>
            <div className="relative group">
              <button className="px-4 py-2.5 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg flex items-center gap-1.5">
                Danh Mục <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 bg-[#0f172a] border border-gray-700 rounded-xl py-2 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl shadow-black/20">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/danh-muc/${cat.slug}`}
                    className="block px-5 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/blog"
              className="px-4 py-2.5 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
            >
              Bài Viết
            </Link>
            <Link
              href="/lien-he"
              className="px-4 py-2.5 text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/admin" className="p-2 text-gray-300 hover:text-white transition-colors hidden sm:block" aria-label="Login">
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => router.push('/gio-hang')}
              className="p-2 text-gray-300 hover:text-white transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#b8860b] text-white text-[11px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-20 sm:pt-32">
          <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Tìm Kiếm</h3>
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tượng, pháp khí..."
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]/30 focus:border-[#b8860b]"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#b8860b] text-white text-sm font-medium rounded-xl hover:bg-[#a07608] transition-colors"
              >
                Tìm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 lg:hidden">
          <div className="w-72 max-w-[85vw] h-full bg-[#0b1120] border-r border-gray-800 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <div className="logo-shimmer">
                  <img
                    src="https://res.cloudinary.com/zgl5avbd/image/upload/v1783574851/mat-tong/logo.png"
                    alt="Mật Tông"
                    className="logo-gold"
                    style={{ height: '40px', maxWidth: 'none' }}
                  />
                </div>
              </Link>
              <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Link
                href="/"
                className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Trang Chủ
              </Link>
              <p className="px-3 py-1.5 mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Danh Mục</p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/danh-muc/${cat.slug}`}
                  className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-800 space-y-1">
                <Link
                  href="/blog"
                  className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Bài Viết
                </Link>
                <Link
                  href="/admin"
                  className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Quản Trị
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
