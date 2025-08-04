// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ko'] as const;
export const defaultLocale = 'ko' as const;

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));
