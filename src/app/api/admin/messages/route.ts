import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: messages, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json([], { status: 200 })
    }

    const transformedMessages = messages?.map(msg => ({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      inquiryType: msg.inquiry_type || 'General',
      message: msg.message,
      createdAt: msg.created_at
    })) || []

    return NextResponse.json(transformedMessages)
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}
