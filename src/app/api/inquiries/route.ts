import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer';

// Nodemailer 설정 (실제 환경에서는 환경변수 사용)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const inquiryId = parseInt(params.id)
    const body = await request.json()
    const { subject, message, recipientEmail, recipientName } = body

    // 유효성 검사
    if (!subject || !message || !recipientEmail || !recipientName) {
      return NextResponse.json(
        { success: false, message: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 이메일 템플릿
    const emailTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KICT Group 답변</title>
    <style>
        body {
            font-family: 'Malgun Gothic', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e1e5e9;
            border-top: none;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border: 1px solid #e1e5e9;
            border-top: none;
            border-radius: 0 0 10px 10px;
            font-size: 14px;
            color: #6c757d;
        }
        .message-box {
            background: #f8f9fa;
            border-left: 4px solid #007bff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .contact-info {
            margin-top: 20px;
            padding: 15px;
            background: #e9ecef;
            border-radius: 5px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">KICT Group</div>
        <p>혁신적인 ICT 솔루션 파트너</p>
    </div>
    
    <div class="content">
        <h2>안녕하세요, ${recipientName}님</h2>
        <p>KICT Group에 문의해주셔서 감사합니다.</p>
        <p>귀하의 문의사항에 대한 답변을 드립니다.</p>
        
        <div class="message-box">
            ${message.replace(/\n/g, '<br>')}
        </div>
        
        <p>추가 문의사항이 있으시면 언제든지 연락주시기 바랍니다.</p>
        
        <div class="contact-info">
            <strong>연락처 정보</strong><br>
            📍 주소: 1952 Gallows Rd, Vienna, VA 22182<br>
            📞 전화: +1 (703) 123-4567<br>
            ✉️ 이메일: contact@kictgroup.com<br>
            🕒 운영시간: 월-금 09:00-18:00
        </div>
    </div>
    
    <div class="footer">
        <p>&copy; 2025 KICT Group. All rights reserved.</p>
        <p>이 메일은 발신전용입니다. 회신이 필요하시면 contact@kictgroup.com으로 연락주세요.</p>
    </div>
</body>
</html>
    `

    try {
      // 이메일 발송
      await transporter.sendMail({
        from: {
          name: 'KICT Group',
          address: process.env.SMTP_USER || 'contact@kictgroup.com'
        },
        to: recipientEmail,
        subject: subject,
        html: emailTemplate,
        text: message // 텍스트 버전도 제공
      })

      // 문의 상태 업데이트 (실제 환경에서는 데이터베이스 업데이트)
      const updateResponse = await fetch(`${request.url.replace(`/inquiries/${inquiryId}/reply`, '/inquiries')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: inquiryId,
          status: 'processing',
          adminReply: message
        })
      })

      return NextResponse.json({
        success: true,
        message: '답변이 성공적으로 전송되었습니다.',
        sentTo: recipientEmail,
        sentAt: new Date().toISOString()
      })

    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      
      // 이메일 전송 실패 시에도 답변은 저장 (오프라인에서 확인 가능)
      const updateResponse = await fetch(`${request.url.replace(`/inquiries/${inquiryId}/reply`, '/inquiries')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: inquiryId,
          status: 'processing',
          adminReply: message
        })
      })

      return NextResponse.json({
        success: true,
        message: '답변이 저장되었습니다. (이메일 전송 실패 - 수동으로 확인 필요)',
        warning: '이메일 전송에 실패했습니다. SMTP 설정을 확인해주세요.',
        savedReply: message
      })
    }

  } catch (error) {
    console.error('POST /api/inquiries/[id]/reply error:', error)
    return NextResponse.json(
      { success: false, message: '답변 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}