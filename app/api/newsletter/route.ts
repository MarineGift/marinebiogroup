import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, language = 'en', site = 'marinebiogroup' } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingSubscription } = await supabase
      .from('newsletters')
      .select('id')
      .eq('email', email)
      .eq('site', site)
      .single()

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Email is already subscribed' },
        { status: 400 }
      )
    }

    // Insert newsletter subscription into Supabase
    const { data, error } = await supabase
      .from('newsletters')
      .insert([
        {
          email,
          language,
          site,
          subscribed_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        subscription: data[0]
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}