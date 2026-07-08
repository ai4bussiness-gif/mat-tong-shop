'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  slug: string
  published: boolean
  image: string | null
  createdAt: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/blog')
    const data = await res.json()
    setPosts(data.posts || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Xóa bài viết "${title}"?`)) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  if (loading) return <div className="text-gray-400 text-center py-20">Đang tải…</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Bài viết</h1>
          <p className="text-sm text-gray-400 mt-1">{posts.length} bài viết</p>
        </div>
        <Link
          href="/admin/bai-viet/them"
          className="flex items-center gap-1.5 bg-[#b8860b] hover:bg-[#a07608] text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm bài viết
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-[#0f172a] border border-gray-800 rounded-xl">
          <p>Chưa có bài viết nào</p>
        </div>
      ) : (
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="text-left p-3 font-medium">ID</th>
                <th className="text-left p-3 font-medium">Tiêu đề</th>
                <th className="text-left p-3 font-medium">Slug</th>
                <th className="text-center p-3 font-medium">Trạng thái</th>
                <th className="text-left p-3 font-medium">Ngày</th>
                <th className="text-right p-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                  <td className="p-3 text-gray-500">#{post.id}</td>
                  <td className="p-3">
                    <p className="text-white font-medium line-clamp-1">{post.title}</p>
                  </td>
                  <td className="p-3 text-gray-500 text-xs font-mono">{post.slug}</td>
                  <td className="p-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.published
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {post.published ? 'Đã đăng' : 'Nháp'}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500 text-xs">
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/bai-viet/${post.id}`}
                        className="p-1.5 text-gray-400 hover:text-[#b8860b] transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
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
      )}
    </div>
  )
}
