import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ReplyEmailData {
  inquiryId: string
  userEmail: string
  userName: string
  originalMessage: string
  replyMessage: string
}

const createTransport = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const data: ReplyEmailData = await request.json()
    
    const { userEmail, userName, originalMessage, replyMessage, inquiryId } = data

    if (!userEmail || !userName || !replyMessage || !inquiryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const transporter = createTransport()
    
    const subject = `Re: Your inquiry #${inquiryId}`
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for your inquiry</h2>
        <p>Dear ${userName},</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Our Response:</h3>
          <p style="line-height: 1.6;">${replyMessage.replace(/\n/g, '<br>')}</p>
        </div>
        
        <p>Best regards,<br>KICT Group Team</p>
      </div>
    `

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}