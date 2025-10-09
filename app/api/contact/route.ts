import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // 필수 필드 검증
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: '모든 필수 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 메일 발송
    const result = await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    })

    if (result.success) {
      return NextResponse.json({
        message: '문의사항이 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.',
      })
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('연락처 API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}