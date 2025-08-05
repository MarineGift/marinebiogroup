'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Waves, LogIn } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // For now, use simple admin/1111 authentication
      // In production, this would connect to your authentication API
      if (formData.username === 'admin' && formData.password === '1111') {
        // Store auth token (in production, use proper JWT)
        localStorage.setItem('admin_token', 'authenticated')
        
        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin dashboard.',
        })
        
        router.push('/admin/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-marine-50 to-marine-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Waves className="h-8 w-8 text-marine-600" />
            <span className="text-2xl font-bold marine-text-gradient">MarineBioGroup</span>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl marine-text-gradient">Admin Login</CardTitle>
            <p className="text-gray-600">Access the admin dashboard</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-marine-500 focus:border-marine-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-marine-500 focus:border-marine-500"
                  placeholder="Enter password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full marine-gradient text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="text-center">
              <Link href="/" className="text-sm text-marine-600 hover:underline">
                ← Back to Website
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="bg-marine-50 p-4 rounded-md">
              <h4 className="font-medium text-marine-800 mb-2">Demo Credentials:</h4>
              <p className="text-sm text-marine-600">Username: admin</p>
              <p className="text-sm text-marine-600">Password: 1111</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2024 MarineBioGroup. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}