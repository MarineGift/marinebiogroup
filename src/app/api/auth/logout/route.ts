import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: '로그아웃되었습니다.' },
      { status: 200 }
    )

    // 인증 쿠키 제거
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // 즉시 만료
    })

    return response
  } catch (error) {
    console.error('Logout API Error:', error)
    return NextResponse.json(
      { success: false, message: '로그아웃 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Logout endpoint - POST method required' },
    { status: 405 }
  )
}