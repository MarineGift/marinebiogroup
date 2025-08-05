import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// 임시 데이터 저장소 (실제로는 데이터베이스 사용)
let gallery = [
  {
    id: 1,
    title: '샘플 이미지 1',
    image: '/images/gallery/sample1.jpg',
    category: '프로젝트',
    description: '샘플 프로젝트 이미지입니다.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: '샘플 이미지 2',
    image: '/images/gallery/sample2.jpg',
    category: '회사',
    description: '회사 사무실 이미지입니다.',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  }
]

let nextId = 3

// 파일 업로드 함수
async function saveFile(file: File): Promise<string> {
  try {
    // 업로드 디렉토리 확인/생성
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'gallery')
    await mkdir(uploadDir, { recursive: true })

    // 파일명 생성 (타임스탬프 + 원본명)
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_') // 특수문자 제거
    const fileName = `${timestamp}-${originalName}`
    const filePath = path.join(uploadDir, fileName)

    // 파일 저장
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // 웹에서 접근 가능한 경로 반환
    return `/uploads/gallery/${fileName}`
  } catch (error) {
    console.error('File save error:', error)
    throw new Error('파일 저장에 실패했습니다.')
  }
}

// GET: 갤러리 목록 조회 (페이지네이션 지원)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category') || ''
    const search = searchParams.get('search') || ''

    // 필터링
    let filteredGallery = gallery

    if (category) {
      filteredGallery = filteredGallery.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (search) {
      filteredGallery = filteredGallery.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 페이지네이션 계산
    const totalItems = filteredGallery.length
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    // 페이지별 데이터 추출
    const paginatedData = filteredGallery
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 최신순 정렬
      .slice(startIndex, endIndex)

    // 카테고리 목록 생성
    const categories = Array.from(new Set(gallery.map(item => item.category)))

    return NextResponse.json({
      success: true,
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      categories
    })
  } catch (error) {
    console.error('GET /api/gallery error:', error)
    return NextResponse.json(
      { success: false, message: '갤러리를 가져오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// POST: 새 갤러리 아이템 추가
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string || ''
    const imageFile = formData.get('image') as File

    // 유효성 검사
    if (!title || !category) {
      return NextResponse.json(
        { success: false, message: '제목과 카테고리는 필수입니다.' },
        { status: 400 }
      )
    }

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { success: false, message: '이미지 파일이 필요합니다.' },
        { status: 400 }
      )
    }

    // 이미지 파일 타입 검증
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: '이미지 파일만 업로드 가능합니다.' },
        { status: 400 }
      )
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { success: false, message: '파일 크기는 5MB를 초과할 수 없습니다.' },
        { status: 400 }
      )
    }

    // 이미지 파일 저장
    const imagePath = await saveFile(imageFile)

    // 새 갤러리 아이템 생성
    const newItem = {
      id: nextId++,
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      image: imagePath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    gallery.push(newItem)

    return NextResponse.json({
      success: true,
      data: newItem,
      message: '갤러리 아이템이 성공적으로 추가되었습니다.'
    })
  } catch (error) {
    console.error('POST /api/gallery error:', error)
    return NextResponse.json(
      { success: false, message: '갤러리 아이템 추가에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// PUT: 갤러리 아이템 수정
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const id = parseInt(formData.get('id') as string)
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string || ''
    const imageFile = formData.get('image') as File | null

    // 유효성 검사
    if (!id || !title || !category) {
      return NextResponse.json(
        { success: false, message: 'ID, 제목, 카테고리는 필수입니다.' },
        { status: 400 }
      )
    }

    // 기존 아이템 찾기
    const itemIndex = gallery.findIndex(item => item.id === id)
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: '갤러리 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    let imagePath = gallery[itemIndex].image

    // 새 이미지가 업로드된 경우
    if (imageFile && imageFile instanceof File) {
      // 이미지 파일 타입 검증
      if (!imageFile.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, message: '이미지 파일만 업로드 가능합니다.' },
          { status: 400 }
        )
      }

      // 파일 크기 제한 (5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (imageFile.size > maxSize) {
        return NextResponse.json(
          { success: false, message: '파일 크기는 5MB를 초과할 수 없습니다.' },
          { status: 400 }
        )
      }

      // 새 이미지 파일 저장
      imagePath = await saveFile(imageFile)
    }

    // 아이템 업데이트
    gallery[itemIndex] = {
      ...gallery[itemIndex],
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      image: imagePath,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: gallery[itemIndex],
      message: '갤러리 아이템이 수정되었습니다.'
    })
  } catch (error) {
    console.error('PUT /api/gallery error:', error)
    return NextResponse.json(
      { success: false, message: '갤러리 아이템 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE: 갤러리 아이템 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')

    if (!id) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      )
    }

    // 아이템 찾기
    const itemIndex = gallery.findIndex(item => item.id === id)
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: '갤러리 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 아이템 삭제
    const deletedItem = gallery.splice(itemIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedItem,
      message: '갤러리 아이템이 삭제되었습니다.'
    })
  } catch (error) {
    console.error('DELETE /api/gallery error:', error)
    return NextResponse.json(
      { success: false, message: '갤러리 아이템 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
}