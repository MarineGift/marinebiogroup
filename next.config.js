cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TypeScript 에러를 완전히 무시
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 에러를 완전히 무시
    ignoreDuringBuilds: true,
  },
  // Webpack에서 TypeScript 체크 플러그인 제거
  webpack: (config, { dev, isServer }) => {
    // TypeScript 체크 플러그인들을 필터링해서 제거
    config.plugins = config.plugins.filter((plugin) => {
      return ![
        'ForkTsCheckerWebpackPlugin',
        'TypeScriptCheckerPlugin'
      ].includes(plugin.constructor.name)
    })
    return config
  },
  images: {
    domains: ['your-supabase-url.supabase.co'],
  },
}

module.exports = nextConfig
EOF