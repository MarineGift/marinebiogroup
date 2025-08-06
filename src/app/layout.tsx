import './globals.css'

export const metadata = {
  title: 'MarineBioGroup',
  description: 'Marine nano-fiber technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}