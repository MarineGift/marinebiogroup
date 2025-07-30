import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n/request'

export default createMiddleware({
  // 지원하는 언어 목록
  locales,
  
  // 기본 언어
  defaultLocale: 'en',
  
  // 언어 감지 방식
  localeDetection: true
})

export const config = {
  // '/api', '/_next', '/_vercel' 경로는 제외
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ko|en)/:path*',
    
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
}
