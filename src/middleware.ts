import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['fr', 'en', 'ja']
const defaultLocale = 'fr'

const isAssetPath = (pathname: string) => {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isAssetPath(pathname)) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const candidateLocale = segments[0]

  if (candidateLocale && locales.includes(candidateLocale)) {
    const strippedPath = `/${segments.slice(1).join('/')}` || '/'
    const url = request.nextUrl.clone()
    url.pathname = strippedPath

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', candidateLocale)

    const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
    response.cookies.set('tv_locale', candidateLocale, { path: '/' })
    return response
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', defaultLocale)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.cookies.set('tv_locale', defaultLocale, { path: '/' })
  return response
}

export const config = {
  matcher: ['/((?!_next|api|admin|favicon.ico).*)'],
}
