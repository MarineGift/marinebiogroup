export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-8xl mb-8">🏗️</div>
          <h1 className="text-6xl font-bold text-blue-600 mb-6">
            KICT Group
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            혁신과 기술로 미래를 만들어가는 기업
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            40년간의 건설기술 연구 경험을 바탕으로 스마트하고 지속가능한 건설 솔루션을 제공합니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/about" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors">
              회사소개 보기
            </a>
            <a href="/contact" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-lg font-medium transition-colors">
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">핵심 서비스</h2>
            <p className="text-xl text-gray-600">전문 기술력으로 건설산업의 미래를 만들어갑니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🔬</span>
                <h3 className="text-2xl font-bold text-gray-800">연구개발</h3>
              </div>
              <p className="text-gray-600 mb-4">첨단 건설기술 및 새로운 공법 개발</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>건설재료 연구개발</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>구조안전성 평가</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🏗️</span>
                <h3 className="text-2xl font-bold text-gray-800">스마트 건설</h3>
              </div>
              <p className="text-gray-600 mb-4">IoT, AI 기술을 활용한 지능형 건설</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>IoT 기반 현장관리</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>AI 품질검사</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🌱</span>
                <h3 className="text-2xl font-bold text-gray-800">친환경 건설</h3>
              </div>
              <p className="text-gray-600 mb-4">지속가능한 건설 솔루션 제공</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>친환경 건설재료</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>에너지 효율 설계</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🛡️</span>
                <h3 className="text-2xl font-bold text-gray-800">안전기술</h3>
              </div>
              <p className="text-gray-600 mb-4">건설현장 안전관리 시스템</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>실시간 안전모니터링</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>위험요소 사전감지</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
