import { redirect } from 'next/navigation'

export default function RootPage() {
  // 기본 언어로 리다이렉트
  redirect('/en')
}


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('description')}
          </p>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
            <Link 
              href="/about" 
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
