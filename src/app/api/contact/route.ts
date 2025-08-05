import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// 임시 문의 데이터 저장소 (실제로는 데이터베이스와 연동)
let inquiries = [
  {
    id: 1,
    name: '김철수',
    email: 'kimcs@example.com',
    phone: '010-1234-5678',
    company: 'ABC Company',
    subject: '시스템 개발 문의',
    message: '안녕하세요. 웹사이트 개발을 의뢰하고 싶습니다. React와 Next.js를 사용한 현대적인 웹사이트를 구축하고 싶고, 관리자 시스템도 포함되어야 합니다. 예산은 500만원 정도로 생각하고 있습니다. 견적을 부탁드립니다.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'new'
  }
]

let nextId = inquiries.length + 1

// Nodemailer 설정
const createTransport = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// POST: 새 문의 접수
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, subject, message } = body

    // 유효성 검사
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: '필수 필드를 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: '올바른 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 새 문의 생성
    const newInquiry = {
      id: nextId++,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'new' as const
    }

    // 메모리에 저장 (실제로는 데이터베이스에 저장)
    inquiries.unshift(newInquiry)

    // 관리자에게 알림 이메일 발송 (선택사항)
    try {
      const transporter = createTransport()
      
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const adminEmailTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>새로운 문의가 접수되었습니다</title>
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
            background: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e1e5e9;
            border-top: none;
        }
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #2563eb;
            padding: 15px;
            margin: 15px 0;
            border-radius: 0 5px 5px 0;
        }
        .message-box {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 15px;
            text-align: center;
            border: 1px solid #e1e5e9;
            border-top: none;
            border-radius: 0 0 10px 10px;
            font-size: 14px;
            color: #6c757d;
        }
        .label {
            font-weight: bold;
            color: #2563eb;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔔 새로운 문의 접수</h1>
        <p>KICT Group 웹사이트를 통해 새로운 문의가 접수되었습니다.</p>
    </div>
    
    <div class="content">
        <h2>문의자 정보</h2>
        
        <div class="info-box">
            <p><span class="label">문의 번호:</span> #${newInquiry.id}</p>
            <p><span class="label">이름:</span> ${newInquiry.name}</p>
            <p><span class="label">이메일:</span> ${newInquiry.email}</p>
            ${newInquiry.phone ? `<p><span class="label">전화번호:</span> ${newInquiry.phone}</p>` : ''}
            ${newInquiry.company ? `<p><span class="label">회사명:</span> ${newInquiry.company}</p>` : ''}
            <p><span class="label">문의유형:</span> ${newInquiry.subject}</p>
            <p><span class="label">접수일시:</span> ${new Date(newInquiry.createdAt).toLocaleString('ko-KR')}</p>
        </div>
        
        <h3>문의 내용</h3>
        <div class="message-box">
            ${newInquiry.message.replace(/\n/g, '<br>')}
        </div>
        
        <p style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/login" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                관리자 페이지에서 답변하기
            </a>
        </p>
    </div>
    
    <div class="footer">
        <p>이 이메일은 KICT Group 웹사이트에서 자동으로 발송되었습니다.</p>
        <p>관리자 페이지: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin</p>
    </div>
</body>
</html>
        `

        await transporter.sendMail({
          from: {
            name: 'KICT Group Website',
            address: process.env.SMTP_USER
          },
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
          subject: `[KICT Group] 새로운 문의: ${newInquiry.subject}`,
          html: adminEmailTemplate
        })
      }
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError)
      // 이메일 발송 실패해도 문의 접수는 성공으로 처리
    }

    // 고객에게 자동 응답 이메일 발송 (선택사항)
    try {
      const transporter = createTransport()
      
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const customerEmailTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문의 접수 완료</title>
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
        .inquiry-box {
            background: #f8f9fa;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .contact-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
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
        <h2>안녕하세요, ${newInquiry.name}님</h2>
        <p>KICT Group에 문의해주셔서 감사합니다.</p>
        <p>귀하의 문의가 성공적으로 접수되었습니다.</p>
        
        <div class="inquiry-box">
            <h3>접수된 문의 정보</h3>
            <p><strong>문의 번호:</strong> #${newInquiry.id}</p>
            <p><strong>문의 유형:</strong> ${newInquiry.subject}</p>
            <p><strong>접수 일시:</strong> ${new Date(newInquiry.createdAt).toLocaleString('ko-KR')}</p>
        </div>
        
        <p>담당자가 검토 후 <strong>1-2 영업일 내</strong>에 답변 드리겠습니다.</p>
        <p>급하신 사항은 아래 연락처로 직접 연락 부탁드립니다.</p>
        
        <div class="contact-info">
            <h3>연락처 정보</h3>
            <p>📍 <strong>주소:</strong> 1952 Gallows Rd, Vienna, VA 22182</p>
            <p>📞 <strong>전화:</strong> +1 (703) 123-4567</p>
            <p>✉️ <strong>이메일:</strong> contact@kictgroup.com</p>
            <p>🕒 <strong>운영시간:</strong> 월-금 09:00-18:00</p>
        </div>
    </div>
    
    <div class="footer">
        <p>&copy; 2025 KICT Group. All rights reserved.</p>
        <p>이 메일은 발신전용입니다. 회신이 필요하시면 contact@kictgroup.com으로 연락주세요.</p>
    </div>
</body>
</html>
        `

        await transporter.sendMail({
          from: {
            name: 'KICT Group',
            address: process.env.SMTP_USER
          },
          to: newInquiry.email,
          subject: '[KICT Group] 문의 접수 완료 - 감사합니다',
          html: customerEmailTemplate
        })
      }
    } catch (emailError) {
      console.error('Failed to send customer confirmation email:', emailError)
      // 이메일 발송 실패해도 문의 접수는 성공으로 처리
    }

    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.',
      inquiryId: newInquiry.id,
      inquiry: {
        id: newInquiry.id,
        name: newInquiry.name,
        subject: newInquiry.subject,
        createdAt: newInquiry.createdAt
      }
    })

  } catch (error) {
    console.error('POST /api/contact error:', error)
    return NextResponse.json(
      { success: false, message: '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}

// GET: 문의 접수 확인 (옵션)
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: '문의 접수 API가 정상 작동 중입니다.',
      endpoint: '/api/contact',
      methods: ['POST'],
      requiredFields: ['name', 'email', 'subject', 'message'],
      optionalFields: ['phone', 'company']
    })
  } catch (error) {
    console.error('GET /api/contact error:', error)
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}