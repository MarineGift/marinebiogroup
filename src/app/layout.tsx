import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MarineBioGroup - Marine Nano-Fiber Technology',
  description: 'Leading marine nano-fiber technology for sustainable beauty and lifestyle products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}