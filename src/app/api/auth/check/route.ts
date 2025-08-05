import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth-token')

    if (!authToken) {
      return NextResponse.json(
        { authenticated: false, message: '인증 토큰이 없습니다.' },
        { status: 401 }
      )
    }

    // 토큰 검증 (실제 환경에서는 더 복잡한 검증 로직 필요)
    try {
      const decoded = atob(authToken.value)
      const [username, timestamp] = decoded.split(':')
      
      // 토큰이 7일 이내에 생성되었는지 확인
      const tokenAge = Date.now() - parseInt(timestamp)
      const maxAge = 7 * 24 * 60 * 60 * 1000 // 7일
      
      if (tokenAge > maxAge) {
        return NextResponse.json(
          { authenticated: false, message: '토큰이 만료되었습니다.' },
          { status: 401 }
        )
      }

      return NextResponse.json(
        { 
          authenticated: true, 
          user: { username },
          message: '인증되었습니다.' 
        },
        { status: 200 }
      )
    } catch (decodeError) {
      return NextResponse.json(
        { authenticated: false, message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth Check API Error:', error)
    return NextResponse.json(
      { authenticated: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { message: 'Auth check endpoint - GET method required' },
    { status: 405 }
  )
}