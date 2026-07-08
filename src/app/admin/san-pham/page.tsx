'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<(Product & { category: { name: string } | null })[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/products')
    const data = await res.json()
    setProducts(data.products || [])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  if (loading) return <div className="text-gray-400 text-center py-20">Đang tải…</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Sản phẩm</h1>
          <p className="text-sm text-gray-400 mt-1">{products.length} sản phẩm</p>
        </div>
        <Link
          href="/admin/san-pham/them"
          className="flex items-center gap-1.5 bg-[#b8860b] hover:bg-[#a07608] text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-[#0f172a] border border-gray-800 rounded-xl">
          <p>Chưa có sản phẩm nào</p>
        </div>
      ) : (
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="text-left p-3 font-medium">ID</th>
                  <th className="text-left p-3 font-medium">Tên</th>
                  <th className="text-left p-3 font-medium">Danh mục</th>
                  <th className="text-left p-3 font-medium">Giá</th>
                  <th className="text-center p-3 font-medium">Tồn kho</th>
                  <th className="text-center p-3 font-medium">Nổi bật</th>
                  <th className="text-right p-3 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="p-3 text-gray-500">#{p.id}</td>
                    <td className="p-3">
                      <p className="text-white font-medium line-clamp-1">{p.name}</p>
                      <p className="text-gray-500 text-[11px] mt-0.5">{p.slug}</p>
                    </td>
                    <td className="p-3">
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                        {p.category?.name || '—'}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-[#b8860b]">{formatPrice(p.price)}</td>
                    <td className="p-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.inStock ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {p.inStock ? 'Còn' : 'Hết'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {p.featured && <span className="text-[#b8860b] text-xs">★</span>}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/san-pham/${p.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#b8860b] transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
