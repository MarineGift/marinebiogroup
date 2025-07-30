/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-supabase-bucket-url.com'], // 필요에 따라 수정
  },
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;