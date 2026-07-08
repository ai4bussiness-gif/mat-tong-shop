'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    images: '',
    dimensions: '',
    weight: '',
    material: '',
    vendor: 'Mật Tông',
    inStock: true,
    featured: false,
    categoryId: '',
  })

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      const product = (data.products || []).find((p: any) => p.id === parseInt(params.id as string))
      if (product) {
        setForm({
          name: product.name,
          slug: product.slug,
          description: product.description || '',
          price: String(product.price),
          images: (() => {
            try { return JSON.parse(product.images).join('\n') } catch { return product.images }
          })(),
          dimensions: product.dimensions || '',
          weight: product.weight || '',
          material: product.material || '',
          vendor: product.vendor || 'Mật Tông',
          inStock: product.inStock,
          featured: product.featured,
          categoryId: product.categoryId ? String(product.categoryId) : '',
        })
      }
      setLoading(false)
    }
    fetchProduct()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const imagesArr = form.images
        ? form.images.split('\n').map(s => s.trim()).filter(Boolean)
        : []

      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
          images: JSON.stringify(imagesArr),
          categoryId: form.categoryId || null,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Lỗi cập nhật')
        return
      }

      router.push('/admin/san-pham')
      router.refresh()
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-gray-400 text-center py-20">Đang tải…</div>

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/admin/san-pham" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Sửa sản phẩm</h1>
          <p className="text-sm text-gray-400 mt-1">{form.name}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Tên sản phẩm *</label>
            <input
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value, slug: slugify(e.target.value) }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Mô tả</label>
            <textarea
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] resize-y"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Giá (VNĐ) *</label>
            <input
              type="number"
              value={form.price}
              onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Danh mục ID</label>
            <input
              type="number"
              value={form.categoryId}
              onChange={e => setForm(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
              placeholder="1-9"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Chất liệu</label>
            <input
              value={form.material}
              onChange={e => setForm(prev => ({ ...prev, material: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Thương hiệu</label>
            <input
              value={form.vendor}
              onChange={e => setForm(prev => ({ ...prev, vendor: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Kích thước</label>
            <input
              value={form.dimensions}
              onChange={e => setForm(prev => ({ ...prev, dimensions: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Cân nặng</label>
            <input
              value={form.weight}
              onChange={e => setForm(prev => ({ ...prev, weight: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Ảnh (mỗi URL 1 dòng)</label>
            <textarea
              value={form.images}
              onChange={e => setForm(prev => ({ ...prev, images: e.target.value }))}
              rows={3}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] resize-y font-mono text-xs"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={e => setForm(prev => ({ ...prev, inStock: e.target.checked }))}
                className="accent-[#b8860b]"
              />
              Còn hàng
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                className="accent-[#b8860b]"
              />
              Nổi bật
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#b8860b] hover:bg-[#a07608] disabled:opacity-50 text-white text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Đang lưu…' : 'Cập nhật'}
          </button>
        </div>
      </form>
    </div>
  )
}
