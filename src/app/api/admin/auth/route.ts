import { NextRequest, NextResponse } from 'next/server'

// 간단한 관리자 데이터 (실제로는 데이터베이스에서)
const adminUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // 실제로는 해시화된 비밀번호
    name: '시스템 관리자',
    email: 'admin@kictgroup.com',
    role: 'super_admin',
    domain: 'kictgroup.com',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  }
]

export async function POST(request: NextRequest) {
  try {
    console.log('=== 관리자 로그인 API 호출 ===')
    
    const body = await request.json()
    console.log('요청 데이터:', body)
    
    const { username, password } = body

    if (!username || !password) {
      console.log('필수 필드 누락')
      return NextResponse.json(
        { success: false, error: '사용자명과 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    console.log(`로그인 시도: ${username}`)

    // 관리자 찾기
    const admin = adminUsers.find(a => 
      a.username === username && 
      a.isActive === true
    )
    
    if (!admin) {
      console.log('사용자를 찾을 수 없음')
      return NextResponse.json(
        { success: false, error: '존재하지 않는 사용자입니다.' },
        { status: 401 }
      )
    }

    // 비밀번호 확인 (간단한 방식)
    if (password !== admin.password) {
      console.log('비밀번호 불일치')
      return NextResponse.json(
        { success: false, error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    console.log('로그인 성공')

    // 로그인 성공 - 민감한 정보 제외하고 반환
    const adminInfo = {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      domain: admin.domain
    }

    return NextResponse.json({
      success: true,
      message: '로그인 성공',
      admin: adminInfo,
      token: 'dummy-jwt-token-' + Date.now() // 간단한 토큰
    })

  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '서버 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}