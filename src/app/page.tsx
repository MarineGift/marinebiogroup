export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-5xl font-bold mb-6">Marine Bio Group</h1>
      <p className="max-w-2xl text-lg text-gray-600">
        혁신적인 해양 나노섬유 기술로 지속 가능한 미래를 만들어갑니다.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">제품 소개</h2>
          <p className="text-gray-500">최신 해양 기반 제품을 확인하세요.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">기술력</h2>
          <p className="text-gray-500">세계 최초의 나노섬유 하이드로겔 기술.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">문의하기</h2>
          <p className="text-gray-500">제품 및 기술 관련 문의를 환영합니다.</p>
        </div>
      </div>
    </div>
  )
}
