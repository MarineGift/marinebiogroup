// ============ src/app/api/send-email/route.ts 생성 ============
import { NextRequest, NextResponse } from 'next/server'

// 서버 사이드에서만 nodemailer import (선택사항)
// import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html, text } = body

    // 실제 이메일 전송 구현 (현재는 더미)
    console.log('이메일 전송 요청:', {
      to,
      subject,
      html: html.substring(0, 100) + '...'
    })

    // TODO: 실제 이메일 전송 로직 구현
    // const transporter = nodemailer.createTransporter({...})
    // const info = await transporter.sendMail({...})

    // 성공 응답
    return NextResponse.json({ 
      success: true, 
      messageId: `dummy-${Date.now()}`,
      message: '이메일이 성공적으로 전송되었습니다' 
    })

  } catch (error) {
    console.error('이메일 전송 API 오류:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '이메일 전송에 실패했습니다' 
      },
      { status: 500 }
    )
  }
}

// ============ 실제 nodemailer 사용 버전 (선택사항) ============
/*
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html, text } = body

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
      text,
    })

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      message: '이메일이 성공적으로 전송되었습니다' 
    })

  } catch (error) {
    console.error('이메일 전송 오류:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '이메일 전송에 실패했습니다' 
      },
      { status: 500 }
    )
  }
}
*/