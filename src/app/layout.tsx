import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MarineBioGroup - Marine Nano-Fiber Technology',
  description: 'Leading innovation in marine nano-fiber technology for sustainable beauty and lifestyle products',
  keywords: 'marine technology, nano-fiber, sustainable materials, beauty products, marine research',
  authors: [{ name: 'MarineBioGroup' }],
  openGraph: {
    title: 'MarineBioGroup - Marine Nano-Fiber Technology',
    description: 'Leading innovation in marine nano-fiber technology for sustainable beauty and lifestyle products',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}