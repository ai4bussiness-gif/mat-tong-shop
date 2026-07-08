'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

export default function AddProductPage() {
  const router = useRouter()
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

  const handleNameChange = (name: string) => {
    setForm(prev => ({
      ...prev,
      name,
      slug: prev.slug === slugify(prev.name) || !prev.slug ? slugify(name) : prev.slug,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const imagesArr = form.images
        ? form.images.split('\n').map(s => s.trim()).filter(Boolean)
        : []

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
          images: JSON.stringify(imagesArr),
          slug: form.slug || slugify(form.name),
          categoryId: form.categoryId || null,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Lỗi tạo sản phẩm')
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

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/admin/san-pham" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Thêm sản phẩm</h1>
          <p className="text-sm text-gray-400 mt-1">Tạo sản phẩm mới</p>
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
              onChange={e => handleNameChange(e.target.value)}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] font-mono text-xs"
              placeholder="tu-phat-thich-ca"
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
              placeholder="Đồng, Mạ vàng…"
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
              placeholder="25cm × 15cm × 10cm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Cân nặng</label>
            <input
              value={form.weight}
              onChange={e => setForm(prev => ({ ...prev, weight: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
              placeholder="1.5 kg"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Ảnh (mỗi URL 1 dòng)</label>
            <textarea
              value={form.images}
              onChange={e => setForm(prev => ({ ...prev, images: e.target.value }))}
              rows={3}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] resize-y font-mono text-xs"
              placeholder="https://nidhiratna.com/images/xxx.jpg"
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
            {saving ? 'Đang lưu…' : 'Lưu sản phẩm'}
          </button>
        </div>
      </form>
    </div>
  )
}
