'use client'

import ServiceCard from '@/components/ServiceCard'

export default function ServicesPage() {
  const services = [
    {
      icon: "🔬",
      title: "연구개발",
      description: "첨단 건설기술 및 신공법 개발로 건설산업의 혁신을 이끕니다",
      features: [
        "건설재료 연구개발",
        "구조안전성 평가",
        "내진기술 개발",
        "품질관리 시스템",
        "신공법 개발",
        "기술표준화"
      ],
      color: "blue"
    },
    {
      icon: "🏗️",
      title: "스마트 건설",
      description: "4차 산업혁명 기술을 건설 현장에 적용한 지능형 건설 서비스",
      features: [
        "IoT 기반 현장관리",
        "AI 품질검사",
        "드론 측량 서비스",
        "BIM 설계 최적화",
        "디지털 트윈",
        "자동화 시공"
      ],
      color: "green"
    },
    {
      icon: "🌱",
      title: "친환경 건설",
      description: "지속가능한 건설을 위한 친환경 기술과 탄소중립 솔루션",
      features: [
        "친환경 건설재료",
        "에너지 효율 설계",
        "폐기물 재활용",
        "탄소배출 저감",
        "녹색건축 인증",
        "재생에너지 시스템"
      ],
      color: "purple"
    },
    {
      icon: "🛡️",
      title: "안전기술",
      description: "건설현장의 안전을 보장하는 첨단 안전관리 시스템",
      features: [
        "실시간 안전모니터링",
        "위험요소 사전감지",
        "안전교육 프로그램",
        "사고예방 솔루션",
        "안전성 평가",
        "비상대응 시스템"
      ],
      color: "orange"
    },
    {
      icon: "🏢",
      title: "구조설계",
      description: "안전하고 효율적인 구조물 설계 및 해석 서비스",
      features: [
        "구조해석 및 설계",
        "내진설계",
        "풍하중 해석",
        "구조물 진단",
        "보강설계",
        "성능기반 설계"
      ],
      color: "indigo"
    },
    {
      icon: "🧪",
      title: "재료시험",
      description: "건설재료의 품질과 성능을 검증하는 전문 시험 서비스",
      features: [
        "콘크리트 시험",
        "강재 시험",
        "토질 시험",
        "아스팔트 시험",
        "내구성 평가",
        "품질인증"
      ],
      color: "red"
    }
  ]

  const processSteps = [
    {
      step: "01",
      title: "상담 및 분석",
      description: "고객의 요구사항을 분석하고 최적의 솔루션을 제안합니다"
    },
    {
      step: "02", 
      title: "계획 수립",
      description: "프로젝트 목표에 맞는 세부적인 실행 계획을 수립합니다"
    },
    {
      step: "03",
      title: "실행 및 관리",
      description: "전문팀이 프로젝트를 실행하고 체계적으로 관리합니다"
    },
    {
      step: "04",
      title: "검증 및 완료",
      description: "결과물을 검증하고 고객 만족을 위한 사후관리를 제공합니다"
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            우리의 서비스
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            혁신적인 건설기술 솔루션
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            KICT Group의 전문 기술력과 40년 경험을 바탕으로 
            건설산업의 모든 영역에서 최고 수준의 서비스를 제공합니다.
          </p>
        </div>
      </section>

      {/* 서비스 그리드 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                color={service.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 프로세스 */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              서비스 프로세스
            </h2>
            <p className="text-xl text-gray-600">
              체계적이고 전문적인 프로세스로 최고의 결과를 보장합니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 기술 역량 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              기술 역량
            </h2>
            <p className="text-xl text-gray-600">
              최신 기술과 장비로 뒷받침되는 KICT Group의 기술력
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI & 데이터</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 머신러닝 기반 품질 예측</li>
                <li>• 빅데이터 분석 플랫폼</li>
                <li>• AI 기반 설계 최적화</li>
                <li>• 예측 유지보수 시스템</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">첨단 장비</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 3D 스캐닝 시스템</li>
                <li>• 비파괴 검사 장비</li>
                <li>• 환경 모니터링 센서</li>
                <li>• 고해상도 드론 시스템</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">디지털 솔루션</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• BIM 통합 플랫폼</li>
                <li>• 클라우드 기반 협업</li>
                <li>• 모바일 현장관리</li>
                <li>• 실시간 데이터 대시보드</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 lg:py-24 bg-blue-600 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            프로젝트를 시작해보세요
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            KICT Group의 전문 서비스로 여러분의 건설 프로젝트를 
            성공으로 이끌어드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              프로젝트 상담
            </a>
            <a href="/about" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
              회사소개 보기
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}