import { useState, useEffect } from 'react'
import { Waves, Users, MessageSquare, Settings, BarChart3, LogOut, Eye, Edit, Trash2, Plus } from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalMessages: number
  totalProducts: number
  totalCarousels: number
}

interface Message {
  id: string
  name: string
  email: string
  inquiryType: string
  message: string
  createdAt: string
}

// Mock data
const mockMessages: Message[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@oceaninstitute.org',
    inquiryType: 'Research Collaboration',
    message: 'I am interested in collaborating on marine biodiversity research. Our institute has been conducting studies on coral reef ecosystems and would like to explore potential partnerships.',
    createdAt: '2025-08-05T10:30:00Z'
  },
  {
    id: '2',
    name: 'Marine Conservation Foundation',
    email: 'contact@marineconservation.org',
    inquiryType: 'Partnership',
    message: 'We are looking for partners to support our ocean cleanup initiative. Would you be interested in joining forces for a sustainable marine environment project?',
    createdAt: '2025-08-04T14:15:00Z'
  },
  {
    id: '3',
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    inquiryType: 'Product Inquiry',
    message: 'Hello, I am a graduate student researching marine microorganisms. Could you provide more information about your water sampling equipment?',
    createdAt: '2025-08-03T09:45:00Z'
  }
]

const mockStats: AdminStats = {
  totalUsers: 1247,
  totalMessages: 89,
  totalProducts: 24,
  totalCarousels: 8
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [stats, setStats] = useState<AdminStats>(mockStats)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null)

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleLogin = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault()
    if (loginForm.username === 'admin' && loginForm.password === '1111') {
      setIsAuthenticated(true)
      showNotification('success', 'Login successful! Welcome to the admin dashboard.')
    } else {
      showNotification('error', 'Invalid username or password.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginForm({ username: '', password: '' })
    showNotification('success', 'You have been logged out successfully.')
  }

  const deleteMessage = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId))
    showNotification('success', 'Message deleted successfully.')
  }

  const refreshData = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalMessages: messages.length
      }))
      setLoading(false)
      showNotification('success', 'Dashboard data refreshed.')
    }, 1000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center px-4">
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {notification.message}
          </div>
        )}
        
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Waves className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  MarineBioGroup
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter username"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter password"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                />
              </div>
              
              <button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-medium"
              >
                Login
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                ← Back to Website
              </p>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Demo Credentials:</strong><br />
                Username: admin<br />
                Password: 1111
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <Eye className="h-5 w-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Messages ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-100">
                    <Settings className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Carousels</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCarousels}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
              </div>
              <div className="p-6">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No messages yet</p>
                ) : (
                  <div className="space-y-4">
                    {messages.slice(0, 3).map((message) => (
                      <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{message.name}</h4>
                            <p className="text-sm text-gray-600">{message.email}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                              {message.inquiryType}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm line-clamp-2">
                          {message.message.length > 150 ? `${message.message.slice(0, 150)}...` : message.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
              <button 
                onClick={refreshData}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Refresh
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No messages received yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="bg-white rounded-xl shadow-sm">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {message.inquiryType}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">{message.email}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(message.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Database Configuration</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Database Status
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Connected to Supabase</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Environment
                    </label>
                    <span className="text-sm text-gray-600">Development</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">System Information</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Platform:</span>
                    <span className="text-sm font-medium">Next.js 15 with TypeScript</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Database:</span>
                    <span className="text-sm font-medium">Supabase PostgreSQL</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Deployment:</span>
                    <span className="text-sm font-medium">Railway Ready</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Version:</span>
                    <span className="text-sm font-medium">v1.0.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}