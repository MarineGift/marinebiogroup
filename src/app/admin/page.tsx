// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-bold mb-4">테스트 홈페이지</h1>
        <p className="mb-4">Next.js 라우팅 테스트</p>
        
        <div className="space-y-2">
          <a 
            href="/admin" 
            className="block p-2 bg-blue-500 text-white rounded text-center hover:bg-blue-600"
          >
            Admin 페이지로 이동
          </a>
          <a 
            href="/admin/dashboard" 
            className="block p-2 bg-green-500 text-white rounded text-center hover:bg-green-600"
          >
            Admin Dashboard로 이동
          </a>
        </div>
        
        <p className="mt-4 text-xs text-gray-500">
          현재 경로: /
        </p>
      </div>
    </div>
  );
}