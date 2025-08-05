// 이메일 전송 서비스
// 실제 사용을 위해서는 npm install nodemailer @types/nodemailer 설치 필요

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

// 이메일 템플릿 생성
export function createReplyEmailTemplate(
  contactName: string,
  originalSubject: string,
  replyContent: string,
  adminName: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
            .original-inquiry { background: #e5e7eb; padding: 15px; margin: 15px 0; border-left: 4px solid #2563eb; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>KICT Group</h1>
                <p>문의에 대한 답변입니다</p>
            </div>
            
            <div class="content">
                <p>안녕하세요, <strong>${contactName}</strong>님</p>
                
                <p>KICT Group에 문의해 주셔서 감사합니다. 아래와 같이 답변드립니다.</p>
                
                <div class="original-inquiry">
                    <h4>원본 문의: ${originalSubject}</h4>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 5px;">
                    <h4>답변 내용:</h4>
                    <div style="white-space: pre-wrap;">${replyContent}</div>
                </div>
                
                <p style="margin-top: 20px;">
                    추가 문의사항이 있으시면 언제든지 연락해 주세요.
                </p>
                
                <p>감사합니다.</p>
                <p><strong>${adminName}</strong><br>KICT Group</p>
            </div>
            
            <div class="footer">
                <p>KICT Group | 경기도 고양시 일산서구 고양대로 283</p>
                <p>Tel: 031-910-0114 | Email: info@kict.re.kr</p>
                <p>이 메일은 자동 발송되었습니다. 직접 회신하지 마세요.</p>
            </div>
        </div>
    </body>
    </html>
  `
}

// 실제 이메일 전송 함수 (시뮬레이션)
export async function sendReplyEmail(
  to: string,
  contactName: string,
  originalSubject: string,
  replyContent: string,
  adminName: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // 실제 환경에서는 다음과 같이 사용:
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"KICT Group" <${process.env.SMTP_FROM}>`,
      to: to,
      subject: `[KICT Group] ${originalSubject} 문의에 대한 답변`,
      html: createReplyEmailTemplate(contactName, originalSubject, replyContent, adminName),
      text: `${contactName}님께\n\n${replyContent}\n\n감사합니다.\n${adminName}\nKICT Group`
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
    */

    // 개발 환경에서는 시뮬레이션
    console.log('📧 이메일 전송 시뮬레이션:')
    console.log(`받는 사람: ${to}`)
    console.log(`제목: [KICT Group] ${originalSubject} 문의에 대한 답변`)
    console.log(`내용: ${replyContent}`)
    console.log(`발송자: ${adminName}`)
    
    // 2초 지연으로 실제 전송 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return { 
      success: true, 
      messageId: `mock-${Date.now()}@kictgroup.com` 
    }

  } catch (error) {
    console.error('이메일 전송 오류:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '알 수 없는 오류' 
    }
  }
}

// 환경 변수 설정 예시 (.env 파일에 추가)
/*
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@kictgroup.com
*/