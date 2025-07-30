import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// 지원하는 언어 목록
export const locales = ['en', 'ko']
export type Locale = 'en' | 'ko'

export default getRequestConfig(async ({ locale }) => {
  // 지원하지 않는 언어인 경우 404 처리
  if (!locales.includes(locale)) notFound()

  return {
    messages: (await import(`@/locales/${locale}.json`)).default
  }
})
