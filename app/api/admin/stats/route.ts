import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/server/storage'

export async function GET() {
  try {
    const stats = {
      totalUsers: await storage.getUsersCount(),
      totalMessages: await storage.getMessagesCount(),
      totalProducts: await storage.getProductsCount(),
      totalCarousels: await storage.getCarouselsCount()
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}