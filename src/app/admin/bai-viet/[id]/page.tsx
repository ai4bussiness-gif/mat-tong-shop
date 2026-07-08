'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('/api/admin/blog')
      const data = await res.json()
      const post = (data.posts || []).find((p: any) => p.id === parseInt(params.id as string))
      if (post) {
        setForm({
          title: post.title,
          slug: post.slug,
          content: post.content || '',
          excerpt: post.excerpt || '',
          image: post.image || '',
          published: post.published,
        })
      }
      setLoading(false)
    }
    fetchPost()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/blog/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Lỗi cập nhật')
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

  if (loading) return <div className="text-gray-400 text-center py-20">Đang tải…</div>

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/admin/bai-viet" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Sửa bài viết</h1>
          <p className="text-sm text-gray-400 mt-1">{form.title}</p>
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
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">URL ảnh đại diện</label>
          <input
            value={form.image}
            onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))}
            className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Mô tả ngắn</label>
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
            rows={14}
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
          Đã đăng
        </label>

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
