import { NextRequest, NextResponse } from 'next/server'

// 임시 데이터 저장소 (실제로는 데이터베이스 사용)
let carousels = [
  {
    id: 1,
    title: '스마트 건설의 새로운 패러다임',
    subtitle: 'AI, IoT, 빅데이터 기반 솔루션',
    description: '지능형 건설 솔루션으로 효율성과 안전성을 높입니다',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    linkUrl: '/services',
    isActive: true,
    order: 1,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: '혁신적인 ICT 솔루션',
    subtitle: '첨단 기술과 창의적 사고',
    description: '고객의 성공을 위한 최적의 기술 서비스를 제공합니다',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    linkUrl: '/about',
    isActive: true,
    order: 2,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z'
  },
  {
    id: 3,
    title: '디지털 트랜스포메이션',
    subtitle: '미래를 선도하는 기업',
    description: '클라우드와 AI 기술로 비즈니스 혁신을 이끕니다',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80',
    linkUrl: '/contact',
    isActive: true,
    order: 3,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z'
  }
]

let nextId = 4

// GET: 슬라이드 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('isActive')

    let filteredCarousels = carousels

    // 활성 상태 필터링
    if (isActive !== null) {
      const activeFilter = isActive === 'true'
      filteredCarousels = carousels.filter(carousel => carousel.isActive === activeFilter)
    }

    // 순서대로 정렬
    filteredCarousels.sort((a, b) => a.order - b.order)

    return NextResponse.json({
      success: true,
      carousels: filteredCarousels,
      total: filteredCarousels.length
    })
  } catch (error) {
    console.error('GET /api/carousel error:', error)
    return NextResponse.json(
      { success: false, message: '슬라이드 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// POST: 새 슬라이드 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, subtitle, description, imageUrl, linkUrl, isActive, order } = body

    // 유효성 검사
    if (!title || !imageUrl) {
      return NextResponse.json(
        { success: false, message: '제목과 이미지 URL은 필수입니다.' },
        { status: 400 }
      )
    }

    // 순서 중복 확인 및 조정
    let finalOrder = order || carousels.length + 1
    const existingWithOrder = carousels.find(c => c.order === finalOrder)
    if (existingWithOrder) {
      // 기존 슬라이드들의 순서를 뒤로 밀기
      carousels.forEach(c => {
        if (c.order >= finalOrder) {
          c.order += 1
          c.updatedAt = new Date().toISOString()
        }
      })
    }

    const newCarousel = {
      id: nextId++,
      title,
      subtitle: subtitle || null,
      description: description || null,
      imageUrl,
      linkUrl: linkUrl || null,
      isActive: isActive !== false, // 기본값은 true
      order: finalOrder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    carousels.push(newCarousel)

    return NextResponse.json({
      success: true,
      carousel: newCarousel,
      message: '슬라이드가 성공적으로 생성되었습니다.'
    })
  } catch (error) {
    console.error('POST /api/carousel error:', error)
    return NextResponse.json(
      { success: false, message: '슬라이드 생성에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// PUT: 슬라이드 업데이트
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, subtitle, description, imageUrl, linkUrl, isActive, order } = body

    const carouselIndex = carousels.findIndex(carousel => carousel.id === id)
    if (carouselIndex === -1) {
      return NextResponse.json(
        { success: false, message: '슬라이드를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const existingCarousel = carousels[carouselIndex]

    // 순서 변경 처리
    if (order && order !== existingCarousel.order) {
      // 기존 순서에서 제거
      carousels.forEach(c => {
        if (c.id !== id && c.order > existingCarousel.order) {
          c.order -= 1
          c.updatedAt = new Date().toISOString()
        }
      })

      // 새 순서에 삽입
      carousels.forEach(c => {
        if (c.id !== id && c.order >= order) {
          c.order += 1
          c.updatedAt = new Date().toISOString()
        }
      })
    }

    carousels[carouselIndex] = {
      ...existingCarousel,
      title: title || existingCarousel.title,
      subtitle: subtitle !== undefined ? subtitle : existingCarousel.subtitle,
      description: description !== undefined ? description : existingCarousel.description,
      imageUrl: imageUrl || existingCarousel.imageUrl,
      linkUrl: linkUrl !== undefined ? linkUrl : existingCarousel.linkUrl,
      isActive: isActive !== undefined ? isActive : existingCarousel.isActive,
      order: order || existingCarousel.order,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      carousel: carousels[carouselIndex],
      message: '슬라이드가 업데이트되었습니다.'
    })
  } catch (error) {
    console.error('PUT /api/carousel error:', error)
    return NextResponse.json(
      { success: false, message: '슬라이드 업데이트에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE: 슬라이드 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')

    const carouselIndex = carousels.findIndex(carousel => carousel.id === id)
    if (carouselIndex === -1) {
      return NextResponse.json(
        { success: false, message: '슬라이드를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const deletedCarousel = carousels[carouselIndex]
    carousels.splice(carouselIndex, 1)

    // 삭제된 슬라이드 이후의 순서 재정렬
    carousels.forEach(c => {
      if (c.order > deletedCarousel.order) {
        c.order -= 1
        c.updatedAt = new Date().toISOString()
      }
    })

    return NextResponse.json({
      success: true,
      message: '슬라이드가 삭제되었습니다.'
    })
  } catch (error) {
    console.error('DELETE /api/carousel error:', error)
    return NextResponse.json(
      { success: false, message: '슬라이드 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
}