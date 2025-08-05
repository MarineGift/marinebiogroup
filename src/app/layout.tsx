import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marine Bio Group',
  description: 'Revolutionary Marine Nano-fiber Technology',
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
