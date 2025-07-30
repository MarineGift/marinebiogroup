/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev, isServer }) => {
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