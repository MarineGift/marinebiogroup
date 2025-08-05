import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SupabaseProvider } from '@/lib/supabase-provider'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MarineBioGroup - Marine Nano-Fiber Technology',
  description: 'Leading marine nano-fiber technology for sustainable beauty and lifestyle products',
  keywords: 'marine, nano-fiber, biotechnology, sustainable, beauty, lifestyle',
  authors: [{ name: 'MarineBioGroup' }],
  openGraph: {
    title: 'MarineBioGroup - Marine Nano-Fiber Technology',
    description: 'Leading marine nano-fiber technology for sustainable beauty and lifestyle products',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarineBioGroup - Marine Nano-Fiber Technology',
    description: 'Leading marine nano-fiber technology for sustainable beauty and lifestyle products',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}