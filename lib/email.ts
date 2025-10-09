import nodemailer from 'nodemailer'

interface EmailData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function sendContactEmail(data: EmailData) {
  // 개발 환경에서는 로그만 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('=== 연락처 메일 발송 ===')
    console.log('보낸이:', data.name, '<' + data.email + '>')
    console.log('전화번호:', data.phone || '없음')
    console.log('제목:', data.subject)
    console.log('내용:', data.message)
    console.log('=======================')
    return { success: true, message: '개발 환경에서 메일 로그 출력 완료' }
  }

  try {
    // SMTP 설정
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // 465는 secure, 587은 일반
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // 관리자에게 보낼 메일 내용
    const adminMailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_FROM, // 관리자 이메일
      subject: `[MarineBioGroup 문의] ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #0369a1); color: white; padding: 20px; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="margin: 0; font-size: 24px;">MarineBioGroup 웹사이트 문의</h2>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #0369a1; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px;">문의자 정보</h3>
            <p><strong>이름:</strong> ${data.name}</p>
            <p><strong>이메일:</strong> <a href="mailto:${data.email}" style="color: #0ea5e9;">${data.email}</a></p>
            ${data.phone ? `<p><strong>전화번호:</strong> ${data.phone}</p>` : ''}
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #0369a1; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px;">문의 내용</h3>
            <p><strong>제목:</strong> ${data.subject}</p>
            <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #0ea5e9; border-radius: 5px;">
              <p style="margin: 0; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              이 메일은 MarineBioGroup 웹사이트 연락처 폼을 통해 자동 발송되었습니다.
            </p>
          </div>
        </div>
      `,
    }

    // 문의자에게 보낼 자동 응답 메일
    const customerMailOptions = {
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: '[MarineBioGroup] 문의해 주셔서 감사합니다',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #0369a1); color: white; padding: 20px; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="margin: 0; font-size: 24px;">MarineBioGroup</h2>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Marine Nano-Fiber Technology</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #0369a1;">안녕하세요, ${data.name}님!</h3>
            <p>MarineBioGroup에 문의해 주셔서 감사합니다.</p>
            <p>귀하의 문의사항을 잘 받았으며, 담당자가 검토 후 빠른 시일 내에 답변드리겠습니다.</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: #0369a1; margin-top: 0;">접수된 문의 내용</h4>
            <p><strong>제목:</strong> ${data.subject}</p>
            <p><strong>내용:</strong> ${data.message}</p>
          </div>

          <div style="margin: 20px 0;">
            <h4 style="color: #0369a1;">MarineBioGroup 소개</h4>
            <p>저희는 해양 나노섬유 기술을 활용한 지속 가능한 뷰티 및 라이프스타일 제품을 개발하는 회사입니다.</p>
            <p>혁신적인 해양 생명공학 솔루션으로 더 나은 미래를 만들어가고 있습니다.</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              MarineBioGroup | Marine Nano-Fiber Technology<br>
              이 메일은 자동 발송된 확인 메일입니다.
            </p>
          </div>
        </div>
      `,
    }

    // 두 메일 모두 발송
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(customerMailOptions)

    return { 
      success: true, 
      message: '문의 메일이 성공적으로 발송되었습니다.' 
    }
  } catch (error) {
    console.error('메일 발송 오류:', error)
    return { 
      success: false, 
      message: '메일 발송 중 오류가 발생했습니다.' 
    }
  }
}