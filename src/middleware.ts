import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 지원하는 언어 목록
  locales: ['en', 'ko', 'ja', 'es'],
  
  // 기본 언어
  defaultLocale: 'en'
});

export const config = {
  // matcher에서 정적 자원 제외
  matcher: ['/', '/(ko|en|ja|es)/:path*']
};