import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  
  // Check if request is HTTP (Vercel uses x-forwarded-proto header)
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const isHttp = forwardedProto === 'http' || url.protocol === 'http:'

  // Force HTTPS redirect (if not already HTTPS)
  if (isHttp) {
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  // Redirect non-www to www (for theorangecode.com domain)
  // This ensures canonical URLs always use www.theorangecode.com
  if (hostname === 'theorangecode.com' || hostname.startsWith('theorangecode.com:')) {
    url.hostname = 'www.theorangecode.com'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  // IP-based access control for /uk-to-uae-relocation page
  // Only allow UK IP addresses to access this page
  if (pathname === '/uk-to-uae-relocation') {
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

