import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Simple demo authentication
    // In production, use proper password hashing and database verification
    const isValidCredentials = (
      username === 'admin' && password === '1111'
    ) || (
      username === 'marinebio' && password === 'admin123'
    )

    if (!isValidCredentials) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key'
    const token = jwt.sign(
      { 
        username,
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      jwtSecret
    )

    return NextResponse.json(
      { 
        message: 'Login successful',
        token,
        user: { username, role: 'admin' }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}