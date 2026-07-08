'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
  image: string | null
  parentId: number | null
  _count?: { products: number }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', image: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchCategories = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/categories')
    const data = await res.json()
    setCategories(data.categories || [])
    setLoading(false)
  }

  useEffect(() => { fetchCategories() }, [])

  const resetForm = () => {
    setForm({ name: '', slug: '', image: '' })
    setShowForm(false)
    setEditing(null)
    setError('')
  }

  const openEdit = (cat: Category) => {
    setForm({ name: cat.name, slug: cat.slug, image: cat.image || '' })
    setEditing(cat.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const isEdit = editing !== null
    const url = isEdit ? `/api/admin/categories/${editing}` : '/api/admin/categories'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Lỗi')
        return
      }

      await fetchCategories()
      resetForm()
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Xóa danh mục "${name}"?`)) return
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    if (res.ok) {
      await fetchCategories()
    }
  }

  if (loading) return <div className="text-gray-400 text-center py-20">Đang tải…</div>

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Danh mục</h1>
          <p className="text-sm text-gray-400 mt-1">{categories.length} danh mục</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', slug: '', image: '' }) }}
            className="flex items-center gap-1.5 bg-[#b8860b] hover:bg-[#a07608] text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm danh mục
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0f172a] border border-gray-800 rounded-xl p-4 space-y-3">
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tên *</label>
              <input
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Slug</label>
              <input
                value={form.slug}
                onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">URL ảnh</label>
            <input
              value={form.image}
              onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1 bg-[#b8860b] hover:bg-[#a07608] disabled:opacity-50 text-white text-sm px-4 py-1.5 rounded-lg transition-colors"
            >
              {saving ? '…' : editing ? <><Check className="w-3.5 h-3.5" /> Cập nhật</> : <><Plus className="w-3.5 h-3.5" /> Tạo</>}
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="text-left p-3 font-medium">ID</th>
              <th className="text-left p-3 font-medium">Tên</th>
              <th className="text-left p-3 font-medium">Slug</th>
              <th className="text-center p-3 font-medium">Số SP</th>
              <th className="text-right p-3 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                <td className="p-3 text-gray-500">#{cat.id}</td>
                <td className="p-3 text-white font-medium">{cat.name}</td>
                <td className="p-3 text-gray-500 text-xs font-mono">{cat.slug}</td>
                <td className="p-3 text-center text-gray-400">{cat._count?.products || 0}</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(cat)} className="p-1.5 text-gray-400 hover:text-[#b8860b]">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cat.id, cat.name)} className="p-1.5 text-gray-400 hover:text-red-400">
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
  )
}
