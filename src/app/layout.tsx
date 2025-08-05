import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KICT Group',
  description: '혁신과 기술로 미래를 만들어가는 기업',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="bg-white shadow-md sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">KICT Group</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600">홈</a>
                <a href="/about" className="text-gray-700 hover:text-blue-600">회사소개</a>
                <a href="/services" className="text-gray-700 hover:text-blue-600">언론보도</a>
                <a href="/services" className="text-gray-700 hover:text-blue-600">서비스</a>
                <a href="/contact" className="text-gray-700 hover:text-blue-600">연락처</a>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-xl font-bold">KICT Group</span>
            </div>
            <p className="text-gray-300 mb-4">혁신과 기술로 미래를 만들어가는 기업</p>
            <p className="text-gray-400">&copy; 2024 KICT Group. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
