/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  env: {
    SITE_NAME: 'MarineBioGroup',
    SITE_DESCRIPTION: 'Advanced Marine Nano-Fiber Technology & Biotechnology Solutions',
    SITE_URL: 'https://marinebiogroup.com',
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

// ============================================



// ============================================

// .env.example
# Environment Variables for MarineBioGroup Website

# Site Configuration
NEXT_PUBLIC_SITE_NAME="MarineBioGroup"
NEXT_PUBLIC_SITE_URL="https://marinebiogroup.com"
NEXT_PUBLIC_SITE_DESCRIPTION="Advanced Marine Nano-Fiber Technology & Biotechnology Solutions"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration (for contact forms and notifications)
EMAIL_FROM="noreply@marinebiogroup.com"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your_email@marinebiogroup.com"
EMAIL_PASS="your_app_password"

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL="contact@marinebiogroup.com"
NEXT_PUBLIC_CONTACT_PHONE="+1-XXX-XXX-XXXX"
NEXT_PUBLIC_COMPANY_ADDRESS="Your Company Address"

# Social Media Links
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/company/marinebiogroup"
NEXT_PUBLIC_TWITTER_URL="https://twitter.com/marinebiogroup"
NEXT_PUBLIC_YOUTUBE_URL="https://youtube.com/@marinebiogroup"

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id

# Security
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=https://marinebiogroup.com

# Development
NODE_ENV=development
ANALYZE=false

# ============================================

// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": [
    "next-env.d.ts", 
    "**/*.ts", 
    "**/*.tsx", 
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}