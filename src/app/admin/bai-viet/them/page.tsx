'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

export default function AddBlogPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    published: false,
  })

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: prev.slug === slugify(prev.title) || !prev.slug ? slugify(title) : prev.slug,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug: form.slug || slugify(form.title),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Lỗi tạo bài viết')
        return
      }

      router.push('/admin/bai-viet')
      router.refresh()
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/admin/bai-viet" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Thêm bài viết</h1>
          <p className="text-sm text-gray-400 mt-1">Tạo bài viết blog mới</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Tiêu đề *</label>
          <input
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Slug</label>
          <input
            value={form.slug}
            onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
            className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] font-mono text-xs"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">URL ảnh đại diện</label>
          <input
            value={form.image}
            onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))}
            className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
            placeholder="https://nidhiratna.com/images/xxx.jpg"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Mô tả ngắn (excerpt)</label>
          <textarea
            value={form.excerpt}
            onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
            rows={2}
            className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] resize-y"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Nội dung (HTML) *</label>
          <textarea
            value={form.content}
            onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
            rows={12}
            className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] resize-y font-mono text-xs"
            required
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))}
            className="accent-[#b8860b]"
          />
          Đăng ngay
        </label>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#b8860b] hover:bg-[#a07608] disabled:opacity-50 text-white text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Đang lưu…' : 'Lưu bài viết'}
          </button>
        </div>
      </form>
    </div>
  )
}
