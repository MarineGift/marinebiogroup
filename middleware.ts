import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 지원하는 언어 목록
  locales: ['ko', 'en', 'ja', 'es'],
  
  // 기본 언어
  defaultLocale: 'ko',
  
  // URL에서 기본 언어 숨기기
  localePrefix: 'as-needed'
});

export const config = {
  // 국제화가 적용될 경로 패턴
  matcher: ['/', '/(ko|en|ja|es)/:path*']
};
