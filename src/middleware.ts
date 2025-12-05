import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  const protocol = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol

  // Force HTTPS redirect (if not already HTTPS)
  if (protocol === 'http:' || !protocol.includes('https')) {
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  // Redirect non-www to www (for theorangecode.com domain)
  // This ensures canonical URLs always use www.theorangecode.com
  if (hostname === 'theorangecode.com' || hostname.startsWith('theorangecode.com:')) {
    url.hostname = 'www.theorangecode.com'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|flavicon).*)',
  ],
}

