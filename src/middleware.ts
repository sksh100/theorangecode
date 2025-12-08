import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  const originalUrl = request.nextUrl
  
  // Check for UK page bypass methods FIRST (before any redirects)
  // This ensures query parameters are preserved
  const isUKPage = pathname === '/uk-to-uae-relocation'
  const hasDevParam = originalUrl.searchParams.get('dev') === 'true'
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1') || hostname.includes('0.0.0.0')
  const disableIPCheck = (process.env.DISABLE_UK_IP_CHECK || '').toLowerCase() === 'true'
  const cookieBypass = request.cookies.get('uk_bypass')?.value === 'true'
  const headerBypass = request.headers.get('x-uk-bypass') === 'true'
  const bypassUKCheck = isLocalhost || hasDevParam || disableIPCheck || cookieBypass || headerBypass
  
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

  // IP-based access control for /uk-to-uae-relocation page
  // Only allow UK IP addresses to access this page
  if (isUKPage) {
    // Allow access if any bypass method is active
    if (bypassUKCheck) {
      return NextResponse.next()
    }
    
    // Get country from Vercel geolocation headers
    const country = request.headers.get('x-vercel-ip-country') || 
                    request.headers.get('cf-ipcountry') || // Cloudflare fallback
                    null
    
    // If country is not UK (GB), redirect to homepage
    if (country && country !== 'GB') {
      url.pathname = '/'
      return NextResponse.redirect(url, 302)
    }
    
    // If country is unknown but we have IP, we could use an API to check
    // For now, allow access if country is not detected (to avoid blocking legitimate UK users)
    // You can add additional IP checking logic here if needed
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

