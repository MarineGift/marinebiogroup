'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CarouselItem {
  id: number
  title: string
  subtitle?: string
  description?: string
  imageUrl: string
  linkUrl?: string
}

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([])
  const [loading, setLoading] = useState(true)

  // 기본 슬라이드 데이터
  const defaultSlides: CarouselItem[] = [
    {
      id: 1,
      title: "스마트 건설의 새로운 패러다임",
      subtitle: "AI, IoT, 빅데이터 기반 솔루션",
      description: "지능형 건설 솔루션으로 효율성과 안전성을 높입니다",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      linkUrl: "/services"
    },
    {
      id: 2,
      title: "혁신적인 ICT 솔루션",
      subtitle: "첨단 기술과 창의적 사고",
      description: "고객의 성공을 위한 최적의 기술 서비스를 제공합니다",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
      linkUrl: "/about"
    },
    {
      id: 3,
      title: "디지털 트랜스포메이션",
      subtitle: "미래를 선도하는 기업",
      description: "클라우드와 AI 기술로 비즈니스 혁신을 이끕니다",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80",
      linkUrl: "/contact"
    }
  ]

  useEffect(() => {
    loadCarouselData()
  }, [])

  const loadCarouselData = async () => {
    try {
      const response = await fetch('/api/carousel?isActive=true')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.carousels?.length > 0) {
          setCarouselData(data.carousels)
        } else {
          // API에서 데이터를 가져올 수 없으면 기본 데이터 사용
          setCarouselData(defaultSlides)
        }
      } else {
        setCarouselData(defaultSlides)
      }
    } catch (error) {
      console.error('Error loading carousel data:', error)
      // 에러 발생 시 기본 데이터 사용
      setCarouselData(defaultSlides)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (carouselData.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [carouselData.length])

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </section>
    )
  }

  if (carouselData.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            KICT Group
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            혁신적인 ICT 솔루션으로 미래를 선도합니다
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            첨단 기술과 창의적 사고로 고객의 성공을 위한 최적의 솔루션을 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/about" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              회사 소개
            </Link>
            <Link 
              href="/contact" 
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Carousel slides */}
      <div className="relative h-full">
        {carouselData.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                {item.subtitle && (
                  <p className="text-lg md:text-xl mb-4 opacity-90">{item.subtitle}</p>
                )}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                  {item.title}
                </h1>
                {item.description && (
                  <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                    {item.description}
                  </p>
                )}
                {item.linkUrl && (
                  <Link 
                    href={item.linkUrl}
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    자세히 보기
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {carouselData.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide indicators */}
      {carouselData.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}