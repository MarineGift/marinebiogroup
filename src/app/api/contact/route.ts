import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, inquiryType, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Here you would typically save to database or send email
    // For now, we'll just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      inquiryType,
      message,
      timestamp: new Date().toISOString()
    })

    // In a real application, you would:
    // 1. Save to Supabase database
    // 2. Send notification email
    // 3. Add to CRM system

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}