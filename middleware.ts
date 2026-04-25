import { NextRequest, NextResponse } from 'next/server'

const LOCALE_COOKIE = 'preferred-lang'

function getLocaleFromPath(pathname: string) {
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return 'ar'
  return 'en'
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/en'
    const res = NextResponse.redirect(url, 308)
    res.cookies.set(LOCALE_COOKIE, 'en', {
      path: '/',
      sameSite: 'lax',
    })
    return res
  }

  const res = NextResponse.next()
  res.cookies.set(LOCALE_COOKIE, getLocaleFromPath(pathname), {
    path: '/',
    sameSite: 'lax',
  })
  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|og-image.jpg|logos).*)'],
}
