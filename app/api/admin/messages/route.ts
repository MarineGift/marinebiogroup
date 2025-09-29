import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/server/storage'

export async function GET() {
  try {
    const messages = await storage.getAllMessages()
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}