export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          MarineBioGroup
        </h1>
        <p className="text-gray-600 mb-8">
          Marine nano-fiber technology
        </p>
        <a 
          href="/admin" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          관리자 로그인
        </a>
      </div>
    </div>
  )
}