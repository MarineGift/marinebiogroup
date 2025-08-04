/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'marinebiogroup.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    // 빌드 시 타입 에러 완전 무시
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 에러도 완전 무시
    ignoreDuringBuilds: true,
  },
  // 추가 옵션: 빌드 최적화 비활성화로 더 빠른 빌드
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig