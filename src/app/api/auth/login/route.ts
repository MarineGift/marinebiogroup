import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 간단한 테스트용 계정 정보
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // 입력값 검증
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: '사용자명과 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 인증 검증
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // 로그인 성공 - 쿠키 설정
      const response = NextResponse.json(
        { success: true, message: '로그인이 성공했습니다.' },
        { status: 200 }
      )

      // 간단한 인증 토큰 (실제 프로덕션에서는 JWT 등을 사용)
      const authToken = btoa(`${username}:${Date.now()}`)
      
      response.cookies.set('auth-token', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7일
      })

      return response
    } else {
      // 로그인 실패
      return NextResponse.json(
        { success: false, message: '잘못된 사용자명 또는 비밀번호입니다.' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login API Error:', error)
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Login endpoint - POST method required' },
    { status: 405 }
  )
}