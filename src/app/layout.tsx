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
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden bg-white text-black">
        {children}
      </body>
    </html>
  )
}

