import { NextRequest, NextResponse } from 'next/server'

// 이 파일은 src/app/api/gallery/[id]/route.ts 경로에 저장하세요

// 임시 데이터 저장소 (실제로는 데이터베이스 사용)
// 실제 구현시에는 외부 파일이나 데이터베이스에서 가져와야 합니다
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

// GET: 특정 갤러리 아이템 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      )
    }

    const item = gallery.find(item => item.id === id)

    if (!item) {
      return NextResponse.json(
        { success: false, message: '갤러리 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: item
    })
  } catch (error) {
    console.error('GET /api/gallery/[id] error:', error)
    return NextResponse.json(
      { success: false, message: '갤러리 아이템을 가져오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// PUT: 특정 갤러리 아이템 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      )
    }

    const itemIndex = gallery.findIndex(item => item.id === id)

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: '갤러리 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const formData = await request.formData()
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string || ''

    // 유효성 검사
    if (!title || !category) {
      return NextResponse.json(
        { success: false, message: '제목과 카테고리는 필수입니다.' },
        { status: 400 }
      )
    }

    // 기존 이미지 경로 유지 (새 이미지 업로드 로직은 별도 구현 필요)
    const existingItem = gallery[itemIndex]

    // 아이템 업데이트
    gallery[itemIndex] = {
      ...existingItem,
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: gallery[itemIndex],
      message: '갤러리 아이템이 수정되었습니다.'
    })
  } catch (error) {
    console.error('PUT /api/gallery/[id] error:', error)
    return NextResponse.json(
      { success: false, message: '갤러리 아이템 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// PATCH: 특정 갤러리 아이템 부분 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      )
    }

    const itemIndex = gallery.findIndex(item => item.id === id)

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: '갤러리 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const updates = await request.json()

    // 허용된 필드만 업데이트
    const allowedFields = ['title', 'category', 'description']
    const filteredUpdates: any = {}

    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field]
      }
    })

    // 아이템 업데이트
    gallery[itemIndex] = {
      ...gallery[itemIndex],
      ...filteredUpdates,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: gallery[itemIndex],
      message: '갤러리 아이템이 업데이트되었습니다.'
    })
  } catch (error) {
    console.error('PATCH /api/gallery/[id] error:', error)
    return NextResponse.json(
      { success: false, message: '갤러리 아이템 업데이트에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE: 특정 갤러리 아이템 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      )
    }

    const itemIndex = gallery.findIndex(item => item.id === id)

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: '갤러리 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 아이템 삭제
    const deletedItem = gallery.splice(itemIndex, 1)[0]

    // 실제 구현시에는 파일 시스템에서도 이미지 파일 삭제
    // import { unlink } from 'fs/promises'
    // import path from 'path'
    // 
    // if (deletedItem.image.startsWith('/uploads/')) {
    //   try {
    //     const filePath = path.join(process.cwd(), 'public', deletedItem.image)
    //     await unlink(filePath)
    //   } catch (fileError) {
    //     console.warn('파일 삭제 실패:', fileError)
    //   }
    // }

    return NextResponse.json({
      success: true,
      data: deletedItem,
      message: '갤러리 아이템이 삭제되었습니다.'
    })
  } catch (error) {
    console.error('DELETE /api/gallery/[id] error:', error)
    return NextResponse.json(
      { success: false, message: '갤러리 아이템 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
}