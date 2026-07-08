import { NextRequest, NextResponse } from 'next/server'
import { signToken, getAuthCookieName } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mattongshop.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin'

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 })
    }

    const token = await signToken({ email })

    const response = NextResponse.json({ success: true })
    response.cookies.set(getAuthCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
