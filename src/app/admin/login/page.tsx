'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Đăng nhập thất bại')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-2">
            <div className="logo-shimmer">
              <img
                src="https://res.cloudinary.com/zgl5avbd/image/upload/v1783574851/mat-tong/logo.png"
                alt="Mật Tông"
                className="logo-gold"
                style={{ height: '48px', maxWidth: 'none' }}
              />
            </div>
          </Link>
          <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] transition-colors"
              placeholder="admin@mattongshop.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#b8860b] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b8860b] hover:bg-[#a07608] disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
          >
            {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
