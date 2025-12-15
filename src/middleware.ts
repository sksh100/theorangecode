import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  const originalUrl = request.nextUrl
  
  const hasDevParam = originalUrl.searchParams.get('dev') === 'true'
  
  // Check if request is HTTP (Vercel uses x-forwarded-proto header)
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const isHttp = forwardedProto === 'http' || url.protocol === 'http:'

  // Force HTTPS redirect (if not already HTTPS)
  if (isHttp) {
    url.protocol = 'https:'
    // Preserve dev parameter if present
    if (hasDevParam) {
      url.searchParams.set('dev', 'true')
    }
    return NextResponse.redirect(url, 301)
  }

  // Redirect non-www to www (for theorangecode.com domain)
  // This ensures canonical URLs always use www.theorangecode.com
  if (hostname === 'theorangecode.com' || hostname.startsWith('theorangecode.com:')) {
    url.hostname = 'www.theorangecode.com'
    url.protocol = 'https:'
    // Preserve dev parameter if present
    if (hasDevParam) {
      url.searchParams.set('dev', 'true')
    }
    return NextResponse.redirect(url, 301)
  }

  // Redirect /moving-to-uae to homepage (page removed)
  if (pathname === '/moving-to-uae') {
    url.pathname = '/'
    return NextResponse.redirect(url, 301)
  }

  // IP-based access control removed - /uk-to-uae-relocation page is now visible to all users

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

