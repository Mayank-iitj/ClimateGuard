import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = 
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/climate-risk') ||
    pathname.startsWith('/impact') ||
    pathname.startsWith('/resilience-plan') ||
    pathname.startsWith('/finance-pack') ||
    pathname.startsWith('/settings');

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoggedIn && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
