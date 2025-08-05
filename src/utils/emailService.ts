// ============ src/utils/emailService.ts (완전 수정 버전) ============
export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

class EmailService {
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // API 라우트를 통해 이메일 전송
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })

      const result = await response.json()
      
      if (response.ok) {
        console.log('이메일 전송 성공:', result.messageId)
        return true
      } else {
        console.error('이메일 전송 실패:', result.error)
        return false
      }
    } catch (error) {
      console.error('이메일 전송 중 오류:', error)
      return false
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">KICT Group에 오신 것을 환영합니다!</h2>
        <p>안녕하세요 ${name}님,</p>
        <p>KICT Group에 가입해주셔서 감사합니다.</p>
        <p>혁신적인 기술과 서비스로 미래를 만들어가는 여정에 함께해주세요.</p>
        <br>
        <p>감사합니다.</p>
        <p><strong>KICT Group 팀</strong></p>
      </div>
    `

    return this.sendEmail({
      to: email,
      subject: 'KICT Group에 오신 것을 환영합니다!',
      html,
      text: `안녕하세요 ${name}님, KICT Group에 가입해주셔서 감사합니다.`
    })
  }

  async sendContactNotification(contactData: any): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">새로운 문의가 접수되었습니다</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>이름</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${contactData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>이메일</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${contactData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>전화번호</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${contactData.phone || '없음'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>제목</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${contactData.subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>내용</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${contactData.message}</td>
          </tr>
        </table>
      </div>
    `

    return this.sendEmail({
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@kictgroup.com',
      subject: `[KICT Group] 새로운 문의: ${contactData.subject}`,
      html
    })
  }

  async sendReplyEmail(to: string, subject: string, message: string, originalInquiry?: any): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">KICT Group 답변</h2>
        <div style="background: #f8f9fa; padding: 16px; border-left: 4px solid #3b82f6; margin: 16px 0;">
          <p><strong>귀하의 문의에 대한 답변입니다.</strong></p>
        </div>
        <div style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        ${originalInquiry ? `
        <div style="margin-top: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; color: #6b7280;">원본 문의 내용:</h4>
          <p style="margin: 4px 0;"><strong>제목:</strong> ${originalInquiry.subject}</p>
          <p style="margin: 4px 0;"><strong>내용:</strong> ${originalInquiry.message}</p>
        </div>
        ` : ''}
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            감사합니다.<br>
            <strong>KICT Group 고객지원팀</strong>
          </p>
        </div>
      </div>
    `

    return this.sendEmail({
      to,
      subject: `Re: ${subject}`,
      html,
      text: `KICT Group 답변\n\n${message}`
    })
  }
}

export const emailService = new EmailService()

// 개별 함수들도 export (기존 코드 호환성)
export const sendReplyEmail = emailService.sendReplyEmail.bind(emailService)
export const sendWelcomeEmail = emailService.sendWelcomeEmail.bind(emailService)
export const sendContactNotification = emailService.sendContactNotification.bind(emailService)

export default emailService