import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, getAuthCookieName } from './src/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes, except login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get(getAuthCookieName())?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Prevent browser caching of HTML pages (fix stale cache on mobile)
  const response = NextResponse.next()
  if (!pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/((?!_next/static|favicon.ico).*)'],
}
