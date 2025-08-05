'use client'

import { useState } from 'react'

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "인천대교 건설기술 개발",
      category: "구조설계",
      year: "2023",
      description: "세계 최고 수준의 현수교 건설을 위한 혁신적인 구조기술 개발",
      image: "🌉",
      technologies: ["구조해석", "내진설계", "풍하중 해석", "장대교량 기술"],
      results: [
        "총 연장 21.38km의 대형 현수교 완공",
        "세계 최고 수준의 내진성능 확보",
        "30% 향상된 구조 안전성"
      ]
    },
    {
      id: 2,
      title: "스마트 건설현장 IoT 시스템",
      category: "스마트건설",
      year: "2023",
      description: "AI와 IoT를 활용한 차세대 건설현장 관리 시스템 구축",
      image: "🏗️",
      technologies: ["IoT 센서", "AI 분석", "실시간 모니터링", "클라우드 플랫폼"],
      results: [
        "현장 안전사고 70% 감소",
        "공정 효율성 40% 향상",
        "실시간 품질관리 시스템 구축"
      ]
    },
    {
      id: 3,
      title: "친환경 콘크리트 소재 개발",
      category: "친환경건설",
      year: "2022",
      description: "탄소 배출을 90% 저감하는 친환경 콘크리트 신소재 개발",
      image: "🌱",
      technologies: ["재활용 소재", "탄소 저감", "내구성 향상", "생분해성 첨가제"],
      results: [
        "탄소 배출량 90% 저감",
        "기존 콘크리트 대비 30% 강도 향상",
        "국제 친환경 인증 획득"
      ]
    },
    {
      id: 4,
      title: "고속도로 터널 안전관리 시스템",
      category: "안전기술",
      year: "2022",
      description: "AI 기반 터널 내 화재 및 사고 예방 통합 안전관리 시스템",
      image: "🚇",
      technologies: ["화재감지 AI", "비상대응 시스템", "실시간 모니터링", "자동 제어"],
      results: [
        "화재 조기 감지율 95% 달성",
        "비상 대응 시간 50% 단축",
        "전국 주요 터널 100개소 적용"
      ]
    },
    {
      id: 5,
      title: "초고층 빌딩 내진 보강기술",
      category: "구조설계",
      year: "2021",
      description: "기존 초고층 건물의 내진성능 향상을 위한 혁신적 보강기술",
      image: "🏢",
      technologies: ["면진 장치", "제진 시스템", "구조 보강", "성능 평가"],
      results: [
        "내진성능 200% 향상",
        "서울시 주요 빌딩 50개동 적용",
        "국제 내진기술 특허 획득"
      ]
    },
    {
      id: 6,
      title: "드론 기반 건설 측량 시스템",
      category: "스마트건설",
      year: "2021",
      description: "정밀 드론과 AI를 활용한 자동화 건설현장 측량 시스템",
      image: "🚁",
      technologies: ["드론 측량", "3D 매핑", "AI 분석", "자동화 처리"],
      results: [
        "측량 정확도 99.8% 달성",
        "작업 시간 80% 단축",
        "전국 건설현장 500개소 적용"
      ]
    }
  ]

  const categories = ["전체", "구조설계", "스마트건설", "친환경건설", "안전기술"]
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filteredProjects = selectedCategory === "전체" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "구조설계":
        return "bg-blue-100 text-blue-800"
      case "스마트건설":
        return "bg-green-100 text-green-800"
      case "친환경건설":
        return "bg-purple-100 text-purple-800"
      case "안전기술":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setShowModal(false)
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            프로젝트 사례
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            혁신으로 만든 성공 스토리
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            KICT Group이 성공적으로 완수한 주요 프로젝트들을 통해 
            우리의 기술력과 경험을 확인해보세요.
          </p>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 그리드 */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory === "전체" ? "모든 프로젝트" : selectedCategory} 
              <span className="text-blue-600 ml-2">({filteredProjects.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                onClick={() => openModal(project)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{project.image}</div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    자세히 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 성과 요약 */}
      <section className="py-16 lg:py-24 bg-blue-600 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">우리의 성과</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            수많은 프로젝트를 통해 축적된 KICT Group의 성과와 경험
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80">완료된 프로젝트</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-white/80">특허 기술</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-white/80">연구진</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">40+</div>
              <div className="text-white/80">년간 경험</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            다음 성공 프로젝트의 주인공이 되어보세요
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            KICT Group의 전문성과 혁신 기술로 
            여러분의 프로젝트를 성공으로 이끌어드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              프로젝트 상담 신청
            </a>
            <a href="/services" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors">
              서비스 자세히 보기
            </a>
          </div>
        </div>
      </section>

      {/* 프로젝트 상세 모달 */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedProject.image}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedProject.category)}`}>
                        {selectedProject.category}
                      </span>
                      <span className="text-gray-500">{selectedProject.year}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-3xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">프로젝트 개요</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">핵심 기술</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">주요 성과</h4>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-6 border-t flex gap-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    닫기
                  </button>
                  <a
                    href="/contact"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    유사 프로젝트 상담
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}