/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    // ... 나머지 설정
  },
  // experimental: { appDir: true }, ← 이 부분 제거
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // ... 나머지 설정
}

module.exports = nextConfig