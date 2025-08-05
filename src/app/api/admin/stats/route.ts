import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const stats = { totalUsers: 0, totalMessages: 0, totalProducts: 0, totalCarousels: 0 }

    try {
      const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true })
      stats.totalUsers = userCount || 0
    } catch (e) { console.log('Users table not accessible') }

    try {
      const { count: messageCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true })
      stats.totalMessages = messageCount || 0
    } catch (e) { console.log('Contacts table not accessible') }

    try {
      const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
      stats.totalProducts = productCount || 0
    } catch (e) { console.log('Products table not accessible') }

    try {
      const { count: carouselCount } = await supabase.from('carousels').select('*', { count: 'exact', head: true })
      stats.totalCarousels = carouselCount || 0
    } catch (e) { console.log('Carousels table not accessible') }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
