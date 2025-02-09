import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { PUBLIC_ONLY_ROUTES, PUBLIC_ROUTES, NOT_AUTH_ROUTE, AFTER_AUTH_ROUTE } from './lib/routes'

const { auth } = NextAuth(authConfig)

const matchRoute = (url: string, routes: RegExp[]) => routes.some((route: RegExp) => route.test(url))

export default auth((req) => {
  const { nextUrl } = req

  const isAuthenticated = !!req.auth
  const isPublicRoute = matchRoute(nextUrl.pathname, PUBLIC_ROUTES)
  const isPublicOnlyRoute = matchRoute(nextUrl.pathname, PUBLIC_ONLY_ROUTES)

  if (isPublicOnlyRoute && isAuthenticated) {
    return Response.redirect(new URL(AFTER_AUTH_ROUTE, nextUrl))
  }

  if (!isPublicRoute && !isAuthenticated) {
    return Response.redirect(new URL(NOT_AUTH_ROUTE, nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg|icon.png|tonconnect-manifest.json).*)'],
}